<template>
  <div class="container camp-container">
    <div class="camp-nav">
      <base-button
        class="camp__btn"
        v-if="currentPosition !== 0"
        @click="currentPosition = 0"
      >
        Назад
      </base-button>

      <div class="nav-block" v-else>
        <div class="nav-box">
          <h4 class="nav-box__title">Текущая локация:</h4>
          <h4 class="nav-box__location">{{ currentLocationName }}</h4>
        </div>

        <base-button
          class="nav-block__btn"
          v-if="currentLocationName !== 'Лагерь'"
          @click="returnToCamp"
        >
          Вернуться в лагерь
        </base-button>
      </div>
    </div>

    <div class="buildings-block" v-if="currentPosition === 0">
      <ul class="buildings-list">
        <li
          class="buildings__item"
          v-for="building in currentBuildings"
          :key="building.id"
        >
          <div
            class="buildings--closed"
            v-if="
              building.id !== 1061 &&
              $store.state.playerCurrentLocation !== 9990
            "
          >
            <h4 class="buildings--closed__heading">
              Недоступно, пока вы не в лагере!
            </h4>
          </div>

          <div class="buildings-left_box">
            <div class="buildings-box">
              <div class="buildings-title_box">
                <h4 class="buildings__title">{{ building.name }}</h4>

                <span class="buildings__level">
                  {{ building.currentLevel }} Ур.
                </span>
              </div>
            </div>

            <p class="buildings__desc">{{ building.desc }}</p>

            <div class="buildings-btn_box">
              <div
                class="upgrade-box"
                v-if="building.currentLevel < building.maxLevel"
              >
                <h4 class="upgrade-box__heading">Улучшение</h4>

                <div
                  class="upgrade_box__desc"
                  v-if="building.upgradeDesc && building.upgradeDesc.length"
                >
                  <span class="building__upgrade_title">
                    Ур. {{ building.currentLevel + 1 }}:
                  </span>

                  <p
                    class="building__upgrade_desc"
                    v-for="(line, index) in buildingUpgradeDesc(
                      building.upgradeDesc,
                      building.currentLevel,
                    )"
                    :key="index"
                  >
                    {{ line }}
                  </p>
                </div>

                <div class="buildings-cost_box">
                  <div class="cost_box__resources">
                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).gold >
                        0
                      "
                    >
                      Золото:
                      {{
                        buildingCost(building.id, building.currentLevel).gold
                      }}
                    </span>

                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).wood >
                        0
                      "
                    >
                      Древесина:
                      {{
                        buildingCost(building.id, building.currentLevel).wood
                      }}
                    </span>

                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).stone >
                        0
                      "
                    >
                      Камень:
                      {{
                        buildingCost(building.id, building.currentLevel).stone
                      }}
                    </span>

                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).iron >
                        0
                      "
                    >
                      Железо:
                      {{
                        buildingCost(building.id, building.currentLevel).iron
                      }}
                    </span>
                  </div>

                  <base-button
                    class="buildings__btn"
                    :disabled="!canUpgradeBuilding(building)"
                    @click="upgradeThisBuilding(building.id)"
                  >
                    {{ building.currentLevel === 0 ? "Построить" : "Улучшить" }}
                  </base-button>
                </div>

                <p
                  class="upgrade-box__not-enough"
                  v-if="!canUpgradeBuilding(building)"
                >
                  Недостаточно ресурсов.
                </p>
              </div>

              <div class="building-max-level" v-else>
                Достигнут максимальный уровень.
              </div>

              <base-button
                class="buildings__btn enter_btn"
                v-if="building.currentLevel > 0"
                @click="currentPosition = building.id"
              >
                Войти
              </base-button>
            </div>
          </div>

          <div class="buildings-right_box">
            <img
              class="buildings__img"
              :src="getImage(building.image)"
              :alt="building.name"
              v-if="building.image"
            />
          </div>
        </li>
      </ul>
    </div>

    <div class="building-block" v-else-if="currentPosition === 1060">
      <building-headquartes />
    </div>

    <div class="building-block" v-else-if="currentPosition === 1061">
      <building-healers-cart />
    </div>

    <div class="building-block" v-else-if="currentPosition === 1062">
      <building-forge @show-modal="showModal" />
    </div>

    <div class="building-block" v-else-if="currentPosition === 1063">
      <building-market />
    </div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import camp from "@/game/camp";
import map from "@/services/map";
import BuildingHeadquartes from "@/components/BuildingHeadquartes";
import BuildingHealersCart from "@/components/BuildingHealersCart";
import BuildingForge from "@/components/BuildingForge";
import BuildingMarket from "@/components/BuildingMarket.vue";

export default {
  name: "CampPage",

  components: {
    BuildingHeadquartes,
    BuildingHealersCart,
    BuildingForge,
    BuildingMarket,
  },

  data() {
    return {
      allBuildings: [],
      playerBuildings: {},
      currentBuildings: [],
      currentPosition: 0,
    };
  },

  computed: {
    currentLocationName() {
      const playerCurrentLocation =
        Number(localStorage.getItem("playerCurrentLocation")) ||
        this.$store.state.playerCurrentLocation;

      if (playerCurrentLocation !== 9990) {
        const currentLocation = map.locationList.find(
          (location) => location.id === playerCurrentLocation,
        );

        return currentLocation ? currentLocation.name : "Неизвестная локация";
      }

      return "Лагерь";
    },
  },

  methods: {
    updateCampData() {
      this.allBuildings = JSON.parse(JSON.stringify(camp.buildings));

      this.playerBuildings =
        JSON.parse(localStorage.getItem("playerBuildings") || "null") ||
        this.$store.state.playerBuildings;

      this.currentBuildings = this.allBuildings.map((building, index) => {
        return {
          ...building,
          currentLevel: Number(
            this.playerBuildings[`currentLevel${index}`] || 0,
          ),
        };
      });
    },

    getImage(key) {
      if (key && typeof key === "string") {
        return require(`@/assets/images/${key}`);
      }

      return "";
    },

    buildingCost(buildingId, buildingCurrentLevel) {
      return camp.buildingUpgradeCost(buildingId, buildingCurrentLevel);
    },

    buildingUpgradeDesc(buildingDescArray, buildingCurrentLevel) {
      const text = buildingDescArray[buildingCurrentLevel];

      if (!text) {
        return [];
      }

      return text
        .split(".")
        .map((line) => line.trim())
        .filter((line) => line);
    },

    canUpgradeBuilding(building) {
      if (!building || building.currentLevel >= building.maxLevel) {
        return false;
      }

      const cost = this.buildingCost(building.id, building.currentLevel);

      return (
        this.$store.state.playerGold >= cost.gold &&
        this.$store.state.playerResources.wood >= cost.wood &&
        this.$store.state.playerResources.stone >= cost.stone &&
        this.$store.state.playerResources.iron >= cost.iron
      );
    },

    showNotEnoughResourcesModal() {
      this.$store.state.modalNotification.text =
        "Недостаточно ресурсов для строительства или улучшения постройки.";
      this.$store.state.modalNotification.from = "camp";
      this.$store.state.modalNotification.visible = true;

      this.showModal();
    },

    upgradeThisBuilding(buildingId) {
      const building = this.currentBuildings.find(
        (currentBuilding) => currentBuilding.id === buildingId,
      );

      if (!building || building.currentLevel >= building.maxLevel) {
        return;
      }

      if (!this.canUpgradeBuilding(building)) {
        this.showNotEnoughResourcesModal();
        return;
      }

      const cost = this.buildingCost(building.id, building.currentLevel);

      this.$store.state.playerGold -= cost.gold;
      this.$store.state.playerResources.wood -= cost.wood;
      this.$store.state.playerResources.stone -= cost.stone;
      this.$store.state.playerResources.iron -= cost.iron;

      const buildingLevelKeys = {
        1060: "currentLevel0",
        1061: "currentLevel1",
        1062: "currentLevel2",
        1063: "currentLevel3",
        1064: "currentLevel4",
        1065: "currentLevel5",
      };

      const buildingLevelKey = buildingLevelKeys[buildingId];

      if (!buildingLevelKey) {
        return;
      }

      this.$store.state.playerBuildings[buildingLevelKey] += 1;

      localStorage.setItem("playerGold", this.$store.state.playerGold);

      localStorage.setItem(
        "playerResources",
        JSON.stringify(this.$store.state.playerResources),
      );

      localStorage.setItem(
        "playerBuildings",
        JSON.stringify(this.$store.state.playerBuildings),
      );

      camp.syncHeadquartersCharacteristics();

      downloadData();

      this.updateCampData();
    },

    returnToCamp() {
      this.$store.state.playerCurrentLocation = 9990;
      localStorage.setItem("playerCurrentLocation", "9990");
    },

    showModal() {
      this.$emit("show-modal");
    },
  },

  created() {
    camp.syncHeadquartersCharacteristics();
    downloadData();
    this.updateCampData();
  },
};
</script>

<style scoped>
.camp-container {
  padding: 0;
}

.camp-nav {
  padding: 20px 0 20px 30px;
}

.camp__btn {
  padding: 7px 10px;
  border: 1px solid var(--color-dark);
}

.camp__btn:hover {
  border: 1px solid var(--color-light);
  background-color: var(--color-dark);
  color: var(--color-light);
}

.nav-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-box {
  display: flex;
}

.nav-box__title {
  margin-right: 10px;
}

.nav-box__location {
  color: var(--color-blue);
}

.nav-block__btn {
  border: 2px solid var(--color-dark);
  border-radius: 5px;
  background-color: var(--color-green);
  color: var(--color-light);
  font-size: 17px;
  font-weight: 900;
}

.nav-block__btn:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}

.buildings-block {
  display: flex;
  flex-direction: column;
  height: 72vh;
  padding: 20px 30px;
  overflow: auto;
}

.buildings-list {
  display: flex;
  flex-direction: column;
}

.buildings__item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.buildings__item:not(:last-child) {
  margin-bottom: 30px;
}

.buildings-left_box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
}

.buildings-title_box {
  display: flex;
  align-items: center;
  min-height: 50px;
  width: 100%;
}

.buildings__title {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--color-light);
  color: var(--color-dark);
  font-size: 20px;
}

.buildings__level {
  padding: 6px 10px;
  border: 1px solid var(--color-dark);
  border-radius: 5px;
  background-color: var(--color-light);
  color: var(--color-dark);
  line-height: 1;
}

.buildings__desc {
  margin: 15px 0;
  line-height: 1.45;
}

.buildings-btn_box {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

.upgrade-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--color-light);
  color: var(--color-dark);
  font-weight: 900;
  line-height: 1.2;
}

.upgrade-box__heading {
  margin-bottom: 10px;
}

.upgrade_box__desc {
  margin-bottom: 15px;
}

.building__upgrade_title {
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
}

.building__upgrade_desc {
  margin-top: 5px;
}

.buildings-cost_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.cost_box__resources {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.buildings__btn {
  padding: 7px 10px;
  border: 2px solid var(--color-dark);
  border-radius: 5px;
  background-color: var(--color-green);
  color: var(--color-light);
  font-size: 17px;
  font-weight: 900;
}

.buildings__btn:hover:not(:disabled) {
  background-color: var(--color-light);
  color: var(--color-dark);
}

.buildings__btn:disabled {
  border-color: #777;
  background-color: #999;
  color: #ddd;
  cursor: not-allowed;
}

.upgrade-box__not-enough {
  margin-top: 10px;
  color: var(--color-red);
  font-size: 14px;
}

.building-max-level {
  padding: 10px;
  border-radius: 5px;
  background-color: var(--color-light);
  color: var(--color-green);
  font-weight: 900;
}

.enter_btn {
  margin-top: 15px;
}

.buildings__img {
  width: 340px;
  height: 450px;
  object-fit: cover;
}

.building-block {
  display: flex;
  flex-direction: column;
  height: 70vh;
  padding: 20px 30px;
  overflow: auto;
}

.buildings--closed {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.7);
}

.buildings--closed__heading {
  padding: 10px 15px;
  border-radius: 7px;
  background-color: var(--color-dark);
  color: var(--color-red);
}

@media (max-width: 900px) {
  .buildings__item {
    flex-direction: column;
  }

  .buildings-left_box {
    width: 100%;
  }

  .buildings-right_box {
    margin-top: 20px;
  }

  .buildings__img {
    width: 100%;
    height: auto;
    max-height: 450px;
    object-fit: contain;
  }
}

@media (max-width: 560px) {
  .nav-block,
  .buildings-cost_box {
    flex-direction: column;
    align-items: flex-start;
  }

  .camp-nav,
  .buildings-block,
  .building-block {
    padding-right: 15px;
    padding-left: 15px;
  }
}
</style>
