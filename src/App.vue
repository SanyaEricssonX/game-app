<template>
  <div class="app" v-cloak>
    <div class="wrapper">
      <modal-window
        :is-modal-open="isModalOpen"
        @close="closeModal"
        @click="closeModal"
      >
        <notification-info
          @close-modal="closeModal"
          @click.stop
        ></notification-info>
      </modal-window>

      <app-header class="header"></app-header>
      <main class="container main">
        <user-profile class="profile-block"></user-profile>
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
export default {
  extends: {},
  props: {},
  data() {
    return {
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
      this.$store.state.purchaseFailed = false;

      document.querySelector("body").classList.remove("scroll-lock");
    },
  },
  beforeCreate() {},
  mounted() {},
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
.profile-block {
  height: min-content;
}
.router-block {
  display: flex;
  flex-direction: column;
  padding: 20px 35px;
  width: calc(100% - 210px);
}
</style>

