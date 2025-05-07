<template>
  <div class="container camp-container">
    <div class="camp-nav">
      <base-button
        class="camp__btn"
        v-if="currentPosition != 0"
        @click="currentPosition = 0"
        >Назад</base-button
      >
      <div class="nav-block" v-else>
        <div class="nav-box">
          <h4 class="nav-box__title">Текущая локация:</h4>
          <h4 class="nav-box__location">{{ currentLocationName }}</h4>
        </div>
        <base-button
          class="nav-block__btn"
          v-if="currentLocationName != 'Лагерь'"
          @click="returnToCamp"
          >Вернуться в лагерь</base-button
        >
      </div>
    </div>

    <div class="buildings-block" v-if="currentPosition == 0">
      <ul class="buildings-list">
        <li
          class="buildings__item"
          v-for="(building, index) in currentBuildings"
          :key="index"
        >
          <div
            class="buildings--closed"
            v-if="
              building.id != 1061 && $store.state.playerCurrentLocation != 9990
            "
          >
            <h4 class="buildings--closed__heading">
              Недоступно пока вы не в лагере!
            </h4>
          </div>
          <div class="buildings-left_box">
            <div class="buildings-box">
              <div class="buildings-title_box">
                <h4 class="buildings__title">{{ building.name }}</h4>
                <span class="buildings__level"
                  >{{ building.currentLevel }} Ур.</span
                >
              </div>
            </div>
            <p class="buildings__desc">{{ building.desc }}</p>
            <div class="buildings-btn_box">
              <div
                class="upgrade-box"
                v-if="building.currentLevel < building.maxLevel"
              >
                <h4 class="upgrade-box__heading">Улучшение</h4>
                <div class="upgrade_box__desc" v-if="building.upgradeDesc">
                  <span class="building__upgrade_title"
                    >Ур. {{ building.currentLevel + 1 }}:</span
                  >
                  <p
                    class="building__upgrade_desc"
                    v-for="(line, index) in buildingUpgradeDesc(
                      building.upgradeDesc,
                      building.currentLevel
                    )"
                    :key="index"
                  >
                    {{ line }}
                  </p>
                </div>
                <div
                  class="buildings-cost_box"
                  v-if="building.currentLevel < building.maxLevel"
                >
                  <div class="cost_box__resources">
                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).gold !=
                        0
                      "
                      >Золото:
                      {{
                        buildingCost(building.id, building.currentLevel).gold
                      }}</span
                    >
                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).wood !=
                        0
                      "
                      >Древесина:
                      {{
                        buildingCost(building.id, building.currentLevel).wood
                      }}</span
                    >
                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel)
                          .stone != 0
                      "
                      >Камень:
                      {{
                        buildingCost(building.id, building.currentLevel).stone
                      }}</span
                    >
                    <span
                      class="buildings__cost"
                      v-if="
                        buildingCost(building.id, building.currentLevel).iron !=
                        0
                      "
                      >Железо:
                      {{
                        buildingCost(building.id, building.currentLevel).iron
                      }}</span
                    >
                  </div>
                  <base-button
                    class="buildings__btn"
                    v-if="building.currentLevel == 0"
                    @click="upgradeThisBuilding(building.id)"
                    >Построить</base-button
                  >
                  <base-button
                    class="buildings__btn"
                    v-else-if="
                      building.currentLevel > 0 &&
                      building.currentLevel < building.maxLevel
                    "
                    @click="upgradeThisBuilding(building.id)"
                    >Улучшить</base-button
                  >
                </div>
              </div>
              <base-button
                class="buildings__btn enter_btn"
                v-if="building.currentLevel > 0"
                @click="currentPosition = building.id"
                >Войти</base-button
              >
            </div>
          </div>
          <div class="buildings-right_box">
            <img
              class="buildings__img"
              :src="getImage(building.image)"
              :alt="building.id"
              v-if="building.image != ''"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="building-block" v-else-if="currentPosition == 1060">
      <building-headquartes />
    </div>
    <div class="building-block" v-else-if="currentPosition == 1061">
      <building-healers-cart />
    </div>
    <div class="building-block" v-else-if="currentPosition == 1062">
      Кузница
    </div>
    <div class="building-block" v-else-if="currentPosition == 1063">Рынок</div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import camp from "@/game/camp";
import map from "@/services/map";
import BuildingHeadquartes from "@/components/BuildingHeadquartes";
import BuildingHealersCart from "@/components/BuildingHealersCart";

export default {
  name: "CampPage",
  extends: {},
  props: {},
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
      let playerCurrentLocation =
        Number(localStorage.getItem("playerCurrentLocation")) ||
        this.$store.state.playerCurrentLocation;

      if (playerCurrentLocation != 9990) {
        const currentLocation = map.locationList.filter(
          (map) => map.id == playerCurrentLocation
        );
        return currentLocation[0].name;
      }
      return "Лагерь";
    },
  },
  components: { BuildingHeadquartes, BuildingHealersCart },
  watch: {},
  methods: {
    updateCampData() {
      this.allBuildings = JSON.parse(JSON.stringify(camp.buildings));
      this.playerBuildings =
        JSON.parse(localStorage.getItem("playerBuildings")) ||
        this.$store.state.playerBuildings;

      this.currentBuildings = this.allBuildings;

      this.currentBuildings[0].currentLevel =
        this.playerBuildings.currentLevel0;

      this.currentBuildings[1].currentLevel =
        this.playerBuildings.currentLevel1;

      this.currentBuildings[2].currentLevel =
        this.playerBuildings.currentLevel2;

      this.currentBuildings[3].currentLevel =
        this.playerBuildings.currentLevel3;

      // this.currentBuildings[4].currentLevel =
      //   this.playerBuildings.currentLevel4;

      // this.currentBuildings[5].currentLevel =
      //   this.playerBuildings.currentLevel2;
    },

    getImage(key) {
      if (key != 0 && typeof key == "string") {
        return require(`@/assets/images/${key}`);
      } else {
        return 0;
      }
    },

    buildingCost(buildingId, buildingCurrentLevel) {
      return camp.buildingUpgradeCost(buildingId, buildingCurrentLevel);
    },

    buildingUpgradeDesc(buildingDescArray, buildingCurrentLevel) {
      const text = buildingDescArray[buildingCurrentLevel];
      if (!text) return []; // Если нет текста, возвращаем пустой массив

      // Разбиваем по точке, убираем пустые строки, обрезаем пробелы
      return text
        .split(".")
        .filter((line) => line.trim())
        .map((line) => line.trim());
    },

    upgradeThisBuilding(buildingId) {
      switch (buildingId) {
        case 1060:
          this.$store.state.playerBuildings.currentLevel0 += 1;
          break;
        case 1061:
          this.$store.state.playerBuildings.currentLevel1 += 1;
          localStorage.removeItem("healthFountain");
          break;
        case 1062:
          this.$store.state.playerBuildings.currentLevel2 += 1;
          break;
        case 1063:
          this.$store.state.playerBuildings.currentLevel3 += 1;
          break;
        case 1064:
          this.$store.state.playerBuildings.currentLevel4 += 1;
          break;
        case 1065:
          this.$store.state.playerBuildings.currentLevel5 += 1;
          break;
        default:
          break;
      }
      localStorage.setItem(
        "playerBuildings",
        JSON.stringify(this.$store.state.playerBuildings)
      );

      camp.headquartesCharacteristics();
      downloadData();

      this.updateCampData();
    },

    returnToCamp() {
      this.$store.state.playerCurrentLocation = 9990;
      localStorage.setItem("playerCurrentLocation", 9990);

    }
  },
  beforeCreate() {},
  created() {
    this.updateCampData();
  },
  mounted() {},
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
  background-color: var(--color-dark);
  border: 1px solid var(--color-light);
  color: var(--color-light);
}
.nav-block {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background-color: var(--color-green);
  border: 2px solid var(--color-dark);
  border-radius: 5px;
  color: var(--color-light);
  font-weight: 900;
  font-size: 17px;
}
.nav-block__btn:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.buildings-block {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  height: 72vh;
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
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}
.buildings-left_box {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.buildings__item:not(:last-child) {
  margin-bottom: 30px;
}
.buildings-title_box {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 50px;
}
.buildings__title {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 20px;
  color: var(--color-dark);
  background-color: var(--color-light);
}
.buildings__level {
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid var(--color-dark);
  line-height: 1;
  color: var(--color-dark);
  background-color: var(--color-light);
}
.buildings-btn_box {
  display: flex;
  justify-content: end;
  flex-direction: column;
}
.upgrade-box {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: var(--color-light);
  color: var(--color-dark);
  line-height: 1.2;
  font-weight: 900;
  border-radius: 5px;
}
.upgrade-box__heading {
  margin-bottom: 10px;
}
.upgrade_box__desc {
  margin-bottom: 15px;
}
.building__upgrade_title {
  font-family: Bahnschrift, sans-serif;
  color: var(--color-green);
}
.buildings__btn {
  padding: 7px 10px;
  background-color: var(--color-green);
  border: 2px solid var(--color-dark);
  border-radius: 5px;
  color: var(--color-light);
  font-weight: 900;
  font-size: 17px;
}
.buildings__btn:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.enter_btn {
  margin-top: 15px;
}
.buildings-cost_box {
  display: flex;
  justify-content: space-between;
}
.cost_box__resources {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.buildings__img {
  width: 340px;
  height: 450px;
}
.building-block {
  display: flex;
  flex-direction: column;
  padding: 20px 30px;
  height: 75vh;
  overflow: auto;
}
.buildings--closed {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.7);
}
.buildings--closed__heading {
  padding: 10px 15px;
  background-color: var(--color-dark);
  border-radius: 7px;
  color: var(--color-red);
}
</style>