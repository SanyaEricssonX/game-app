import { createStore } from "vuex";

export default createStore({
  state: {
    count: 1,
    playerExperience: 0,
    playerLevel: 1,
    playerMaxHp: 100,
    playerCurrentHp: 100,
    playerDamage: 10,
    playerArmor: 5,
    playerGold: 0,
    playerResources: {wood: 0, stone: 0, iron: 0}
  },
  getters: {},
  mutations: {
    // setPlayerCurrentHp(state, newValue) {
    //   state.playerCurrentHp = newValue;
    // }
  },
  actions: {},
  modules: {},
});
