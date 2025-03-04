<template>
  <div id="app">
    <h1>Счетчик: {{ count }}</h1>
    <button @click="increment">Увеличить на 1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count += 1;
    },
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
  font-family: Bahnschrift;
}
button {
  padding: 10px 20px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 16px;
  cursor: pointer;
}
</style>

