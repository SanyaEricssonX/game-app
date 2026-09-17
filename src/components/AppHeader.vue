<template>
  <header class="header">
    <div class="container header-container">
      <span
        class="logo"
        role="button"
        tabindex="0"
        aria-label="На главную страницу"
        data-testid="header-logo"
        data-action="navigate-home"
        @click="goToHomePage"
        @keydown.enter.prevent="goToHomePage"
        @keydown.space.prevent="goToHomePage"
      >
        <span class="logo__text">R</span>
      </span>

      <nav class="header-nav" aria-label="Основная навигация">
        <ul class="nav-list">
          <li class="nav__item">
            <router-link
              class="nav__link"
              :class="{ nav__link_active: isActiveRoute('Home') }"
              :to="{ name: 'Home' }"
              data-testid="header-nav-home"
              data-action="navigate-home"
            >
              Главная
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              class="nav__link"
              :class="{ nav__link_active: isActiveRoute('Map') }"
              :to="{ name: 'Map' }"
              data-testid="header-nav-map"
              data-action="navigate-map"
            >
              Бои
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              class="nav__link"
              :class="{ nav__link_active: isActiveRoute('Camp') }"
              :to="{ name: 'Camp' }"
              data-testid="header-nav-camp"
              data-action="navigate-camp"
            >
              Лагерь
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              class="nav__link"
              :class="{ nav__link_active: isActiveRoute('Inventory') }"
              :to="{ name: 'Inventory' }"
              data-testid="header-nav-inventory"
              data-action="navigate-inventory"
            >
              Инвентарь
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              class="nav__link"
              :class="{ nav__link_active: isActiveRoute('Shop') }"
              :to="{ name: 'Shop' }"
              data-testid="header-nav-shop"
              data-action="navigate-shop"
            >
              Магазин
            </router-link>
          </li>

          <li class="nav__item">
            <router-link
              class="nav__link"
              :class="{ nav__link_active: isActiveRoute('KnowledgeBase') }"
              :to="{ name: 'KnowledgeBase' }"
              data-testid="header-nav-knowledge-base"
              data-action="navigate-knowledge-base"
            >
              База знаний
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script type="text/javascript">
export default {
  name: "app-header",

  methods: {
    isActiveRoute(routeName) {
      return this.$route.name === routeName;
    },

    goToHomePage() {
      if (this.$route.name === "Home") {
        return;
      }

      this.$router.push({
        name: "Home",
      });
    },
  },
};
</script>

<style scoped>
.header-container {
  display: flex;
  align-items: center;
  padding: 35px 0;
}

.logo {
  display: block;
  width: 50px;
  height: 50px;
  margin-right: auto;
  padding-right: 3px;
  background-color: var(--color-light);
  color: var(--color-dark);
  text-align: right;
  align-content: center;
  cursor: pointer;
}

.logo:focus-visible {
  outline: 3px solid var(--color-blue);
  outline-offset: 3px;
}

.logo__text {
  font-size: 18px;
}

.header-nav {
  min-width: 0;
}

.nav-list {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.nav__item {
  line-height: 1;
}

.nav__item:not(:last-child) {
  margin-right: 28px;
}

.nav__link {
  position: relative;
  display: block;
  box-sizing: border-box;
  min-height: 34px;
  padding: 8px 10px;
  border: 1px solid transparent;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 16px;
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;
}

.nav__link::after {
  position: absolute;
  right: 10px;
  bottom: 3px;
  left: 10px;
  height: 2px;
  background-color: transparent;
  content: "";
  transition: background-color 0.15s ease;
}

.nav__link:hover:not(.nav__link_active) {
  border-bottom-color: var(--color-light);
}

.nav__link_active {
  border-color: var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
  font-weight: 400;
}

.nav__link:focus-visible {
  z-index: 2;
  outline: 3px solid var(--color-blue);
  outline-offset: 3px;
}

@media (max-width: 1100px) {
  .header-container {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  .logo {
    margin-right: 0;
  }

  .header-nav {
    width: 100%;
  }

  .nav-list {
    flex-wrap: wrap;
    gap: 10px;
  }

  .nav__item:not(:last-child) {
    margin-right: 0;
  }
}

@media (max-width: 650px) {
  .header-container {
    padding: 20px 0;
  }

  .nav-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    width: 100%;
  }

  .nav__link {
    width: 100%;
    font-size: 15px;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav__link,
  .nav__link::after {
    transition: none;
  }
}
</style>
