<template>
  <div class="healers_cart-container">
    <div class="healers_cart-desc_box">
      <h4 class="healers_cart__heading">Повозка целителя</h4>
      <p class="healers_cart__info">
        Зарядов: {{ fountain.currentCharges }}/{{ fountain.maxCharges }}
      </p>
      <p class="healers_cart__info">
        Восстановление: {{ fountain.rechargeRate }} зарядов каждые 5 минут
      </p>
    </div>

    <base-button
      class="healers_cart__btn"
      @click="useCharge"
      :disabled="fountain.currentCharges <= 0"
    >
      Восстановить здоровье
    </base-button>
  </div>
</template>

<script type="text/javascript">
import healersCart from "@/mixins/healersCart";

export default {
  name: "BuildingHealersCart",
  mixins: [healersCart],
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  mounted() {},
};
</script>

<style scoped>
.healers_cart-container {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid var(--color-light);
  border-radius: 8px;
}

.healers_cart__heading {
  margin-bottom: 10px;
}

.healers_cart__info {
  line-height: 1.4;
}

.healers_cart__btn {
  margin-top: 10px;
  background: var(--color-green);
  color: var(--color-light);
  border: 2px solid var(--color-green);
  border-radius: 4px;
  cursor: pointer;
}

.healers_cart__btn:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
  font-weight: 900;
}

.healers_cart__btn:disabled {
  background: #cccccc;
  color: var(--color-dark);
  cursor: not-allowed;
}
</style>