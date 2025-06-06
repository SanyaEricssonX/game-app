<template>
  <div class="container main-container">
    <!-- Основная вкладка -->
    <div class="main-block first" v-if="activeTab === 'general'">
      <h1 class="main__heading">Project R</h1>
      <p class="main__version">Версия: {{ currentVersion }}</p>

      <div class="account-block">
        <h4 class="account__heading">Аккаунт</h4>
        <ul class="account-list">
          <li class="account__item">
            Аккаунт ID: {{ $store.state.accountId }}
          </li>
          <li class="account__item">
            Статус: {{ $store.state.accountStatus }}
          </li>
          <li class="account__item">
            Боевая мощь: {{ $store.state.playerBp }}
          </li>
        </ul>
      </div>

      <h4 class="main__title">Полезные ссылки</h4>
      <ul class="contact-list">
        <li class="contact__item">
          <a
            href="https://t.me/red_avalanche"
            class="contact__link"
            target="_blank"
            >Новости проекта</a
          >
        </li>
        <li class="contact__item">
          <a
            href="https://t.me/red_avalanche_community"
            class="contact__link"
            target="_blank"
            >Вопросы и предложения</a
          >
        </li>
      </ul>
    </div>

    <!-- Вкладка настроек -->
    <div class="main-block" v-if="activeTab === 'settings'">
      <h2 class="settings__heading">Настройки</h2>

      <h4 class="code__heading">Активационные коды</h4>
      <form class="code-box" @submit.prevent="enterCode(code)">
        <input
          type="text"
          class="code"
          :class="{ 'error-animation': inputError }"
          v-model="code"
          @input="inputError = false"
        />
        <base-button class="code__btn" type="submit">Активировать</base-button>
      </form>

      <div class="settings-block">
        <h4 class="code__heading">Управление</h4>
        <base-button class="settings__btn--reset" @click="resetAction"
          >Сбросить все данные</base-button
        >
      </div>
    </div>

    <!-- Вкладка обновлений -->
    <div class="main-block" v-if="activeTab === 'updates'">
      <base-loader v-if="!isDataLoaded" />
      <updates-feed :updates="updates" v-else />
    </div>
  </div>
</template>

<script>
import { downloadData } from "@/services/downloadData";
import UpdatesFeed from "@/components/UpdatesFeed";
import { mapGetters } from "vuex";

export default {
  name: "MainPage",
  components: { UpdatesFeed },
  props: {
    tab: {
      type: String,
      default: "general",
    },
  },
  data() {
    return {
      inputError: false,
      isDataLoaded: false,
      currentVersion: process.env.VUE_APP_VERSION || "1.0.0",
      updates: [],
      code: "",
      // Соответствие между номерами вкладок и их query-названиями
      tabMapping: {
        1: "general",
        2: "settings",
        3: "updates",
      },
    };
  },
  computed: {
    ...mapGetters(["currentActionType"]),
    activeTab() {
      // Определяем текущую вкладку
      const tabFromQuery = this.tab;
      const tabFromStore =
        this.tabMapping[this.$store.state.menuContent] || "general";

      // Приоритет у query-параметра
      return ["general", "settings", "updates"].includes(tabFromQuery)
        ? tabFromQuery
        : tabFromStore;
    },
  },
  watch: {
    currentActionType(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleActionChange(newVal);
      }
    },
    // Следим за изменением вкладки в store
    "$store.state.menuContent"(newVal) {
      if (newVal in this.tabMapping) {
        const tabName = this.tabMapping[newVal];
        this.updateRoute(tabName);
      }
    },
    // Следим за изменением query-параметра
    tab(newTab) {
      if (newTab in this.tabMapping) {
        this.$store.state.menuContent = Number(
          Object.keys(this.tabMapping).find(
            (key) => this.tabMapping[key] === newTab
          )
        );
      }
    },
  },
  methods: {
    updateRoute(tabName) {
      if (this.$route.query.tab !== tabName) {
        this.$router.replace({
          query: { ...this.$route.query, tab: tabName },
        });
      }
    },

    async loadUpdates() {
      try {
        const response = await fetch(
          `/updates.json?v=${process.env.VUE_APP_CACHE_BUSTER}`
        );
        this.updates = (await response.json()).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } catch (error) {
        console.error("Ошибка загрузки обновлений:", error);
      }
      this.isDataLoaded = true;
    },

    enterCode(code) {
      if (!code.trim()) {
        // Сбрасываем ошибку и снова устанавливаем после небольшой задержки
        this.inputError = false;
        setTimeout(() => {
          this.inputError = true;
        }, 10);
        return;
      }

      switch (code) {
        case "moneyKing":
          this.$store.state.modalNotification.text = "Код успешно активирован.";
          this.$store.state.modalNotification.from = "basic";
          this.$store.state.modalNotification.visible = true;

          this.showModal();

          this.$store.state.playerGold += 1000;
          localStorage.setItem("playerGold", this.$store.state.playerGold);

          break;
        case "resourcePrince":
          this.$store.state.modalNotification.text = "Код успешно активирован.";
          this.$store.state.modalNotification.from = "basic";
          this.$store.state.modalNotification.visible = true;

          this.showModal();

          this.$store.state.playerResources.wood += 50;
          this.$store.state.playerResources.stone += 50;
          this.$store.state.playerResources.iron += 50;
          localStorage.setItem(
            "playerResources",
            JSON.stringify(this.$store.state.playerResources)
          );

          break;
        case "testerGOD":
          this.$store.state.modalNotification.text =
            "Код успешно активирован. Выданы права тестировщика.";
          this.$store.state.modalNotification.from = "basic";
          this.$store.state.modalNotification.visible = true;

          this.showModal();

          this.$store.state.accountStatus = "Тестовый";
          localStorage.setItem(
            "accountStatus",
            this.$store.state.accountStatus
          );

          localStorage.removeItem("sortedEnemies");

          break;
        case "keyMaster": {
          this.$store.state.modalNotification.text = "Код успешно активирован.";
          this.$store.state.modalNotification.from = "basic";
          this.$store.state.modalNotification.visible = true;

          this.showModal();

          let playerCraftInventory =
            JSON.parse(localStorage.getItem("playerCraftInventory")) || [];

          // Ищем ключ в крафт инвентаре
          if (playerCraftInventory != null) {
            const existingItem = playerCraftInventory.find(
              (invItem) => invItem.craftItemId == 10316
            );

            if (existingItem) {
              existingItem.count += 10;
            } else {
              // Если элемент не найден, добавляем новый
              playerCraftInventory.push({
                craftItemId: 10316,
                count: 10,
              });
            }
          } else {
            playerCraftInventory.push({
              craftItemId: 10316,
              count: 10,
            });
          }

          this.$store.state.playerCraftInventory = playerCraftInventory;
          localStorage.setItem(
            "playerCraftInventory",
            JSON.stringify(this.$store.state.playerCraftInventory)
          );

          break;
        }
        default:
          this.inputError = false;
          setTimeout(() => {
            this.inputError = true;
          }, 10);
          break;
      }
      this.code = "";
    },
    showModal() {
      this.$emit("show-modal");
    },
    handleActionChange(type) {
      switch (type) {
        case true:
          this.resetData();
          this.$emit("hide-modal");
          break;
        case false:
          break;
        default:
          console.log("Неизвестный тип действия");
      }
    },
    resetAction() {
      this.$store.state.modalNotification.text =
        "Данное действие приведет к полному удалению всех данных. Вы уверены?";
      this.$store.state.modalNotification.from = "main";
      this.$store.state.modalNotification.visible = true;

      this.showModal();
    },
    resetData() {
      const currentVersion = localStorage.getItem("appVersion");
      localStorage.clear();
      localStorage.setItem("appVersion", currentVersion);
      downloadData();
      this.$store.state.playerCurrentLocation = 9990;
      this.$store.dispatch("triggerSortEnemies");
      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");

      this.$store.state.modalNotification.text = "Все данные удалены!";
      this.$store.state.modalNotification.from = "basic";
      this.$store.state.modalNotification.visible = true;

      this.showModal();
    },
  },
  async mounted() {
    await this.loadUpdates();

    // Инициализация вкладки при загрузке
    if (this.tab in this.tabMapping) {
      this.$store.state.menuContent = Number(
        Object.keys(this.tabMapping).find(
          (key) => this.tabMapping[key] === this.tab
        )
      );
    }
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
}
.first {
  min-height: 55vh;
  background-image: url("../assets/images/bg_main.webp");
  background-position: right top;
  background-size: 50%;
  background-repeat: no-repeat;
}
.main__heading {
  margin-bottom: 10px;
}
.main__version {
  margin-bottom: 30px;
  color: var(--color-green);
}
.main__title {
  margin-bottom: 15px;
}
.contact__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.contact__item:not(:last-child) {
  margin-bottom: 10px;
}
.contact__link {
  padding: 7px;
  color: var(--color-light);
  border: 1px solid var(--color-light);
  font-family: Bahnschrift, sans-serif;
}
.contact__link:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.account__heading {
  margin-bottom: 15px;
}
.account-list {
  margin-bottom: 30px;
}
.account__item:not(:last-child) {
  margin-bottom: 10px;
}
.settings__heading {
  margin-bottom: 50px;
}
.settings__btn--reset {
  padding: 7px 10px;
}
.settings__btn--reset:hover {
  background-color: var(--color-red);
  color: var(--color-light);
  font-weight: 900;
}
.code__heading {
  margin-bottom: 15px;
}
.code-box {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}
.code {
  border: 2px solid black;
  height: 30px;
  width: 250px;
  border-radius: 10px;
}
.code__btn {
  margin-left: 5px;
  padding: 5px;
  background-color: var(--color-dark);
  border: 1px solid var(--color-light);
  color: var(--color-light);
}
.code__btn:hover {
  background-color: var(--color-green);
  font-weight: 900;
}
.error-animation {
  animation: shake 0.5s, glow-red 0.5s;
  animation-iteration-count: 1;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

@keyframes glow-red {
  0%,
  100% {
    border-color: #ccc;
    box-shadow: 0 0 5px transparent;
  }
  50% {
    border-color: red;
    box-shadow: 0 0 10px red;
  }
}
</style>

