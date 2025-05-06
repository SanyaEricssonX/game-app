import store from "../store";

class camp {

  constructor() {
    this.buildings = [
      {
        id: 1060, name: "Штаб", desc: "Увеличивает урон и крит силу персонажа.",
        upgradeDesc: ["Урон +10%. Крит сила + 20%", "Урон: 10% -> 25%. Крит сила 20% -> 40%", "Урон 25% -> 40%. Крит сила 40% -> 70%"],
        maxLevel: 3, currentLevel: 0, image: "headquartes.webp"
      },
      {
        id: 1061, name: "Повозка целителя", desc: "Восстанавливает часть здоровья персонажа. Имеет ограниченное количество зарядов, которые восстанавливаются со временем или при повышении уровня. Повозка ломается, если персонаж умирает.",
        upgradeDesc: ["Заряды: 100. Восстановление зарядов: 10 зарядов за 5 минут", "Заряды: 360. Восстановление зарядов: 15 зарядов за 5 минут", "Заряды: 1050. Восстановление зарядов: 35 зарядов за 5 минут"],
        maxLevel: 3, currentLevel: 0, image: "healers_cart.webp"
      },
      {
        id: 1062, name: "Кузница", desc: "Позволяет чинить снаряжение за ресурсы.", maxLevel: 1, currentLevel: 0, image: "forge.webp"
      },
      {
        id: 1063, name: "Рынок", desc: "Позволяет обменивать ресурсы.", maxLevel: 1, currentLevel: 0, image: "market.webp"
      },
      // {
      //   id: 1064, name: "Гильдия наемников", desc: "Позволяет нанимать наемников для рейдов в подземелья с боссами.", maxLevel: 1, currentLevel: 0, image: "mercenary_guild.webp"
      // },
      // {
      //   id: 1065, name: "Хранилище", desc: "Позволяет хранить предметы, освободив место в инвентаре.", maxLevel: 2, currentLevel: 0, image: "warehouse.webp"
      // },
    ]
  }

  buildingUpgradeCost(buildingId, buildingCurrentLevel) {
    let upgradeCost = { gold: 0, wood: 0, stone: 0, iron: 0 };

    switch (buildingId) {
      case 1060: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 30;
          upgradeCost.wood = 10;
          upgradeCost.stone = 20;
          upgradeCost.iron = 5;
        } else if (buildingCurrentLevel == 1) {
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
          upgradeCost.gold = 40;
          upgradeCost.wood = 10;
          upgradeCost.stone = 0;
          upgradeCost.iron = 2;
        } else if (buildingCurrentLevel == 1) {
          upgradeCost.gold = 120;
          upgradeCost.wood = 30;
          upgradeCost.stone = 0;
          upgradeCost.iron = 10;
        } else if (buildingCurrentLevel == 2) {
          upgradeCost.gold = 350;
          upgradeCost.wood = 100;
          upgradeCost.stone = 0;
          upgradeCost.iron = 30;
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
          upgradeCost.gold = 40;
          upgradeCost.wood = 30;
          upgradeCost.stone = 30;
          upgradeCost.iron = 10;
        }
        return upgradeCost;
      }
      case 1064: {
        if (buildingCurrentLevel == 0) {
          upgradeCost.gold = 100;
          upgradeCost.wood = 20;
          upgradeCost.stone = 50;
          upgradeCost.iron = 30;
        }
        return upgradeCost;
      }
      case 1065: {
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
      default:
        return upgradeCost;
    }
  }

  headquartesCharacteristics() {
    if (store.state.playerBuildings.currentLevel0 == 1) {
      store.state.playerHeadquartesCharacteristics.damage = 10;
      store.state.playerHeadquartesCharacteristics.critPower = 20;
      localStorage.setItem("playerHeadquartesCharacteristics", JSON.stringify(store.state.playerHeadquartesCharacteristics));
    } else if (store.state.playerBuildings.currentLevel0 == 2) {
      store.state.playerHeadquartesCharacteristics.damage = 25;
      store.state.playerHeadquartesCharacteristics.critPower = 40;
      localStorage.setItem("playerHeadquartesCharacteristics", JSON.stringify(store.state.playerHeadquartesCharacteristics));
    } else if (store.state.playerBuildings.currentLevel0 == 3) {
      store.state.playerHeadquartesCharacteristics.damage = 40;
      store.state.playerHeadquartesCharacteristics.critPower = 70;
      localStorage.setItem("playerHeadquartesCharacteristics", JSON.stringify(store.state.playerHeadquartesCharacteristics));
    }
  }
}

export default new camp();