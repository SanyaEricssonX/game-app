import store from "../store";

export function downloadData() {
  if (localStorage.getItem("playerExperience") != null) {
    store.state.playerExperience = Number(localStorage.getItem("playerExperience"));
  } else {
    store.state.playerExperience = 0;
  }
  if (localStorage.getItem("playerLevel") != null) {
    store.state.playerLevel = Number(localStorage.getItem("playerLevel"));
  } else {
    store.state.playerLevel = 1;
  }
  if (localStorage.getItem("playerMaxHp") != null) {
    store.state.playerMaxHp = Number(localStorage.getItem("playerMaxHp"));
  } else {
    store.state.playerMaxHp = 100;
  }
  if (localStorage.getItem("playerCurrentHp") != null) {
    store.state.playerCurrentHp = Number(localStorage.getItem("playerCurrentHp"));
  } else {
    store.state.playerCurrentHp = 100;
  }
  if (localStorage.getItem("playerDamage") != null) {
    store.state.playerDamage = Number(localStorage.getItem("playerDamage"));
  } else {
    store.state.playerDamage = 10;
  }
  if (localStorage.getItem("playerArmor") != null) {
    store.state.playerArmor = Number(localStorage.getItem("playerArmor"));
  } else {
    store.state.playerArmor = 5;
  }
  if (localStorage.getItem("playerEvasion") != null) {
    store.state.playerEvasion = Number(localStorage.getItem("playerEvasion"));
  } else {
    store.state.playerEvasion = 10;
  }
  if (localStorage.getItem("playerCritChance") != null) {
    store.state.playerCritChance = Number(localStorage.getItem("playerCritChance"));
  } else {
    store.state.playerCritChance = 5;
  }
  if (localStorage.getItem("playerCritPower") != null) {
    store.state.playerCritPower = Number(localStorage.getItem("playerCritPower"));
  } else {
    store.state.playerCritPower = 30;
  }
  if (localStorage.getItem("playerProfession") != null) {
    store.state.playerProfession = localStorage.getItem("playerProfession");
  } else {
    store.state.playerProfession = "standart";
  }
  if (localStorage.getItem("playerCurrentLocation") != null) {
    store.state.playerCurrentLocation = Number(localStorage.getItem("playerCurrentLocation"));
  } else {
    store.state.playerCurrentLocation = 9990;
  }
  if (localStorage.getItem("playerGold") != null) {
    store.state.playerGold = Number(localStorage.getItem("playerGold"));
  } else {
    store.state.playerGold = 0;
  }
  if (localStorage.getItem("playerResources") != null) {
    store.state.playerResources = JSON.parse(localStorage.getItem("playerResources"))
  } else {
    store.state.playerResources = { wood: 0, stone: 0, iron: 0 };
  }
  if (localStorage.getItem("playerInventory") != null) {
    store.state.playerInventory = JSON.parse(localStorage.getItem("playerInventory"));
  } else {
    store.state.playerInventory = [];
  }
  if (localStorage.getItem("playerCraftInventory") != null) {
    store.state.playerCraftInventory = JSON.parse(localStorage.getItem("playerCraftInventory"));
  } else {
    store.state.playerCraftInventory = [{ craftItemId: 1044, count: 5 }, { craftItemId: 1030, count: 1 }, { craftItemId: 1031, count: 3 }, { craftItemId: 1032, count: 1 }, { craftItemId: 1040, count: 1 }, { craftItemId: 1041, count: 100 }, { craftItemId: 1042, count: 100 }];
  }
  if (localStorage.getItem("playerInventorySize") != null) {
    store.state.playerInventorySize = Number(localStorage.getItem("playerInventorySize"));
  } else {
    store.state.playerInventorySize = 50;
  }
  if (localStorage.getItem("playerEquipment") != null) {
    store.state.playerEquipment = JSON.parse(localStorage.getItem("playerEquipment"));
  } else {
    store.state.playerEquipment = { weapon: 0, helmet: 0, upper: 0, lower: 0, gloves: 0, boots: 0, weaponDurability: 0, helmetDurability: 0, upperDurability: 0, lowerDurability: 0, glovesDurability: 0, bootsDurability: 0 };
  }
  if (localStorage.getItem("playerLevelCharacteristics") != null) {
    store.state.playerLevelCharacteristics = JSON.parse(localStorage.getItem("playerLevelCharacteristics"));
  } else {
    store.state.playerLevelCharacteristics = { damage: 0, armor: 0, hp: 0 };
  }
  if (localStorage.getItem("playerEquipmentCharacteristics") != null) {
    store.state.playerEquipmentCharacteristics = JSON.parse(localStorage.getItem("playerEquipmentCharacteristics"));
  } else {
    store.state.playerEquipmentCharacteristics = { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0 };
  }
  if (localStorage.getItem("playerBuffCharacteristics") != null) {
    store.state.playerBuffCharacteristics = JSON.parse(localStorage.getItem("playerBuffCharacteristics"));
  } else {
    store.state.playerBuffCharacteristics = { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0, drop: 0, damageBuffDuration: 0, armorBuffDuration: 0, hpBuffDuration: 0, evasionBuffDuration: 0, critChanceBuffDuration: 0, critPowerBuffDuration: 0, dropBuffDuration: 0 };
  }
  if (localStorage.getItem("playerProfessionCharacteristics") != null) {
    store.state.playerProfessionCharacteristics = JSON.parse(localStorage.getItem("playerProfessionCharacteristics"))
  } else {
    store.state.playerProfessionCharacteristics = { damage: 0, armor: 0, hp: 0, evasion: 0, critChance: 0, critPower: 0 };
  }

  // Высчитываем итоговые характеристики после увееличения засчет уровня и надетых предметов, бафов и профессии
  if (store.state.playerProfessionCharacteristics.damage) {
    const damage = store.state.playerDamage +
      store.state.playerLevelCharacteristics.damage +
      store.state.playerEquipmentCharacteristics.damage;

    store.state.playerDamage = damage + Math.floor(damage / 100 * store.state.playerProfessionCharacteristics.damage) + store.state.playerBuffCharacteristics.damage;
  } else {
    store.state.playerDamage = store.state.playerDamage +
      store.state.playerLevelCharacteristics.damage +
      store.state.playerEquipmentCharacteristics.damage +
      store.state.playerBuffCharacteristics.damage;
  }

  if (store.state.playerProfessionCharacteristics.armor) {
    const armor = store.state.playerArmor +
      store.state.playerLevelCharacteristics.armor +
      store.state.playerEquipmentCharacteristics.armor;

    store.state.playerArmor = armor + Math.floor(armor / 100 * store.state.playerProfessionCharacteristics.armor) + store.state.playerBuffCharacteristics.armor;
  } else {
    store.state.playerArmor = store.state.playerArmor +
      store.state.playerLevelCharacteristics.armor +
      store.state.playerEquipmentCharacteristics.armor +
      store.state.playerBuffCharacteristics.armor;
  }

  if (store.state.playerProfessionCharacteristics.hp) {
    const hp = store.state.playerMaxHp +
      store.state.playerLevelCharacteristics.hp +
      store.state.playerEquipmentCharacteristics.hp;

    store.state.playerMaxHp = hp + Math.floor(hp / 100 * store.state.playerProfessionCharacteristics.hp) + store.state.playerBuffCharacteristics.hp;
  } else {
    store.state.playerMaxHp = store.state.playerMaxHp +
      store.state.playerLevelCharacteristics.hp +
      store.state.playerEquipmentCharacteristics.hp +
      store.state.playerBuffCharacteristics.hp;
  }

  if (store.state.playerProfessionCharacteristics.evasion) {
    store.state.playerEvasion = store.state.playerEvasion +
      store.state.playerEquipmentCharacteristics.evasion +
      store.state.playerBuffCharacteristics.evasion +
      store.state.playerProfessionCharacteristics.evasion;
  } else {
    store.state.playerEvasion = store.state.playerEvasion +
      store.state.playerEquipmentCharacteristics.evasion +
      store.state.playerBuffCharacteristics.evasion;
  }

  if (store.state.playerProfessionCharacteristics.critChance) {
    store.state.playerCritChance = store.state.playerCritChance +
      store.state.playerEquipmentCharacteristics.critChance +
      store.state.playerProfessionCharacteristics.critChance +
      store.state.playerBuffCharacteristics.critChance;
  } else {
    store.state.playerCritChance = store.state.playerCritChance +
      store.state.playerEquipmentCharacteristics.critChance +
      store.state.playerBuffCharacteristics.critChance;
  }

  if (store.state.playerProfessionCharacteristics.critPower) {
    store.state.playerCritPower = store.state.playerCritPower +
      store.state.playerEquipmentCharacteristics.critPower +
      store.state.playerProfessionCharacteristics.critPower +
      store.state.playerBuffCharacteristics.critPower;
  } else {
    store.state.playerCritPower = store.state.playerCritPower +
      store.state.playerEquipmentCharacteristics.critPower +
      store.state.playerBuffCharacteristics.critPower;
  }

  if (store.state.playerProfession == "assassin" || store.state.playerProfession == "reaper" || store.state.playerProfession == "pathfinder") {
    store.state.playerMaxEvasion = 60;
    localStorage.setItem("playerMaxEvasion", 60);
  }
  if (store.state.playerProfession == "knight" || store.state.playerProfession == "templar" || store.state.playerProfession == "titan") {
    store.state.playerEvasion = 10;
    localStorage.setItem("playerEvasion", 10);
  }
  if (store.state.playerEvasion > store.state.playerMaxEvasion) {
    store.state.playerEvasion = store.state.playerMaxEvasion;
  } else if (store.state.playerEvasion < 0) {
    store.state.playerEvasion = 0;
  }

  if (store.state.playerCritChance > 100) {
    store.state.playerCritChance = 100;
  } else if (store.state.playerCritChance < 0) {
    store.state.playerCritChance = 0
  }

  if (store.state.playerCritPower > store.state.playerMaxCritPower) {
    store.state.playerCritPower = store.state.playerMaxCritPower;
  } else if (store.state.playerCritPower < 0) {
    store.state.playerCritPower = 0;
  }

  if (store.state.playerCurrentHp > store.state.playerMaxHp) {
    store.state.playerCurrentHp = store.state.playerMaxHp;
    localStorage.setItem("playerCurrentHp", store.state.playerCurrentHp);
  }
}