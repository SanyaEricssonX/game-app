class enemies {

  constructor() {
    this.list = [
      { id: 0, name: "Скелет", level: 1, hp: 30, damage: 5, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, time: 1000 },
      { id: 1, name: "Зомби", level: 1, hp: 50, damage: 3, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, time: 1000 },
      { id: 2, name: "Гоблин", level: 1, hp: 40, damage: 4, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, time: 1000 },
      { id: 3, name: "Орк", level: 2, hp: 70, damage: 8, armor: 2, evasion: 10, critChance: 10, critPower: 50, experience: 30, time: 1000 },
      { id: 4, name: "Волк", level: 2, hp: 50, damage: 10, armor: 2, evasion: 20, critChance: 30, critPower: 30, experience: 30, time: 1000 },
      { id: 5, name: "Скелет-лучник", level: 2, hp: 30, damage: 15, evasion: 10, critChance: 10, critPower: 50, armor: 2, experience: 30, time: 1000 },
      { id: 6, name: "Медведь", level: 3, hp: 100, damage: 22, armor: 3, evasion: 10, critChance: 20, critPower: 30, experience: 80, time: 1000 },
      { id: 7, name: "Разбойник", level: 3, hp: 80, damage: 30, armor: 3, evasion: 20, critChance: 10, critPower: 30, experience: 80, time: 1000 },
      { id: 8, name: "Арахнид", level: 3, hp: 90, damage: 25, armor: 3, evasion: 10, critChance: 10, critPower: 50, experience: 80, time: 1000 },
      { id: 9, name: "Ассассин", level: 4, hp: 120, damage: 50, armor: 4, evasion: 30, critChance: 30, critPower: 70, experience: 150, time: 1000 },
      { id: 10, name: "Тролль", level: 5, hp: 200, damage: 60, armor: 10, evasion: 10, critChance: 20, critPower: 50, experience: 260, time: 1000 },
      { id: -1, name: "Тестовый", level: -5, hp: 10000, damage: 50, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 500, time: 1000 },
      { id: -2, name: "Тестовый", level: -10, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 3000, time: 1000 },
      { id: -3, name: "Тестовый", level: -13, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 5700, time: 1000 },
      { id: -4, name: "Тестовый", level: -17, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 10700, time: 1000 },
      { id: -5, name: "Тестовый", level: -20, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 15500, time: 1000 },
      { id: -6, name: "Тестовый", level: -200, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 15500, time: 1000 },
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
      } else if (i == enemyId && this.list[i].level == 4) {
        return { gold: 40, wood: 10, stone: 10, iron: 5 };
      } else if (i == enemyId && this.list[i].level == 5) {
        return { gold: 60, wood: 15, stone: 15, iron: 8 };
      } else if (this.list[i].level < 0) {
        return { gold: 100000, wood: 100000, stone: 100000, iron: 100000 };
      }
    }
  }
}

export default new enemies();