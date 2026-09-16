<template>
  <div class="market-block">
    <h3 class="market__heading">Обмен ресурсов</h3>
    <div class="resource-exchange">
      <div class="exchange-container">
        <div class="exchange-column">
          <h4>Отдам</h4>
          <select v-model="giveResource" @change="handleGiveResourceChange">
            <option
              v-for="resource in availableGiveResources"
              :key="'give-' + resource.type"
              :value="resource.type"
            >
              {{ resource.label }} ({{ resource.amount }})
            </option>
          </select>
          <input
            type="number"
            v-model.number="giveAmount"
            :min="1"
            :max="maxGiveAmount"
            @input="handleAmountChange"
            class="amount-input"
          />
        </div>

        <div class="exchange-arrow">⇄</div>

        <div class="exchange-column">
          <h4>Получу</h4>
          <select
            v-model="receiveResource"
            @change="handleReceiveResourceChange"
          >
            <option
              v-for="resource in availableReceiveResources"
              :key="'receive-' + resource.type"
              :value="resource.type"
            >
              {{ resource.label }}
            </option>
          </select>
          <input
            type="number"
            v-model.number="receiveAmount"
            :min="1"
            readonly
            class="amount-input"
          />
        </div>
      </div>

      <button
        @click="executeExchange"
        :disabled="!canExchange"
        class="exchange-button"
      >
        Обменять
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
// import camp from "@/game/camp";

export default {
  name: "BuildingMarket",
  extends: {},
  props: {},
  data() {
    return {
      playerResources:
        JSON.parse(localStorage.getItem("playerResources")) ||
        this.$store.state.playerResources,
      playerGold:
        localStorage.getItem("playerGold") || this.$store.state.playerGold,
      giveResource: "wood",
      receiveResource: "stone",
      giveAmount: 1,
      receiveAmount: 3,
    };
  },
  computed: {
    allResources() {
      return [
        { type: "gold", label: "Золото", amount: this.playerGold },
        { type: "wood", label: "Дерево", amount: this.playerResources.wood },
        { type: "stone", label: "Камень", amount: this.playerResources.stone },
        { type: "iron", label: "Железо", amount: this.playerResources.iron },
      ];
    },
    availableGiveResources() {
      return this.allResources.filter(
        (res) => res.type !== this.receiveResource
      );
    },
    availableReceiveResources() {
      return this.allResources.filter((res) => res.type !== this.giveResource);
    },
    canExchange() {
      if (this.giveResource === this.receiveResource) return false;

      // Проверяем достаточно ли ресурсов для обмена
      const giveResource = this.allResources.find(
        (r) => r.type === this.giveResource
      );
      return (
        giveResource &&
        this.giveAmount > 0 &&
        this.giveAmount <= giveResource.amount
      );
    },
    maxGiveAmount() {
      const resource = this.allResources.find(
        (r) => r.type === this.giveResource
      );
      return resource ? resource.amount : 0;
    },
    exchangeRate() {
      // Ресурс → золото: 1:5
      if (this.receiveResource === "gold") return 5;

      // Золото → ресурс: 20:1
      if (this.giveResource === "gold") return 1 / 20;

      // Ресурс → ресурс: 1:3
      return 3;
    },
  },
  components: {},
  watch: {
    maxGiveAmount(newVal) {
      if (this.giveAmount > newVal) {
        this.giveAmount = newVal;
        this.updateReceiveAmount();
      }
    },
  },
  methods: {
    handleGiveResourceChange() {
      // Если выбранный ресурс совпадает с получаемым, выбираем другой доступный
      if (this.giveResource === this.receiveResource) {
        const available = this.availableReceiveResources;
        if (available.length > 0) {
          this.receiveResource = available[0].type;
        }
      }
      this.updateReceiveAmount();
    },
    handleReceiveResourceChange() {
      // Если выбранный ресурс совпадает с отдаваемым, выбираем другой доступный
      if (this.receiveResource === this.giveResource) {
        const available = this.availableGiveResources;
        if (available.length > 0) {
          this.giveResource = available[0].type;
        }
      }
      this.updateReceiveAmount();
    },
    handleAmountChange() {
      // Корректируем введенное значение
      if (this.giveAmount < 1) this.giveAmount = 1;
      if (this.giveAmount > this.maxGiveAmount)
        this.giveAmount = this.maxGiveAmount;

      this.updateReceiveAmount();
    },
    updateReceiveAmount() {
      if (this.giveResource === this.receiveResource) return;

      let result;

      if (this.receiveResource === "gold") {
        // Ресурс → золото: 1:5
        result = this.giveAmount * this.exchangeRate;
      } else if (this.giveResource === "gold") {
        // Золото → ресурс: 20:1
        result = this.giveAmount * this.exchangeRate;
      } else {
        // Ресурс → ресурс: 1:3
        result = this.giveAmount * this.exchangeRate;
      }

      // Округляем в меньшую сторону и гарантируем минимум 1
      this.receiveAmount = Math.max(1, Math.floor(result));
    },
    executeExchange() {
      if (!this.canExchange) return;

      // Уменьшаем отдаваемый ресурс
      if (this.giveResource === "gold") {
        this.playerGold -= this.giveAmount;
      } else {
        this.playerResources[this.giveResource] -= this.giveAmount;
      }

      // Увеличиваем получаемый ресурс
      if (this.receiveResource === "gold") {
        this.playerGold += this.receiveAmount;
      } else {
        this.playerResources[this.receiveResource] += this.receiveAmount;
      }

      // Сбрасываем значения после обмена
      this.giveAmount = 1;
      this.updateReceiveAmount();

      // Уведомление об успешном обмене
      this.$emit("exchange-completed", {
        give: { type: this.giveResource, amount: this.giveAmount },
        receive: { type: this.receiveResource, amount: this.receiveAmount },
      });
    },
    getResourceName(resource) {
      const names = {
        gold: "золота",
        wood: "дерева",
        stone: "камня",
        iron: "железа",
      };
      return names[resource] || resource;
    },
  },
  beforeCreate() {},
  created() {
    this.updateReceiveAmount();
  },
  mounted() {},
};
</script>

<style scoped>
.market-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid var(--color-light);
  border-radius: 8px;
}

.market__heading {
  margin-bottom: 15px;
}

.resource-exchange {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.exchange-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  gap: 15px;
}

.exchange-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.exchange-arrow {
  font-size: 24px;
  color: #666;
}

select,
.amount-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
}

.amount-input {
  text-align: center;
}

.amount-input:read-only {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.exchange-button {
  background-color: #4caf50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s;
}

.exchange-button:hover {
  background-color: #45a049;
}

.exchange-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

h2,
h3 {
  color: #333;
  margin: 0 0 10px 0;
  text-align: center;
}
</style>