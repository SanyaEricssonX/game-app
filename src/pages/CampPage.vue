<template>
  <div class="container camp-container">
    <div class="buildings-block">
      <ul class="buildings-list">
        <li
          class="buildings__item"
          v-for="(building, index) in currentBuildings"
          :key="index"
        >
          {{ building }}
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
</style>