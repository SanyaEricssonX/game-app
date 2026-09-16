<template>
  <div class="healers_cart-container">
    <div class="healers_cart-desc_box">
      <h3 class="healers_cart__heading">Повозка целителя</h3>

      <template v-if="healerCartLevel > 0">
        <p class="healers_cart__info">
          Зарядов: {{ fountain.currentCharges }}/{{ fountain.maxCharges }}
        </p>

        <p class="healers_cart__info">
          Восстановление: {{ fountain.rechargeRate }} зарядов каждые 5 минут
        </p>

        <p class="healers_cart__info">
          {{ nextRechargeText }}
        </p>
      </template>

      <p v-else class="healers_cart__info">
        Сначала постройте повозку в лагере.
      </p>
    </div>

    <base-button
      class="healers_cart__btn"
      @click="useCharge"
      :disabled="!canUseCharge"
    >
      <span v-if="healerCartLevel === 0">Повозка не построена</span>
      <span v-else-if="isPlayerFullHealth"
        >Здоровье полностью восстановлено</span
      >
      <span v-else-if="fountain.currentCharges <= 0">Нет зарядов</span>
      <span v-else>Восстановить здоровье</span>
    </base-button>
  </div>
</template>

<script>
import healersCart from "@/mixins/healersCart";

export default {
  name: "BuildingHealersCart",
  mixins: [healersCart],
};
</script>
