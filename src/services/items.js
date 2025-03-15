class items {
  constructor() {
    this.weaponList = [
      { id: 0, name: "Тренировочный меч", damage: 10, armor: 0, hp: 0, durability: 5, requiredLevel: 1, price: 20 },
      { id: 1, name: "Железный меч", damage: 20, armor: 0, hp: 0, durability: 15, requiredLevel: 3, price: 60 },
      { id: 2, name: "Невероятных размеров трехзвездочный ультра мега меч", damage: 5000, armor: 0, hp: 0, durability: 1000, requiredLevel: 3, price: 1000000 },
    ];
    this.armorList = [
      { id: 0, name: "Тренировочный жилет", category: "upperArmor", damage: 0, armor: 3, hp: 10, durability: 5, requiredLevel: 1, price: 10 },
      { id: 1, name: "Легкие сапоги", category: "boots", damage: 0, armor: 2, hp: 10, durability: 5, requiredLevel: 1, price: 10 },
      { id: 2, name: "Железная кираса", category: "upperArmor", damage: 0, armor: 10, hp: 30, durability: 15, requiredLevel: 3, price: 50 },
      { id: 3, name: "Железные сапоги", category: "boots", damage: 0, armor: 5, hp: 30, durability: 15, requiredLevel: 3, price: 50 },
      { id: 4, name: "Железный шлем", category: "helmet", damage: 0, armor: 5, hp: 30, durability: 15, requiredLevel: 3, price: 50 },
    ];
    this.consumablesList = [
      { id: 0, name: "Малый эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 30 HP", amount: 30, durability: 0, requiredLevel: 1, price: 15 },
      { id: 1, name: "Малый эликсир атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 10", amount: 10, durability: 1, requiredLevel: 2, price: 15 },
      { id: 2, name: "Малый эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 5", amount: 5, durability: 1, requiredLevel: 2, price: 15 },
      { id: 3, name: "Малый эликсир богатства", category: "buffDrop", desc: "При использовании на 1 бой увеличивает дроп в 2 раза", amount: 2, durability: 1, requiredLevel: 2, price: 20 },
      { id: 4, name: "Эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 70 HP", amount: 70, durability: 0, requiredLevel: 3, price: 30 },
      { id: 5, name: "Средний эликсир здоровья", category: "restoreHp", desc: "При использовании восстанавливает 150 HP", amount: 150, durability: 0, requiredLevel: 5, price: 50 },
      { id: 6, name: "Средний эликсир атаки", category: "buffDamage", desc: "При использовании на 1 бой увеличивает урон на 25", amount: 25, durability: 1, requiredLevel: 5, price: 50 },
      { id: 7, name: "Средний эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту на 15", amount: 15, durability: 1, requiredLevel: 5, price: 50 },
      { id: 8, name: "Средний эликсир брони", category: "buffArmor", desc: "При использовании на 1 бой увеличивает защиту, урон, дроп в 10 раз. Битву проиграть становится невозможно. А если вы и проиграете, то все равно получите весь дроп и уровень станет максимальным перманентно.", amount: 15, durability: 1, requiredLevel: 5, price: 5000000 },
    ];
  }
}

export default new items();