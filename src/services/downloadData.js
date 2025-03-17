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
  if (localStorage.getItem("playerGold") != null) {
    store.state.playerGold = Number(localStorage.getItem("playerGold"));
  } else {
    store.state.playerGold = 0;
  }
  if (localStorage.getItem("resourcesWood") != null) {
    store.state.playerResources.wood = Number(localStorage.getItem("resourcesWood"));
  } else {
    store.state.playerResources.wood = 0;
  }
  if (localStorage.getItem("resourcesStone") != null) {
    store.state.playerResources.stone = Number(localStorage.getItem("resourcesStone"));
  } else {
    store.state.playerResources.stone = 0;
  }
  if (localStorage.getItem("resourcesIron") != null) {
    store.state.playerResources.iron = Number(localStorage.getItem("resourcesIron"));
  } else {
    store.state.playerResources.iron = 0;
  }
  if (localStorage.getItem("playerInventory") != null) {
    store.state.playerInventory = JSON.parse(localStorage.getItem("playerInventory"));
  } else {
    store.state.playerInventory = [];
  }
}