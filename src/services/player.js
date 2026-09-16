/* eslint-disable no-unused-vars */

import store from "../store";
import items from "../services/items";
import { downloadData } from "./downloadData";
import camp from "../game/camp";

class Player {
  constructor() {
    this.experienceForLevel = [
      50, 150, 300, 500, 800, 1200, 1700, 2300, 3200, 4200, 5300, 6500, 8000,
      10600, 13200, 17000, 21200, 25800, 32000,
    ];

    this.increaseDamagePerLevel = [
      2, 5, 9, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90,
    ];

    this.increaseMaxHpPerLevel = [
      10, 21, 33, 46, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225,
      240, 255, 270,
    ];

    this.increaseArmorPerLevel = [
      1, 2, 4, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19, 20, 22, 23, 25, 26, 28,
    ];

    this.warriorProfessionCharacteristics = {
      damage: 30,
      critChance: 15,
      critPower: 20,
    };

    this.knightProfessionCharacteristics = {
      armor: 30,
      hp: 25,
      evasion: -1000,
    };

    this.assassinProfessionCharacteristics = {
      armor: -20,
      hp: -10,
      evasion: 10,
      critChance: 25,
      critPower: 70,
    };

    this.berserkProfessionCharacteristics = {
      damage: 100,
      armor: -20,
      hp: -20,
      critChance: 15,
      critPower: 20,
    };

    this.gladiatorProfessionCharacteristics = {
      damage: 30,
      hp: 10,
      evasion: 10,
      critChance: 25,
      critPower: 70,
    };

    this.templarProfessionCharacteristics = {
      armor: 70,
      hp: 70,
      evasion: -1000,
    };

    this.titanProfessionCharacteristics = {
      damage: 15,
      armor: 30,
      hp: 25,
      evasion: -1000,
      critChance: 10,
      critPower: 20,
    };

    this.reaperProfessionCharacteristics = {
      armor: -20,
      hp: -10,
      evasion: 10,
      critChance: 35,
      critPower: 150,
    };

    this.pathfinderProfessionCharacteristics = {
      damage: 10,
      armor: 10,
      hp: 10,
      evasion: 20,
      critChance: 25,
      critPower: 70,
    };

    this.isLevelIncreased = false;

    this.infoByLevel = {
      2: ["Доступны новые товары в магазине"],
      3: ["Доступны новые товары в магазине"],
      4: [
        "Доступен выбор воплощения",
        "Доступна новая локация: Мертвые земли",
        "Доступны новые товары в магазине",
      ],
      5: ["Доступны новые товары в магазине"],
      7: ["Получен доступ в подземелья с рейдовыми боссами"],
      8: ["Доступна новая локация: Равнины древней магии"],
      9: ["Доступны новые товары в магазине"],
      10: ["Доступны новые товары в магазине"],
      12: ["Доступна новая локация: Туманный лес"],
      13: [
        "Доступен второй акт воплощения",
        "Доступны новые товары в магазине",
      ],
      16: ["Доступна новая локация: Заснеженный перевал"],
      17: ["Доступны новые товары в магазине"],
      18: ["Доступны новые товары в магазине"],
      20: ["Достигнут максимальный уровень. Поздравляем!"],
    };
  }

  characteristics() {
    this.levelUp();
    this.damageUp();
    this.maxHpUp();
    this.armorUp();

    camp.syncHeadquartersCharacteristics();

    downloadData();

    if (this.isLevelIncreased === true) {
      store.state.playerCurrentHp = store.state.playerMaxHp;

      localStorage.setItem(
        "playerCurrentHp",
        String(store.state.playerCurrentHp),
      );

      this.isLevelIncreased = false;
    }
  }

  levelUp() {
    if (store.state.playerLevel === 1) {
      localStorage.setItem("playerLevel", "1");
    }

    for (let i = 0; i < this.experienceForLevel.length - 1; i += 1) {
      if (
        store.state.playerExperience >= this.experienceForLevel[i] &&
        store.state.playerExperience < this.experienceForLevel[i + 1]
      ) {
        store.state.playerLevel = i + 2;
      }
    }

    if (store.state.playerExperience >= 32000) {
      store.state.playerLevel = 20;
    }

    if (store.state.playerLevel > Number(localStorage.getItem("playerLevel"))) {
      this.isLevelIncreased = true;
      store.state.levelIsUp = true;

      localStorage.setItem("levelIsUp", "1");
      localStorage.setItem("playerLevel", String(store.state.playerLevel));
    }
  }

  damageUp() {
    for (let i = 0; i < this.increaseDamagePerLevel.length; i += 1) {
      if (store.state.playerLevel === i + 2) {
        store.state.playerLevelCharacteristics.damage =
          this.increaseDamagePerLevel[i];

        localStorage.setItem(
          "playerLevelCharacteristics",
          JSON.stringify(store.state.playerLevelCharacteristics),
        );
      }
    }
  }

  maxHpUp() {
    for (let i = 0; i < this.increaseMaxHpPerLevel.length; i += 1) {
      if (store.state.playerLevel === i + 2) {
        store.state.playerLevelCharacteristics.hp =
          this.increaseMaxHpPerLevel[i];

        localStorage.setItem(
          "playerLevelCharacteristics",
          JSON.stringify(store.state.playerLevelCharacteristics),
        );
      }
    }
  }

  armorUp() {
    for (let i = 0; i < this.increaseArmorPerLevel.length; i += 1) {
      if (store.state.playerLevel === i + 2) {
        store.state.playerLevelCharacteristics.armor =
          this.increaseArmorPerLevel[i];

        localStorage.setItem(
          "playerLevelCharacteristics",
          JSON.stringify(store.state.playerLevelCharacteristics),
        );
      }
    }
  }

  isDead(currentHp) {
    if (currentHp > 0) {
      return;
    }

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

    /*
      Повозка лекаря — единственная постройка, которая ломается при смерти.
      Штаб, кузница, рынок и будущие здания остаются у игрока.
    */
    localStorage.removeItem("healthFountain");

    store.state.playerEquipment.weaponDurability = 0;
    store.state.playerEquipment.helmetDurability = 0;
    store.state.playerEquipment.upperDurability = 0;
    store.state.playerEquipment.lowerDurability = 0;
    store.state.playerEquipment.glovesDurability = 0;
    store.state.playerEquipment.bootsDurability = 0;

    localStorage.setItem(
      "playerEquipment",
      JSON.stringify(store.state.playerEquipment),
    );

    const savedBuildings = JSON.parse(
      localStorage.getItem("playerBuildings") || "null",
    );

    const playerBuildings = savedBuildings || {
      currentLevel0: 0,
      currentLevel1: 0,
      currentLevel2: 0,
      currentLevel3: 0,
      currentLevel4: 0,
      currentLevel5: 0,
    };

    playerBuildings.currentLevel1 = 0;

    store.state.playerBuildings = playerBuildings;

    localStorage.setItem(
      "playerBuildings",
      JSON.stringify(store.state.playerBuildings),
    );

    /*
      Штаб не ломается. Пересохраняем его реальные бонусы
      согласно сохранённому уровню currentLevel0.
    */
    camp.syncHeadquartersCharacteristics();

    downloadData();

    this.equipmentCharacteristics();

    downloadData();
  }

  decreaseDamage(armor) {
    return 100 * ((armor * 0.02) / (1 + armor * 0.02));
  }

  levelUpInfo() {
    if (store.state.playerLevel <= 20) {
      return this.infoByLevel[store.state.playerLevel];
    }

    return [];
  }

  findBonusCharacteristics(equipmentCategory, equipmentDurability) {
    const allItems = JSON.parse(JSON.stringify(items.list()));

    const bonusCharacteristics = {
      damage: 0,
      armor: 0,
      hp: 0,
      evasion: 0,
      critChance: 0,
      critPower: 0,
    };

    if (equipmentCategory <= 0) {
      return bonusCharacteristics;
    }

    const item = allItems.find((currentItem) => {
      return currentItem.id === equipmentCategory;
    });

    if (!item) {
      return bonusCharacteristics;
    }

    const canUseItem = item.requiredLevel <= store.state.playerLevel;
    const durabilityMultiplier = equipmentDurability > 0 ? 1 : 0.5;

    if (!canUseItem) {
      return bonusCharacteristics;
    }

    const characteristics = [
      "damage",
      "armor",
      "hp",
      "evasion",
      "critChance",
      "critPower",
    ];

    characteristics.forEach((characteristic) => {
      if (item[characteristic]) {
        bonusCharacteristics[characteristic] = Math.floor(
          item[characteristic] * durabilityMultiplier,
        );
      }
    });

    return bonusCharacteristics;
  }

  equipmentCharacteristics() {
    const equipment = JSON.parse(JSON.stringify(store.state.playerEquipment));

    const bonusCharacteristics = {
      damage: 0,
      armor: 0,
      hp: 0,
      evasion: 0,
      critChance: 0,
      critPower: 0,
    };

    const equipmentSlots = [
      {
        itemId: equipment.weapon,
        durability: equipment.weaponDurability,
      },
      {
        itemId: equipment.helmet,
        durability: equipment.helmetDurability,
      },
      {
        itemId: equipment.upper,
        durability: equipment.upperDurability,
      },
      {
        itemId: equipment.lower,
        durability: equipment.lowerDurability,
      },
      {
        itemId: equipment.gloves,
        durability: equipment.glovesDurability,
      },
      {
        itemId: equipment.boots,
        durability: equipment.bootsDurability,
      },
    ];

    equipmentSlots.forEach((equipmentSlot) => {
      const itemCharacteristics = this.findBonusCharacteristics(
        equipmentSlot.itemId,
        equipmentSlot.durability,
      );

      Object.keys(bonusCharacteristics).forEach((characteristic) => {
        bonusCharacteristics[characteristic] +=
          itemCharacteristics[characteristic] || 0;
      });
    });

    store.state.playerEquipmentCharacteristics = bonusCharacteristics;

    localStorage.setItem(
      "playerEquipmentCharacteristics",
      JSON.stringify(bonusCharacteristics),
    );
  }

  professionCharacteristics() {
    const professionCharacteristicsByName = {
      warrior: this.warriorProfessionCharacteristics,
      knight: this.knightProfessionCharacteristics,
      assassin: this.assassinProfessionCharacteristics,
      berserk: this.berserkProfessionCharacteristics,
      gladiator: this.gladiatorProfessionCharacteristics,
      templar: this.templarProfessionCharacteristics,
      titan: this.titanProfessionCharacteristics,
      reaper: this.reaperProfessionCharacteristics,
      pathfinder: this.pathfinderProfessionCharacteristics,
    };

    store.state.playerProfessionCharacteristics = {
      ...(professionCharacteristicsByName[store.state.playerProfession] || {
        damage: 0,
        armor: 0,
        hp: 0,
        evasion: 0,
        critChance: 0,
        critPower: 0,
      }),
    };

    localStorage.setItem(
      "playerProfessionCharacteristics",
      JSON.stringify(store.state.playerProfessionCharacteristics),
    );
  }

  buffDuration(characteristic) {
    const durationKeyByCharacteristic = {
      damage: "damageBuffDuration",
      armor: "armorBuffDuration",
      hp: "hpBuffDuration",
      evasion: "evasionBuffDuration",
      critChance: "critChanceBuffDuration",
      critPower: "critPowerBuffDuration",
      drop: "dropBuffDuration",
    };

    const durationKey = durationKeyByCharacteristic[characteristic];

    if (
      durationKey &&
      store.state.playerBuffCharacteristics[durationKey] === 0
    ) {
      store.state.playerBuffCharacteristics[characteristic] = 0;
    }

    localStorage.setItem(
      "playerBuffCharacteristics",
      JSON.stringify(store.state.playerBuffCharacteristics),
    );
  }

  createInventory() {
    const inventory = JSON.parse(JSON.stringify(store.state.playerInventory));

    for (let i = 0; i < store.state.playerInventorySize; i += 1) {
      while (inventory.length < store.state.playerInventorySize) {
        inventory.push({});
      }

      Object.assign(inventory[i], {
        cellId: i,
      });
    }

    return inventory;
  }
}

export default new Player();
