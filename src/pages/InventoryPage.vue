<template>
  <div class="container inventory-container">
    <ul class="nav-list">
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(1) }"
        @click="activeContent(1)"
      >
        <h4 class="item__header">Инвентарь</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(2) }"
        @click="activeContent(2)"
      >
        <h4 class="item__header">Крафт</h4>
      </li>
    </ul>

    <div class="inventory-block">
      <ul class="inventory-list" v-if="selectedTab == 1">
        <li
          class="inventory__item"
          v-for="item in playerInventory"
          :key="item.id"
        >
          {{ item }}
        </li>
      </ul>
      <div class="inventory-list" v-if="selectedTab == 2">
        Доступные рецепты
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "InventoryPage",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      playerInventory: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },
    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
    },
  },
  beforeCreate() {},
  created() {
    this.playerInventory = this.$store.state.playerInventory;
  },
  mounted() {},
};
</script>

<style scoped>
.inventory-container {
  display: flex;
  flex-direction: column;
  padding: 0 35px;
  width: calc(100% - 210px);
}
.nav-list {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
  border: 2px solid var(--color-light);
}
.nav__item {
  padding: 5px 10px;
  cursor: pointer;
}
.inventory-list {
  display: flex;
  flex-direction: column;
}
.inventory__item {
  margin-top: 15px;
}
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
