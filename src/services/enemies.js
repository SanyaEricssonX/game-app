class enemies {

  constructor() {
    this.list = [
      { id: 0, name: "Скелет", level: 1, hp: 30, damage: 5, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, image: "skeleton.webp", time: 1000 },
      { id: 1, name: "Зомби", level: 1, hp: 50, damage: 3, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, image: "zombie.webp", time: 1000 },
      { id: 2, name: "Гоблин", level: 1, hp: 40, damage: 4, armor: 1, evasion: 10, critChance: 0, critPower: 0, experience: 10, image: "goblin.webp", time: 1000 },
      { id: 3, name: "Орк", level: 2, hp: 70, damage: 8, armor: 2, evasion: 10, critChance: 10, critPower: 50, experience: 30, image: "orc.webp", time: 1000 },
      { id: 4, name: "Волк", level: 2, hp: 50, damage: 10, armor: 2, evasion: 20, critChance: 30, critPower: 30, experience: 30, image: "wolf.webp", time: 1000 },
      { id: 5, name: "Скелет-лучник", level: 2, hp: 30, damage: 15, evasion: 10, critChance: 10, critPower: 50, armor: 2, experience: 30, image: "skeleton_archer.webp", time: 1000 },
      { id: 6, name: "Медведь", level: 3, hp: 100, damage: 22, armor: 3, evasion: 10, critChance: 20, critPower: 30, experience: 70, image: "bear.webp", time: 1000 },
      { id: 7, name: "Разбойник", level: 3, hp: 80, damage: 30, armor: 3, evasion: 20, critChance: 10, critPower: 30, experience: 70, image: "robber.webp", time: 1000 },
      { id: 8, name: "Арахнид", level: 3, hp: 90, damage: 25, armor: 3, evasion: 10, critChance: 10, critPower: 50, experience: 70, image: "arachnid.webp", time: 1000 },
      { id: 9, name: "Наемник", level: 4, hp: 120, damage: 40, armor: 4, evasion: 30, critChance: 30, critPower: 70, experience: 100, image: "mercenary.webp", time: 1000 },
      { id: 10, name: "Шаман орков", level: 4, hp: 120, damage: 35, armor: 7, evasion: 20, critChance: 20, critPower: 50, experience: 100, image: "orc_shaman.webp", time: 1000 },
      { id: 11, name: "Кентавр", level: 4, hp: 130, damage: 30, armor: 10, evasion: 10, critChance: 20, critPower: 50, experience: 100, image: "centaur.webp", time: 1000 },
      { id: 12, name: "Лич", level: 5, hp: 170, damage: 50, armor: 5, evasion: 20, critChance: 20, critPower: 50, experience: 150, time: 1000 },
      { id: 13, name: "Медведь зомби", level: 5, hp: 180, damage: 40, armor: 10, evasion: 10, critChance: 30, critPower: 70, experience: 150, time: 1000 },
      { id: 14, name: "Тролль", level: 5, hp: 200, damage: 40, armor: 15, evasion: 10, critChance: 20, critPower: 30, experience: 150, time: 1000 },
      { id: 15, name: "Адская гончая", level: 6, hp: 180, damage: 50, armor: 3, evasion: 20, critChance: 30, critPower: 50, experience: 180, time: 1000 },
      { id: 16, name: "Призрак", level: 6, hp: 160, damage: 45, armor: 15, evasion: 40, critChance: 20, critPower: 30, experience: 180, time: 1000 },
      { id: 17, name: "Ведьма", level: 6, hp: 180, damage: 60, armor: 7, evasion: 10, critChance: 30, critPower: 70, experience: 180, time: 1000 },
      { id: 18, name: "Архилич", level: 7, hp: 200, damage: 70, armor: 10, evasion: 10, critChance: 20, critPower: 50, experience: 200, time: 1000 },
      { id: 19, name: "Циклоп", level: 7, hp: 250, damage: 50, armor: 10, evasion: 10, critChance: 20, critPower: 70, experience: 200, time: 1000 },
      { id: 20, name: "Металлический голем", level: 7, hp: 250, damage: 45, armor: 30, evasion: 5, critChance: 20, critPower: 50, experience: 200, time: 1000 },
      { id: 21, name: "Виверна", level: 8, hp: 220, damage: 75, armor: 10, evasion: 40, critChance: 20, critPower: 70, experience: 240, time: 1000 },
      { id: 22, name: "Эльф лучник", level: 8, hp: 180, damage: 80, armor: 5, evasion: 30, critChance: 40, critPower: 150, experience: 240, time: 1000 },
      { id: 23, name: "Минотавр", level: 8, hp: 240, damage: 65, armor: 20, evasion: 20, critChance: 20, critPower: 100, experience: 240, time: 1000 },
      { id: 24, name: "Элементаль земли", level: 9, hp: 260, damage: 70, armor: 40, evasion: 10, critChance: 20, critPower: 50, experience: 280, time: 1000 },
      { id: 25, name: "Элементаль воздуха", level: 9, hp: 230, damage: 100, armor: 10, evasion: 30, critChance: 20, critPower: 70, experience: 280, time: 1000 },
      { id: 26, name: "Элементаль воды", level: 9, hp: 200, damage: 80, armor: 10, evasion: 40, critChance: 30, critPower: 100, experience: 280, time: 1000 },
      { id: 27, name: "Элементаль огня", level: 10, hp: 240, damage: 130, armor: 15, evasion: 30, critChance: 20, critPower: 100, experience: 320, time: 1000 },
      { id: 28, name: "Гигант", level: 10, hp: 300, damage: 80, armor: 50, evasion: 10, critChance: 20, critPower: 100, experience: 320, time: 1000 },
      { id: 29, name: "Бес", level: 10, hp: 260, damage: 110, armor: 20, evasion: 20, critChance: 20, critPower: 70, experience: 320, time: 1000 },
      { id: 30, name: "Дварф страж", level: 11, hp: 320, damage: 95, armor: 60, evasion: 20, critChance: 20, critPower: 70, experience: 360, time: 1000 },
      { id: 31, name: "Демон", level: 11, hp: 300, damage: 100, armor: 15, evasion: 20, critChance: 30, critPower: 100, experience: 360, time: 1000 },
      { id: 32, name: "Ледяной тролль", level: 11, hp: 290, damage: 130, armor: 30, evasion: 10, critChance: 20, critPower: 100, experience: 360, time: 1000 },
      { id: 33, name: "Высший эльф", level: 12, hp: 240, damage: 150, armor: 20, evasion: 30, critChance: 30, critPower: 150, experience: 400, time: 1000 },
      { id: 34, name: "Болотная тварь", level: 12, hp: 350, damage: 100, armor: 50, evasion: 10, critChance: 20, critPower: 70, experience: 400, time: 1000 },
      { id: 35, name: "Виверна зомби", level: 12, hp: 310, damage: 130, armor: 30, evasion: 30, critChance: 30, critPower: 100, experience: 400, time: 1000 },
      { id: 36, name: "Демон крови", level: 13, hp: 400, damage: 170, armor: 50, evasion: 25, critChance: 25, critPower: 100, experience: 480, time: 1000 },
      { id: 37, name: "Темный эльф ассассин", level: 13, hp: 350, damage: 155, armor: 30, evasion: 30, critChance: 35, critPower: 175, experience: 480, time: 1000 },
      { id: 38, name: "Кракен", level: 13, hp: 500, damage: 130, armor: 70, evasion: 10, critChance: 20, critPower: 100, experience: 480, time: 1000 },
      { id: 39, name: "Лесной дух", level: 14, hp: 460, damage: 150, armor: 50, evasion: 30, critChance: 20, critPower: 70, experience: 540, time: 1000 },
      { id: 40, name: "Живой доспех", level: 14, hp: 530, damage: 130, armor: 80, evasion: 10, critChance: 20, critPower: 70, experience: 540, time: 1000 },
      { id: 41, name: "Вампир", level: 14, hp: 480, damage: 160, armor: 30, evasion: 25, critChance: 25, critPower: 100, experience: 540, time: 1000 },
      { id: 42, name: "Насмешник", level: 15, hp: 100, damage: 200, armor: 150, evasion: 80, critChance: 30, critPower: 100, experience: 600, time: 1000 },
      { id: 43, name: "Энт", level: 15, hp: 700, damage: 180, armor: 90, evasion: 10, critChance: 20, critPower: 70, experience: 600, time: 1000 },
      { id: 44, name: "Сумеречный жнец", level: 15, hp: 550, damage: 170, armor: 30, evasion: 30, critChance: 40, critPower: 200, experience: 600, time: 1000 },
      { id: 45, name: "Монстроглаз", level: 16, hp: 780, damage: 190, armor: 110, evasion: 10, critChance: 20, critPower: 100, experience: 660, time: 1000 },
      { id: 46, name: "Огромный арахнид охотник", level: 16, hp: 550, damage: 210, armor: 90, evasion: 10, critChance: 30, critPower: 120, experience: 660, time: 1000 },
      { id: 47, name: "Баньши", level: 16, hp: 1050, damage: 150, armor: 120, evasion: 20, critChance: 30, critPower: 70, experience: 660, time: 1000 },
      { id: 48, name: "Кентавр зомби", level: 17, hp: 800, damage: 220, armor: 65, evasion: 20, critChance: 30, critPower: 120, experience: 700, time: 1000 },
      { id: 49, name: "Лютоволк", level: 17, hp: 600, damage: 240, armor: 50, evasion: 30, critChance: 20, critPower: 150, experience: 700, time: 1000 },
      { id: 50, name: "Горный великан", level: 17, hp: 1000, damage: 180, armor: 100, evasion: 20, critChance: 20, critPower: 100, experience: 700, time: 1000 },
      { id: 51, name: "Элементаль льда", level: 18, hp: 860, damage: 230, armor: 80, evasion: 30, critChance: 20, critPower: 120, experience: 760, time: 1000 },
      { id: 52, name: "Демон берсерк", level: 18, hp: 700, damage: 260, armor: 60, evasion: 30, critChance: 25, critPower: 150, experience: 760, time: 1000 },
      { id: 53, name: "Снежный великан", level: 18, hp: 1200, damage: 170, armor: 150, evasion: 20, critChance: 30, critPower: 120, experience: 760, time: 1000 },
      { id: 54, name: "Дварф отшельник", level: 18, hp: 900, damage: 240, armor: 40, evasion: 40, critChance: 25, critPower: 100, experience: 820, time: 1000 },
      { id: 55, name: "Ледяной демон", level: 18, hp: 780, damage: 270, armor: 80, evasion: 20, critChance: 25, critPower: 120, experience: 820, time: 1000 },
      { id: 56, name: "Темный паладин", level: 18, hp: 1100, damage: 200, armor: 180, evasion: 10, critChance: 20, critPower: 150, experience: 820, time: 1000 },
      { id: 57, name: "Снежный буйвол", level: 19, hp: 960, damage: 250, armor: 40, evasion: 30, critChance: 30, critPower: 200, experience: 900, time: 1000 },
      { id: 58, name: "Снежный барс зомби", level: 19, hp: 500, damage: 280, armor: 90, evasion: 40, critChance: 30, critPower: 100, experience: 900, time: 1000 },
      { id: 59, name: "Древний циклоп", level: 19, hp: 1320, damage: 220, armor: 200, evasion: 10, critChance: 20, critPower: 120, experience: 900, time: 1000 },
      { id: 60, name: "Снежный оборотень", level: 20, hp: 1000, damage: 300, armor: 70, evasion: 15, critChance: 30, critPower: 170, experience: 1100, time: 1000 },
      { id: 61, name: "Мастер ассассин", level: 20, hp: 720, damage: 260, armor: 40, evasion: 35, critChance: 25, critPower: 300, experience: 1100, time: 1000 },
      { id: 62, name: "Демон полководец", level: 20, hp: 1500, damage: 210, armor: 225, evasion: 15, critChance: 25, critPower: 120, experience: 1100, time: 1000 },
      { id: 63, name: "Тестовый(4)", level: 1, type: "test", hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 300, time: 1000 },
      { id: 64, name: "Тестовый(7)", level: 1, type: "test", hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 1200, time: 1000 },
      { id: 65, name: "Тестовый(10)", level: 1, type: "test", hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 3200, time: 1000 },
      { id: 66, name: "Тестовый(13)", level: 1, type: "test", hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 6500, time: 1000 },
      { id: 67, name: "Тестовый(17)", level: 1, type: "test", hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 17000, time: 1000 },
      { id: 68, name: "Тестовый(20)", level: 1, type: "test", hp: 1, damage: 0, armor: 0, evasion: 10, critChance: 0, critPower: 0, experience: 32000, time: 1000 },
    ]
  }

  randomDrop(enemyId) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id == enemyId) {
        if (this.list[i].level == 1 && !this.list[i].type) {
          return { gold: 3, wood: 0, stone: 0, iron: 0 };
        } else if (this.list[i].level == 2) {
          return { gold: 9, wood: 2, stone: 2, iron: 0 };
        } else if (this.list[i].level == 3) {
          return { gold: 15, wood: 3, stone: 3, iron: 2 };
        } else if (this.list[i].level == 4) {
          return { gold: 22, wood: 4, stone: 4, iron: 3 };
        } else if (this.list[i].level == 5) {
          return { gold: 30, wood: 5, stone: 5, iron: 5 };
        } else if (this.list[i].level == 6) {
          return { gold: 38, wood: 5, stone: 5, iron: 5 };
        } else if (this.list[i].level == 7) {
          return { gold: 42, wood: 5, stone: 5, iron: 5 };
        } else if (this.list[i].level == 8) {
          return { gold: 50, wood: 5, stone: 5, iron: 5 };
        } else if (this.list[i].level == 9) {
          return { gold: 58, wood: 7, stone: 7, iron: 5 };
        } else if (this.list[i].level == 10) {
          return { gold: 64, wood: 8, stone: 8, iron: 6 };
        } else if (this.list[i].level == 11) {
          return { gold: 72, wood: 9, stone: 9, iron: 7 };
        } else if (this.list[i].level == 12) {
          return { gold: 80, wood: 9, stone: 9, iron: 7 };
        } else if (this.list[i].level == 13) {
          return { gold: 100, wood: 10, stone: 10, iron: 8 };
        } else if (this.list[i].level == 14) {
          return { gold: 110, wood: 10, stone: 10, iron: 8 };
        } else if (this.list[i].level == 15) {
          return { gold: 120, wood: 12, stone: 12, iron: 10 };
        } else if (this.list[i].level == 16) {
          return { gold: 130, wood: 12, stone: 12, iron: 10 };
        } else if (this.list[i].level == 17) {
          return { gold: 150, wood: 13, stone: 13, iron: 12 };
        } else if (this.list[i].level == 18) {
          return { gold: 165, wood: 13, stone: 13, iron: 12 };
        } else if (this.list[i].level == 19) {
          return { gold: 180, wood: 14, stone: 14, iron: 14 };
        } else if (this.list[i].level == 20) {
          return { gold: 200, wood: 15, stone: 15, iron: 15 };
        } else if (this.list[i].level == 1 && this.list[i].type) {
          return { gold: 100000, wood: 100000, stone: 100000, iron: 100000 };
        }
      }
    }
  }
}

export default new enemies();