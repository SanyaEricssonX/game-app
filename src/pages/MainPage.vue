<template>
  <div class="container main-container">
    <h1>Счетчик: {{ count }}</h1>
    <base-button @click="increment">Увеличить на 1</base-button>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "MainPage",
  extends: {},
  props: {},
  data() {
    return {
      count: 0,
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    increment() {
      this.count += 1;
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

