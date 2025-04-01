class enemies {

  constructor() {
    this.list = [
      { id: 0, name: "Скелет", level: 1, hp: 30, damage: 5, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, time: 1000 },
      { id: 1, name: "Зомби", level: 1, hp: 50, damage: 3, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, time: 1000 },
      { id: 2, name: "Гоблин", level: 1, hp: 40, damage: 4, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, time: 1000 },
      { id: 3, name: "Орк", level: 2, hp: 70, damage: 8, armor: 2, evasion: 10, critChance: 10, critPower: 50, experience: 30, time: 1000 },
      { id: 4, name: "Волк", level: 2, hp: 50, damage: 10, armor: 2, evasion: 20, critChance: 30, critPower: 30, experience: 30, time: 1000 },
      { id: 5, name: "Скелет-лучник", level: 2, hp: 30, damage: 15, evasion: 10, critChance: 10, critPower: 50, armor: 2, experience: 30, time: 1000 },
      { id: 6, name: "Медведь", level: 3, hp: 100, damage: 22, armor: 3, evasion: 10, critChance: 20, critPower: 30, experience: 70, time: 1000 },
      { id: 7, name: "Разбойник", level: 3, hp: 80, damage: 30, armor: 3, evasion: 20, critChance: 10, critPower: 30, experience: 70, time: 1000 },
      { id: 8, name: "Арахнид", level: 3, hp: 90, damage: 25, armor: 3, evasion: 10, critChance: 10, critPower: 50, experience: 70, time: 1000 },
      { id: 9, name: "Наемник", level: 4, hp: 120, damage: 40, armor: 4, evasion: 30, critChance: 30, critPower: 70, experience: 110, time: 1000 },
      { id: 10, name: "Шаман орков", level: 4, hp: 120, damage: 35, armor: 7, evasion: 20, critChance: 20, critPower: 50, experience: 110, time: 1000 },
      { id: 11, name: "Кентавр", level: 4, hp: 130, damage: 30, armor: 10, evasion: 10, critChance: 20, critPower: 50, experience: 110, time: 1000 },
      { id: 12, name: "Лич", level: 5, hp: 170, damage: 50, armor: 5, evasion: 20, critChance: 20, critPower: 50, experience: 160, time: 1000 },
      { id: 13, name: "Медведь зомби", level: 5, hp: 180, damage: 40, armor: 10, evasion: 10, critChance: 30, critPower: 70, experience: 160, time: 1000 },
      { id: 14, name: "Тролль", level: 5, hp: 200, damage: 40, armor: 15, evasion: 10, critChance: 20, critPower: 30, experience: 160, time: 1000 },
      { id: 15, name: "Адская гончая", level: 6, hp: 180, damage: 50, armor: 3, evasion: 20, critChance: 30, critPower: 50, experience: 220, time: 1000 },
      { id: 16, name: "Призрак", level: 6, hp: 160, damage: 45, armor: 15, evasion: 40, critChance: 20, critPower: 30, experience: 220, time: 1000 },
      { id: 17, name: "Ведьма", level: 6, hp: 180, damage: 60, armor: 7, evasion: 10, critChance: 30, critPower: 70, experience: 220, time: 1000 },
      { id: 18, name: "Архилич", level: 7, hp: 200, damage: 70, armor: 10, evasion: 10, critChance: 20, critPower: 50, experience: 290, time: 1000 },
      { id: 19, name: "Циклоп", level: 7, hp: 250, damage: 50, armor: 10, evasion: 10, critChance: 20, critPower: 70, experience: 290, time: 1000 },
      { id: 20, name: "Металлический голем", level: 7, hp: 250, damage: 45, armor: 30, evasion: 5, critChance: 20, critPower: 50, experience: 290, time: 1000 },
      { id: 21, name: "Виверна", level: 8, hp: 220, damage: 75, armor: 10, evasion: 40, critChance: 20, critPower: 70, experience: 350, time: 1000 },
      { id: 22, name: "Эльф лучник", level: 8, hp: 180, damage: 80, armor: 5, evasion: 30, critChance: 40, critPower: 150, experience: 350, time: 1000 },
      { id: 23, name: "Минотавр", level: 8, hp: 240, damage: 65, armor: 20, evasion: 20, critChance: 20, critPower: 100, experience: 350, time: 1000 },
      { id: 24, name: "Элементаль земли", level: 9, hp: 260, damage: 70, armor: 40, evasion: 10, critChance: 20, critPower: 50, experience: 410, time: 1000 },
      { id: 25, name: "Элементаль воздуха", level: 9, hp: 230, damage: 100, armor: 10, evasion: 30, critChance: 20, critPower: 70, experience: 410, time: 1000 },
      { id: 26, name: "Элементаль воды", level: 9, hp: 200, damage: 80, armor: 10, evasion: 40, critChance: 30, critPower: 100, experience: 410, time: 1000 },
      { id: 27, name: "Элементаль огня", level: 10, hp: 240, damage: 130, armor: 15, evasion: 30, critChance: 20, critPower: 100, experience: 490, time: 1000 },
      { id: 28, name: "Гигант", level: 10, hp: 300, damage: 80, armor: 50, evasion: 10, critChance: 20, critPower: 100, experience: 490, time: 1000 },
      { id: 29, name: "Бес", level: 10, hp: 260, damage: 110, armor: 20, evasion: 20, critChance: 20, critPower: 70, experience: 490, time: 1000 },
      { id: 30, name: "Дварф страж", level: 11, hp: 320, damage: 95, armor: 60, evasion: 20, critChance: 20, critPower: 70, experience: 560, time: 1000 },
      { id: 31, name: "Демон", level: 11, hp: 300, damage: 100, armor: 15, evasion: 20, critChance: 30, critPower: 100, experience: 560, time: 1000 },
      { id: 32, name: "Ледяной тролль", level: 11, hp: 290, damage: 130, armor: 30, evasion: 10, critChance: 20, critPower: 100, experience: 560, time: 1000 },
      { id: 33, name: "Высший эльф", level: 12, hp: 240, damage: 150, armor: 20, evasion: 30, critChance: 30, critPower: 150, experience: 640, time: 1000 },
      { id: 34, name: "Болотная тварь", level: 12, hp: 350, damage: 100, armor: 50, evasion: 10, critChance: 20, critPower: 70, experience: 640, time: 1000 },
      { id: 35, name: "Виверна зомби", level: 12, hp: 310, damage: 130, armor: 30, evasion: 30, critChance: 30, critPower: 100, experience: 640, time: 1000 },
      { id: 36, name: "Демон крови", level: 13, hp: 400, damage: 170, armor: 50, evasion: 25, critChance: 25, critPower: 100, experience: 720, time: 1000 },
      { id: 37, name: "Темный эльф ассассин", level: 13, hp: 350, damage: 155, armor: 30, evasion: 30, critChance: 35, critPower: 175, experience: 720, time: 1000 },
      { id: 38, name: "Кракен", level: 13, hp: 500, damage: 130, armor: 70, evasion: 10, critChance: 20, critPower: 100, experience: 720, time: 1000 },
      { id: 39, name: "Лесной дух", level: 14, hp: 460, damage: 150, armor: 50, evasion: 30, critChance: 20, critPower: 70, experience: 800, time: 1000 },
      { id: 40, name: "Живой доспех", level: 14, hp: 530, damage: 130, armor: 80, evasion: 10, critChance: 20, critPower: 70, experience: 800, time: 1000 },
      { id: 41, name: "Вампир", level: 14, hp: 480, damage: 160, armor: 30, evasion: 25, critChance: 25, critPower: 100, experience: 800, time: 1000 },
      { id: 42, name: "Насмешник", level: 15, hp: 100, damage: 200, armor: 150, evasion: 90, critChance: 30, critPower: 100, experience: 890, time: 1000 },
      { id: 43, name: "Энт", level: 15, hp: 700, damage: 180, armor: 90, evasion: 10, critChance: 20, critPower: 70, experience: 890, time: 1000 },
      { id: 44, name: "Сумеречный жнец", level: 15, hp: 550, damage: 170, armor: 30, evasion: 30, critChance: 40, critPower: 200, experience: 890, time: 1000 },
      { id: -1, name: "Тестовый", level: -5, hp: 500, damage: 50, armor: 15, evasion: 10, critChance: 30, critPower: 50, experience: 500, time: 1000 },
      { id: -2, name: "Тестовый", level: -10, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 3200, time: 1000 },
      { id: -3, name: "Тестовый", level: -13, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 6000, time: 1000 },
      { id: -4, name: "Тестовый", level: -17, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 17000, time: 1000 },
      { id: -5, name: "Тестовый", level: -19, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 25800, time: 1000 },
      { id: -6, name: "Тестовый", level: -20, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 32000, time: 1000 },
      { id: -7, name: "Тестовый", level: -200, hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 32000, time: 1000 },
    ]
  }

  randomDrop(enemyId) {
    for (let i = 0; i < this.list.length; i++) {
      if (i == enemyId && this.list[i].level == 1) {
        return { gold: 3, wood: 0, stone: 0, iron: 0 };
      } else if (i == enemyId && this.list[i].level == 2) {
        return { gold: 9, wood: 2, stone: 2, iron: 0 };
      } else if (i == enemyId && this.list[i].level == 3) {
        return { gold: 20, wood: 3, stone: 3, iron: 2 };
      } else if (i == enemyId && this.list[i].level == 4) {
        return { gold: 32, wood: 4, stone: 4, iron: 3 };
      } else if (i == enemyId && this.list[i].level == 5) {
        return { gold: 45, wood: 5, stone: 5, iron: 5 };
      } else if (i == enemyId && this.list[i].level == 6) {
        return { gold: 56, wood: 5, stone: 5, iron: 5 };
      } else if (i == enemyId && this.list[i].level == 7) {
        return { gold: 64, wood: 5, stone: 5, iron: 5 };
      } else if (i == enemyId && this.list[i].level == 8) {
        return { gold: 78, wood: 5, stone: 5, iron: 5 };
      } else if (i == enemyId && this.list[i].level == 9) {
        return { gold: 90, wood: 7, stone: 7, iron: 5 };
      } else if (i == enemyId && this.list[i].level == 10) {
        return { gold: 110, wood: 8, stone: 8, iron: 6 };
      } else if (i == enemyId && this.list[i].level == 11) {
        return { gold: 124, wood: 9, stone: 9, iron: 7 };
      } else if (i == enemyId && this.list[i].level == 12) {
        return { gold: 140, wood: 9, stone: 9, iron: 7 };
      } else if (i == enemyId && this.list[i].level == 13) {
        return { gold: 160, wood: 10, stone: 10, iron: 8 };
      } else if (i == enemyId && this.list[i].level == 14) {
        return { gold: 178, wood: 10, stone: 10, iron: 8 };
      } else if (i == enemyId && this.list[i].level == 15) {
        return { gold: 195, wood: 12, stone: 12, iron: 10 };
      } else if (this.list[i].level < 0) {
        return { gold: 100000, wood: 100000, stone: 100000, iron: 100000 };
      }
    }
  }
}

export default new enemies();