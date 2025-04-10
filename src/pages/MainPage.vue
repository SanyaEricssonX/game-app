<template>
  <div class="container main-container">
    <div class="main-block" v-if="$store.state.menuContent == 1">Об игре</div>
    <div class="main-block" v-if="$store.state.menuContent == 2">Настройки</div>
    <div class="main-block" v-if="$store.state.menuContent == 3">
      <base-loader v-if="!isDataLoaded" />
      <updates-feed :updates="updates" v-else />
    </div>
  </div>
</template>

<script type="text/javascript">
import UpdatesFeed from "@/components/UpdatesFeed";

export default {
  name: "MainPage",
  extends: {},
  props: {},
  data() {
    return {
      isDataLoaded: false,
      updates: [],
    };
  },
  computed: {},
  components: { UpdatesFeed },
  watch: {},
  methods: {
    async loadUpdates() {
      try {
        const response = await fetch("/updates.json");
        this.updates = (await response.json()).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } catch (error) {
        console.error("Ошибка загрузки обновлений:", error);
      }
      this.isDataLoaded = true;
    },
  },
  beforeCreate() {},
  async mounted() {
    await this.loadUpdates();
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

