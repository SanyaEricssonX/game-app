<template>
  <header class="header">
    <div class="container header-container">
      <span class="logo">
        <a class="logo__text" @click="goToHomePage">RA</a>
      </span>
      <ul class="nav-list">
        <li class="nav__item">
          <a href="" class="nav__link" @click="goToInventoryPage">Инвентарь</a>
        </li>
        <li class="nav__item">
          <a href="" class="nav__link" @click="goToShopPage">Магазин</a>
        </li>
        <li class="nav__item">
          <a href="" class="nav__link" @click="goToMapPage">Карта</a>
        </li>
        <li class="nav__item">
          <a href="" class="nav__link" @click="goToHelpPage">Помощь</a>
        </li>
      </ul>
    </div>
  </header>
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
    goToInventoryPage() {
      this.$router.push({ name: "Inventory" }).then(() => {
        location.reload();
      });
    },
    goToShopPage() {
      this.$router.push({ name: "Shop" }).then(() => {
        location.reload();
      });
    },
    goToMapPage() {
      this.$router.push({ name: "Map" }).then(() => {
        location.reload();
      });
    },
    goToHelpPage() {
      this.$router.push({ name: "Help" }).then(() => {
        location.reload();
      });
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.p {
  color: var(--color-light);
}
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
  padding: 5px 0;
}
.nav__item:not(:last-child) {
  margin-right: 50px;
}
.nav__item:hover {
  transform: translateY(1px);
  border-bottom: 1px solid var(--color-light);
}
.nav__link {
  color: var(--color-light);
  font-family: Bahnschrift;
}
</style>
