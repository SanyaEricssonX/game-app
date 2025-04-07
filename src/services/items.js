class items {
  constructor() {
    this.weaponList = [
      { id: 1000, name: "Железный меч", category: "sword", damage: 10, durability: 10, requiredLevel: 1, price: 50, image: "iron_sword.webp" },
      { id: 1001, name: "Стальной меч", category: "sword", damage: 35, durability: 25, requiredLevel: 4, price: 240, image: "steel_sword.webp" },
      {
        id: 1002, name: "Стальной кинжал", category: "dagger", damage: 25, critChance: 10, critPower: 15,
        durability: 25, requiredLevel: 4, price: 240, image: "steel_dagger.webp"
      },
      {
        id: 1003, name: "Закаленный зазубренный меч", category: "sword", damage: 60, critChance: 5, critPower: 15,
        durability: 40, requiredLevel: 9, price: 650, image: "tempered_serrated_sword.webp"
      },
      {
        id: 1004, name: "Закаленный легкий нож", category: "dagger", damage: 50, critChance: 15, critPower: 30,
        durability: 40, requiredLevel: 9, price: 650, image: "tempered_light_knife.webp"
      },
      {
        id: 1005, name: "Пламенный клинок войны", category: "sword", damage: 100, critChance: 10, critPower: 20,
        durability: 40, requiredLevel: 13, price: 1020, image: "flaming_blade_of_war.webp"
      },
      {
        id: 1006, name: "Ледяной кинжал войны", category: "dagger", damage: 80, critChance: 20, critPower: 40,
        durability: 40, requiredLevel: 13, price: 1020, image: "ice_dagger_of_war.webp"
      },
      {
        id: 1007, name: "Меч благих намерений", category: "sword", type: "craft", damage: 25,
        durability: 20, requiredLevel: 1, price: 60, image: ""
      },
      {
        id: 1008, name: "Ритуальный кинжал", category: "dagger", type: "craft", damage: 18, critChance: 5, critPower: 10,
        durability: 20, requiredLevel: 1, price: 60, image: ""
      },
      {
        id: 1009, name: "Темный легион", category: "sword", type: "craft", damage: 50, critChance: 5, critPower: 15,
        durability: 40, requiredLevel: 4, price: 210, image: ""
      },
      {
        id: 10010, name: "Последний вздох", category: "dagger", type: "craft", damage: 40, critChance: 10, critPower: 25,
        durability: 40, requiredLevel: 4, price: 210, image: ""
      },
      {
        id: 10011, name: "ТЕСТОВЫЙ обезоруживатель", category: "sword", type: "test", damage: 100, armor: 100, hp: 1000, evasion: 10, critChance: 100, critPower: 200,
        durability: 100, requiredLevel: 1, price: 1, image: "test_item.webp"
      },
      {
        id: 10012, name: "НЕВЕРОЯТНЫХ размеров трехзвездочный ультра мега меч", category: "sword", type: "test", damage: 5000,
        durability: 1000, requiredLevel: 3, price: 1000000, image: "test_item.webp"
      },
    ];

    this.armorList = [
      {
        id: 1010, name: "Железный шлем", category: "helmet", secondCategory: "heavy",
        armor: 3, hp: 15, durability: 10, requiredLevel: 1, price: 45, image: "iron_helmet.webp"
      },
      {
        id: 1011, name: "Железная кираса", category: "upper", secondCategory: "heavy",
        armor: 6, hp: 15, durability: 10, requiredLevel: 1, price: 60, image: "iron_cuirass.webp"
      },
      {
        id: 1012, name: "Железные сапоги", category: "boots", secondCategory: "heavy",
        armor: 3, hp: 15, durability: 10, requiredLevel: 1, price: 45, image: "iron_boots.webp"
      },
      {
        id: 1013, name: "Стальной шлем", category: "helmet", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120, image: "steel_helmet.webp"
      },
      {
        id: 1014, name: "Стальная кираса", category: "upper", secondCategory: "heavy",
        armor: 15, hp: 50, durability: 25, requiredLevel: 4, price: 150, image: "steel_cuirass.webp"
      },
      {
        id: 1015, name: "Стальные набедренники", category: "lower", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120, image: "steel_pants.webp"
      },
      {
        id: 1016, name: "Стальные перчатки", category: "gloves", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120, image: "steel_gloves.webp"
      },
      {
        id: 1017, name: "Стальные сапоги", category: "boots", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 120, image: "steel_boots.webp"
      },
      {
        id: 1018, name: "Кожаный легий шлем", category: "helmet", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120, image: "leather_light_helmet.webp"
      },
      {
        id: 1019, name: "Кожаный легкий жилет", category: "upper", secondCategory: "light",
        armor: 10, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 150, image: "leather_light_vest.webp"
      },
      {
        id: 10110, name: "Кожаные легкие штаны", category: "lower", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120, image: "leather_light_pants.webp"
      },
      {
        id: 10111, name: "Кожаные легкие перчатки", category: "gloves", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120, image: "leather_light_gloves.webp"
      },
      {
        id: 10112, name: "Кожаные легкие сапоги", category: "boots", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 120, image: "leather_light_boots.webp"
      },
      {
        id: 10113, name: "Тяжелый шлем бессмертия", category: "helmet", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260, image: "heavy_helmet_of_immortality.webp"
      },
      {
        id: 10114, name: "Тяжелая кираса бессмертия", category: "upper", secondCategory: "heavy",
        armor: 25, hp: 80, durability: 40, requiredLevel: 13, price: 300, image: "heavy_cuirass_of_immortality.webp"
      },
      {
        id: 10115, name: "Тяжелые набедренники бессмертия", category: "lower", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260, image: "heavy_pants_of_immortality.webp"
      },
      {
        id: 10116, name: "Тяжелые перчатки бессмертия", category: "gloves", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260, image: "heavy_gloves_of_immortality.webp"
      },
      {
        id: 10117, name: "Тяжелые сапоги бессмертия", category: "boots", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 260, image: "heavy_boots_of_immortality.webp"
      },
      {
        id: 10118, name: "Легкий шлем равновесия", category: "helmet", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260, image: "light_helmet_of_balance.webp"
      },
      {
        id: 10119, name: "Легкая кираса равновесия", category: "upper", secondCategory: "light",
        armor: 13, hp: 50, evasion: 10, durability: 40, requiredLevel: 13, price: 300, image: "light_cuirass_of_balance.webp"
      },
      {
        id: 10120, name: "Легкие набедренники равновесия", category: "lower", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260, image: "light_pants_of_balance.webp"
      },
      {
        id: 10121, name: "Легкие перчатки равновесия", category: "gloves", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260, image: "light_gloves_of_balance.webp"
      },
      {
        id: 10122, name: "Легкие сапоги равновесия", category: "boots", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 260, image: "light_boots_of_balance.webp"
      },
      {
        id: 10123, name: "Cверхпрочные ультра сапоги высшего порядка", category: "boots", secondCategory: "heavy", type: "test",
        damage: 50, armor: 100, hp: 1000, evasion: 50, critChance: 100, critPower: 250, durability: 100, requiredLevel: 1, price: 1, image: "test_item.webp"
      },
    ];

    this.consumablesList = [
      {
        id: 1020, name: "Малый эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 30 HP",
        amount: 30, requiredLevel: 1, price: 15, image: "elixir_of_health.webp"
      },
      {
        id: 1021, name: "Малый эликсир атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 10",
        amount: 10, duration: 1, requiredLevel: 2, price: 15, image: "elixir_of_damage.webp"
      },
      {
        id: 1022, name: "Малый эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 5",
        amount: 5, duration: 1, requiredLevel: 2, price: 15, image: "elixir_of_armor.webp"
      },
      {
        id: 1023, name: "Малый эликсир богатства", category: "buffDrop", desc: "При использовании на 1 бой увеличивает дроп в 2 раза",
        amount: 2, duration: 1, requiredLevel: 2, price: 50, image: "elixir_of_wealth.webp"
      },
      {
        id: 1024, name: "Эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 70 HP",
        amount: 70, requiredLevel: 3, price: 30, image: "elixir_of_health.webp"
      },
      {
        id: 1025, name: "Средний эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 150 HP",
        amount: 150, requiredLevel: 5, price: 50, image: "elixir_of_health.webp"
      },
      {
        id: 1026, name: "Средний эликсир атаки", category: "buffDamage", desc: "При использовании на 2 боя увеличивает урон на 20",
        amount: 20, duration: 2, requiredLevel: 5, price: 50, image: "elixir_of_damage.webp"
      },
      {
        id: 1027, name: "Средний эликсир брони", category: "buffArmor", desc: "При использовании на 2 боя увеличивает защиту на 15",
        amount: 15, duration: 2, requiredLevel: 5, price: 50, image: "elixir_of_armor.webp"
      },
      {
        id: 1028, name: "Большой эликсир атаки", category: "buffDamage", desc: "При использовании на 3 боя увеличивает урон на 30",
        amount: 30, duration: 3, requiredLevel: 10, price: 100, image: "elixir_of_damage.webp"
      },
      {
        id: 1029, name: "Большой эликсир брони", category: "buffArmor", desc: "При использовании на 3 боя увеличивает защиту на 25",
        amount: 25, duration: 3, requiredLevel: 10, price: 100, image: "elixir_of_armor.webp"
      },
      {
        id: 10210, name: "Малый эликсир проворности", category: "buffEvasion", desc: "При использовании на 1 бой увеличивает уклонение на 10",
        amount: 10, duration: 1, requiredLevel: 10, price: 100, image: "elixir_of_agility.webp"
      },
      {
        id: 10211, name: "Малый эликсир кровожадности", category: "buffCritPower", desc: "При использовании на 1 бой увеличивает силу крита на 25",
        amount: 25, duration: 1, requiredLevel: 10, price: 100, image: "elixir_of_bloodlust.webp"
      },
      {
        id: 10212, name: "Синтезированный эликсир здоровья I", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 50 HP",
        amount: 50, requiredLevel: 1, price: 15, image: "elixir_of_health.webp"
      },
      {
        id: 10213, name: "Синтезированный эликсир здоровья II", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 120 HP",
        amount: 120, requiredLevel: 1, price: 60, image: "elixir_of_health.webp"
      },
      {
        id: 10214, name: "Синтезированный эликсир здоровья III", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 250 HP",
        amount: 250, requiredLevel: 1, price: 120, image: "elixir_of_health.webp"
      },
      {
        id: 10215, name: "Синтезированный эликсир здоровья IV", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 500 HP",
        amount: 500, requiredLevel: 1, price: 210, image: "elixir_of_health.webp"
      },
      {
        id: 10216, name: "НЕВЕРОЯТНЫЙ эликсир здоровья", category: "restoreHp", type: "test", desc: "При использовании восстанавливает 3000 HP",
        amount: 3000, requiredLevel: 1, price: 1, image: "elixir_of_health.webp"
      },

    ];
    this.craftIngredientList = [
      { id: 1030, name: "Стеклянная колба", dropChance: 15 },
      { id: 1031, name: "Кровь монстра", dropChance: 25 },
      { id: 1032, name: "Магическая эссенция I", dropChance: 10 },
      { id: 1033, name: "Магическая эссенция II", dropChance: 10 },
      { id: 1034, name: "Магическая эссенция III", dropChance: 10 },
      { id: 1035, name: "Магическая эссенция IV", dropChance: 10 },
      { id: 1036, name: "Сломанная рукоять", dropChance: 20 },
      { id: 1037, name: "Лезвие меча", dropChance: 5 },
      { id: 1038, name: "Лезвие кинжала", dropChance: 5 },
      { id: 1039, name: "Кристаллическая пыль", dropChance: 30 },
      { id: 10310, name: "Гарда темного легиона", dropChance: 1 },
      { id: 10311, name: "Гарда последнего вздоха", dropChance: 1 },
    ];
    this.recipeList = [
      {
        id: 1040, name: "Рецепт: Синтезированный эликсир здоровья I", category: "elixir", dropChance: 5, itemId: 10212, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 3 }, { material: 1032, count: 1 }]
      },
      {
        id: 1041, name: "Рецепт: Синтезированный эликсир здоровья II", category: "elixir", dropChance: 5, itemId: 10213, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 5 }, { material: 1033, count: 2 }]
      },
      {
        id: 1042, name: "Рецепт: Синтезированный эликсир здоровья III", category: "elixir", dropChance: 5, itemId: 10214, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 7 }, { material: 1034, count: 2 }]
      },
      {
        id: 1043, name: "Рецепт: Синтезированный эликсир здоровья IV", category: "elixir", dropChance: 5, itemId: 10215, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 10 }, { material: 1035, count: 2 }]
      },
      {
        id: 1044, name: "Рецепт: Меч благих намерений", category: "weapon", dropChance: 5, itemId: 1007, requiredLevel: 1,
        ingredients: [{ material: 1036, count: 3 }, { material: 1037, count: 1 }, { material: 1039, count: 10 }], resources: { wood: 5, iron: 10 }
      },
      {
        id: 1045, name: "Рецепт: Ритуальный кинжал", category: "weapon", dropChance: 5, itemId: 1008, requiredLevel: 1,
        ingredients: [{ material: 1036, count: 3 }, { material: 1038, count: 1 }, { material: 1039, count: 10 }], resources: { wood: 5, iron: 10 }
      },
      {
        id: 1046, name: "Рецепт: Темный легион", category: "weapon", dropChance: 5, itemId: 1009, requiredLevel: 4,
        ingredients: [{ material: 1036, count: 10 }, { material: 1037, count: 3 }, { material: 1039, count: 15 }, { material: 10310, count: 1 }], resources: { wood: 15, iron: 30 }
      },
      {
        id: 1047, name: "Рецепт: Последний вздох", category: "weapon", dropChance: 5, itemId: 10010, requiredLevel: 4,
        ingredients: [{ material: 1036, count: 10 }, { material: 1038, count: 3 }, { material: 1039, count: 15 }, { material: 10311, count: 1 }], resources: { wood: 15, iron: 30 }
      },
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