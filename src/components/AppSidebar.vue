<template>
  <div class="sidebar-container">
    <!-- Меню для главной страницы -->
    <ul
      class="sidebar-menu"
      v-if="$route.path.startsWith('/home') || $route.path === '/'"
    >
      <li
        v-for="(tab, index) in mainTabs"
        :key="index"
        class="menu__item"
        role="button"
        :class="{ active: isActive(tab) }"
        @click="changeTab(tab)"
      >
        <h6 class="menu__text">{{ getTabName(tab) }}</h6>
      </li>
    </ul>

    <!-- Меню для базы знаний -->
    <ul
      class="sidebar-menu"
      v-else-if="$route.path.startsWith('/knowledge-base')"
    >
      <li
        v-for="(tab, index) in knowledgeBaseTabs"
        :key="index"
        class="menu__item"
        role="button"
        :class="{ active: isActive(tab) }"
        @click="changeTab(tab)"
      >
        <h6 class="menu__text">{{ getTabName(tab) }}</h6>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppSidebar",
  data() {
    return {
      knowledgeBaseTabs: ["general", "combat", "profession", "items", "craft"],
      mainTabs: ["general", "settings", "updates"],
    };
  },
  methods: {
    changeTab(tabName) {
      if (
        this.$route.path.startsWith("/knowledge-base") ||
        this.$route.name === "KnowledgeBase"
      ) {
        this.$router.push({
          name: "KnowledgeBase",
          query: { tab: tabName },
        });
      } else if (
        this.$route.path.startsWith("/home") ||
        this.$route.path === "/" ||
        this.$route.name === "Home"
      ) {
        this.$router.push({
          name: "Home",
          query: { tab: tabName },
        });
      }
    },
    isActive(tabName) {
      const currentTab = this.$route.query.tab || "general";
      return currentTab === tabName;
    },
    getTabName(tab) {
      const names = {
        general: "Основное",
        combat: "Боевая система",
        profession: "Профессии",
        items: "Предметы",
        craft: "Крафт",
        settings: "Настройки",
        updates: "История обновлений",
      };
      return names[tab] || tab;
    },
  },
};
</script>

<style scoped>
.sidebar-container {
  border: 2px solid var(--color-light);
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  width: 210px;
}
.menu__item {
  padding: 5px;
  border: 1px solid var(--color-dark);
  cursor: pointer;
  line-height: 1;
}
.menu__item:not(:last-child) {
  margin-bottom: 15px;
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