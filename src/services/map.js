class items {
  constructor() {
    this.locationList = [
      { id: 0, name: "Приграничные угодья", minLevel: 1, maxLevel: 4, drop: [] },
    ];
  }

  // list() {
  //   const itemList = this.weaponList.concat(this.armorList, this.consumablesList);

  //   return itemList;
  // }
}

export default new items();