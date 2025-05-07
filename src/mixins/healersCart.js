import { downloadData } from "@/services/downloadData";
import store from "@/store";

export default {
  data() {
    return {
      fountain: {
        currentCharges: 100,
        maxCharges: 100,
        lastUpdateTime: Date.now(),
        rechargeRate: 10,       // зарядов за период
        rechargeInterval: 300000, // 5 минут в мс (5 * 60 * 1000)
        // rechargeInterval: 10000,
      },
      rechargeCheckInterval: null, // для хранения интервала проверки
    };
  },
  methods: {
    // Загружаем сохранённое состояние
    loadFountainState() {
      const playerBuildings = JSON.parse(localStorage.getItem("playerBuildings"));
      let maxCharges = 100;
      let rechargeRate = 10;

      if (playerBuildings.currentLevel1 == 1) {
        maxCharges = 100;
        rechargeRate = 10;
      } else if (playerBuildings.currentLevel1 == 2) {
        maxCharges = 360;
        rechargeRate = 15;
      } else if (playerBuildings.currentLevel1 == 3) {
        maxCharges = 1050;
        rechargeRate = 35;
      }

      const savedState = localStorage.getItem('healthFountain');

      if (savedState) {
        const parsed = JSON.parse(savedState);
        this.fountain.currentCharges = parsed.currentCharges;
        this.fountain.maxCharges = parsed.maxCharges || maxCharges;
        this.fountain.lastUpdateTime = parsed.lastUpdateTime;
        this.fountain.rechargeRate = parsed.rechargeRate || rechargeRate;
      }

      if (this.fountain.maxCharges < maxCharges) {
        this.fountain.currentCharges = maxCharges;
      }

      this.fountain.maxCharges = maxCharges;
      this.fountain.rechargeRate = rechargeRate;

      if (localStorage.getItem("levelIsUp") && localStorage.getItem("levelIsUp") == 1) {
        this.fountain.currentCharges = maxCharges;
        localStorage.setItem("levelIsUp", 0);
      }

      this.saveFountainState();
    },
    // Сохраняем текущее состояние
    saveFountainState() {
      localStorage.setItem('healthFountain', JSON.stringify({
        currentCharges: this.fountain.currentCharges,
        maxCharges: this.fountain.maxCharges,
        lastUpdateTime: this.fountain.lastUpdateTime,
        rechargeRate: this.fountain.rechargeRate,
      }));
    },
    // Проверяем, нужно ли восстановить заряды
    checkRecharge() {
      const now = Date.now();
      const timePassed = now - this.fountain.lastUpdateTime;
      const intervalsPassed = Math.floor(timePassed / this.fountain.rechargeInterval);

      if (intervalsPassed > 0) {
        const newCharges = this.fountain.currentCharges +
          (intervalsPassed * this.fountain.rechargeRate);

        this.fountain.currentCharges = Math.min(newCharges, this.fountain.maxCharges);
        this.fountain.lastUpdateTime = now - (timePassed % this.fountain.rechargeInterval);
        this.saveFountainState();
      }
    },
    // Запускаем периодическую проверку
    startRechargeChecker() {
      this.rechargeCheckInterval = setInterval(() => {
        this.checkRecharge();
      }, 1000);
    },
    // Останавливаем проверку
    stopRechargeChecker() {
      if (this.rechargeCheckInterval) {
        clearInterval(this.rechargeCheckInterval);
        this.rechargeCheckInterval = null;
      }
    },
    // Использовать заряд
    useCharge() {
      let playerCurrentHp = Number(localStorage.getItem("playerCurrentHp"));
      const playerMaxHp = Number(localStorage.getItem("playerMaxHp")) || store.state.playerMaxHp;

      if (this.fountain.currentCharges > 0 && playerCurrentHp < playerMaxHp) {

        const hpToAdd = Math.min(
          this.fountain.currentCharges, // Сколько есть зарядов
          playerMaxHp - playerCurrentHp // Сколько не хватает до максимума
        );

        // Добавляем здоровье игроку
        playerCurrentHp += hpToAdd;

        // Уменьшаем заряды фонтана на использованное количество
        this.fountain.currentCharges -= hpToAdd;

        localStorage.setItem("playerCurrentHp", playerCurrentHp);

        this.saveFountainState();
        downloadData();
        return true;
      }
      return false;
    },
  },
  created() {
    this.loadFountainState();
    this.startRechargeChecker(); // запускаем проверку восстановления
  },
  beforeDestroy() {
    this.stopRechargeChecker(); // очищаем интервал при уничтожении компонента
  },
};