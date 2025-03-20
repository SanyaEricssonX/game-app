/* eslint-disable no-unused-vars */

import store from "../store";
import items from "../services/items";
import { downloadData } from "./downloadData";

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

    // Подгружаем изменения характеристик
    downloadData();

    // Восстанавливаем хп, если был повышен уровень
    if (this.isLevelIncreased == true) {
      store.state.playerCurrentHp = store.state.playerMaxHp;
      localStorage.setItem("playerCurrentHp", store.state.playerCurrentHp);
      this.isLevelIncreased = false;
    }
  }

  levelUp() {
    if (store.state.playerLevel == 1) {
      localStorage.setItem("playerLevel", 1);
    }

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
        store.state.playerLevelCharacteristics.damage = this.increaseDamagePerLevel[i];
        localStorage.setItem("playerLevelCharacteristics", JSON.stringify(store.state.playerLevelCharacteristics));
      }
    }
  }

  maxHpUp() {
    for (let i = 0; i < this.increaseMaxHpPerLevel.length; i++) {
      if (store.state.playerLevel == i + 2) {
        store.state.playerLevelCharacteristics.hp = this.increaseMaxHpPerLevel[i];
        localStorage.setItem("playerLevelCharacteristics", JSON.stringify(store.state.playerLevelCharacteristics));
      }
    }
  }

  armorUp() {
    for (let i = 0; i < this.increaseArmorPerLevel.length; i++) {
      if (store.state.playerLevel == i + 2) {
        store.state.playerLevelCharacteristics.armor = this.increaseArmorPerLevel[i];
        localStorage.setItem("playerLevelCharacteristics", JSON.stringify(store.state.playerLevelCharacteristics));
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
      localStorage.removeItem("playerLevelCharacteristics");
      localStorage.removeItem("playerBuffCharacteristics");
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
  equipmentCharacteristics() {
    let allItems = items.list();
    let equipment = store.state.playerEquipment;
    let item = {};
    let bonusCharacteristics = { damage: 0, armor: 0, hp: 0 };

    for (let key in equipment) {
      if (equipment[key] != 0) {
        for (let index = 0; index < allItems.length; index++) {
          if (allItems[index].id == equipment[key]) {
            item = allItems[index];
            for (let characteristic in item) {
              if (characteristic == "damage") {
                bonusCharacteristics.damage += item[characteristic];
              } else if (characteristic == "armor") {
                bonusCharacteristics.armor += item[characteristic];
              } else if (characteristic == "hp") {
                bonusCharacteristics.hp += item[characteristic];
              }
            }
          }
        }
      }
    }
    // Сохраняем бонусные характеристики в LocalStorage
    store.state.playerEquipmentCharacteristics = bonusCharacteristics;
    localStorage.setItem("playerEquipmentCharacteristics", JSON.stringify(bonusCharacteristics));
  }
  buffDuration(characteristic) {
    console.log(store.state.playerBuffCharacteristics.damage);
    console.log(store.state.playerBuffCharacteristics.damageBuffDuration);
    console.log(store.state.playerBuffCharacteristics.armor);
    console.log(store.state.playerBuffCharacteristics.armorBuffDuration);
    console.log(store.state.playerBuffCharacteristics.drop);
    console.log(store.state.playerBuffCharacteristics.dropBuffDuration);
    const damageBuffDuration = store.state.playerBuffCharacteristics.damageBuffDuration;
    const armorBuffDuration = store.state.playerBuffCharacteristics.damageBuffDuration;
    const dropBuffDuration = store.state.playerBuffCharacteristics.damageBuffDuration;

    switch (characteristic) {
      case "damage":
        if (damageBuffDuration == 0) {
          store.state.playerBuffCharacteristics.damage = 0;
        }
        break;
      case "armor":
        if (armorBuffDuration == 0) {
          store.state.playerBuffCharacteristics.armor = 0;
        }
        break;
      case "drop":
        if (dropBuffDuration == 0) {
          store.state.playerBuffCharacteristics.drop = 0;
        }
        break;
      default:
        break;
    }

    localStorage.setItem("playerBuffCharacteristics", JSON.stringify(store.state.playerBuffCharacteristics));
  }
}

export default new player();
