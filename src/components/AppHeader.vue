<template>
  <header class="header">
    <div class="container header-container">
      <span class="logo" @click="goToHomePage()">
        <span class="logo__text">R</span>
      </span>
      <ul class="nav-list">
        <li class="nav__item" @click="goToHomePage()">
          <span class="nav__link">Главная</span>
        </li>
        <li class="nav__item" @click="goToInventoryPage()">
          <span class="nav__link">Инвентарь</span>
        </li>
        <li class="nav__item" @click="goToShopPage()">
          <span class="nav__link">Магазин</span>
        </li>
        <li class="nav__item" @click="goToMapPage()">
          <span class="nav__link">Карта</span>
        </li>
        <li class="nav__item" @click="goToKnowledgeBasePage()">
          <span class="nav__link">База знаний</span>
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
    goToKnowledgeBasePage() {
      this.$router.push({ name: "KnowledgeBase" }).then(() => {
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
  padding-right: 3px;
  width: 50px;
  height: 50px;
  text-align: right;
  align-content: center;
  background-color: var(--color-light);
  color: var(--color-dark);
  cursor: pointer;
}
.logo__text {
  font-size: 18px;
}
.nav-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.nav__item {
  padding: 5px 10px;
  cursor: pointer;
  line-height: 1;
}
.nav__item:not(:last-child) {
  margin-right: 50px;
  margin-bottom: 0;
  line-height: 1;
}
.nav__item:hover {
  transform: translateY(1px);
  border-bottom: 2px solid var(--color-light);
}
.nav__link {
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 18px;
}
.active {
  background-color: var(--color-light);
}
.active_link {
  color: var(--color-dark);
}
</style>
