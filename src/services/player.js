/* eslint-disable no-unused-vars */

import store from "../store";

class player {
  constructor() {
    this.experienceForLevel = [30, 150, 300, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500];
    this.increaseDamagePerLevel = [2, 5, 9, 12, 16, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
  }

  playerCharacteristics() {
    this.playerLevel();
    this.playerDamage();
  }

  playerLevel() {
    for (let i = 0; i < this.experienceForLevel.length; i++) {
      if (store.state.playerExperience >= this.experienceForLevel[i] && store.state.playerExperience < this.experienceForLevel[i + 1]) {
        store.state.playerLevel = i + 2;
        localStorage.setItem("playerLevel", store.state.playerLevel);
      }
    }
  }

  playerDamage() {
    for (let i = 0; i < this.increaseDamagePerLevel.length; i++) {
      if (store.state.playerLevel == i + 2) {
        store.state.playerDamage = store.state.defaultPlayerDamage + this.increaseDamagePerLevel[i];
        localStorage.setItem("playerDamage", store.state.playerDamage);
      }
    }
  }
}

export default new player();
