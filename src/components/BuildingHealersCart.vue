<template>
  <div class="healers_cart-container">
    <div class="healers_cart-desc_box">
      <h3 class="healers_cart__heading">Повозка целителя</h3>

      <template v-if="healerCartLevel > 0">
        <p class="healers_cart__info healers_cart__charges">
          Зарядов:
          <span> {{ fountain.currentCharges }}/{{ fountain.maxCharges }} </span>
        </p>

        <div
          class="healers_cart__charge-bar"
          :aria-label="`Зарядов повозки: ${fountain.currentCharges} из ${fountain.maxCharges}`"
          role="progressbar"
          aria-valuemin="0"
          :aria-valuemax="fountain.maxCharges"
          :aria-valuenow="fountain.currentCharges"
        >
          <div
            class="healers_cart__charge-progress"
            :style="{
              width: `${chargePercentage}%`,
            }"
          ></div>
        </div>

        <p class="healers_cart__info">
          Восстановление:
          {{ fountain.rechargeRate }} зарядов каждые 5 минут
        </p>

        <p class="healers_cart__info healers_cart__next-recharge">
          {{ nextRechargeText }}
        </p>
      </template>

      <p class="healers_cart__info" v-else>
        Сначала постройте повозку в лагере.
      </p>
    </div>

    <base-button
      class="healers_cart__btn"
      :class="{
        healers_cart__btn_disabled: !canUseCharge,
      }"
      type="button"
      data-testid="healers-cart-heal-button"
      data-action="restore-health"
      :disabled="!canUseCharge"
      :aria-label="healButtonAriaLabel"
      @click="useCharge"
    >
      <span v-if="healerCartLevel === 0"> Повозка не построена </span>

      <span v-else-if="isPlayerFullHealth">
        Здоровье полностью восстановлено
      </span>

      <span v-else-if="fountain.currentCharges <= 0"> Нет зарядов </span>

      <span v-else> Восстановить здоровье </span>
    </base-button>
  </div>
</template>

<script>
import healersCart from "@/mixins/healersCart";

export default {
  name: "BuildingHealersCart",

  mixins: [healersCart],

  computed: {
    chargePercentage() {
      if (this.fountain.maxCharges <= 0) {
        return 0;
      }

      return Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (this.fountain.currentCharges / this.fountain.maxCharges) * 100,
          ),
        ),
      );
    },

    healButtonAriaLabel() {
      if (this.healerCartLevel === 0) {
        return "Повозка целителя не построена.";
      }

      if (this.isPlayerFullHealth) {
        return "Здоровье персонажа полностью восстановлено.";
      }

      if (this.fountain.currentCharges <= 0) {
        return "У повозки целителя нет зарядов.";
      }

      return `Восстановить здоровье. Доступно зарядов: ${this.fountain.currentCharges}.`;
    },
  },
};
</script>

<style scoped>
.healers_cart-container {
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 24px;
  min-height: 190px;
  padding: 22px;
  overflow: hidden;
  border: 2px solid var(--color-light);
  border-radius: 10px;
}

.healers_cart-desc_box {
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.healers_cart__heading {
  position: relative;
  margin-bottom: 18px;
  font-size: 24px;
  line-height: 1.1;
}

.healers_cart__info {
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 1.45;
}

.healers_cart__charges {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  margin-bottom: 10px;
  padding: 7px 10px;
  border: 1px solid rgba(73, 165, 85, 0.7);
  border-radius: 5px;
  background-color: rgba(73, 165, 85, 0.15);
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 18px;
  font-weight: 900;
}

.healers_cart__charge-bar {
  width: 100%;
  max-width: 420px;
  height: 8px;
  margin: 0 0 14px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.28);
}

.healers_cart__charge-progress {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-blue), var(--color-green));
  transition: width 0.25s ease;
}

.healers_cart__next-recharge {
  margin-bottom: 0;
  color: rgba(255, 255, 255, 0.72);
  font-size: 14px;
}

.healers_cart__btn {
  position: relative;
  z-index: 1;
  align-self: center;
  min-width: 220px;
  padding: 12px 16px;
  border: 2px solid var(--color-green);
  border-radius: 6px;
  background-color: var(--color-green);
  color: var(--color-light);
  cursor: pointer;
  font-size: 16px;
  font-weight: 900;
  line-height: 1.25;
  text-align: center;
  transition: background-color 0.15s ease, color 0.15s ease,
    border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.healers_cart__btn:hover:not(:disabled) {
  border-color: var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
  box-shadow: 0 0 0 4px rgba(73, 165, 85, 0.2);
  transform: translateY(-2px);
}

.healers_cart__btn:active:not(:disabled) {
  transform: translateY(0);
}

.healers_cart__btn:focus-visible {
  outline: 3px solid var(--color-blue);
  outline-offset: 3px;
}

.healers_cart__btn:disabled,
.healers_cart__btn_disabled {
  border-color: rgba(255, 255, 255, 0.26);
  background-color: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.52);
  cursor: not-allowed;
}

.healers_cart__btn:disabled:hover {
  box-shadow: none;
  transform: none;
}

@media (max-width: 650px) {
  .healers_cart-container {
    flex-direction: column;
    gap: 20px;
    min-height: auto;
    padding: 18px;
  }

  .healers_cart__heading {
    font-size: 21px;
  }

  .healers_cart__btn {
    align-self: stretch;
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 420px) {
  .healers_cart-container {
    padding: 15px;
  }

  .healers_cart__info {
    font-size: 14px;
  }

  .healers_cart__charges {
    font-size: 16px;
  }

  .healers_cart__btn {
    padding: 11px 12px;
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .healers_cart__btn,
  .healers_cart__charge-progress {
    transition: none;
  }

  .healers_cart__btn:hover:not(:disabled),
  .healers_cart__btn:active:not(:disabled) {
    transform: none;
  }
}
</style>
