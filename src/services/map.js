import items from "../services/items";

class map {
  constructor() {
    this.locationList = [
      { id: 1050, name: "Приграничные угодья", minLevel: 1, maxLevel: 4, image: "location1.webp", drop: [1030, 1031, 1032, 1036, 1037, 1038, 1039, 10316, 1040, 1044, 1045] },
      { id: 1051, name: "Мертвые земли", minLevel: 5, maxLevel: 8, image: "location2.webp", drop: [1030, 1031, 1032, 1033, 1036, 1037, 1038, 1039, 10310, 10311, 10316, 1041, 1046, 1047] },
      { id: 1052, name: "Равнины древней магии", minLevel: 9, maxLevel: 12, image: "location3.webp", drop: [1030, 1031, 1032, 1033, 1034, 1036, 1037, 1038, 1039, 10312, 10313, 10314, 10315, 10316, 1042, 1048, 1049, 10410] },
      { id: 1053, name: "Туманный лес", minLevel: 13, maxLevel: 16, image: "location4.webp", drop: [1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 10312, 10315, 10316, 1043, 1048] },
      { id: 1054, name: "Заснеженный перевал", minLevel: 17, maxLevel: 20, image: "location5.webp", drop: [] },
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

    // Проверяем выпал предмет или нет
    for (let j = 0; j < dropItems.length; j++) {
      const dropItem = items.findAllCraftItems(dropItems[j]);
      if (dropItem != 0 && dropItem != undefined && dropItem.id != undefined) {
        if (Math.random() <= dropItem.dropChance / 100) {
          drop.push({ craftItemId: dropItem.id, count: 1 });
        }
      }
    }
    return drop;
  }

  findMap(mapId) {
    const allMaps = JSON.parse(JSON.stringify(this.locationList()));
    let foundMap;

    for (let i = 0; i < allMaps.length; i++) {
      if (allMaps[i].id == mapId) {
        foundMap = allMaps[i];
      }
    }
    return foundMap;
  }
}

export default new map();