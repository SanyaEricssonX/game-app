import { createStore } from "vuex";

export default createStore({
  state: {
    triggerSortEnemies: false,
    triggerUpdateInventory: false,
    triggerUpdateShop: false,
    playerExperience: 0,
    playerLevel: 1,
    playerMaxHp: 100,
    playerCurrentHp: 100,
    playerDamage: 10,
    playerArmor: 5,
    playerEvasion: 10,
    playerMaxEvasion: 50,
    playerMaxCritPower: 250,
    playerCritChance: 5,
    playerCritPower: 30,
    playerProfession: "standart",
    playerInventorySize: 50,
    playerCurrentLocation: 9990,
    playerGold: 0,
    playerResources: { wood: 0, stone: 0, iron: 0 },
    defaultPlayerCharacteristics: { damage: 10, armor: 5, hp: 100, evasion: 10, critChance: 5, critPower: 30 },
    playerEquipmentCharacteristics: { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0 },
    playerLevelCharacteristics: { damage: 0, armor: 0, hp: 0 },
    playerBuffCharacteristics: { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0, drop: 0, damageBuffDuration: 0, armorBuffDuration: 0, hpBuffDuration: 0, evasionBuffDuration: 0, critChanceBuffDuration: 0, critPowerBuffDuration: 0, dropBuffDuration: 0 },
    playerProfessionCharacteristics: { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0 },
    playerInventory: [],
    playerCraftInventory: [],
    playerEquipment: { weapon: 0, helmet: 0, upper: 0, lower: 0, gloves: 0, boots: 0, weaponDurability: 0, helmetDurability: 0, upperDurability: 0, lowerDurability: 0, glovesDurability: 0, bootsDurability: 0 },
    levelIsUp: false,
    professionIsChosen: false,
    modalNotification: { visible: false, text: "", from: "", resources: {gold: 0, wood: 0, stone: 0, iron: 0} },
    menuContent: 1,
  },
  getters: {},
  mutations: {
    setTriggerMethod(state, value) {
      state.triggerSortEnemies = value;
      state.triggerUpdateInventory = value;
      state.triggerUpdateShop = value;
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
    },
    triggerUpdateShop({ commit }) {
      commit("setTriggerMethod", true);
      setTimeout(() => commit("setTriggerMethod", false), 1000);
    }
  },
  modules: {},
});
