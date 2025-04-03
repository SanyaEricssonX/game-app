class items {
  constructor() {
    this.weaponList = [
      { id: 1000, name: "Железный меч", category: "sword", damage: 10, durability: 10, requiredLevel: 1, price: 50, image: "iron_sword.webp" },
      { id: 1001, name: "Стальной меч", category: "sword", damage: 35, durability: 25, requiredLevel: 4, price: 240, image: "steel_sword.webp" },
      { id: 1002, name: "Стальной кинжал", category: "dagger", damage: 25, critChance: 10, critPower: 15, durability: 25, requiredLevel: 4, price: 240 },
      { id: 1003, name: "Закаленный зазубренный меч", category: "sword", damage: 60, critChance: 5, critPower: 15, durability: 40, requiredLevel: 9, price: 650 },
      { id: 1004, name: "Закаленный легкий кинжал", category: "dagger", damage: 50, critChance: 15, critPower: 30, durability: 40, requiredLevel: 9, price: 650 },
      { id: 1005, name: "Пламенный клинок войны", category: "sword", damage: 100, critChance: 10, critPower: 20, durability: 40, requiredLevel: 13, price: 1020 },
      { id: 1006, name: "Ледяной кинжал войны", category: "dagger", damage: 80, critChance: 20, critPower: 40, durability: 40, requiredLevel: 13, price: 1020 },
      { id: 1007, name: "ТЕСТОВЫЙ обезоруживатель", category: "sword", damage: 100, armor: 100, hp: 1000, evasion: 10, critChance: 100, critPower: 200, durability: 100, requiredLevel: 1, price: 1 },
      { id: 1008, name: "НЕВЕРОЯТНЫХ размеров трехзвездочный ультра мега меч", category: "sword", damage: 5000, durability: 1000, requiredLevel: 3, price: 1000000 },
    ];
    this.armorList = [
      { id: 1010, name: "Железный шлем", category: "helmet", secondCategory: "heavy", armor: 3, hp: 15, durability: 10, requiredLevel: 1, price: 45 },
      { id: 1011, name: "Железная кираса", category: "upper", secondCategory: "heavy", armor: 6, hp: 15, durability: 10, requiredLevel: 1, price: 60 },
      { id: 1012, name: "Железные сапоги", category: "boots", secondCategory: "heavy", armor: 3, hp: 15, durability: 10, requiredLevel: 1, price: 45 },
      { id: 1013, name: "Стальной шлем", category: "helmet", secondCategory: "heavy", armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120 },
      { id: 1014, name: "Стальная кираса", category: "upper", secondCategory: "heavy", armor: 15, hp: 50, durability: 25, requiredLevel: 4, price: 150 },
      { id: 1015, name: "Стальные набедренники", category: "lower", secondCategory: "heavy", armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120 },
      { id: 1016, name: "Стальные перчатки", category: "gloves", secondCategory: "heavy", armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120 },
      { id: 1017, name: "Стальные сапоги", category: "boots", secondCategory: "heavy", armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120 },
      { id: 1018, name: "Кожаный легий шлем", category: "helmet", secondCategory: "light", armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120 },
      { id: 1019, name: "Кожаный легкий жилет", category: "upper", secondCategory: "light", armor: 10, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 150 },
      { id: 10110, name: "Кожаные легкие штаны", category: "lower", secondCategory: "light", armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120 },
      { id: 10111, name: "Кожаные легкие перчатки", category: "gloves", secondCategory: "light", armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120 },
      { id: 10112, name: "Кожаные легкие сапоги", category: "boots", secondCategory: "light", armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120 },
      { id: 10113, name: "Тяжелый шлем бессмертия", category: "helmet", secondCategory: "heavy", armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10114, name: "Тяжелая кираса бессмертия", category: "upper", secondCategory: "heavy", armor: 25, hp: 80, durability: 40, requiredLevel: 13, price: 300 },
      { id: 10115, name: "Тяжелые набедренники бессмертия", category: "lower", secondCategory: "heavy", armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10116, name: "Тяжелые перчатки бессмертия", category: "gloves", secondCategory: "heavy", armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10117, name: "Тяжелые сапоги бессмертия", category: "boots", secondCategory: "heavy", armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10118, name: "Легкий шлем равновесия", category: "helmet", secondCategory: "light", armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10119, name: "Легкая кираса равновесия", category: "upper", secondCategory: "light", armor: 13, hp: 50, evasion: 10, durability: 40, requiredLevel: 13, price: 300 },
      { id: 10120, name: "Легкие набедренники равновесия", category: "lower", secondCategory: "light", armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10121, name: "Легкие перчатки равновесия", category: "gloves", secondCategory: "light", armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10122, name: "Легкие сапоги равновесия", category: "boots", secondCategory: "light", armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260 },
      { id: 10123, name: "Cверхпрочные ультра сапоги высшего порядка", category: "boots", secondCategory: "heavy", damage: 50, armor: 100, hp: 1000, evasion: 50, critChance: 100, critPower: 250, durability: 100, requiredLevel: 1, price: 1 },
    ];
    this.consumablesList = [
      { id: 1020, name: "Малый эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 30 HP", amount: 30, requiredLevel: 1, price: 15 },
      { id: 1021, name: "Малый эликсир атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 10", amount: 10, duration: 1, requiredLevel: 2, price: 15 },
      { id: 1022, name: "Малый эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 5", amount: 5, duration: 1, requiredLevel: 2, price: 15 },
      { id: 1023, name: "Малый эликсир богатства", category: "buffDrop", desc: "При использовании на 1 бой увеличивает дроп в 2 раза", amount: 2, duration: 1, requiredLevel: 2, price: 50 },
      { id: 1024, name: "Эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 70 HP", amount: 70, requiredLevel: 3, price: 30 },
      { id: 1025, name: "Средний эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 150 HP", amount: 150, requiredLevel: 5, price: 50 },
      { id: 1026, name: "Средний эликсир атаки", category: "buffDamage", desc: "При использовании на 2 боя увеличивает урон на 20", amount: 20, duration: 2, requiredLevel: 5, price: 50 },
      { id: 1027, name: "Средний эликсир брони", category: "buffArmor", desc: "При использовании на 2 боя увеличивает защиту на 15", amount: 15, duration: 2, requiredLevel: 5, price: 50 },
      { id: 1028, name: "Большой эликсир атаки", category: "buffDamage", desc: "При использовании на 3 боя увеличивает урон на 30", amount: 30, duration: 3, requiredLevel: 10, price: 100 },
      { id: 1029, name: "Большой эликсир брони", category: "buffArmor", desc: "При использовании на 3 боя увеличивает защиту на 25", amount: 25, duration: 3, requiredLevel: 10, price: 100 },
      { id: 10210, name: "Малый эликсир проворности", category: "buffEvasion", desc: "При использовании на 1 бой увеличивает уклонение на 10", amount: 10, duration: 1, requiredLevel: 10, price: 100 },
      { id: 10211, name: "Малый эликсир кровожадности", category: "buffCritPower", desc: "При использовании на 1 бой увеличивает силу крита на 25", amount: 25, duration: 1, requiredLevel: 10, price: 100 },
      { id: 10212, name: "НЕВЕРОЯТНЫЙ эликсир безумия", category: "buffDamage", desc: "При использовании на 21 бой увеличивает урон на 150", amount: 150, duration: 21, requiredLevel: 1, price: 1 },
      { id: 10213, name: "НЕВЕРОЯТНЫЙ эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 3000 HP", amount: 3000, requiredLevel: 1, price: 1 },
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