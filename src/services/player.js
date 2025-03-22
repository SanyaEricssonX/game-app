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
    let allItems = JSON.parse(JSON.stringify(items.list()));
    let equipment = JSON.parse(JSON.stringify(store.state.playerEquipment));
    let item = {};
    let bonusCharacteristics = { damage: 0, armor: 0, hp: 0 };

    // Оружие
    if (equipment.weapon > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipment.weapon) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipment.weaponDurability > 0) {
                bonusCharacteristics.damage += item[characteristic];
              } else {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipment.weaponDurability > 0) {
                bonusCharacteristics.armor += item[characteristic];
              } else {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipment.weaponDurability > 0) {
                bonusCharacteristics.hp += item[characteristic];
              } else {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
              }
            }
          }
        }
      }
    }

    // Шлем
    if (equipment.helmet > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipment.helmet) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipment.helmetDurability > 0) {
                bonusCharacteristics.damage += item[characteristic];
              } else {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipment.helmetDurability > 0) {
                bonusCharacteristics.armor += item[characteristic];
              } else {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipment.helmetDurability > 0) {
                bonusCharacteristics.hp += item[characteristic];
              } else {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
              }
            }
          }
        }
      }
    }

    // Верхний доспех
    if (equipment.upper > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipment.upper) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipment.upperDurability > 0) {
                bonusCharacteristics.damage += item[characteristic];
              } else {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipment.upperDurability > 0) {
                bonusCharacteristics.armor += item[characteristic];
              } else {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipment.upperDurability > 0) {
                bonusCharacteristics.hp += item[characteristic];
              } else {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
              }
            }
          }
        }
      }
    }

    // Нижний доспех
    if (equipment.lower > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipment.lower) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipment.lowerDurability > 0) {
                bonusCharacteristics.damage += item[characteristic];
              } else {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipment.lowerDurability > 0) {
                bonusCharacteristics.armor += item[characteristic];
              } else {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipment.lowerDurability > 0) {
                bonusCharacteristics.hp += item[characteristic];
              } else {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
              }
            }
          }
        }
      }
    }

    // Перчатки
    if (equipment.gloves > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipment.gloves) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipment.glovesDurability > 0) {
                bonusCharacteristics.damage += item[characteristic];
              } else {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipment.glovesDurability > 0) {
                bonusCharacteristics.armor += item[characteristic];
              } else {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipment.glovesDurability > 0) {
                bonusCharacteristics.hp += item[characteristic];
              } else {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
              }
            }
          }
        }
      }
    }

    // Сапоги
    if (equipment.boots > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipment.boots) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipment.bootsDurability > 0) {
                bonusCharacteristics.damage += item[characteristic];
              } else {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipment.bootsDurability > 0) {
                bonusCharacteristics.armor += item[characteristic];
              } else {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipment.bootsDurability > 0) {
                bonusCharacteristics.hp += item[characteristic];
              } else {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
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
    const damageBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.damageBuffDuration));
    const armorBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.armorBuffDuration));
    const dropBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.dropBuffDuration));

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
  createInventory() {
    let inventory = JSON.parse(JSON.stringify(store.state.playerInventory));

    for (let i = 0; i < store.state.playerInventorySize; i++) {
      while (inventory.length < store.state.playerInventorySize) {
        inventory.push({});
      }
      Object.assign(inventory[i], { "cellId": i });
    }
    return inventory;
  }
}

export default new player();
