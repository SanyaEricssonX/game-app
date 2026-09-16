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
      const savedBuildings = JSON.parse(
        localStorage.getItem("playerBuildings") || "null",
      );

      return Number(
        savedBuildings?.currentLevel1 ||
          store.state.playerBuildings?.currentLevel1 ||
          0,
      );
    },

    healerCartConfig() {
      return FOUNTAIN_LEVELS[this.healerCartLevel] || null;
    },

    playerCurrentHp() {
      const savedHp = localStorage.getItem("playerCurrentHp");

      return savedHp !== null
        ? Number(savedHp)
        : Number(store.state.playerCurrentHp || 0);
    },

    playerMaxHp() {
      const savedMaxHp = localStorage.getItem("playerMaxHp");

      return savedMaxHp !== null
        ? Number(savedMaxHp)
        : Number(store.state.playerMaxHp || 0);
    },

    isPlayerFullHealth() {
      return this.playerCurrentHp >= this.playerMaxHp;
    },

    canUseCharge() {
      return (
        this.healerCartLevel > 0 &&
        this.fountain.currentCharges > 0 &&
        !this.isPlayerFullHealth
      );
    },

    nextRechargeIn() {
      if (
        !this.healerCartConfig ||
        this.fountain.currentCharges >= this.fountain.maxCharges
      ) {
        return 0;
      }

      const passed = this.now - this.fountain.lastUpdateTime;
      const rest =
        this.fountain.rechargeInterval -
        (passed % this.fountain.rechargeInterval);

      return rest === this.fountain.rechargeInterval ? 0 : rest;
    },

    nextRechargeText() {
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
      const config = this.healerCartConfig;

      if (!config) {
        this.fountain = {
          ...this.fountain,
          ...this.getDefaultFountainState(),
        };

        return;
      }

      const savedState = JSON.parse(
        localStorage.getItem(FOUNTAIN_STORAGE_KEY) || "null",
      );

      if (!savedState) {
        this.fountain = {
          ...this.fountain,
          ...this.getDefaultFountainState(),
        };

        this.saveFountainState();
        return;
      }

      const previousMaxCharges = Number(savedState.maxCharges || 0);
      const isUpgraded = config.maxCharges > previousMaxCharges;

      this.fountain.currentCharges = isUpgraded
        ? config.maxCharges
        : Math.min(Number(savedState.currentCharges || 0), config.maxCharges);

      this.fountain.maxCharges = config.maxCharges;
      this.fountain.rechargeRate = config.rechargeRate;
      this.fountain.lastUpdateTime =
        Number(savedState.lastUpdateTime) || Date.now();

      this.checkRecharge();
      this.saveFountainState();
    },

    saveFountainState() {
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

      if (!this.canUseCharge) {
        return false;
      }

      const hpToRestore = Math.min(
        this.fountain.currentCharges,
        this.playerMaxHp - this.playerCurrentHp,
      );

      const newHp = this.playerCurrentHp + hpToRestore;

      this.fountain.currentCharges -= hpToRestore;

      localStorage.setItem("playerCurrentHp", String(newHp));

      if ("playerCurrentHp" in store.state) {
        store.state.playerCurrentHp = newHp;
      }

      this.saveFountainState();
      downloadData();

      return true;
    },

    breakHealerCart() {
      this.fountain.currentCharges = 0;
      this.fountain.lastUpdateTime = Date.now();

      this.saveFountainState();
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
