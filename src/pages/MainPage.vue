<template>
  <div class="container main-container">
    <updates-feed :updates="updates" />
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

