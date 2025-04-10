<template>
  <div class="sidebar-container">
    <ul class="sidebar-menu" v-if="'Home'.includes($route.name)">
      <li
        class="menu__item"
        role="button"
        :class="{ active: selectedTab == 1 }"
        @click="selectContent(1)"
      >
        <h6 class="menu__text">Об игре</h6>
      </li>
      <li
        class="menu__item"
        role="button"
        :class="{ active: selectedTab == 2 }"
        @click="selectContent(2)"
      >
        <h6 class="menu__text">Настройки</h6>
      </li>
      <li
        class="menu__item"
        role="button"
        :class="{ active: selectedTab == 3 }"
        @click="selectContent(3)"
      >
        <h6 class="menu__text">История обновлений</h6>
      </li>
    </ul>
    <ul class="sidebar-menu" v-if="'Help'.includes($route.name)">
      <li
        class="menu__item"
        role="button"
        :class="{ active: selectedTab == 1 }"
        @click="selectContent(1)"
      >
        <h6 class="menu__text">Общая информация</h6>
      </li>
      <li
        class="menu__item"
        role="button"
        :class="{ active: selectedTab == 2 }"
        @click="selectContent(2)"
      >
        <h6 class="menu__text">Боевая система</h6>
      </li>
      <li
        class="menu__item"
        role="button"
        :class="{ active: selectedTab == 3 }"
        @click="selectContent(3)"
      >
        <h6 class="menu__text">Игровые предметы</h6>
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-sidebar",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    selectContent(tabNumber) {
      this.selectedTab = tabNumber;
      this.$store.state.menuContent = tabNumber;
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.sidebar-container {
  border: 2px solid var(--color-light);
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 210px;
}
.menu__item {
  padding: 5px;
  border: 1px solid var(--color-dark);
  cursor: pointer;
}
.menu__item:not(:last-child) {
  margin-bottom: 20px;
}
.menu__item:hover {
  border-color: var(--color-light);
}
.menu__text {
  max-width: 150px;
}
.active {
  border-color: var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
