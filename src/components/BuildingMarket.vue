<template>
  <div class="market-block">
    <div class="market-header">
      <div>
        <h3 class="market__heading">Рынок</h3>

        <p class="market__description">
          Обменивайте золото, древесину, камень и железо.
        </p>
      </div>

      <div class="market-balance">
        <span class="market-balance__title">Ваши ресурсы</span>

        <div class="market-balance__list">
          <span class="market-balance__item"> Золото: {{ playerGold }} </span>

          <span class="market-balance__item">
            Древесина: {{ playerResources.wood }}
          </span>

          <span class="market-balance__item">
            Камень: {{ playerResources.stone }}
          </span>

          <span class="market-balance__item">
            Железо: {{ playerResources.iron }}
          </span>
        </div>
      </div>
    </div>

    <div class="market-rates">
      <h4 class="market-rates__heading">Курсы обмена</h4>

      <ul class="market-rates__list">
        <li class="market-rates__item">
          1 древесина, камень или железо → 5 золота
        </li>

        <li class="market-rates__item">
          20 золота → 1 древесина, камень или железо
        </li>

        <li class="market-rates__item">1 ресурс → 3 другого ресурса</li>
      </ul>
    </div>

    <div class="resource-exchange">
      <div class="exchange-container">
        <div class="exchange-column">
          <h4 class="exchange-column__heading">Отдам</h4>

          <select
            class="exchange__select"
            v-model="giveResource"
            @change="handleGiveResourceChange"
          >
            <option
              v-for="resource in availableGiveResources"
              :key="`give-${resource.type}`"
              :value="resource.type"
            >
              {{ resource.label }} ({{ resource.amount }})
            </option>
          </select>

          <label class="exchange-input-label">
            Количество

            <input
              class="amount-input"
              type="number"
              v-model.number="giveAmount"
              :min="1"
              :max="maxGiveAmount"
              step="1"
              @input="handleAmountChange"
              @blur="handleAmountChange"
            />
          </label>

          <span class="exchange-available">
            Доступно: {{ maxGiveAmount }}
          </span>
        </div>

        <div class="exchange-arrow" aria-hidden="true">→</div>

        <div class="exchange-column">
          <h4 class="exchange-column__heading">Получу</h4>

          <select
            class="exchange__select"
            v-model="receiveResource"
            @change="handleReceiveResourceChange"
          >
            <option
              v-for="resource in availableReceiveResources"
              :key="`receive-${resource.type}`"
              :value="resource.type"
            >
              {{ resource.label }}
            </option>
          </select>

          <label class="exchange-input-label">
            Количество

            <input
              class="amount-input"
              type="number"
              :value="receiveAmount"
              readonly
            />
          </label>

          <span class="exchange-rate"> Курс: {{ rateDescription }} </span>
        </div>
      </div>

      <div class="exchange-summary">
        <span v-if="canExchange">
          Вы отдадите:
          <strong>{{ giveAmount }} {{ resourceName(giveResource) }}</strong>
        </span>

        <span v-if="canExchange">
          Вы получите:
          <strong>
            {{ receiveAmount }} {{ resourceName(receiveResource) }}
          </strong>
        </span>

        <span class="exchange-summary__error" v-else>
          Укажите количество доступного ресурса для обмена.
        </span>
      </div>

      <base-button
        class="exchange-button"
        :disabled="!canExchange"
        @click="executeExchange"
      >
        Обменять
      </base-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";

export default {
  name: "BuildingMarket",

  data() {
    return {
      giveResource: "wood",
      receiveResource: "stone",
      giveAmount: 1,
    };
  },

  computed: {
    playerResources() {
      return this.$store.state.playerResources;
    },

    playerGold() {
      return this.$store.state.playerGold;
    },

    allResources() {
      return [
        {
          type: "gold",
          label: "Золото",
          amount: Number(this.playerGold || 0),
        },
        {
          type: "wood",
          label: "Древесина",
          amount: Number(this.playerResources.wood || 0),
        },
        {
          type: "stone",
          label: "Камень",
          amount: Number(this.playerResources.stone || 0),
        },
        {
          type: "iron",
          label: "Железо",
          amount: Number(this.playerResources.iron || 0),
        },
      ];
    },

    availableGiveResources() {
      return this.allResources.filter((resource) => {
        return resource.type !== this.receiveResource;
      });
    },

    availableReceiveResources() {
      return this.allResources.filter((resource) => {
        return resource.type !== this.giveResource;
      });
    },

    currentGiveResource() {
      return this.allResources.find((resource) => {
        return resource.type === this.giveResource;
      });
    },

    maxGiveAmount() {
      return this.currentGiveResource
        ? Math.max(0, Number(this.currentGiveResource.amount))
        : 0;
    },

    exchangeRate() {
      if (this.giveResource === "gold") {
        return 1 / 20;
      }

      if (this.receiveResource === "gold") {
        return 5;
      }

      return 3;
    },

    receiveAmount() {
      const giveAmount = Number(this.giveAmount);

      if (
        !Number.isFinite(giveAmount) ||
        giveAmount < 1 ||
        this.giveResource === this.receiveResource
      ) {
        return 0;
      }

      return Math.max(1, Math.floor(giveAmount * this.exchangeRate));
    },

    canExchange() {
      return (
        this.giveResource !== this.receiveResource &&
        this.maxGiveAmount > 0 &&
        Number.isInteger(Number(this.giveAmount)) &&
        Number(this.giveAmount) >= 1 &&
        Number(this.giveAmount) <= this.maxGiveAmount &&
        this.receiveAmount > 0
      );
    },

    rateDescription() {
      if (this.giveResource === "gold") {
        return "20 золота → 1 ресурс";
      }

      if (this.receiveResource === "gold") {
        return "1 ресурс → 5 золота";
      }

      return "1 ресурс → 3 ресурса";
    },
  },

  watch: {
    maxGiveAmount(newMaxGiveAmount) {
      if (this.giveAmount > newMaxGiveAmount) {
        this.giveAmount = newMaxGiveAmount > 0 ? newMaxGiveAmount : 1;
      }
    },
  },

  methods: {
    resourceName(resourceType) {
      const names = {
        gold: "золота",
        wood: "древесины",
        stone: "камня",
        iron: "железа",
      };

      return names[resourceType] || resourceType;
    },

    getFirstAvailableReceiveResource() {
      return this.allResources.find((resource) => {
        return resource.type !== this.giveResource;
      });
    },

    getFirstAvailableGiveResource() {
      return this.allResources.find((resource) => {
        return resource.type !== this.receiveResource;
      });
    },

    handleGiveResourceChange() {
      if (this.giveResource === this.receiveResource) {
        const availableResource = this.getFirstAvailableReceiveResource();

        if (availableResource) {
          this.receiveResource = availableResource.type;
        }
      }

      this.normalizeGiveAmount();
    },

    handleReceiveResourceChange() {
      if (this.receiveResource === this.giveResource) {
        const availableResource = this.getFirstAvailableGiveResource();

        if (availableResource) {
          this.giveResource = availableResource.type;
        }
      }

      this.normalizeGiveAmount();
    },

    handleAmountChange() {
      this.normalizeGiveAmount();
    },

    normalizeGiveAmount() {
      let normalizedAmount = Math.floor(Number(this.giveAmount));

      if (!Number.isFinite(normalizedAmount) || normalizedAmount < 1) {
        normalizedAmount = 1;
      }

      if (this.maxGiveAmount > 0) {
        normalizedAmount = Math.min(normalizedAmount, this.maxGiveAmount);
      }

      this.giveAmount = normalizedAmount;
    },

    decreaseResource(resourceType, amount) {
      if (resourceType === "gold") {
        this.$store.state.playerGold -= amount;
        return;
      }

      this.$store.state.playerResources[resourceType] -= amount;
    },

    increaseResource(resourceType, amount) {
      if (resourceType === "gold") {
        this.$store.state.playerGold += amount;
        return;
      }

      this.$store.state.playerResources[resourceType] += amount;
    },

    savePlayerResources() {
      localStorage.setItem("playerGold", String(this.$store.state.playerGold));

      localStorage.setItem(
        "playerResources",
        JSON.stringify(this.$store.state.playerResources),
      );
    },

    showExchangeSuccessModal(giveAmount, receiveAmount) {
      this.$store.state.modalNotification.text = `Обмен выполнен: ${giveAmount} ${this.resourceName(
        this.giveResource,
      )} → ${receiveAmount} ${this.resourceName(this.receiveResource)}.`;

      this.$store.state.modalNotification.from = "market";
      this.$store.state.modalNotification.visible = true;

      this.$emit("show-modal");
    },

    executeExchange() {
      if (!this.canExchange) {
        return;
      }

      const exchangedGiveAmount = Number(this.giveAmount);
      const exchangedReceiveAmount = Number(this.receiveAmount);

      this.decreaseResource(this.giveResource, exchangedGiveAmount);

      this.increaseResource(this.receiveResource, exchangedReceiveAmount);

      this.savePlayerResources();
      downloadData();

      this.showExchangeSuccessModal(
        exchangedGiveAmount,
        exchangedReceiveAmount,
      );

      this.giveAmount = 1;
      this.normalizeGiveAmount();
    },
  },

  created() {
    this.normalizeGiveAmount();
  },
};
</script>

<style scoped>
.market-block {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid var(--color-light);
  border-radius: 8px;
}

.market-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.market__heading {
  margin-bottom: 10px;
  font-size: 22px;
}

.market__description {
  max-width: 520px;
  line-height: 1.45;
}

.market-balance {
  display: flex;
  flex-direction: column;
  min-width: 170px;
  padding: 10px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
}

.market-balance__title {
  margin-bottom: 8px;
  font-family: Bahnschrift, sans-serif;
  font-size: 14px;
  font-weight: 900;
}

.market-balance__list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.market-balance__item {
  font-size: 14px;
}

.market-rates {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.07);
}

.market-rates__heading {
  margin-bottom: 8px;
  font-size: 16px;
}

.market-rates__list {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.market-rates__item {
  font-size: 14px;
  line-height: 1.35;
}

.resource-exchange {
  max-width: 720px;
  padding: 20px;
  border: 1px solid var(--color-light);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.07);
}

.exchange-container {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.exchange-column {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
}

.exchange-column__heading {
  font-size: 18px;
}

.exchange-arrow {
  font-family: Bahnschrift, sans-serif;
  font-size: 32px;
  font-weight: 900;
}

.exchange__select,
.amount-input {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid var(--color-light);
  border-radius: 4px;
  background-color: var(--color-light);
  color: var(--color-dark);
  font-size: 16px;
}

.exchange-input-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 14px;
}

.amount-input {
  text-align: center;
}

.amount-input:read-only {
  background-color: #d8d8d8;
  cursor: default;
}

.exchange-available,
.exchange-rate {
  min-height: 18px;
  font-size: 14px;
}

.exchange-rate {
  color: var(--color-green);
  font-weight: 900;
}

.exchange-summary {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-height: 48px;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.1);
  font-size: 14px;
  line-height: 1.4;
}

.exchange-summary strong {
  color: var(--color-green);
}

.exchange-summary__error {
  color: var(--color-red);
}

.exchange-button {
  width: 100%;
  padding: 10px 15px;
  border: 2px solid var(--color-dark);
  border-radius: 5px;
  background-color: var(--color-green);
  color: var(--color-light);
  cursor: pointer;
  font-size: 17px;
  font-weight: 900;
}

.exchange-button:hover:not(:disabled) {
  background-color: var(--color-light);
  color: var(--color-dark);
}

.exchange-button:disabled {
  border-color: #777;
  background-color: #999;
  color: #ddd;
  cursor: not-allowed;
}

@media (max-width: 650px) {
  .market-header,
  .exchange-container {
    flex-direction: column;
  }

  .market-balance {
    width: 100%;
  }

  .exchange-column {
    width: 100%;
  }

  .exchange-arrow {
    transform: rotate(90deg);
  }
}
</style>
