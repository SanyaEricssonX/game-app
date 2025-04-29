class camp {

  constructor() {
    this.buildings = [
      {
        id: 1060, name: "Штаб", desc: "Позволяет улучшать другие постройки, а также усиливает характеристики персонажа.", minLevel: 1, maxLevel: 3, currentLevel: 1, image: ""
      },
      {
        id: 1061, name: "Повозка целителя", desc: "Восстанавливает часть здоровья персонажа.", minLevel: 1, maxLevel: 3, currentLevel: 0, image: ""
      },
      {
        id: 1062, name: "Гильдия наемников", desc: "Позволяет нанимать наемников для рейдов в подземелья с боссами.", minLevel: 1, maxLevel: 1, currentLevel: 0, image: ""
      },
      {
        id: 1063, name: "Кузница", desc: "Позволяет чинить снаряжение за ресурсы.", minLevel: 1, maxLevel: 1, currentLevel: 0, image: ""
      },
      {
        id: 1064, name: "Хранилище", desc: "Позволяет хранить предметы, освободив место в инвентаре.", minLevel: 1, maxLevel: 2, currentLevel: 0, image: ""
      },
      {
        id: 1065, name: "Рынок", desc: "Позволяет обменивать ресурсы.", minLevel: 1, maxLevel: 1, currentLevel: 0, image: ""
      },
    ]
  }

  buildingUpgradeCost(buildingId, buildingCurrentLevel) {
    let upgradeCost = { gold: 0, wood: 0, stone: 0, iron: 0 };

    switch (buildingId) {
      case 1060: {
        if (buildingCurrentLevel == 1) {
          upgradeCost.gold = 100;
          upgradeCost.wood = 30;
          upgradeCost.stone = 50;
          upgradeCost.iron = 20;
        } else if (buildingCurrentLevel == 2) {
          upgradeCost.gold = 500;
          upgradeCost.wood = 100;
          upgradeCost.stone = 150;
          upgradeCost.iron = 40;
        }
        return upgradeCost;
      }
      case 1061: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 50;
          upgradeCost.wood = 30;
          upgradeCost.stone = 0;
          upgradeCost.iron = 10;
        } else if (buildingCurrentLevel == 1) {
          upgradeCost.gold = 250;
          upgradeCost.wood = 60;
          upgradeCost.stone = 0;
          upgradeCost.iron = 30;
        } else if (buildingCurrentLevel == 2) {
          upgradeCost.gold = 600;
          upgradeCost.wood = 100;
          upgradeCost.stone = 0;
          upgradeCost.iron = 50;
        }
        return upgradeCost;
      }
      case 1062: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 70;
          upgradeCost.wood = 25;
          upgradeCost.stone = 50;
          upgradeCost.iron = 20;
        }
        return upgradeCost;
      }
      case 1063: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 100;
          upgradeCost.wood = 20;
          upgradeCost.stone = 50;
          upgradeCost.iron = 30;
        }
        return upgradeCost;
      }
      case 1064: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 50;
          upgradeCost.wood = 50;
          upgradeCost.stone = 20;
          upgradeCost.iron = 20;
        } else if (buildingCurrentLevel == 1) {
          upgradeCost.gold = 300;
          upgradeCost.wood = 80;
          upgradeCost.stone = 50;
          upgradeCost.iron = 30;
        }
        return upgradeCost;
      }
      case 1065: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 40;
          upgradeCost.wood = 30;
          upgradeCost.stone = 30;
          upgradeCost.iron = 10;
        }
        return upgradeCost;
      }
      default:
        return upgradeCost;
    }
  }
}

export default new camp();