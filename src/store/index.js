import { createStore } from "vuex";

export default createStore({
  state: {
    triggerSortEnemies: false,
    triggerUpdateInventory: false,
    playerExperience: 0,
    playerLevel: 1,
    playerMaxHp: 100,
    playerCurrentHp: 100,
    playerDamage: 10,
    playerArmor: 5,
    playerInventorySize: 50,
    playerGold: 0,
    playerResources: { wood: 0, stone: 0, iron: 0 },
    defaultPlayerCharacteristics: { damage: 10, armor: 5, hp: 100 },
    playerEquipmentCharacteristics: { damage: 0, armor: 0, hp: 0 },
    playerLevelCharacteristics: { damage: 0, armor: 0, hp: 0 },
    playerBuffCharacteristics: { damage: 0, armor: 0, hp: 0, drop: 0, damageBuffDuration: 0, armorBuffDuration: 0, hpBuffDuration: 0, dropBuffDuration: 0 },
    playerInventory: [],
    playerEquipment: { weapon: 0, helmet: 0, upper: 0, lower: 0, gloves: 0, boots: 0, weaponDurability: 0, helmetDurability: 0, upperDurability: 0, lowerDurability: 0, glovesDurability: 0, bootsDurability: 0 },
    levelIsUp: false,
    modalNotification: { visible: false, text: "Ошибка" },
  },
  getters: {},
  mutations: {
    setTriggerMethod(state, value) {
      state.triggerSortEnemies = value;
      state.triggerUpdateInventory = value;
    }
  },
  actions: {
    triggerSortEnemies({ commit }) {
      commit("setTriggerMethod", true);
      setTimeout(() => commit("setTriggerMethod", false), 1000);
    },
    triggerUpdateInventory({ commit }) {
      commit("setTriggerMethod", true);
      setTimeout(() => commit("setTriggerMethod", false), 1000);
    }
  },
  modules: {},
});
