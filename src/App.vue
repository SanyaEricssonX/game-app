<template>
  <div class="app" v-cloak>
    <div class="wrapper">
      <app-header></app-header>
      <main class="container main">
        <user-profile class="profile-block"></user-profile>
        <router-view class="router-block"></router-view>
      </main>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script type="text/javascript">
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
import UserProfile from "@/components/UserProfile";
export default {
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: { AppFooter, AppHeader, UserProfile },
  watch: {},
  methods: {},
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
  min-height: calc(100vh - 130px);
}
.profile-block {
  width: 33%;
}
</style>

