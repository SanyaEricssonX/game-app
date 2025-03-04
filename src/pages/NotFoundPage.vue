<template>
  <div class="container error-container">
    <h2 class="error__heading">404 - Страница не найдена</h2>
    <base-button @click="goToHomePage">На главную</base-button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "NotFoundPage",
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    goToHomePage() {
      this.$router.push({ name: "Home" }).then(() => {
        location.reload();
      });
    },
  },
  beforeCreate() {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.error__heading {
  margin-bottom: 50px;
  text-align: center;
  font-size: 50px;
  color: red;
}
</style>
