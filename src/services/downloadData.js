import store from "../store";
import camp from "../game/camp";

function getNumberFromStorage(key, defaultValue) {
  const value = localStorage.getItem(key);

  if (value !== null) {
    return Number(value);
  }

  return defaultValue;
}

function getObjectFromStorage(key, defaultValue) {
  const value = localStorage.getItem(key);

  if (value !== null) {
    return JSON.parse(value);
  }

  return defaultValue;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function downloadData() {
  store.state.playerExperience = getNumberFromStorage("playerExperience", 0);
  store.state.playerLevel = getNumberFromStorage("playerLevel", 1);

  store.state.playerMaxHp = getNumberFromStorage("playerMaxHp", 100);
  store.state.playerCurrentHp = getNumberFromStorage("playerCurrentHp", 100);

  store.state.playerDamage = getNumberFromStorage("playerDamage", 10);
  store.state.playerArmor = getNumberFromStorage("playerArmor", 5);
  store.state.playerEvasion = getNumberFromStorage("playerEvasion", 10);
  store.state.playerCritChance = getNumberFromStorage("playerCritChance", 5);
  store.state.playerCritPower = getNumberFromStorage("playerCritPower", 30);

  store.state.playerProfession =
    localStorage.getItem("playerProfession") || "standart";

  store.state.playerCurrentLocation = getNumberFromStorage(
    "playerCurrentLocation",
    9990,
  );

  store.state.playerGold = getNumberFromStorage("playerGold", 0);

  store.state.playerResources = getObjectFromStorage("playerResources", {
    wood: 0,
    stone: 0,
    iron: 0,
  });

  store.state.playerInventory = getObjectFromStorage("playerInventory", []);
  store.state.playerCraftInventory = getObjectFromStorage(
    "playerCraftInventory",
    [],
  );

  store.state.playerInventorySize = getNumberFromStorage(
    "playerInventorySize",
    50,
  );

  store.state.playerEquipment = getObjectFromStorage("playerEquipment", {
    weapon: 0,
    helmet: 0,
    upper: 0,
    lower: 0,
    gloves: 0,
    boots: 0,
    weaponDurability: 0,
    helmetDurability: 0,
    upperDurability: 0,
    lowerDurability: 0,
    glovesDurability: 0,
    bootsDurability: 0,
  });

  store.state.playerLevelCharacteristics = getObjectFromStorage(
    "playerLevelCharacteristics",
    {
      damage: 0,
      armor: 0,
      hp: 0,
    },
  );

  store.state.playerEquipmentCharacteristics = getObjectFromStorage(
    "playerEquipmentCharacteristics",
    {
      damage: 0,
      armor: 0,
      hp: 0,
      evasion: 0,
      critChance: 0,
      critPower: 0,
    },
  );

  store.state.playerBuffCharacteristics = getObjectFromStorage(
    "playerBuffCharacteristics",
    {
      damage: 0,
      armor: 0,
      hp: 0,
      evasion: 0,
      critChance: 0,
      critPower: 0,
      drop: 0,
      damageBuffDuration: 0,
      armorBuffDuration: 0,
      hpBuffDuration: 0,
      evasionBuffDuration: 0,
      critChanceBuffDuration: 0,
      critPowerBuffDuration: 0,
      dropBuffDuration: 0,
    },
  );

  store.state.playerProfessionCharacteristics = getObjectFromStorage(
    "playerProfessionCharacteristics",
    {
      damage: 0,
      armor: 0,
      hp: 0,
      evasion: 0,
      critChance: 0,
      critPower: 0,
    },
  );

  store.state.accountStatus =
    localStorage.getItem("accountStatus") || "Стандарт+";

  store.state.playerBuildings = getObjectFromStorage("playerBuildings", {
    currentLevel0: 0,
    currentLevel1: 0,
    currentLevel2: 0,
    currentLevel3: 0,
    currentLevel4: 0,
    currentLevel5: 0,
  });

  camp.syncHeadquartersCharacteristics();

  const baseDamage = store.state.playerDamage;
  const baseArmor = store.state.playerArmor;
  const baseMaxHp = store.state.playerMaxHp;
  const baseEvasion = store.state.playerEvasion;
  const baseCritChance = store.state.playerCritChance;
  const baseCritPower = store.state.playerCritPower;

  const levelCharacteristics = store.state.playerLevelCharacteristics;
  const equipmentCharacteristics = store.state.playerEquipmentCharacteristics;
  const buffCharacteristics = store.state.playerBuffCharacteristics;
  const professionCharacteristics = store.state.playerProfessionCharacteristics;
  const headquartersCharacteristics =
    store.state.playerHeadquartesCharacteristics;

  const damageBeforeMultipliers =
    baseDamage +
    Number(levelCharacteristics.damage || 0) +
    Number(equipmentCharacteristics.damage || 0);

  const headquartersDamageMultiplier =
    1 + Number(headquartersCharacteristics.damage || 0) / 100;

  const professionDamageMultiplier =
    1 + Number(professionCharacteristics.damage || 0) / 100;

  store.state.playerDamage = Math.floor(
    damageBeforeMultipliers *
      headquartersDamageMultiplier *
      professionDamageMultiplier +
      Number(buffCharacteristics.damage || 0),
  );

  const armorBeforeProfession =
    baseArmor +
    Number(levelCharacteristics.armor || 0) +
    Number(equipmentCharacteristics.armor || 0);

  const professionArmorMultiplier =
    1 + Number(professionCharacteristics.armor || 0) / 100;

  store.state.playerArmor = Math.floor(
    armorBeforeProfession * professionArmorMultiplier +
      Number(buffCharacteristics.armor || 0),
  );

  const hpBeforeProfession =
    baseMaxHp +
    Number(levelCharacteristics.hp || 0) +
    Number(equipmentCharacteristics.hp || 0);

  const professionHpMultiplier =
    1 + Number(professionCharacteristics.hp || 0) / 100;

  store.state.playerMaxHp = Math.floor(
    hpBeforeProfession * professionHpMultiplier +
      Number(buffCharacteristics.hp || 0),
  );

  store.state.playerEvasion =
    baseEvasion +
    Number(equipmentCharacteristics.evasion || 0) +
    Number(professionCharacteristics.evasion || 0) +
    Number(buffCharacteristics.evasion || 0);

  store.state.playerCritChance =
    baseCritChance +
    Number(equipmentCharacteristics.critChance || 0) +
    Number(professionCharacteristics.critChance || 0) +
    Number(buffCharacteristics.critChance || 0);

  store.state.playerCritPower =
    baseCritPower +
    Number(equipmentCharacteristics.critPower || 0) +
    Number(professionCharacteristics.critPower || 0) +
    Number(headquartersCharacteristics.critPower || 0) +
    Number(buffCharacteristics.critPower || 0);

  if (
    store.state.playerProfession === "assassin" ||
    store.state.playerProfession === "reaper" ||
    store.state.playerProfession === "pathfinder"
  ) {
    store.state.playerMaxEvasion = 60;
    localStorage.setItem("playerMaxEvasion", "60");
  } else {
    store.state.playerMaxEvasion = getNumberFromStorage("playerMaxEvasion", 50);
  }

  if (
    store.state.playerProfession === "knight" ||
    store.state.playerProfession === "templar" ||
    store.state.playerProfession === "titan"
  ) {
    store.state.playerEvasion = 10;
    localStorage.setItem("playerEvasion", "10");
  }

  store.state.playerEvasion = clamp(
    store.state.playerEvasion,
    0,
    store.state.playerMaxEvasion,
  );

  store.state.playerCritChance = clamp(store.state.playerCritChance, 0, 100);

  store.state.playerCritPower = clamp(
    store.state.playerCritPower,
    0,
    store.state.playerMaxCritPower,
  );

  if (store.state.playerCurrentHp > store.state.playerMaxHp) {
    store.state.playerCurrentHp = store.state.playerMaxHp;
    localStorage.setItem(
      "playerCurrentHp",
      String(store.state.playerCurrentHp),
    );
  }
}
