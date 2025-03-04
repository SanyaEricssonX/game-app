<template>
  <footer class="header">
    <div class="container header-container">
      <span class="logo">
        <a class="logo__text" @click="goToHomePage">RA</a>
      </span>
      <ul class="nav-list">
        <li class="nav__item"><a href="" class="nav__link">Инвентарь</a></li>
        <li class="nav__item"><a href="" class="nav__link">Магазин</a></li>
        <li class="nav__item"><a href="" class="nav__link">Карта</a></li>
        <li class="nav__item"><a href="" class="nav__link">Помощь</a></li>
      </ul>
    </div>
  </footer>
</template>

<script type="text/javascript">
export default {
  name: "app-header",
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
  mounted() {},
};
</script>

<style scoped>
.header-container {
  display: flex;
  padding: 25px 0;
}
.logo {
  display: block;
  margin-right: auto;
  padding-right: 2px;
  width: 50px;
  height: 50px;
  text-align: right;
  align-content: center;
  background-color: var(--color-light);
  color: var(--color-dark);
  cursor: pointer;
}
.nav-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav__item {
  padding: 5px;
}
.nav__item:not(:last-child) {
  margin-right: 50px;
}
.nav__item:hover {
}
.nav__link {
  color: var(--color-light);
  font-family: Bahnschrift;
}
</style>
