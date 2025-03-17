<template>
  <div>
    <transition name="fade">
      <div class="tooltip">
        {{ tooltip.text }}
      </div>
    </transition>
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
  methods: {},
  beforeCreate() {},
  mounted() {},
};
</script>

<style>
.tooltip {
  position: absolute;
  top: 0;
  right: 0;
  padding: 3px 5px;
  font-size: 15px;
  color: var(--color-dark);
  border-radius: 5px;
  background-color: var(--color-light);
  transform: translateY(-130%);
}
.tooltip::after {
  content: "";
  position: absolute;
  right: 12%;
  top: 100%;
  border: 5px solid transparent;
  border-top: 5px solid var(--color-light);
}
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s ease;
  opacity: 1;
}
.fade-leave-active {
  transition: all 0.3s ease;
  opacity: 0;
}
</style>
