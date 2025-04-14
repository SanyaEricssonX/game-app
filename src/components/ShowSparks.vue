<template>
  <div class="sparks-container">
    <div
      v-for="(spark, index) in sparks"
      :key="index"
      class="spark"
      :style="{
        left: `${spark.x}px`,
        top: `${spark.y}px`,
        width: `${spark.size}px`,
        height: `${spark.size}px`,
        backgroundColor: spark.color,
        transform: `rotate(${spark.rotation}deg)`,
        animation: `sparkAnimation ${spark.duration}s ease-out forwards`,
      }"
    ></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "show-sparks",
  props: {
    count: {
      type: Number,
      default: 30,
    },
    colors: {
      type: Array,
      default: () => ["#ffeb3b", "#ff9800", "#ff5722", "#f44336", "#4fc3f7"],
    },
  },
  data() {
    return {
      sparks: [],
    };
  },
  methods: {
    createSparks() {
      this.sparks = [];
      for (let i = 0; i < this.count; i++) {
        this.sparks.push({
          x: 50 + (Math.random() * 20 - 10),
          y: 50 + (Math.random() * 20 - 10),
          size: 3 + Math.random() * 4,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          duration: 0.5 + Math.random() * 1,
        });
      }
    },
  },
  mounted() {
    this.createSparks();
  },
};
</script>

<style scoped>
.sparks-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 100000000;
}

.spark {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}

@keyframes sparkAnimation {
  0% {
    opacity: 1;
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(
        calc((var(--random-x) - 0.5) * 150px),
        calc((var(--random-y) - 0.5) * 150px)
      )
      rotate(360deg) scale(0);
  }
}

.spark::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: currentColor;
  border-radius: inherit;
  filter: blur(2px);
}
</style>