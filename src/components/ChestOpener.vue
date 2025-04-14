<template>
  <div class="chest_opener-container">
    <h4 class="chest_opener__heading">Поздравляем! Вы получаете:</h4>
    <ul class="chest_opener-list" v-if="drop.length > 0">
      <li
        class="chest_opener__item"
        v-for="item in drop"
        :key="item.craftItemId"
      >
        {{ craftItemName(item.craftItemId) }}: {{ item.count }}
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";

export default {
  name: "chest-opener",
  extends: {},
  props: {},
  data() {
    return {
      drop: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    craftItemName(itemId) {
      return items.findAllCraftItems(itemId).name;
    },
  },
  beforeCreate() {},
  created() {
    this.drop = this.$store.state.chestIsOpen.drop;
  },
  mounted() {},
};
</script>

<style scoped>
.chest_opener-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
  max-width: 600px;
  background-color: var(--color-blue);
  border: 1px solid var(--color-dark);
}
.chest_opener__heading {
  margin-bottom: 15px;
}
.chest_opener__item:not(:last-child) {
  margin-bottom: 7px;
}
</style>