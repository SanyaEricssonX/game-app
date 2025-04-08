import items from "../services/items";

class map {
  constructor() {
    this.locationList = [
      { id: 1050, name: "Приграничные угодья", minLevel: 1, maxLevel: 4, drop: [1030, 1031, 1032, 1036, 1037, 1038, 1039, 1040, 1044, 1045] },
      { id: 1051, name: "Мертвые земли", minLevel: 5, maxLevel: 8, drop: [1030, 1031, 1032, 1033, 1036, 1037, 1038, 1039, 10310, 10311, 1041, 1046, 1047] },
      { id: 1052, name: "Равнины древней магии", minLevel: 9, maxLevel: 12, drop: [1030, 1031, 1032, 1033, 1034, 1036, 1037, 1038, 1039, 1042] },
      { id: 1053, name: "Туманный лес", minLevel: 13, maxLevel: 16, drop: [1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1043] },
      { id: 1054, name: "Заснеженный перевал", minLevel: 17, maxLevel: 20, drop: [] },
    ];
  }

  drop(locationId) {
    let dropItems = [];
    let drop = [];

    for (let i = 0; i < this.locationList.length; i++) {
      if (this.locationList[i].id == locationId) {
        dropItems = this.locationList[i].drop;
      }
    }

    for (let i = 0; i < dropItems.length; i++) {
      let item = items.findAllCraftItems(dropItems[i])
      if (dropItems[i] == item.id) {
        // Проверяем выпал предмет или нет
        if (Math.random() <= item.dropChance / 100) {
          drop.push({ craftItemId: item.id, count: 1 });
        }
      }
    }

    return drop;
  }
}

export default new map();