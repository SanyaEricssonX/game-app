<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "base-loader",
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
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-light);
  border-top: 5px solid var(--color-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
