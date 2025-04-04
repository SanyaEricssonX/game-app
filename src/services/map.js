class map {
  constructor() {
    this.locationList = [
      { id: 1030, name: "Приграничные угодья", minLevel: 1, maxLevel: 4, drop: {} },
      { id: 1031, name: "Мертвые земли", minLevel: 5, maxLevel: 8, drop: {} },
      { id: 1032, name: "Равнины древней магии", minLevel: 9, maxLevel: 12, drop: {} },
      { id: 1033, name: "Туманный лес", minLevel: 13, maxLevel: 16, drop: {} },
      { id: 1034, name: "Заснеженный перевал", minLevel: 17, maxLevel: 20, drop: {} },
    ];
  }

  // list() {
  //   const itemList = this.weaponList.concat(this.armorList, this.consumablesList);

  //   return itemList;
  // }
}

export default new map();