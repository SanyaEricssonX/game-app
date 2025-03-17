/* eslint-disable no-unused-vars */

import store from "../store";

class player {
  constructor() {
    this.experienceForLevel = [50, 150, 300, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500];
    this.increaseDamagePerLevel = [2, 5, 9, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
    this.increaseMaxHpPerLevel = [10, 21, 33, 46, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270];
    this.increaseArmorPerLevel = [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28];
    this.isLevelIncreased = false;
    this.infoByLevel = {
      2: ["Получен доступ к крафту предметов", "Доступны новые товары в магазине"],
      3: ["Доступны новые товары в магазине"],
      4: ["Доступен выбор профессии"],
      5: ["Доступно строительство", "Доступны новые товары в магазине"]
    };
  }

  characteristics() {
    this.levelUp();
    this.damageUp();
    this.maxHpUp();
    this.armorUp();

    // Восстанавливаем хп, если был повышен уровень
    if (this.isLevelIncreased == true) {
      store.state.playerCurrentHp = store.state.playerMaxHp;
      localStorage.setItem("playerCurrentHp", store.state.playerCurrentHp);
      this.isLevelIncreased = false;
    }
  }

  levelUp() {
    for (let i = 0; i < this.experienceForLevel.length - 1; i++) {
      if (store.state.playerExperience >= this.experienceForLevel[i] && store.state.playerExperience < this.experienceForLevel[i + 1]) {
        store.state.playerLevel = i + 2;
      }
    }
    // Условие для взятия 20 уровня
    if (store.state.playerExperience >= 15500) {
      store.state.playerLevel = 20;
    }
    if (store.state.playerLevel > localStorage.getItem("playerLevel")) {
      this.isLevelIncreased = true;
      store.state.levelIsUp = true;
      localStorage.setItem("playerLevel", store.state.playerLevel);
    }
  }

  damageUp() {
    for (let i = 0; i < this.increaseDamagePerLevel.length; i++) {
      if (store.state.playerLevel == i + 2) {
        store.state.playerDamage = store.state.defaultPlayerDamage + this.increaseDamagePerLevel[i];
        localStorage.setItem("playerDamage", store.state.playerDamage);
      }
    }
  }

  maxHpUp() {
    for (let i = 0; i < this.increaseMaxHpPerLevel.length; i++) {
      if (store.state.playerLevel == i + 2) {
        store.state.playerMaxHp = store.state.defaultPlayerMaxHp + this.increaseMaxHpPerLevel[i];
        localStorage.setItem("playerMaxHp", store.state.playerMaxHp);
      }
    }
  }

  armorUp() {
    for (let i = 0; i < this.increaseArmorPerLevel.length; i++) {
      if (store.state.playerLevel == i + 2) {
        store.state.playerArmor = store.state.defaultPlayerArmor + this.increaseArmorPerLevel[i];
        localStorage.setItem("playerArmor", store.state.playerArmor);
      }
    }
  }

  isDead(currentHp) {
    if (currentHp <= 0) {
      localStorage.removeItem("playerExperience");
      localStorage.removeItem("playerLevel");
      localStorage.removeItem("playerMaxHp");
      localStorage.removeItem("playerCurrentHp");
      localStorage.removeItem("playerDamage");
      localStorage.removeItem("playerArmor");
    }
  }

  decreaseDamage(armor) {
    return 100 * ((armor * 0.02) / (1 + armor * 0.02));
    // 5 - 9%
    // 10 - 17%
    // 20 - 28%
    // 28 - 36%
    // 50 - 50%
    // 70 - 58%
    // 100 - 66%
  }

  levelUpInfo() {
    if (store.state.playerLevel <= 5) {
      const level = store.state.playerLevel;
      return this.infoByLevel[level];
    }
  }
}

export default new player();
