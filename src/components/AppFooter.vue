<template>
  <footer class="footer">
    <div class="container footer-container">
      <small class="copyright">
        © 2025 Red Avalanche. Project in development.
      </small>
      <small class="version">{{ currentVersion }}</small>
    </div>
  </footer>
</template>

<script type="text/javascript">
export default {
  name: "app-footer",
  extends: {},
  props: {},
  data() {
    return {
      currentVersion: process.env.VUE_APP_VERSION || "1.0.0",
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  height: 30px;
}
</style>
