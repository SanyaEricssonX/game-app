<template>
  <div class="container inventory-container">
    <div class="equipment-block">
      <h2 class="equipment__header">Экипировка</h2>
      <ul class="equipment-list">
        <li class="equipment__item">
          <h4 class="equipment__item__header">Оружие</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Шлем</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Верхний доспех</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Нижний доспех</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Перчатки</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Сапоги</h4>
          <span class="equipment__item__icon"></span>
        </li>
      </ul>
    </div>

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
          v-for="item in inventoryCells"
          :key="item.id"
        >
          <span class="inventory__item__id" v-show="item > 999">
            {{ item }}
          </span>
        </li>
      </ul>
      <div class="inventory-list" v-if="selectedTab == 2">
        Доступные рецепты
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items"

export default {
  name: "InventoryPage",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      inventoryCells: [],
      playerInventory: [],
      allItems: [],
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
    this.allItems = items.list();
    this.playerInventory = this.$store.state.playerInventory;

    for (let i = 0; i < 50; i++) {
      if (this.playerInventory[i]) {
        this.inventoryCells.push(this.playerInventory[i]);
      } else {
        this.inventoryCells.push(i);
      }
    }
  },
  mounted() {},
};
</script>

<style scoped>
.equipment-block {
  margin-bottom: 30px;
}
.equipment__header {
  margin-bottom: 30px;
  font-size: 22px;
}
.equipment-list {
  display: flex;
  justify-content: space-between;
}
.equipment__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.equipment__item__header {
  margin-bottom: 15px;
  font-size: 16px;
}
.equipment__item__icon {
  width: 60px;
  height: 60px;
  border: 2px solid var(--color-light);
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
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px solid var(--color-light);
}
.inventory__item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 10%;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--color-light);
}
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
