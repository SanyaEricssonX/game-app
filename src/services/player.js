/* eslint-disable no-unused-vars */

import store from "../store";
import items from "../services/items";
import { downloadData } from "./downloadData";

class player {
  constructor() {
    this.experienceForLevel = [50, 150, 300, 500, 800, 1200, 1700, 2300, 3200, 4200, 5300, 6500, 8000, 10600, 13200, 17000, 21200, 25800, 32000];
    this.increaseDamagePerLevel = [2, 5, 9, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
    this.increaseMaxHpPerLevel = [10, 21, 33, 46, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270];
    this.increaseArmorPerLevel = [1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28];
    this.warriorProfessionCharacteristics = { damage: 30, critChance: 15, critPower: 20 };
    this.knightProfessionCharacteristics = { armor: 30, hp: 25, evasion: -1000 };
    this.assassinProfessionCharacteristics = { armor: -20, hp: -10, evasion: 10, critChance: 25, critPower: 70 };
    this.berserkProfessionCharacteristics = { damage: 100, armor: -20, hp: -20, evasion: 10, critChance: 15, critPower: 20 };
    this.gladiatorProfessionCharacteristics = { damage: 30, hp: 10, evasion: 20, critChance: 25, critPower: 70 };
    this.templarProfessionCharacteristics = { armor: 70, hp: 70, evasion: -1000 };
    this.titanProfessionCharacteristics = { damage: 15, armor: 30, hp: 25, evasion: -1000, critChance: 15, critPower: 20 };
    this.reaperProfessionCharacteristics = { armor: -20, hp: -10, evasion: 10, critChance: 35, critPower: 150 };
    this.pathfinderProfessionCharacteristics = { damage: 15, armor: 10, hp: 10, evasion: 30, critChance: 25, critPower: 70 };
    this.isLevelIncreased = false;
    this.infoByLevel = {
      2: ["Доступны новые товары в магазине"],
      3: ["Доступны новые товары в магазине"],
      4: ["Доступен выбор воплощения", "Доступна новая локация: Мертвые земли", "Доступны новые товары в магазине"],
      5: ["Доступно строительство", "Доступны новые товары в магазине"],
      7: ["Получен доступ в подземелья с рейдовыми боссами"],
      8: ["Доступна новая локация: Равнины древней магии"],
      9: ["Доступны новые товары в магазине"],
      10: ["Доступны новые товары в магазине"],
      12: ["Доступна новая локация: Туманный лес"],
      13: ["Доступен второй акт воплощения", "Доступны новые товары в магазине"],
      16: ["Доступна новая локация: Заснеженный перевал"]
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
    if (store.state.playerExperience >= 32000) {
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
      localStorage.removeItem("playerEvasion");
      localStorage.removeItem("playerCritChance");
      localStorage.removeItem("playerCritPower");
      localStorage.removeItem("playerLevelCharacteristics");
      localStorage.removeItem("playerBuffCharacteristics");
      localStorage.removeItem("playerProfessionCharacteristics");
      localStorage.removeItem("playerProfession");
      localStorage.removeItem("playerMaxEvasion");
      localStorage.removeItem("playerCurrentLocation");
      localStorage.removeItem("sortedEnemies");

      store.state.playerEquipment.weaponDurability = 0;
      store.state.playerEquipment.helmetDurability = 0;
      store.state.playerEquipment.upperDurability = 0;
      store.state.playerEquipment.lowerDurability = 0;
      store.state.playerEquipment.glovesDurability = 0;
      store.state.playerEquipment.bootsDurability = 0;

      localStorage.setItem("playerEquipment", JSON.stringify(store.state.playerEquipment));

      downloadData();
      this.equipmentCharacteristics()
      downloadData();
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
    // 300 - 86%
    // 1000 - 96%
  }

  levelUpInfo() {
    if (store.state.playerLevel <= 20) {
      const level = store.state.playerLevel;
      return this.infoByLevel[level];
    }
  }

  // Вспомогательная функция для основной функции рассчета бонусных характеристик с надетой экипировки
  findBonusCharacteristics(equipmentCategory, equipmentDurability) {
    let allItems = JSON.parse(JSON.stringify(items.list()));
    let bonusCharacteristics = { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0 };

    if (equipmentCategory > 0) {
      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == equipmentCategory) {
          for (let characteristic in allItems[i]) {
            if (characteristic == "damage") {
              let item = allItems[i];
              if (equipmentDurability > 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.damage += item[characteristic];
              } else if (equipmentDurability == 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.damage += Math.floor((item[characteristic]) / 2);
              } else if (equipmentDurability >= 0 && item.requiredLevel > store.state.playerLevel) {
                bonusCharacteristics.damage += 0;
              }
            }
            if (characteristic == "armor") {
              let item = allItems[i];
              if (equipmentDurability > 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.armor += item[characteristic];
              } else if (equipmentDurability == 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.armor += Math.floor((item[characteristic]) / 2);
              } else if (equipmentDurability >= 0 && item.requiredLevel > store.state.playerLevel) {
                bonusCharacteristics.armor += 0;
              }
            }
            if (characteristic == "hp") {
              let item = allItems[i];
              if (equipmentDurability > 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.hp += item[characteristic];
              } else if (equipmentDurability == 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.hp += Math.floor((item[characteristic]) / 2);
              } else if (equipmentDurability >= 0 && item.requiredLevel > store.state.playerLevel) {
                bonusCharacteristics.hp += 0;
              }
            }
            if (characteristic == "evasion") {
              let item = allItems[i];
              if (equipmentDurability > 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.evasion += item[characteristic];
              } else if (equipmentDurability == 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.evasion += Math.floor((item[characteristic]) / 2);
              } else if (equipmentDurability >= 0 && item.requiredLevel > store.state.playerLevel) {
                bonusCharacteristics.evasion += 0;
              }
            }
            if (characteristic == "critChance") {
              let item = allItems[i];
              if (equipmentDurability > 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.critChance += item[characteristic];
              } else if (equipmentDurability == 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.critChance += Math.floor((item[characteristic]) / 2);
              } else if (equipmentDurability >= 0 && item.requiredLevel > store.state.playerLevel) {
                bonusCharacteristics.critChance += 0;
              }
            }
            if (characteristic == "critPower") {
              let item = allItems[i];
              if (equipmentDurability > 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.critPower += item[characteristic];
              } else if (equipmentDurability == 0 && item.requiredLevel <= store.state.playerLevel) {
                bonusCharacteristics.critPower += Math.floor((item[characteristic]) / 2);
              } else if (equipmentDurability >= 0 && item.requiredLevel > store.state.playerLevel) {
                bonusCharacteristics.critPower += 0;
              }
            }
          }
        }
      }
    }

    return bonusCharacteristics;
  }

  equipmentCharacteristics() {
    let equipment = JSON.parse(JSON.stringify(store.state.playerEquipment));
    let bonusCharacteristics = { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0 };

    const sum = {};

    // Собираем все характеристики со всей экипировки
    for (const key in bonusCharacteristics) {
      sum[key] = bonusCharacteristics[key] +
        ((this.findBonusCharacteristics(equipment.weapon, equipment.weaponDurability)[key] || 0)) +
        ((this.findBonusCharacteristics(equipment.helmet, equipment.helmetDurability)[key] || 0)) +
        ((this.findBonusCharacteristics(equipment.upper, equipment.upperDurability)[key] || 0)) +
        ((this.findBonusCharacteristics(equipment.lower, equipment.lowerDurability)[key] || 0)) +
        ((this.findBonusCharacteristics(equipment.gloves, equipment.glovesDurability)[key] || 0)) +
        ((this.findBonusCharacteristics(equipment.boots, equipment.bootsDurability)[key] || 0))
    }
    bonusCharacteristics = sum;

    // Сохраняем бонусные характеристики в LocalStorage
    store.state.playerEquipmentCharacteristics = bonusCharacteristics;
    localStorage.setItem("playerEquipmentCharacteristics", JSON.stringify(bonusCharacteristics));
  }

  professionCharacteristics() {
    if (store.state.playerProfession == "warrior") {
      store.state.playerProfessionCharacteristics = this.warriorProfessionCharacteristics;
    } else if (store.state.playerProfession == "knight") {
      store.state.playerProfessionCharacteristics = this.knightProfessionCharacteristics;
    } else if (store.state.playerProfession == "assassin") {
      store.state.playerProfessionCharacteristics = this.assassinProfessionCharacteristics;
    } else if (store.state.playerProfession == "berserk") {
      store.state.playerProfessionCharacteristics = this.berserkProfessionCharacteristics;
    } else if (store.state.playerProfession == "gladiator") {
      store.state.playerProfessionCharacteristics = this.gladiatorProfessionCharacteristics;
    } else if (store.state.playerProfession == "templar") {
      store.state.playerProfessionCharacteristics = this.templarProfessionCharacteristics;
    } else if (store.state.playerProfession == "titan") {
      store.state.playerProfessionCharacteristics = this.titanProfessionCharacteristics;
    } else if (store.state.playerProfession == "reaper") {
      store.state.playerProfessionCharacteristics = this.reaperProfessionCharacteristics;
    } else if (store.state.playerProfession == "pathfinder") {
      store.state.playerProfessionCharacteristics = this.pathfinderProfessionCharacteristics;
    }

    localStorage.setItem("playerProfessionCharacteristics", JSON.stringify(store.state.playerProfessionCharacteristics));
  }

  buffDuration(characteristic) {
    const damageBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.damageBuffDuration));
    const armorBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.armorBuffDuration));
    const hpBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.hpBuffDuration));
    const evasionBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.evasionBuffDuration));
    const critChanceBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.critChanceBuffDuration));
    const critPowerBuffDuration = JSON.parse(JSON.stringify(store.state.playerBuffCharacteristics.critPowerBuffDuration));
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
      case "hp":
        if (hpBuffDuration == 0) {
          store.state.playerBuffCharacteristics.hp = 0;
        }
        break;
      case "evasion":
        if (evasionBuffDuration == 0) {
          store.state.playerBuffCharacteristics.evasion = 0;
        }
        break;
      case "critChance":
        if (critChanceBuffDuration == 0) {
          store.state.playerBuffCharacteristics.critChance = 0;
        }
        break;
      case "critPower":
        if (critPowerBuffDuration == 0) {
          store.state.playerBuffCharacteristics.critPower = 0;
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
