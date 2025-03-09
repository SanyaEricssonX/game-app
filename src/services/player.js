/* eslint-disable no-unused-vars */

import store from "../store";

class player {
  constructor() {
    this.experienceForLevel = [30, 150, 300, 500, 800, 1200, 1700, 2300, 3000, 3800, 4700, 5700, 6800, 8000, 9300, 10700, 12200, 13800, 15500];
  }

  playerLevel() {
    for (let i = 0; i < this.experienceForLevel.length; i++) {
      if (store.state.playerExperience >= this.experienceForLevel[i] && store.state.playerExperience < this.experienceForLevel[i + 1]) {
        store.state.playerLevel = i + 2;
        localStorage.setItem("playerLevel", store.state.playerLevel);
      }
    }
  }
}

export default new player();
