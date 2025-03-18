<template>
  <div class="tooltip">
    <p class="desc" v-for="paragraph in tooltip.text" :key="paragraph.id">
      {{ paragraph }}
    </p>
    <base-button class="btn" :class="{ active: btnColor('red') }" @click="useItem">{{
      tooltip.btnText
    }}</base-button>
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
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    btnColor(color) {
      return this.tooltip.btnColor == color;
    },
    useItem() {
      this.$emit("use");
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.tooltip {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 15px;
  font-size: 18px;
  color: var(--color-dark);
  border-radius: 2px;
  background-color: var(--color-light);
  transform: translateY(-100%);
}
.tooltip::after {
  content: "";
  position: absolute;
  right: 9%;
  top: 100%;
  border: 9px solid transparent;
  border-top: 9px solid var(--color-light);
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
.active:hover {
  background-color: var(--color-red);
  color: var(--color-light);
  font-weight: 900;
}
</style>
