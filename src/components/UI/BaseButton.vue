<template>
  <button class="btn">
    <slot />
  </button>
</template>

<script type="text/javascript">
export default {
  name: "base-button",
  extends: {},
  props: {},
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
.btn {
  padding: 10px 20px;
  /* border: 1px solid var(--color-light); */
  border-radius: 5px;
  line-height: 1;
  color: var(--color-dark);
  background-color: var(--color-light);
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.2s linear;
}
.btn:active {
  transform: translateY(2px);
}
</style>
