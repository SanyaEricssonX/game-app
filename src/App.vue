<template>
  <div class="app" v-cloak>
    <div class="wrapper">
      <modal-window :is-modal-open="isModalOpen" @close="closeModal">
        <notification-info
          v-if="
            $store.state.levelIsUp || $store.state.modalNotification.visible
          "
          @hide-modal="closeModal"
        />

        <profession-desc
          v-else-if="$store.state.professionIsChosen"
          @hide-modal="closeModal"
        />

        <chest-opener
          v-else-if="$store.state.chestIsOpen.visible"
          @hide-modal="closeModal"
        />
      </modal-window>

      <app-header class="header" />

      <main class="container main">
        <user-profile
          class="profile-block"
          v-show="['Inventory', 'Shop', 'Map', 'Camp'].includes($route.name)"
          @show-modal="openModal"
        />

        <app-sidebar
          class="menu-block"
          :key="$route.name"
          v-show="['Home', 'KnowledgeBase'].includes($route.name)"
        />

        <router-view class="router-block" @show-modal="openModal" />

        <scroll-to-top-button />
      </main>

      <app-footer />
    </div>
  </div>
</template>

<script type="text/javascript">
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import UserProfile from "@/components/UserProfile";
import ModalWindow from "@/components/ModalWindow";
import NotificationInfo from "@/components/NotificationInfo";
import ProfessionDesc from "@/components/ProfessionDesc";
import AppSidebar from "@/components/AppSidebar";
import ChestOpener from "@/components/ChestOpener";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default {
  name: "App",

  components: {
    AppFooter,
    AppHeader,
    UserProfile,
    ModalWindow,
    NotificationInfo,
    ProfessionDesc,
    AppSidebar,
    ChestOpener,
    ScrollToTopButton,
  },

  data() {
    return {
      showUpdateModal: false,
      currentVersion: process.env.VUE_APP_VERSION || "1.0.0",
      isMenuOpen: false,
      isModalOpen: false,
    };
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
      document.body.classList.add("scroll-lock");
    },

    resetModalNotification() {
      this.$store.state.modalNotification.visible = false;
      this.$store.state.modalNotification.text = "";
      this.$store.state.modalNotification.from = "";

      this.$store.state.modalNotification.resources = {
        gold: 0,
        wood: 0,
        stone: 0,
        iron: 0,
      };
    },

    resetChestModal() {
      this.$store.state.chestIsOpen.visible = false;

      this.$store.state.chestIsOpen.drop = [];

      this.$store.state.chestIsOpen.resources = {
        gold: 0,
        wood: 0,
        stone: 0,
        iron: 0,
      };

      this.$store.state.chestIsOpen.isJackpot = false;
    },

    closeModal() {
      this.isModalOpen = false;

      this.$store.state.levelIsUp = false;

      this.resetModalNotification();

      this.$store.state.professionIsChosen = false;

      this.resetChestModal();

      document.body.classList.remove("scroll-lock");
    },

    checkVersion() {
      const savedVersion = localStorage.getItem("appVersion");

      const isNewVersion = savedVersion !== this.currentVersion;

      if (isNewVersion) {
        this.showUpdateModal = true;

        localStorage.setItem("appVersion", this.currentVersion);

        localStorage.removeItem("updateShown");
      }

      const updateShown = localStorage.getItem("updateShown");

      if (isNewVersion && !updateShown) {
        this.showWhatsNew();
      }
    },

    showWhatsNew() {
      this.$store.state.modalNotification.text = `Новая версия ${this.currentVersion}`;

      this.$store.state.modalNotification.from = "app";
      this.$store.state.modalNotification.visible = true;

      this.openModal();

      localStorage.setItem("updateShown", "true");
    },

    closeWhatsNew() {
      this.showUpdateModal = false;
    },
  },

  mounted() {
    this.checkVersion();
  },
};
</script>

<style>
html {
  scrollbar-gutter: stable;
}

.scroll-lock {
  overflow: hidden;
}
</style>

<style scoped>
[v-cloak] {
  display: none;
}

.wrapper {
  position: relative;
}

.main {
  display: flex;
  min-height: calc(100vh - 150px);
}

.profile-block,
.menu-block {
  height: min-content;
}

.router-block {
  display: flex;
  flex-direction: column;
  width: calc(100% - 210px);
  padding: 20px 35px;
}

.router-block--full_width {
  width: 100%;
}

.update-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  padding: 20px;
  transform: translate(-50%, -50%);
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
