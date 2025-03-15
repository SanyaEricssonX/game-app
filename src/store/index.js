import { createStore } from "vuex";

export default createStore({
  state: {
    triggerSortEnemies: false,
    playerExperience: 0,
    playerLevel: 1,
    playerMaxHp: 100,
    playerCurrentHp: 100,
    playerDamage: 10,
    playerArmor: 5,
    playerGold: 0,
    playerResources: { wood: 0, stone: 0, iron: 0 },
    defaultPlayerMaxHp: 100,
    defaultPlayerDamage: 10,
    defaultPlayerArmor: 5,
    playerInventory: [],
    levelIsUp: false,
  },
  getters: {},
  mutations: {
    setTriggerMethod(state, value) {
      state.triggerSortEnemies = value;
    }
  },
  actions: {
    triggerSortEnemies({ commit }) {
      commit("setTriggerMethod", true);
      setTimeout(() => commit("setTriggerMethod", false), 1000);
    }
  },
  modules: {},
});
