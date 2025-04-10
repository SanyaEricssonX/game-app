<template>
  <div class="app" v-cloak>
    <div class="wrapper">
      <modal-window
        :is-modal-open="isModalOpen"
        @close="closeModal"
        @click="closeModal"
      >
        <notification-info
          @click.stop
          v-if="
            $store.state.levelIsUp || $store.state.modalNotification.visible
          "
        ></notification-info>
        <profession-desc
          @hide-modal="closeModal"
          @click.stop
          v-else-if="$store.state.professionIsChosen"
        ></profession-desc>
      </modal-window>

      <app-header class="header"></app-header>
      <main class="container main">
        <user-profile
          class="profile-block"
          v-if="['Inventory', 'Shop', 'Map'].includes($route.name)"
          @show-modal="openModal"
        />
        <app-sidebar
          class="menu-block"
          :key="$route.name"
          v-else-if="['Home', 'Help'].includes($route.name)"
        />
        <router-view class="router-block" @show-modal="openModal"></router-view>
      </main>
      <app-footer></app-footer>
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
export default {
  extends: {},
  props: {},
  data() {
    return {
      showUpdateModal: false,
      currentVersion: process.env.VUE_APP_VERSION || "1.0.0",
      isMenuOpen: false,
      isModalOpen: false,
    };
  },
  computed: {},
  components: {
    AppFooter,
    AppHeader,
    UserProfile,
    ModalWindow,
    NotificationInfo,
    ProfessionDesc,
    AppSidebar,
  },
  watch: {},
  methods: {
    openModal() {
      this.isModalOpen = true;
      document.querySelector("body").classList.add("scroll-lock");
    },
    closeModal() {
      this.isModalOpen = false;

      this.$store.state.levelIsUp = false;
      this.$store.state.professionIsChosen = false;
      this.$store.state.modalNotification.visible = false;
      this.$store.state.modalNotification.from = "";
      this.$store.state.modalNotification.resources = {
        gold: 0,
        wood: 0,
        stone: 0,
        iron: 0,
      };

      document.querySelector("body").classList.remove("scroll-lock");
    },

    checkVersion() {
      const savedVersion = localStorage.getItem("appVersion");
      const isNewVersion = savedVersion !== this.currentVersion;

      if (isNewVersion) {
        this.showUpdateModal = true;
        localStorage.setItem("appVersion", this.currentVersion);
        localStorage.removeItem("updateShown"); // Сброс флага показа
      }

      // Проверяем, было ли уже показано уведомление для этой версии
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
  beforeCreate() {},
  mounted() {
    this.checkVersion();
  },
};
</script>

<style>
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
  padding: 20px 35px;
  width: calc(100% - 210px);
}
.router-block--full_width {
  width: 100%;
}
.update-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>

