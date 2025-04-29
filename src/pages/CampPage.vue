<template>
  <div class="container camp-container">
    <div class="buildings-block">
      <ul class="buildings-list">
        <li
          class="buildings__item"
          v-for="(building, index) in currentBuildings"
          :key="index"
        >
          <div class="buildings-box">
            <div class="buildings-title_box">
              <h4 class="buildings__title">{{ building.name }}</h4>
              <span class="buildings__level"
                >{{ building.currentLevel }} Ур.</span
              >
            </div>
            <p class="buildings__desc">{{ building.desc }}</p>
          </div>
          <div class="buildings-btn_box">
            <base-button
              class="buildings__btn enter_btn"
              v-if="building.id != 1061"
              >Войти</base-button
            >
            <base-button class="buildings__btn enter_btn" v-else
              >Использовать</base-button
            >
            <base-button
              class="buildings__btn"
              v-if="building.currentLevel < building.maxLevel"
              >Улучшить</base-button
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import camp from "@/game/camp";

export default {
  name: "CampPage",
  extends: {},
  props: {},
  data() {
    return {
      allBuildings: [],
      playerBuildings: {},
      currentBuildings: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    getData() {
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
      this.currentBuildings[4].currentLevel =
        this.playerBuildings.currentLevel4;
      this.currentBuildings[5].currentLevel =
        this.playerBuildings.currentLevel5;
    },
  },
  beforeCreate() {},
  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped>
.camp-container {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  height: 70vh;
  overflow: auto;
}
.buildings-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.buildings__item {
  align-content: center;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
}
.buildings-btn_box {
  display: flex;
}
.enter_btn {
  margin-right: 30px;
}
.buildings-title_box {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  min-height: 50px;
}
.buildings__title {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 200px;
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
.buildings__desc {
  margin-bottom: 15px;
}
.buildings__btn {
  border: 1px solid var(--color-dark);
  border-radius: 5px;
}
.buildings__btn:hover {
  background-color: var(--color-green);
  font-weight: 900;
  color: var(--color-light);
  border: 1px solid var(--color-light);
}
</style>