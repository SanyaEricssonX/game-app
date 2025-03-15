<template>
  <header class="header">
    <div class="container header-container">
      <span class="logo" @click="goToHomePage(0)">
        <span class="logo__text">DD</span>
      </span>
      <ul class="nav-list">
        <li class="nav__item" @click="goToInventoryPage(1)">
          <span class="nav__link">Инвентарь</span>
        </li>
        <li class="nav__item" @click="goToShopPage(2)">
          <span class="nav__link">Магазин</span>
        </li>
        <li class="nav__item" @click="goToMapPage(3)">
          <span class="nav__link">Карта</span>
        </li>
        <li class="nav__item" @click="goToHelpPage(4)">
          <span class="nav__link">Помощь</span>
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
  beforeUpdate() {},
};
</script>

<style scoped>
.p {
  color: var(--color-light);
}
.header-container {
  display: flex;
  padding: 35px 0;
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
  padding: 5px 10px;
  cursor: pointer;
}
.nav__item:not(:last-child) {
  margin-right: 50px;
}
.nav__item:hover {
  transform: translateY(1px);
  border-bottom: 2px solid var(--color-light);
}
.nav__link {
  color: var(--color-light);
  font-family: Bahnschrift;
}
.active {
  background-color: var(--color-light);
}
.active_link {
  color: var(--color-dark);
}
</style>
