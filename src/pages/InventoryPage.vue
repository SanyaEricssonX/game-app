<template>
  <div class="container inventory-container">
    <ul class="inventory-list">
      <li class="inventory__item" v-for="item in playerInventory" :key="item.id">{{ item }}</li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "InventoryPage",
  extends: {},
  props: {},
  data() {
    return {
      playerInventory: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {
    this.playerInventory = this.$store.state.playerInventory;
  },
  mounted() {},
};
</script>

<style scoped>
.inventory-container {
  display: flex;
}
.inventory-list {
  display: flex;
  flex-direction: column;
}
.inventory__item {
  margin-top: 15px;
}
</style>
