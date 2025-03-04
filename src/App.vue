<template>
  <div class="app" v-cloak>
    <div class="wrapper">
      <app-header></app-header>
      <main class="main">
        <router-view></router-view>
      </main>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script type="text/javascript">
import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";
export default {
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: { AppFooter, AppHeader },
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
  min-height: calc(100vh - 130px);
  /* border-top: 2px solid var(--color-light);
  border-bottom: 2px solid var(--color-light);*/
}
</style>

