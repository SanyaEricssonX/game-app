export default class Enemies {

  constructor() {
    this.enemies = [
      { id: 0, name: "Скелет", level: 1, hp: 30, damage: 5, experience: 100 },
      { id: 1, name: "Зомби", level: 1, hp: 50, damage: 3, experience: 10 },
      { id: 2, name: "Гоблин", level: 1, hp: 40, damage: 4, experience: 10 },
      { id: 3, name: "Орк", level: 2, hp: 70, damage: 8, experience: 30 },
      { id: 4, name: "Волк", level: 2, hp: 50, damage: 10, experience: 30 },
      { id: 5, name: "Скелет-лучник", level: 2, hp: 30, damage: 15, experience: 30 },
      { id: 6, name: "Медведь", level: 3, hp: 100, damage: 22, experience: 80 },
      { id: 7, name: "Разбойник", level: 3, hp: 80, damage: 30, experience: 80 },
      { id: 8, name: "Арахнид", level: 3, hp: 90, damage: 25, experience: 80 }
    ]
  }

  randomDrop(enemyId) {
    for (let i = 0; i < this.enemies.length; i++) {
      if (i == enemyId && this.enemies[i].level == 1) {
        return { gold: 3, wood: 0, stone: 0, iron: 0 };
      } else if (i == enemyId && this.enemies[i].level == 2) {
        return { gold: 10, wood: 2, stone: 2, iron: 0 };
      } else if (i == enemyId && this.enemies[i].level == 3) {
        return { gold: 25, wood: 5, stone: 5, iron: 2 }
      }
    }
  }

  getEnemies() {
    return this.enemies;
  }
}