<template>
  <div class="progress-bar">
    <div
      class="progress"
      :style="{ width: progressWidth, backgroundColor: progressColor }"
    ></div>
    <div class="progress-text">{{ currentValue }} / {{ maxValue }}</div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "base-progress",
  extends: {},
  props: {
    currentValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    progressWidth() {
      const percentage = (this.currentValue / this.maxValue) * 100;
      return `${percentage}%`;
    },
    progressColor() {
      return this.currentValue / this.maxValue < 0.3
        ? "var(--color-red)"
        : "var(--color-green)";
    },
  },
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.progress-bar {
  width: 100%;
  border-radius: 2px;
  border: 1px solid var(--color-light);
  position: relative;
}

.progress {
  height: 20px;
  border-radius: 2px;
  transition: width 3s;
}

.progress-text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 0;
  font-family: Bahnschrift;
  line-height: 20px;
  font-weight: 900;
}
</style>
