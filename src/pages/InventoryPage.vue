<template>
  <div class="container inventory-container">
    <ul class="inventory-list" v-for="item in playerInventory" :key="item.id">
      <li class="inventory__item">{{ item }}</li>
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
</style>
