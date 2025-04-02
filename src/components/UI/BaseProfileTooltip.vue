<template>
  <div class="tooltip">
    <span class="tooltip__info"
      >{{ $store.state.playerExperience }} / {{ nextLevelExperience }}</span
    >
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";

export default {
  name: "base-profile-tooltip",
  extends: {},
  props: {
    tooltip: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { nextLevelExperience: 0 };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {
    const experienceList = player.experienceForLevel;

    if (this.$store.state.playerLevel >= experienceList.length + 1) {
      const lastLevel = experienceList.length - 1;
      this.nextLevelExperience = experienceList[lastLevel];
    } else {
      for (let i = 0; i < experienceList.length; i++) {
        if (this.$store.state.playerLevel - 1 == i) {
          this.nextLevelExperience = experienceList[i];
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
  top: -50%;
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
