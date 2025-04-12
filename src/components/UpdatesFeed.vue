<template>
  <div class="updates-container">
    <h2 class="updates__header">История обновлений</h2>
    <div v-for="(update, index) in updates" :key="index" class="update-block">
      <h3 class="update__title">
        Версия {{ update.version }} <span class="date">{{ update.date }}</span>
      </h3>
      <ul>
        <li class="update__item" v-for="(change, i) in update.changes" :key="i">{{ change }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "updates-feed",
  props: {
    updates: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.updates__header {
  margin-bottom: 30px;
}
.update-block {
  border-left: 4px solid var(--color-green);
  padding: 10px 15px;
  margin-bottom: 20px;
}
.update__title {
  margin-bottom: 15px;
}
.date {
  color: #666;
  font-size: 18px;
}
.update__item {
  margin-bottom: 10px;
  line-height: 1.2;
}
.update__item:last-child {
  margin-bottom: 0;
}
</style>