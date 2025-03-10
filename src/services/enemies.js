class enemies {

  constructor() {
    this.list = [
      { id: 0, name: "Скелет", level: 1, hp: 30, damage: 5, experience: 10, time: 3000 },
      { id: 1, name: "Зомби", level: 1, hp: 50, damage: 3, experience: 10, time: 3000 },
      { id: 2, name: "Гоблин", level: 1, hp: 40, damage: 4, experience: 10, time: 3000 },
      { id: 3, name: "Орк", level: 2, hp: 70, damage: 8, experience: 30, time: 6000 },
      { id: 4, name: "Волк", level: 2, hp: 50, damage: 10, experience: 30, time: 60000 },
      { id: 5, name: "Скелет-лучник", level: 2, hp: 30, damage: 15, experience: 30, time: 6000 },
      { id: 6, name: "Медведь", level: 3, hp: 100, damage: 22, experience: 80, time: 10000 },
      { id: 7, name: "Разбойник", level: 3, hp: 80, damage: 30, experience: 80, time: 10000 },
      { id: 8, name: "Арахнид", level: 3, hp: 90, damage: 25, experience: 80, time: 10000 },
      { id: 9, name: "Тестовый", level: 5, hp: 1, damage: 0, experience: 500, time: 3000 }
    ]
  }

  randomDrop(enemyId) {
    for (let i = 0; i < this.list.length; i++) {
      if (i == enemyId && this.list[i].level == 1) {
        return { gold: 3, wood: 0, stone: 0, iron: 0 };
      } else if (i == enemyId && this.list[i].level == 2) {
        return { gold: 10, wood: 2, stone: 2, iron: 0 };
      } else if (i == enemyId && this.list[i].level == 3) {
        return { gold: 25, wood: 5, stone: 5, iron: 2 };
      } else if (i == enemyId && this.list[i].level == 5) {
        return { gold: 100, wood: 50, stone: 50, iron: 50 };
      }
    }
  }
}

export default new enemies();