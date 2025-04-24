class items {
  constructor() {
    this.weaponList = [
      {
        id: 1000, name: "Железный Меч", category: "sword", damage: 10,
        durability: 10, requiredLevel: 1, price: 50, image: "iron_sword.webp"
      },
      {
        id: 1001, name: "Стальной Меч", category: "sword", damage: 35,
        durability: 25, requiredLevel: 4, price: 240, image: "steel_sword.webp"
      },
      {
        id: 1002, name: "Стальной Кинжал", category: "dagger", damage: 25, critChance: 10, critPower: 15,
        durability: 25, requiredLevel: 4, price: 240, image: "steel_dagger.webp"
      },
      {
        id: 1003, name: "Закаленный Зазубренный Меч", category: "sword", damage: 60, critChance: 5, critPower: 15,
        durability: 40, requiredLevel: 9, price: 650, image: "tempered_serrated_sword.webp"
      },
      {
        id: 1004, name: "Закаленный Легкий Нож", category: "dagger", damage: 50, critChance: 15, critPower: 30,
        durability: 40, requiredLevel: 9, price: 650, image: "tempered_light_knife.webp"
      },
      {
        id: 1005, name: "Усиленный Меч Превосходства", category: "sword", damage: 100, critChance: 10, critPower: 20,
        durability: 40, requiredLevel: 13, price: 1020, image: "enhanced_sword_of_excellence.webp"
      },
      {
        id: 1006, name: "Заточенный Нож Убийцы", category: "dagger", damage: 85, critChance: 20, critPower: 40,
        durability: 40, requiredLevel: 13, price: 1020, image: "killers_sharpened_knife.webp"
      },
      {
        id: 1007, name: "Меч Благих Намерений", category: "sword", type: "craft", damage: 25,
        durability: 20, requiredLevel: 1, price: 60, image: "sword_of_good_intentions.webp",
      },
      {
        id: 1008, name: "Ритуальный Кинжал", category: "dagger", type: "craft", damage: 18, critChance: 5, critPower: 10,
        durability: 20, requiredLevel: 1, price: 60, image: "ritual_dagger.webp"
      },
      {
        id: 1009, name: "Темный Легион", category: "sword", type: "craft", damage: 50, critChance: 5, critPower: 15,
        durability: 40, requiredLevel: 4, price: 210, image: "dark_legion.webp"
      },
      {
        id: 10010, name: "Последний Вздох", category: "dagger", type: "craft", damage: 40, critChance: 10, critPower: 25,
        durability: 40, requiredLevel: 4, price: 210, image: "last_breath.webp"
      },
      {
        id: 10011, name: "Вершитель Судеб", category: "sword", type: "craft", damage: 80, critChance: 5, critPower: 30,
        durability: 50, requiredLevel: 9, price: 300, image: "arbiter_of_fates.webp"
      },
      {
        id: 10012, name: "Душегуб", category: "dagger", type: "craft", damage: 60, critChance: 15, critPower: 40,
        durability: 50, requiredLevel: 9, price: 300, image: "murderer.webp"
      },
      {
        id: 10013, name: "Железный Кинжал", category: "dagger", damage: 8, critChance: 5, critPower: 10,
        durability: 10, requiredLevel: 1, price: 50, image: "iron_dagger.webp"
      },
      {
        id: 10014, name: "Пламенный Клинок Войны", category: "sword", damage: 150, critChance: 10, critPower: 20,
        durability: 50, requiredLevel: 17, price: 1890, image: "flaming_blade_of_war.webp"
      },
      {
        id: 10015, name: "Ледяной Кинжал Войны", category: "dagger", damage: 130, critChance: 20, critPower: 60,
        durability: 50, requiredLevel: 17, price: 1890, image: "ice_dagger_of_war.webp"
      },
      {
        id: 10016, name: "Элизиум", category: "sword", type: "craft", damage: 120, critChance: 10, critPower: 30,
        durability: 50, requiredLevel: 13, price: 1020, image: "elysium.webp"
      },
      {
        id: 10017, name: "Тень Рока", category: "dagger", type: "craft", damage: 100, critChance: 20, critPower: 50,
        durability: 50, requiredLevel: 13, price: 1020, image: "shadow_of_doom.webp"
      },
      {
        id: 10018, name: "Гнев Небес", category: "sword", type: "craft", damage: 180, critChance: 10, critPower: 30,
        durability: 60, requiredLevel: 17, price: 1890, image: "wrath_of_heaven.webp"
      },
      {
        id: 10019, name: "Коготь Криофеникса", category: "dagger", type: "craft", damage: 160, critChance: 20, critPower: 70,
        durability: 60, requiredLevel: 17, price: 1890, image: "cryophoenix_claw.webp"
      },
      {
        id: 10020, name: "Последний Аргумент Королей", category: "sword", type: "craft", damage: 250, critChance: 15, critPower: 50,
        durability: 80, requiredLevel: 20, price: 3000, image: "last_argument_of_kings.webp"
      },
      {
        id: 10021, name: "Порыв Смерти", category: "dagger", type: "craft", damage: 220, critChance: 25, critPower: 100,
        durability: 80, requiredLevel: 20, price: 3000, image: "death_gust.webp"
      },
      {
        id: 10022, name: "ТЕСТОВЫЙ Обезоруживатель", category: "sword", type: "test", damage: 100, armor: 100, hp: 1000, evasion: 10, critChance: 100, critPower: 200,
        durability: 100, requiredLevel: 1, price: 10000000, image: "test_item.webp"
      },
      {
        id: 10023, name: "НЕВЕРОЯТНЫХ Размеров Меч", category: "sword", type: "test", damage: 5000,
        durability: 1000, requiredLevel: 3, price: 10000000, image: "test_item.webp"
      },
    ];

    this.armorList = [
      {
        id: 1010, name: "Железный Шлем", category: "helmet", secondCategory: "heavy",
        armor: 3, hp: 15, durability: 10, requiredLevel: 1, price: 30, image: "iron_helmet.webp"
      },
      {
        id: 1011, name: "Железная Кираса", category: "upper", secondCategory: "heavy",
        armor: 6, hp: 15, durability: 10, requiredLevel: 1, price: 40, image: "iron_cuirass.webp"
      },
      {
        id: 1012, name: "Железные Сапоги", category: "boots", secondCategory: "heavy",
        armor: 3, hp: 15, durability: 10, requiredLevel: 1, price: 30, image: "iron_boots.webp"
      },
      {
        id: 1013, name: "Стальной Шлем", category: "helmet", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 80, image: "steel_helmet.webp"
      },
      {
        id: 1014, name: "Стальная Кираса", category: "upper", secondCategory: "heavy",
        armor: 15, hp: 50, durability: 25, requiredLevel: 4, price: 100, image: "steel_cuirass.webp"
      },
      {
        id: 1015, name: "Стальные Набедренники", category: "lower", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 80, image: "steel_pants.webp"
      },
      {
        id: 1016, name: "Стальные Перчатки", category: "gloves", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 80, image: "steel_gloves.webp"
      },
      {
        id: 1017, name: "Стальные Сапоги", category: "boots", secondCategory: "heavy",
        armor: 10, hp: 50, durability: 25, requiredLevel: 4, price: 80, image: "steel_boots.webp"
      },
      {
        id: 1018, name: "Кожаный Легкий Шлем", category: "helmet", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 80, image: "leather_light_helmet.webp"
      },
      {
        id: 1019, name: "Кожаный Легкий Жилет", category: "upper", secondCategory: "light",
        armor: 10, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 100, image: "leather_light_vest.webp"
      },
      {
        id: 10110, name: "Кожаные Легкие Штаны", category: "lower", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 80, image: "leather_light_pants.webp"
      },
      {
        id: 10111, name: "Кожаные Легкие Перчатки", category: "gloves", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 80, image: "leather_light_gloves.webp"
      },
      {
        id: 10112, name: "Кожаные Легкие Сапоги", category: "boots", secondCategory: "light",
        armor: 5, hp: 30, evasion: 5, durability: 25, requiredLevel: 4, price: 80, image: "leather_light_boots.webp"
      },
      {
        id: 10113, name: "Тяжелый Шлем Бессмертия", category: "helmet", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 200, image: "heavy_helmet_of_immortality.webp"
      },
      {
        id: 10114, name: "Тяжелая Кираса Бессмертия", category: "upper", secondCategory: "heavy",
        armor: 25, hp: 80, durability: 40, requiredLevel: 13, price: 230, image: "heavy_cuirass_of_immortality.webp"
      },
      {
        id: 10115, name: "Тяжелые Набедренники Бессмертия", category: "lower", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 200, image: "heavy_pants_of_immortality.webp"
      },
      {
        id: 10116, name: "Тяжелые Перчатки Бессмертия", category: "gloves", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 200, image: "heavy_gloves_of_immortality.webp"
      },
      {
        id: 10117, name: "Тяжелые Сапоги Бессмертия", category: "boots", secondCategory: "heavy",
        armor: 15, hp: 80, durability: 40, requiredLevel: 13, price: 200, image: "heavy_boots_of_immortality.webp"
      },
      {
        id: 10118, name: "Легкий Шлем Равновесия", category: "helmet", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 200, image: "light_helmet_of_balance.webp"
      },
      {
        id: 10119, name: "Легкая Кираса Равновесия", category: "upper", secondCategory: "light",
        armor: 13, hp: 50, evasion: 10, durability: 40, requiredLevel: 13, price: 230, image: "light_cuirass_of_balance.webp"
      },
      {
        id: 10120, name: "Легкие Набедренники Равновесия", category: "lower", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 200, image: "light_pants_of_balance.webp"
      },
      {
        id: 10121, name: "Легкие Перчатки Равновесия", category: "gloves", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 200, image: "light_gloves_of_balance.webp"
      },
      {
        id: 10122, name: "Легкие Сапоги Равновесия", category: "boots", secondCategory: "light",
        armor: 8, hp: 50, evasion: 5, durability: 40, requiredLevel: 13, price: 200, image: "light_boots_of_balance.webp"
      },
      {
        id: 10123, name: "Тяжелый Шлем Превосходства", category: "helmet", secondCategory: "heavy",
        armor: 25, hp: 130, durability: 60, requiredLevel: 18, price: 350, image: "heavy_helmet_of_superiority.webp"
      },
      {
        id: 10124, name: "Тяжелая Кираса Превосходства", category: "upper", secondCategory: "heavy",
        armor: 35, hp: 130, durability: 60, requiredLevel: 18, price: 400, image: "heavy_cuirass_of_superiority.webp"
      },
      {
        id: 10125, name: "Тяжелые Набедренники Превосходства", category: "lower", secondCategory: "heavy",
        armor: 25, hp: 130, durability: 60, requiredLevel: 18, price: 350, image: "heavy_pants_of_superiority.webp"
      },
      {
        id: 10126, name: "Тяжелые Перчатки Превосходства", category: "gloves", secondCategory: "heavy",
        armor: 25, hp: 130, durability: 60, requiredLevel: 18, price: 350, image: "heavy_gloves_of_superiority.webp"
      },
      {
        id: 10127, name: "Тяжелые сапоги превосходства", category: "boots", secondCategory: "heavy",
        armor: 25, hp: 130, durability: 60, requiredLevel: 18, price: 350, image: "heavy_boots_of_superiority.webp"
      },
      {
        id: 10128, name: "Легкий Шлем Стремительности", category: "helmet", secondCategory: "light",
        armor: 15, hp: 90, evasion: 5, durability: 60, requiredLevel: 18, price: 350, image: "light_helmet_of_swiftness.webp"
      },
      {
        id: 10129, name: "Легкая Кираса Стремительности", category: "upper", secondCategory: "light",
        armor: 20, hp: 90, evasion: 10, durability: 60, requiredLevel: 18, price: 400, image: "light_cuirass_of_swiftness.webp"
      },
      {
        id: 10130, name: "Легкие Набедренники Стремительности", category: "lower", secondCategory: "light",
        armor: 15, hp: 90, evasion: 5, durability: 60, requiredLevel: 18, price: 350, image: "light_pants_of_swiftness.webp"
      },
      {
        id: 10131, name: "Легкие Перчатки Стремительности", category: "gloves", secondCategory: "light",
        armor: 15, hp: 90, evasion: 5, durability: 60, requiredLevel: 18, price: 350, image: "light_gloves_of_swiftness.webp"
      },
      {
        id: 10132, name: "Легкие Сапоги Стремительности", category: "boots", secondCategory: "light",
        armor: 15, hp: 90, evasion: 5, durability: 60, requiredLevel: 18, price: 350, image: "light_boots_of_swiftness.webp"
      },
      {
        id: 10133, name: "Cверхпрочные Ультра Сапоги Высшего Порядка", category: "boots", secondCategory: "heavy", type: "test",
        damage: 50, armor: 100, hp: 1000, evasion: 50, critChance: 100, critPower: 250, durability: 100, requiredLevel: 1, price: 10000000, image: "test_item.webp"
      },
    ];

    this.consumablesList = [
      {
        id: 1020, name: "Малый Эликсир Здоровья", category: "restoreHp", desc: "При использовании восстанавливает 30 HP",
        amount: 30, requiredLevel: 1, price: 15, image: "elixir_of_health.webp"
      },
      {
        id: 1021, name: "Малый Эликсир Атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 10",
        amount: 10, duration: 1, requiredLevel: 2, price: 15, image: "elixir_of_damage.webp"
      },
      {
        id: 1022, name: "Малый Эликсир Брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 5",
        amount: 5, duration: 1, requiredLevel: 2, price: 15, image: "elixir_of_armor.webp"
      },
      {
        id: 1023, name: "Малый Эликсир Богатства", category: "buffDrop", desc: "При использовании на 1 бой увеличивает дроп золота и ресурсов в 2 раза",
        amount: 2, duration: 1, requiredLevel: 2, price: 50, image: "elixir_of_wealth.webp"
      },
      {
        id: 1024, name: "Эликсир Здоровья", category: "restoreHp", desc: "При использовании восстанавливает 70 HP",
        amount: 70, requiredLevel: 3, price: 30, image: "elixir_of_health.webp"
      },
      {
        id: 1025, name: "Средний Эликсир Здоровья", category: "restoreHp", desc: "При использовании восстанавливает 150 HP",
        amount: 150, requiredLevel: 5, price: 50, image: "elixir_of_health.webp"
      },
      {
        id: 1026, name: "Средний Эликсир Атаки", category: "buffDamage", desc: "При использовании на 2 боя увеличивает урон на 20",
        amount: 20, duration: 2, requiredLevel: 5, price: 50, image: "elixir_of_damage.webp"
      },
      {
        id: 1027, name: "Средний Эликсир Брони", category: "buffArmor", desc: "При использовании на 2 боя увеличивает защиту на 15",
        amount: 15, duration: 2, requiredLevel: 5, price: 50, image: "elixir_of_armor.webp"
      },
      {
        id: 1028, name: "Большой Эликсир Атаки", category: "buffDamage", desc: "При использовании на 3 боя увеличивает урон на 30",
        amount: 30, duration: 3, requiredLevel: 10, price: 100, image: "elixir_of_damage.webp"
      },
      {
        id: 1029, name: "Большой Эликсир Брони", category: "buffArmor", desc: "При использовании на 3 боя увеличивает защиту на 25",
        amount: 25, duration: 3, requiredLevel: 10, price: 100, image: "elixir_of_armor.webp"
      },
      {
        id: 10210, name: "Эликсир Проворности", category: "buffEvasion", desc: "При использовании на 1 бой увеличивает уклонение на 10",
        amount: 10, duration: 1, requiredLevel: 10, price: 100, image: "elixir_of_agility.webp"
      },
      {
        id: 10211, name: "Малый Эликсир Кровожадности", category: "buffCritPower", desc: "При использовании на 1 бой увеличивает силу крита на 25",
        amount: 25, duration: 1, requiredLevel: 10, price: 100, image: "elixir_of_bloodlust.webp"
      },
      {
        id: 10212, name: "Синтезированный Эликсир Здоровья I", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 50 HP",
        amount: 50, requiredLevel: 1, price: 30, image: "elixir_of_health.webp"
      },
      {
        id: 10213, name: "Синтезированный Эликсир Здоровья II", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 120 HP",
        amount: 120, requiredLevel: 1, price: 50, image: "elixir_of_health.webp"
      },
      {
        id: 10214, name: "Синтезированный Эликсир Здоровья III", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 250 HP",
        amount: 250, requiredLevel: 1, price: 90, image: "elixir_of_health.webp"
      },
      {
        id: 10215, name: "Синтезированный Эликсир Здоровья IV", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 600 HP",
        amount: 600, requiredLevel: 1, price: 120, image: "elixir_of_health.webp"
      },
      {
        id: 10216, name: "Синтезированный Эликсир Богатства I", category: "buffDrop", type: "craft", desc: "При использовании на 5 боев увеличивает дроп золота и ресурсов в 2 раза",
        amount: 2, duration: 5, requiredLevel: 1, price: 60, image: "elixir_of_wealth.webp"
      },
      {
        id: 10217, name: "Запечатанный Магией Серебряный Сундук", category: "magicChest", desc: "Древний магический сундук, наполненный случайными материалами для крафта I уровня",
        amount: 35, requiredLevel: 1, price: 50, image: "silver_chest.webp"
      },
      {
        id: 10218, name: "Запечатанный Магией Золотой Сундук Богатства", category: "magicChest", desc: "Древний магический сундук, наполненный случайными материалами для крафта II уровня",
        amount: 35, requiredLevel: 1, price: 100, image: "golden_chest.webp"
      },
      {
        id: 10219, name: "Запечатанный Магией Платиновый Сундук Невообразимого Богатства", category: "magicChest", desc: "Древний магический сундук, наполненный случайными материалами для крафта III уровня",
        amount: 35, requiredLevel: 1, price: 200, image: "platinum_chest.webp"
      },
      {
        id: 10220, name: "Запечатанный Магией Рубиновый Двойной Сундук Недостижимого Богатства", category: "magicChest", desc: "Древний магический сундук, наполненный случайными материалами для крафта IV уровня",
        amount: 35, requiredLevel: 1, price: 300, image: "ruby_chest.webp"
      },
      {
        id: 10221, name: "Запечатанный Магией Небесный Сундук Божественного Богатства", category: "magicChest", desc: "Древний магический сундук, наполненный случайными предметами и материалами для крафта высшего качества",
        amount: 35, requiredLevel: 1, price: 600, image: "divine_chest.webp"
      },
      {
        id: 10222, name: "Синтезированный Эликсир Здоровья V", category: "restoreHp", type: "craft", desc: "При использовании восстанавливает 800 HP",
        amount: 800, requiredLevel: 1, price: 150, image: "elixir_of_health.webp"
      },
      {
        id: 10223, name: "Большой Эликсир Здоровья", category: "restoreHp", desc: "При использовании восстанавливает 250 HP",
        amount: 250, requiredLevel: 9, price: 90, image: "elixir_of_health.webp"
      },
      {
        id: 10223, name: "Огромный Эликсир Здоровья", category: "restoreHp", desc: "При использовании восстанавливает 450 HP",
        amount: 450, requiredLevel: 13, price: 120, image: "elixir_of_health.webp"
      },
      {
        id: 10224, name: "Невероятный Эликсир Здоровья", category: "restoreHp", desc: "При использовании восстанавливает 600 HP",
        amount: 600, requiredLevel: 17, price: 150, image: "elixir_of_health.webp"
      },
      {
        id: 10225, name: "Огромный Эликсир Атаки", category: "buffDamage", desc: "При использовании на 5 боев увеличивает урон на 50",
        amount: 50, duration: 5, requiredLevel: 15, price: 150, image: "elixir_of_damage.webp"
      },
      {
        id: 10226, name: "Огромный Эликсир Брони", category: "buffArmor", desc: "При использовании на 5 боев увеличивает защиту на 40",
        amount: 40, duration: 5, requiredLevel: 15, price: 150, image: "elixir_of_armor.webp"
      },
      {
        id: 10227, name: "Большой Эликсир Проворности", category: "buffEvasion", desc: "При использовании на 3 боя увеличивает уклонение на 10",
        amount: 10, duration: 3, requiredLevel: 15, price: 150, image: "elixir_of_agility.webp"
      },
      {
        id: 10228, name: "Большой Эликсир Кровожадности", category: "buffCritPower", desc: "При использовании на 3 боя увеличивает силу крита на 30",
        amount: 30, duration: 3, requiredLevel: 15, price: 150, image: "elixir_of_bloodlust.webp"
      },
      {
        id: 10229, name: "НЕВЕРОЯТНЫЙ Эликсир Здоровья", category: "restoreHp", type: "test", desc: "При использовании восстанавливает 3000 HP",
        amount: 3000, requiredLevel: 1, price: 1, image: "elixir_of_health.webp"
      },
    ];
    this.craftMaterialList = [
      { id: 1030, name: "Стеклянная Колба", category: "consumables", dropChance: 15 },
      { id: 1031, name: "Кровь Монстра", category: "consumables", dropChance: 25 },
      { id: 1032, name: "Магическая Эссенция I", category: "consumables", dropChance: 10 },
      { id: 1033, name: "Магическая Эссенция II", category: "consumables", dropChance: 10 },
      { id: 1034, name: "Магическая Эссенция III", category: "consumables", dropChance: 10 },
      { id: 1035, name: "Магическая Эссенция IV", category: "consumables", dropChance: 10 },
      { id: 1036, name: "Сломанная Рукоять", category: "weapon", dropChance: 20 },
      { id: 1037, name: "Лезвие Меча", category: "weapon", dropChance: 5 },
      { id: 1038, name: "Лезвие Кинжала", category: "weapon", dropChance: 5 },
      { id: 1039, name: "Кристаллическая Пыль", category: "universal", dropChance: 30 },
      { id: 10310, name: "Гарда Темного Легиона", category: "weapon", dropChance: 1 },
      { id: 10311, name: "Гарда Последнего Вздоха", category: "weapon", dropChance: 1 },
      { id: 10312, name: "Частица Благодати Ангела", category: "consumables", dropChance: 2 },
      { id: 10313, name: "Гарда Вершителя Судеб", category: "weapon", dropChance: 1 },
      { id: 10314, name: "Гарда Душегуба", category: "weapon", dropChance: 1 },
      { id: 10315, name: "Губительный Кристалл", category: "universal", dropChance: 3 }, // будет выпадать с босса в подземелье
      { id: 10316, name: "Магический Ключ", category: "special", dropChance: 5 },
      { id: 10317, name: "Гарда Элизиума", category: "weapon", dropChance: 1 },
      { id: 10318, name: "Гарда Тени Рока", category: "weapon", dropChance: 1 },
      { id: 10319, name: "Магическая Эссенция V", category: "consumables", dropChance: 10 },
      { id: 10320, name: "Гарда Гнева Небес", category: "weapon", dropChance: 1 },
      { id: 10321, name: "Гарда Когтя Феникса", category: "weapon", dropChance: 1 },
      { id: 10322, name: "Гарда Последнего Аргумента Королей", category: "weapon", dropChance: 1 },
      { id: 10323, name: "Гарда Порыва Смерти", category: "weapon", dropChance: 1 },
      { id: 10324, name: "Обработанная Руда Высшего Качества", category: "weapon", dropChance: 1 }, // Сделать выпадение только с боссов
    ];
    this.recipeList = [
      {
        id: 1040, name: "Рецепт: Синтезированный Эликсир Здоровья I", category: "elixir", dropChance: 7, targetId: 10212, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 3 }, { material: 1032, count: 1 }]
      },
      {
        id: 1041, name: "Рецепт: Синтезированный Эликсир Здоровья II", category: "elixir", dropChance: 5, targetId: 10213, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 5 }, { material: 1033, count: 2 }]
      },
      {
        id: 1042, name: "Рецепт: Синтезированный Эликсир Здоровья III", category: "elixir", dropChance: 5, targetId: 10214, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 7 }, { material: 1034, count: 2 }]
      },
      {
        id: 1043, name: "Рецепт: Синтезированный Эликсир Здоровья IV", category: "elixir", dropChance: 5, targetId: 10215, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 10 }, { material: 1035, count: 2 }]
      },
      {
        id: 1044, name: "Рецепт: Меч Благих Намерений", category: "weapon", dropChance: 5, targetId: 1007, requiredLevel: 1,
        ingredients: [{ material: 1036, count: 3 }, { material: 1037, count: 1 }, { material: 1039, count: 10 }], resources: { wood: 5, iron: 10 }
      },
      {
        id: 1045, name: "Рецепт: Ритуальный Кинжал", category: "weapon", dropChance: 5, targetId: 1008, requiredLevel: 1,
        ingredients: [{ material: 1036, count: 3 }, { material: 1038, count: 1 }, { material: 1039, count: 10 }], resources: { wood: 5, iron: 10 }
      },
      {
        id: 1046, name: "Рецепт: Темный Легион", category: "weapon", dropChance: 5, targetId: 1009, requiredLevel: 4,
        ingredients: [{ material: 1036, count: 10 }, { material: 1037, count: 3 }, { material: 1039, count: 15 }, { material: 10310, count: 1 }], resources: { wood: 15, iron: 30 }
      },
      {
        id: 1047, name: "Рецепт: Последний Вздох", category: "weapon", dropChance: 5, targetId: 10010, requiredLevel: 4,
        ingredients: [{ material: 1036, count: 10 }, { material: 1038, count: 3 }, { material: 1039, count: 15 }, { material: 10311, count: 1 }], resources: { wood: 15, iron: 30 }
      },
      {
        id: 1048, name: "Рецепт: Синтезированный Эликсир Богатства I", category: "elixir", dropChance: 5, targetId: 10216, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1034, count: 7 }, { material: 1039, count: 7 }, { material: 10312, count: 1 }]
      },
      {
        id: 1049, name: "Рецепт: Вершитель Судеб", category: "weapon", dropChance: 5, targetId: 10011, requiredLevel: 9,
        ingredients: [{ material: 1036, count: 15 }, { material: 1037, count: 3 }, { material: 1039, count: 20 }, { material: 10313, count: 1 }, { material: 10315, count: 5 }], resources: { wood: 20, iron: 35 }
      },
      {
        id: 10410, name: "Рецепт: Душегуб", category: "weapon", dropChance: 5, targetId: 10012, requiredLevel: 9,
        ingredients: [{ material: 1036, count: 15 }, { material: 1038, count: 3 }, { material: 1039, count: 20 }, { material: 10314, count: 1 }, { material: 10315, count: 5 }], resources: { wood: 20, iron: 35 }
      },
      {
        id: 10411, name: "Рецепт: Элизиум", category: "weapon", dropChance: 5, targetId: 10016, requiredLevel: 13,
        ingredients: [{ material: 1036, count: 15 }, { material: 1037, count: 3 }, { material: 1039, count: 20 }, { material: 10317, count: 2 }, { material: 10315, count: 5 }], resources: { wood: 30, iron: 50 }
      },
      {
        id: 10412, name: "Рецепт: Тень Рока", category: "weapon", dropChance: 5, targetId: 10017, requiredLevel: 13,
        ingredients: [{ material: 1036, count: 15 }, { material: 1038, count: 3 }, { material: 1039, count: 20 }, { material: 10318, count: 2 }, { material: 10315, count: 5 }], resources: { wood: 30, iron: 50 }
      },
      {
        id: 10413, name: "Рецепт: Синтезированный Эликсир Здоровья V", category: "elixir", dropChance: 5, targetId: 10222, requiredLevel: 1,
        ingredients: [{ material: 1030, count: 1 }, { material: 1031, count: 15 }, { material: 10319, count: 2 }]
      },
      {
        id: 10414, name: "Рецепт: Гнев Небес", category: "weapon", dropChance: 5, targetId: 10018, requiredLevel: 17,
        ingredients: [{ material: 1036, count: 15 }, { material: 1037, count: 5 }, { material: 1039, count: 30 }, { material: 10320, count: 2 }, { material: 10315, count: 5 }], resources: { wood: 40, iron: 60 }
      },
      {
        id: 10415, name: "Рецепт: Коготь Феникса", category: "weapon", dropChance: 5, targetId: 10019, requiredLevel: 17,
        ingredients: [{ material: 1036, count: 15 }, { material: 1038, count: 5 }, { material: 1039, count: 30 }, { material: 10321, count: 2 }, { material: 10315, count: 5 }], resources: { wood: 40, iron: 60 }
      },
      {
        id: 10416, name: "Рецепт: Последний Аргумент Королей", category: "weapon", dropChance: 3, targetId: 10020, requiredLevel: 20,
        ingredients: [{ material: 1036, count: 30 }, { material: 1037, count: 10 }, { material: 1039, count: 50 }, { material: 10322, count: 2 }, { material: 10315, count: 10 }, { material: 10324, count: 1 }], resources: { wood: 50, iron: 100 }
      },
      {
        id: 10417, name: "Рецепт: Порыв Смерти", category: "weapon", dropChance: 3, targetId: 10021, requiredLevel: 20,
        ingredients: [{ material: 1036, count: 30 }, { material: 1038, count: 10 }, { material: 1039, count: 50 }, { material: 10323, count: 2 }, { material: 10315, count: 10 }, { material: 10324, count: 1 }], resources: { wood: 50, iron: 100 }
      },
    ];
    this.silverDrop = [{ craftItemId: 1030, count: 3 }, { craftItemId: 1031, count: 5 }, { craftItemId: 1032, count: 2 }, { craftItemId: 1036, count: 3 },
    { craftItemId: 1037, count: 2 }, { craftItemId: 1038, count: 2 }, { craftItemId: 1039, count: 5 }, { craftItemId: 1044, count: 1 }, { craftItemId: 1045, count: 1 }];
    this.goldenDrop = [{ craftItemId: 1030, count: 3 }, { craftItemId: 1031, count: 5 }, { craftItemId: 1036, count: 3 },
    { craftItemId: 1037, count: 3 }, { craftItemId: 1038, count: 3 }, { craftItemId: 1039, count: 6 }, { craftItemId: 1033, count: 2 }, { craftItemId: 10310, count: 1 },
    { craftItemId: 10311, count: 1 }, { craftItemId: 1046, count: 1 }, { craftItemId: 1047, count: 1 }];
    this.platinumDrop = [{ craftItemId: 1030, count: 3 }, { craftItemId: 1031, count: 5 }, { craftItemId: 1036, count: 3 },
    { craftItemId: 1037, count: 4 }, { craftItemId: 1038, count: 4 }, { craftItemId: 1039, count: 7 },
    { craftItemId: 1034, count: 2 }, { craftItemId: 10313, count: 1 }, { craftItemId: 10314, count: 1 }, { craftItemId: 10315, count: 2 },
    { craftItemId: 1048, count: 1 }, { craftItemId: 1049, count: 1 }, { craftItemId: 10410, count: 1 }, { craftItemId: 10312, count: 1 }];
    this.rubyDrop = [{ craftItemId: 1030, count: 3 }, { craftItemId: 1031, count: 5 }, { craftItemId: 1035, count: 2 }, { craftItemId: 1036, count: 3 },
    { craftItemId: 1037, count: 4 }, { craftItemId: 1038, count: 4 }, { craftItemId: 1039, count: 8 }, { craftItemId: 10312, count: 1 }, { craftItemId: 10315, count: 2 },
    { craftItemId: 10317, count: 1 }, { craftItemId: 10318, count: 1 }, { craftItemId: 1048, count: 1 }, { craftItemId: 10411, count: 1 }, { craftItemId: 10412, count: 1 }
    ];
    this.divineDrop = [{ craftItemId: 1030, count: 3 }, { craftItemId: 1031, count: 5 }, { craftItemId: 1036, count: 3 },
    { craftItemId: 1037, count: 4 }, { craftItemId: 1038, count: 4 }, { craftItemId: 1039, count: 8 }, { craftItemId: 10312, count: 1 }, { craftItemId: 10315, count: 2 },
    { craftItemId: 10319, count: 2 }, { craftItemId: 10320, count: 1 }, { craftItemId: 10321, count: 1 }, { craftItemId: 10322, count: 1 }, { craftItemId: 10323, count: 1 },
    { craftItemId: 1048, count: 1 }, { craftItemId: 10413, count: 1 }, { craftItemId: 10414, count: 1 }, { craftItemId: 10415, count: 1 },
    { craftItemId: 10416, count: 1 }, { craftItemId: 10417, count: 1 }
    ];
  }

  list() {
    const itemList = this.weaponList.concat(this.armorList, this.consumablesList);

    return itemList;
  }

  // Поиск всего объекта предмета по его id среди категорий Оружие, Броня, Расходные
  findItem(itemId) {
    const allItems = JSON.parse(JSON.stringify(this.list()));
    let foundItem;

    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i].id == itemId) {
        foundItem = allItems[i];
      }
    }
    return foundItem;
  }

  // Поиск всего объекта рецепта по его id
  findCraftRecipe(itemId) {
    const allRecipes = JSON.parse(JSON.stringify(this.recipeList));
    let foundRecipe;

    for (let i = 0; i < allRecipes.length; i++) {
      if (allRecipes[i].id == itemId) {
        foundRecipe = allRecipes[i];
      }
    }
    return foundRecipe;
  }

  // Поиск всего объекта материала по его id
  findCraftMaterial(itemId) {
    const allIngredients = JSON.parse(JSON.stringify(this.craftMaterialList));
    let foundIngredient;

    for (let i = 0; i < allIngredients.length; i++) {
      if (allIngredients[i].id == itemId) {
        foundIngredient = allIngredients[i];
      }
    }
    return foundIngredient;
  }

  // Поиск всего объекта по его id среди Рецептов и Материалов
  findAllCraftItems(itemId) {
    const allCraftItems = this.craftMaterialList.concat(this.recipeList);
    let foundItem;

    for (let i = 0; i < allCraftItems.length; i++) {
      if (allCraftItems[i].id == itemId) {
        foundItem = allCraftItems[i];
        return foundItem;
      }
    }
    return 0;
  }

  magicChestRandomDrop(chestId, dropChance) {
    let drop = [];

    if (chestId == 10217) {
      return drop = this.randomDrop(this.silverDrop, dropChance);
    }
    if (chestId == 10218) {
      return drop = this.randomDrop(this.goldenDrop, dropChance);
    }
    if (chestId == 10219) {
      return drop = this.randomDrop(this.platinumDrop, dropChance);
    }
    if (chestId == 10220) {
      return drop = this.randomDrop(this.rubyDrop, dropChance);
    }
    if (chestId == 10221) {
      return drop = this.randomDrop(this.divineDrop, dropChance);
    }
    return drop;
  }

  randomDrop(chestDrop, dropChance) {
    let drop = [];
    for (let i = 0; i < chestDrop.length; i++) {
      // Шанс выпадения предмета с сундука
      if (Math.random() <= dropChance / 100) {
        // Количество выпавшего предмета
        if (chestDrop[i].count > 1) {
          const countDrop = Math.floor(Math.random() * (chestDrop[i].count - 1 + 1) + 1);
          drop.push({ craftItemId: chestDrop[i].craftItemId, count: countDrop });
        } else {
          drop.push(chestDrop[i]);
        }
      }
    }
    return drop;
  }
}

export default new items();