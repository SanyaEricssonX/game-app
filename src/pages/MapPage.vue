<template>
  <div class="container map-container">
    <div class="enemy-block" v-if="!selectedEnemy && !isBattleEnd">
      <h3 class="enemy-block__header">Найдены противники:</h3>
      <div class="enemies" v-for="enemy in enemies" :key="enemy.id">
        <base-button @click="startBattle(enemy)">
          {{ enemy.name }}
        </base-button>
      </div>
    </div>
    <div class="battle-block" v-else-if="selectedEnemy && !isBattleEnd">
      Битва в разгаре
    </div>
    <div class="result-block" v-else>
      <ul class="result-list" v-for="log in battleLog" :key="log.id">
        <li class="result__item">{{ log }}</li>
      </ul>
      <base-button @click="resetSelection">Найти нового противника</base-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { startBattle } from "@/services/battleLogic";
import enemies from "@/services/enemies";
import { downloadData } from "@/services/downloadData";
import player from "@/services/player";

export default {
  name: "MapPage",
  extends: {},
  props: {
    enemy: Object,
  },
  data() {
    return {
      result: null,
      battleLog: [],
      selectedEnemy: null,
      isBattleEnd: false,
      enemies: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    async startBattle(enemy) {
      this.selectedEnemy = enemy;
      const battleResult = startBattle(
        this.$store.state.playerCurrentHp,
        this.$store.state.playerDamage,
        enemy
      );

      setTimeout(() => {
        this.battleLog = battleResult.log;

        // Оставшееся ХП
        if (battleResult.currentHp > 0) {
          localStorage.setItem("playerCurrentHp", battleResult.currentHp);
        } else {
          localStorage.setItem("playerCurrentHp", 0);
        }

        // Опыт
        this.$store.state.playerExperience += battleResult.experience;
        localStorage.setItem(
          "playerExperience",
          this.$store.state.playerExperience
        );
        player.playerCharacteristics();

        // Дроп
        const drop = enemies.randomDrop(enemy.id);
        this.$store.state.playerGold += Math.floor(
          Math.random() * drop.gold + 1
        );
        if (drop.wood != 0) {
          this.$store.state.playerResources.wood += Math.floor(
            Math.random() * (drop.wood - 1 + 1) + 1
          );
        }
        if (drop.stone != 0) {
          this.$store.state.playerResources.stone += Math.floor(
            Math.random() * (drop.stone - 1 + 1) + 1
          );
        }
        if (drop.iron != 0) {
          this.$store.state.playerResources.iron += Math.floor(
            Math.random() * (drop.iron - 1 + 1) + 1
          );
        }
        localStorage.setItem("playerGold", this.$store.state.playerGold);
        localStorage.setItem(
          "resourcesWood",
          this.$store.state.playerResources.wood
        );
        localStorage.setItem(
          "resourcesStone",
          this.$store.state.playerResources.stone
        );
        localStorage.setItem(
          "resourcesIron",
          this.$store.state.playerResources.iron
        );

        downloadData();
        this.isBattleEnd = true;
      }, 3000);
    },
    resetSelection() {
      this.selectedEnemy = null;
      this.battleLog = [];
      this.isBattleEnd = false;
    },
  },
  beforeCreate() {},
  created() {
    this.enemies = enemies.enemies;
  },
  mounted() {},
};
</script>

<style scoped>
.map-container {
  display: flex;
}
.result {
  max-width: 200px;
}
.result__item {
  margin-bottom: 15px;
}
</style>
