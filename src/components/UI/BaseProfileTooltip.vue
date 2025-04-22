<template>
  <div class="tooltip" v-if="visible">
    <span class="tooltip__info" v-if="content === 'level'">
      {{ $store.state.playerExperience - previousLevelExperience }} /
      {{ nextLevelExperience - previousLevelExperience }}
    </span>
    <span class="tooltip__info" v-else-if="content === 'armor'">
      Входящий урон снижен на {{ decreasePlayerDamage }}%
    </span>
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";

export default {
  name: "base-profile-tooltip",
  extends: {},
  props: {
    content: { type: String, default: "" },
    visible: { type: Boolean, default: false },
  },
  data() {
    return {
      nextLevelExperience: 0,
      previousLevelExperience: 0,
      decreaseDamage: 0,
    };
  },
  computed: {
    decreasePlayerDamage() {
      return Math.floor(player.decreaseDamage(this.$store.state.playerArmor));
    },
  },
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {
    const experienceList = player.experienceForLevel;

    if (this.$store.state.playerLevel >= experienceList.length + 1) {
      this.nextLevelExperience = this.$store.state.playerExperience;
      this.previousLevelExperience = this.$store.state.playerExperience;
    } else {
      for (let i = 0; i < experienceList.length; i++) {
        if (this.$store.state.playerLevel - 1 == i) {
          this.nextLevelExperience = experienceList[i];
          if (this.$store.state.playerLevel > 1) {
            this.previousLevelExperience = experienceList[i - 1];
          }
        }
      }
    }
  },
  beforeUnmount() {},
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  display: flex;
  align-items: center;
  top: -15%;
  left: 0;
  padding: 10px 15px;
  width: 190px;
  height: 50px;
  font-size: 18px;
  color: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: 2px;
  background-color: var(--color-light);
  transform: translateY(58%);
  z-index: 1000;
}
.tooltip::after {
  content: "";
  position: absolute;
  top: unset;
  bottom: 99%;
  border: 6px solid transparent;
  border-bottom: 6px solid var(--color-light);
  z-index: 1000;
}
.tooltip__info {
  text-align: center;
  width: 100%;
}
</style>
