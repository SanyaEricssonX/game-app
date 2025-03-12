class items {
  constructor() {
    this.weaponList = [
      { id: 0, name: "Тренировочный меч", damage: 10, armor: 0, hp: 0, durability: 5, requiredLevel: 1, price: 20 },
    ];
    this.armorList = [
      { id: 0, name: "Тренировочный жилет", damage: 0, armor: 3, hp: 10, durability: 5, requiredLevel: 1, price: 10 },
    ];
    this.consumablesList = [
      { id: 0, name: "Малый эликсир здоровья", category: "restoreHp", amount: 30, durability: 0, requiredLevel: 1, price: 10 },
      { id: 1, name: "Малый эликсир атаки", category: "buffDamage", amount: 10, durability: 1, requiredLevel: 2, price: 15 },
      { id: 2, name: "Малый эликсир брони", category: "buffArmor", amount: 10, durability: 1, requiredLevel: 2, price: 15 },
      { id: 3, name: "Малый эликсир богатства", category: "buffDrop", amount: 2, durability: 1, requiredLevel: 2, price: 20 },
    ];
  }
}

export default new items();