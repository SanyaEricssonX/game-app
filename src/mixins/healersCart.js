import { downloadData } from "@/services/downloadData";
import store from "@/store";

const FOUNTAIN_STORAGE_KEY = "healthFountain";

const FOUNTAIN_LEVELS = {
  1: {
    maxCharges: 100,
    rechargeRate: 10,
  },
  2: {
    maxCharges: 360,
    rechargeRate: 15,
  },
  3: {
    maxCharges: 1050,
    rechargeRate: 35,
  },
};

export default {
  data() {
    return {
      fountain: {
        currentCharges: 0,
        maxCharges: 0,
        lastUpdateTime: Date.now(),
        rechargeRate: 0,
        rechargeInterval: 5 * 60 * 1000,
      },
      rechargeCheckInterval: null,
      now: Date.now(),
    };
  },

  computed: {
    healerCartLevel() {
      return Number(store.state.playerBuildings?.currentLevel1 || 0);
    },

    healerCartConfig() {
      return FOUNTAIN_LEVELS[this.healerCartLevel] || null;
    },

    playerCurrentHp() {
      return Number(store.state.playerCurrentHp || 0);
    },

    playerMaxHp() {
      return Number(store.state.playerMaxHp || 0);
    },

    isPlayerFullHealth() {
      return this.playerMaxHp > 0 && this.playerCurrentHp >= this.playerMaxHp;
    },

    canUseCharge() {
      return (
        this.healerCartLevel > 0 &&
        this.fountain.currentCharges > 0 &&
        this.playerMaxHp > 0 &&
        this.playerCurrentHp < this.playerMaxHp
      );
    },

    nextRechargeIn() {
      if (
        !this.healerCartConfig ||
        this.fountain.currentCharges >= this.fountain.maxCharges
      ) {
        return 0;
      }

      const timePassed = Math.max(0, this.now - this.fountain.lastUpdateTime);

      const remainder = timePassed % this.fountain.rechargeInterval;

      const nextRechargeIn = this.fountain.rechargeInterval - remainder;

      return nextRechargeIn === this.fountain.rechargeInterval
        ? 0
        : nextRechargeIn;
    },

    nextRechargeText() {
      if (!this.healerCartConfig) {
        return "";
      }

      if (this.fountain.currentCharges >= this.fountain.maxCharges) {
        return "Повозка полностью заряжена";
      }

      const seconds = Math.ceil(this.nextRechargeIn / 1000);
      const minutes = Math.floor(seconds / 60);
      const restSeconds = seconds % 60;

      return `Следующее восстановление через ${minutes}:${String(
        restSeconds,
      ).padStart(2, "0")}`;
    },
  },

  methods: {
    getDefaultFountainState() {
      if (!this.healerCartConfig) {
        return {
          currentCharges: 0,
          maxCharges: 0,
          lastUpdateTime: Date.now(),
          rechargeRate: 0,
        };
      }

      return {
        currentCharges: this.healerCartConfig.maxCharges,
        maxCharges: this.healerCartConfig.maxCharges,
        lastUpdateTime: Date.now(),
        rechargeRate: this.healerCartConfig.rechargeRate,
      };
    },

    loadFountainState() {
      if (!this.healerCartConfig) {
        this.fountain = {
          ...this.fountain,
          ...this.getDefaultFountainState(),
        };

        return;
      }

      const savedStateString = localStorage.getItem(FOUNTAIN_STORAGE_KEY);

      let savedState = null;

      if (savedStateString) {
        try {
          savedState = JSON.parse(savedStateString);
        } catch (error) {
          savedState = null;
        }
      }

      if (!savedState) {
        this.fountain = {
          ...this.fountain,
          ...this.getDefaultFountainState(),
        };

        this.saveFountainState();
        return;
      }

      const previousMaxCharges = Number(savedState.maxCharges || 0);

      const isCartUpgraded =
        this.healerCartConfig.maxCharges > previousMaxCharges;

      this.fountain.currentCharges = isCartUpgraded
        ? this.healerCartConfig.maxCharges
        : Math.min(
            Math.max(0, Number(savedState.currentCharges || 0)),
            this.healerCartConfig.maxCharges,
          );

      this.fountain.maxCharges = this.healerCartConfig.maxCharges;

      this.fountain.rechargeRate = this.healerCartConfig.rechargeRate;

      this.fountain.lastUpdateTime =
        Number(savedState.lastUpdateTime) || Date.now();

      this.checkRecharge();
      this.saveFountainState();
    },

    saveFountainState() {
      if (!this.healerCartConfig) {
        return;
      }

      localStorage.setItem(
        FOUNTAIN_STORAGE_KEY,
        JSON.stringify({
          currentCharges: this.fountain.currentCharges,
          maxCharges: this.fountain.maxCharges,
          lastUpdateTime: this.fountain.lastUpdateTime,
          rechargeRate: this.fountain.rechargeRate,
        }),
      );
    },

    checkRecharge() {
      if (
        !this.healerCartConfig ||
        this.fountain.currentCharges >= this.fountain.maxCharges
      ) {
        return;
      }

      const now = Date.now();

      const timePassed = Math.max(0, now - this.fountain.lastUpdateTime);

      const intervalsPassed = Math.floor(
        timePassed / this.fountain.rechargeInterval,
      );

      if (intervalsPassed <= 0) {
        return;
      }

      const recoveredCharges = intervalsPassed * this.fountain.rechargeRate;

      this.fountain.currentCharges = Math.min(
        this.fountain.currentCharges + recoveredCharges,
        this.fountain.maxCharges,
      );

      this.fountain.lastUpdateTime +=
        intervalsPassed * this.fountain.rechargeInterval;

      this.saveFountainState();
    },

    startRechargeChecker() {
      this.stopRechargeChecker();

      this.rechargeCheckInterval = window.setInterval(() => {
        this.now = Date.now();
        this.checkRecharge();
      }, 1000);
    },

    stopRechargeChecker() {
      if (this.rechargeCheckInterval !== null) {
        clearInterval(this.rechargeCheckInterval);
        this.rechargeCheckInterval = null;
      }
    },

    useCharge() {
      this.checkRecharge();

      const playerCurrentHp = Number(store.state.playerCurrentHp || 0);

      const playerMaxHp = Number(store.state.playerMaxHp || 0);

      if (
        this.healerCartLevel <= 0 ||
        this.fountain.currentCharges <= 0 ||
        playerMaxHp <= 0 ||
        playerCurrentHp >= playerMaxHp
      ) {
        return false;
      }

      const hpToRestore = Math.min(
        this.fountain.currentCharges,
        playerMaxHp - playerCurrentHp,
      );

      if (hpToRestore <= 0) {
        return false;
      }

      const newPlayerCurrentHp = playerCurrentHp + hpToRestore;

      this.fountain.currentCharges -= hpToRestore;

      /*
        Store обновляется сразу.
        Благодаря этому isPlayerFullHealth и canUseCharge
        мгновенно перерисуют кнопку.
      */
      store.state.playerCurrentHp = newPlayerCurrentHp;

      localStorage.setItem("playerCurrentHp", String(newPlayerCurrentHp));

      this.saveFountainState();

      downloadData();

      return true;
    },

    breakHealerCart() {
      localStorage.removeItem(FOUNTAIN_STORAGE_KEY);

      this.fountain = {
        ...this.fountain,
        ...this.getDefaultFountainState(),
      };
    },
  },

  created() {
    this.loadFountainState();
    this.startRechargeChecker();
  },

  beforeUnmount() {
    this.stopRechargeChecker();
  },
};
