import store from "../store";

class Camp {
  constructor() {
    this.buildings = [
      {
        id: 1060,
        name: "Штаб",
        desc: "Увеличивает урон и критическую силу персонажа.",
        upgradeDesc: [
          "Урон +10%. Критическая сила +20%.",
          "Урон: +10% → +25%. Критическая сила: +20% → +40%.",
          "Урон: +25% → +40%. Критическая сила: +40% → +70%.",
        ],
        maxLevel: 3,
        currentLevel: 0,
        image: "headquartes.webp",
      },
      {
        id: 1061,
        name: "Повозка целителя",
        desc: "Восстанавливает часть здоровья персонажа. Имеет ограниченное количество зарядов, которые восстанавливаются со временем или при повышении уровня. Повозка ломается, если персонаж умирает.",
        upgradeDesc: [
          "Заряды: 100. Восстановление зарядов: 10 зарядов за 5 минут.",
          "Заряды: 360. Восстановление зарядов: 15 зарядов за 5 минут.",
          "Заряды: 1050. Восстановление зарядов: 35 зарядов за 5 минут.",
        ],
        maxLevel: 3,
        currentLevel: 0,
        image: "healers_cart.webp",
      },
      {
        id: 1062,
        name: "Кузница",
        desc: "Позволяет чинить снаряжение за ресурсы.",
        maxLevel: 1,
        currentLevel: 0,
        image: "forge.webp",
      },
      {
        id: 1063,
        name: "Рынок",
        desc: "Позволяет обменивать ресурсы.",
        maxLevel: 1,
        currentLevel: 0,
        image: "market.webp",
      },
    ];

    this.headquartersBonuses = {
      0: {
        damage: 0,
        critPower: 0,
      },
      1: {
        damage: 10,
        critPower: 20,
      },
      2: {
        damage: 25,
        critPower: 40,
      },
      3: {
        damage: 40,
        critPower: 70,
      },
    };
  }

  buildingUpgradeCost(buildingId, buildingCurrentLevel) {
    let upgradeCost = {
      gold: 0,
      wood: 0,
      stone: 0,
      iron: 0,
    };

    switch (buildingId) {
      case 1060:
        if (buildingCurrentLevel === 0) {
          upgradeCost = {
            gold: 30,
            wood: 10,
            stone: 20,
            iron: 5,
          };
        } else if (buildingCurrentLevel === 1) {
          upgradeCost = {
            gold: 100,
            wood: 30,
            stone: 50,
            iron: 20,
          };
        } else if (buildingCurrentLevel === 2) {
          upgradeCost = {
            gold: 500,
            wood: 100,
            stone: 150,
            iron: 40,
          };
        }
        break;

      case 1061:
        if (buildingCurrentLevel === 0) {
          upgradeCost = {
            gold: 40,
            wood: 10,
            stone: 0,
            iron: 2,
          };
        } else if (buildingCurrentLevel === 1) {
          upgradeCost = {
            gold: 120,
            wood: 30,
            stone: 0,
            iron: 10,
          };
        } else if (buildingCurrentLevel === 2) {
          upgradeCost = {
            gold: 350,
            wood: 100,
            stone: 0,
            iron: 30,
          };
        }
        break;

      case 1062:
        if (buildingCurrentLevel === 0) {
          upgradeCost = {
            gold: 70,
            wood: 25,
            stone: 50,
            iron: 20,
          };
        }
        break;

      case 1063:
        if (buildingCurrentLevel === 0) {
          upgradeCost = {
            gold: 40,
            wood: 30,
            stone: 30,
            iron: 10,
          };
        }
        break;

      case 1064:
        if (buildingCurrentLevel === 0) {
          upgradeCost = {
            gold: 100,
            wood: 20,
            stone: 50,
            iron: 30,
          };
        }
        break;

      case 1065:
        if (buildingCurrentLevel === 0) {
          upgradeCost = {
            gold: 50,
            wood: 50,
            stone: 20,
            iron: 20,
          };
        } else if (buildingCurrentLevel === 1) {
          upgradeCost = {
            gold: 300,
            wood: 80,
            stone: 50,
            iron: 30,
          };
        }
        break;

      default:
        break;
    }

    return upgradeCost;
  }

  getHeadquartersLevel() {
    const savedBuildings = JSON.parse(
      localStorage.getItem("playerBuildings") || "null",
    );

    const buildings = savedBuildings || store.state.playerBuildings;

    return Math.min(3, Math.max(0, Number(buildings?.currentLevel0 || 0)));
  }

  getHeadquartersCharacteristics() {
    const headquartersLevel = this.getHeadquartersLevel();

    return {
      ...this.headquartersBonuses[headquartersLevel],
    };
  }

  headquartesCharacteristics() {
    const bonuses = this.getHeadquartersCharacteristics();

    store.state.playerHeadquartesCharacteristics = {
      damage: bonuses.damage,
      critPower: bonuses.critPower,
    };

    localStorage.setItem(
      "playerHeadquartesCharacteristics",
      JSON.stringify(store.state.playerHeadquartesCharacteristics),
    );

    return bonuses;
  }

  syncHeadquartersCharacteristics() {
    return this.headquartesCharacteristics();
  }
}

export default new Camp();
