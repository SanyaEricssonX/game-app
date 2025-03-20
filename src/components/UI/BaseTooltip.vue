<template>
  <div
    class="tooltip"
    :class="{ position: positionTooltip('top') }"
    :style="tooltipStyle"
    ref="tooltip"
  >
    <p class="desc" v-for="paragraph in tooltip.text" :key="paragraph.id">
      {{ paragraph }}
    </p>
    <base-button
      class="btn"
      :class="{ active: btnColor('red') }"
      @click="useItem"
      >{{ tooltip.btnText }}</base-button
    >
  </div>
</template>

<script type="text/javascript">
export default {
  name: "base-tooltip",
  extends: {},
  props: {
    tooltip: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tooltipStyle: {
        transform: "",
      },
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    btnColor(color) {
      return this.tooltip.btnColor == color;
    },
    positionTooltip(position) {
      return this.tooltip.position == position;
    },
    useItem() {
      this.$emit("use");
    },
    updateTooltipStyle() {
      const tooltipElement = this.$refs.tooltip;
      if (tooltipElement && this.tooltip.position != "top") {
        const height = tooltipElement.offsetHeight;
        const newTransform = [];

        // Меняем transform в зависимости от высоты тултипа
        if (height <= 180) {
          newTransform.push("translateY(-140%)");
        } else if (height > 180 && height <= 200) {
          newTransform.push("translateY(-135%)");
        } else if (height > 200 && height <= 240) {
          newTransform.push("translateY(-130%)");
        } else if (height > 240 && height <= 280) {
          newTransform.push("translateY(-125%)");
        } else if (height > 280 && height <= 300) {
          newTransform.push("translateY(-123%)");
        } else if (height > 300 && height <= 320) {
          newTransform.push("translateY(-122%)");
        } else if (height > 320 && height <= 360) {
          newTransform.push("translateY(-120%)");
        }

        // Обновляем стиль
        this.tooltipStyle.transform = newTransform.join(" ");
      }
    },
  },
  beforeCreate() {},
  mounted() {
    this.updateTooltipStyle();
    window.addEventListener("resize", this.updateTooltipStyle);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.updateTooltipStyle);
  },
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  top: 100%;
  right: 0;
  padding: 10px 15px;
  max-height: 360px;
  font-size: 18px;
  color: var(--color-dark);
  border: 2px solid var(--color-dark);
  border-radius: 2px;
  background-color: var(--color-light);
  transform: translateY(-140%);
  z-index: 1000;
}
.tooltip::after {
  content: "";
  position: absolute;
  right: 9%;
  top: 100%;
  border: 9px solid transparent;
  border-top: 9px solid var(--color-light);
  z-index: 1000;
}
.desc {
  width: 250px;
}
.desc:nth-child(1) {
  font-family: Bahnschrift;
  font-weight: 900;
  font-size: 20px;
}
.desc:not(:last-child) {
  margin-bottom: 10px;
}
.btn {
  padding: 7px 15px;
  margin-top: 5px;
  border: 1px solid var(--color-dark);
  font-size: 16px;
}
.btn:hover {
  background-color: var(--color-green);
}
.position {
  transform: translateY(+5%);
}
.position::after {
  content: "";
  right: 6%;
  top: unset;
  bottom: 99%;
  border: 9px solid transparent;
  border-bottom: 9px solid var(--color-light);
}
.active:hover {
  background-color: var(--color-red);
  color: var(--color-light);
  font-weight: 900;
}
</style>
