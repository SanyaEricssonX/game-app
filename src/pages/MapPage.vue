<template>
  <div class="container map-container">
    <div class="enemy-block" v-if="!selectedEnemy && !isBattleEnd">
      <h3 class="enemy-block__header">Найдены противники:</h3>
      <div class="enemies" v-for="enemy in sortedEnemies" :key="enemy.id">
        <base-button @click="startBattle(enemy)">
          {{ enemy.name }}
        </base-button>
        <span class="enemy__level">{{ enemy.level }} Lvl</span>
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
  props: {},
  data() {
    return {
      result: null,
      battleLog: [],
      selectedEnemy: null,
      isBattleEnd: false,
      sortedEnemies: [],
    };
  },
  computed: {
    triggerSortEnemies() {
      return this.$store.state.triggerSortEnemies;
    },
  },
  components: {},
  watch: {
    triggerSortEnemies(newValue) {
      if (newValue) {
        this.sortEnemies();
      }
    },
  },
  methods: {
    async startBattle(enemy) {
      this.selectedEnemy = enemy;
      const battleResult = startBattle(
        this.$store.state.playerCurrentHp,
        this.$store.state.playerDamage,
        this.$store.state.playerArmor,
        enemy
      );

      setTimeout(() => {
        this.battleLog = battleResult.log;

        // Оставшееся ХП
        if (battleResult.currentHp > 0) {
          localStorage.setItem("playerCurrentHp", battleResult.currentHp);
        } else {
          player.isDead(battleResult.currentHp);
          downloadData();
          this.isBattleEnd = true;
          return;
        }

        // Опыт
        this.$store.state.playerExperience += battleResult.experience;
        localStorage.setItem(
          "playerExperience",
          this.$store.state.playerExperience
        );
        player.characteristics();
        // Если уровень повысился, то открываем модальное окно
        if (this.$store.state.levelIsUp) {
          this.showModal();
        }

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
        this.sortEnemies();
        this.isBattleEnd = true;
      }, enemy.time);
    },
    resetSelection() {
      this.selectedEnemy = null;
      this.battleLog = [];
      this.isBattleEnd = false;
    },
    sortEnemies() {
      this.sortedEnemies = [];
      for (let i = 0; i < enemies.list.length; i++) {
        if (
          enemies.list[i].level == this.$store.state.playerLevel ||
          enemies.list[i].level == this.$store.state.playerLevel - 1 ||
          enemies.list[i].level == this.$store.state.playerLevel + 1 ||
          enemies.list[i].level < 0
        ) {
          this.sortedEnemies.push(enemies.list[i]);
        }
      }
    },
    showModal() {
      this.$emit("show-modal");
    },
  },
  beforeCreate() {},
  created() {
    this.sortEnemies();
  },
  mounted() {},
};
</script>

<style scoped>
.map-container {
  display: flex;
}
.enemy-block__header {
  margin-bottom: 30px;
}
.result {
  max-width: 200px;
}
.result__item {
  margin-bottom: 15px;
}
.enemy__level {
  margin-left: 3px;
  padding: 10px 10px;
  border-radius: 5px;
  line-height: 1;
  color: var(--color-dark);
  background-color: var(--color-light);
}
</style>
