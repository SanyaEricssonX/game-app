class items {
  constructor() {
    this.weaponList = [
      { id: 1000, name: "Тренировочный меч", category: "sword", damage: 10, durability: 5, requiredLevel: 1, price: 20 },
      { id: 1001, name: "Железный меч", category: "sword", damage: 20, durability: 15, requiredLevel: 3, price: 90 },
      { id: 1002, name: "Стальной зазубренный резак", category: "sword", damage: 35, durability: 40, requiredLevel: 5, price: 240 },
      { id: 1003, name: "НЕВЕРОЯТНЫХ размеров трехзвездочный ультра мега меч", category: "sword", damage: 5000, durability: 1000, requiredLevel: 3, price: 1000000 },
    ];
    this.armorList = [
      { id: 1010, name: "Тренировочный жилет", category: "upper", armor: 3, hp: 10, durability: 5, requiredLevel: 1, price: 10 },
      { id: 1011, name: "Легкие сапоги", category: "boots", armor: 2, hp: 10, durability: 5, requiredLevel: 1, price: 10 },
      { id: 1012, name: "Железная кираса", category: "upper", armor: 10, hp: 30, durability: 15, requiredLevel: 3, price: 50 },
      { id: 1013, name: "Железные сапоги", category: "boots", armor: 5, hp: 30, durability: 15, requiredLevel: 3, price: 50 },
      { id: 1014, name: "Железный шлем", category: "helmet", armor: 5, hp: 30, durability: 15, requiredLevel: 3, price: 50 },
      { id: 1015, name: "Закаленный стальной шлем", category: "helmet", armor: 7, hp: 50, durability: 40, requiredLevel: 5, price: 120 },
      { id: 1016, name: "Закаленный стальной верхний доспех", category: "upper", armor: 15, hp: 50, durability: 40, requiredLevel: 5, price: 150 },
      { id: 1017, name: "Закаленный стальной нижний доспех", category: "lower", armor: 10, hp: 50, durability: 40, requiredLevel: 5, price: 150 },
      { id: 1018, name: "Закаленные стальные перчатки", category: "gloves", armor: 7, hp: 50, durability: 40, requiredLevel: 5, price: 120 },
      { id: 1019, name: "Закаленные стальные сапоги", category: "boots", armor: 7, hp: 50, durability: 40, requiredLevel: 5, price: 120 },
    ];
    this.consumablesList = [
      { id: 1020, name: "Малый эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 30 HP", amount: 30, requiredLevel: 1, price: 15 },
      { id: 1021, name: "Малый эликсир атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 10", amount: 10, duration: 1, requiredLevel: 2, price: 15 },
      { id: 1022, name: "Малый эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 5", amount: 5, duration: 1, requiredLevel: 2, price: 15 },
      { id: 1023, name: "Малый эликсир богатства", category: "buffDrop", desc: "При использовании на 1 бой увеличивает дроп в 2 раза", amount: 2, duration: 1, requiredLevel: 2, price: 60 },
      { id: 1024, name: "Эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 70 HP", amount: 70, requiredLevel: 3, price: 30 },
      { id: 1025, name: "Средний эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 150 HP", amount: 150, requiredLevel: 5, price: 50 },
      { id: 1026, name: "Средний эликсир атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 25", amount: 25, duration: 1, requiredLevel: 5, price: 50 },
      { id: 1027, name: "Средний эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 15", amount: 15, duration: 1, requiredLevel: 5, price: 50 },
      { id: 1028, name: "НЕВЕРОЯТНЫЙ эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту, урон, дроп в 10 раз. Битву проиграть становится невозможно. А если вы и проиграете, то все равно получите весь дроп и уровень станет максимальным перманентно.", amount: 15, duration: 1, requiredLevel: 5, price: 1 },
    ];
  }

  list() {
    const itemList = this.weaponList.concat(this.armorList, this.consumablesList);

    return itemList;
  }

  findItem(itemId) {
    const allItems = JSON.parse(JSON.stringify(this.list()));
    let newItem;

    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id == itemId) {
        newItem = allItems[i];
      }
    }
    return newItem;
  }
}

export default new items();