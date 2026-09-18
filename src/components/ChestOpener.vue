<template>
  <div class="chest_opener-container">
    <div class="chest_opener-header">
      <span class="chest_opener-header__icon">🎁</span>

      <div class="chest_opener-header__content">
        <h3 class="chest_opener__heading">Награды из сундука</h3>

        <p class="chest_opener__subtitle">
          Полученные награды уже добавлены в ваш инвентарь и ресурсы.
        </p>
      </div>
    </div>

    <div class="chest_opener__jackpot" v-if="isJackpot">
      <span class="chest_opener__jackpot-icon">✨</span>

      <span>
        Джекпот! Получено золото в размере двойной стоимости сундука.
      </span>
    </div>

    <div class="chest_opener-content">
      <div class="chest_opener-section" v-if="hasResources">
        <h4 class="chest_opener-section__heading">🧰 Обычные ресурсы</h4>

        <ul class="chest_opener-list">
          <li
            class="chest_opener__item chest_opener__item_gold"
            v-if="resources.gold > 0"
          >
            <span class="chest_opener__resource-name"> 💰 Золото </span>

            <strong class="chest_opener__resource-count">
              +{{ resources.gold }}
            </strong>
          </li>

          <li class="chest_opener__item" v-if="resources.wood > 0">
            <span class="chest_opener__resource-name"> 🌲 Древесина </span>

            <strong class="chest_opener__resource-count">
              +{{ resources.wood }}
            </strong>
          </li>

          <li class="chest_opener__item" v-if="resources.stone > 0">
            <span class="chest_opener__resource-name"> 🪨 Камень </span>

            <strong class="chest_opener__resource-count">
              +{{ resources.stone }}
            </strong>
          </li>

          <li class="chest_opener__item" v-if="resources.iron > 0">
            <span class="chest_opener__resource-name"> ⛓️ Железо </span>

            <strong class="chest_opener__resource-count">
              +{{ resources.iron }}
            </strong>
          </li>
        </ul>
      </div>

      <div class="chest_opener-section" v-if="drop.length > 0">
        <h4 class="chest_opener-section__heading">✨ Материалы и рецепты</h4>

        <ul class="chest_opener-list">
          <li
            class="chest_opener__item"
            v-for="(item, index) in drop"
            :key="`${item.craftItemId}-${index}`"
          >
            <span class="chest_opener__resource-name">
              {{ craftItemName(item.craftItemId) }}
            </span>

            <strong class="chest_opener__resource-count">
              +{{ item.count }}
            </strong>
          </li>
        </ul>
      </div>

      <p class="chest_opener__empty" v-if="!hasResources && drop.length === 0">
        В сундуке ничего не найдено.
      </p>
    </div>

    <div class="chest_opener-footer">
      <base-button
        class="chest_opener__btn"
        :variant="4"
        data-testid="chest-claim-rewards-button"
        data-action="claim-chest-rewards"
        @click="closeModal"
      >
        Забрать награды
      </base-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";

export default {
  name: "chest-opener",

  computed: {
    drop() {
      return this.$store.state.chestIsOpen.drop || [];
    },

    resources() {
      return (
        this.$store.state.chestIsOpen.resources || {
          gold: 0,
          wood: 0,
          stone: 0,
          iron: 0,
        }
      );
    },

    isJackpot() {
      return Boolean(this.$store.state.chestIsOpen.isJackpot);
    },

    hasResources() {
      return (
        Number(this.resources.gold || 0) > 0 ||
        Number(this.resources.wood || 0) > 0 ||
        Number(this.resources.stone || 0) > 0 ||
        Number(this.resources.iron || 0) > 0
      );
    },
  },

  methods: {
    craftItemName(itemId) {
      const craftItem = items.findAllCraftItems(itemId);

      return craftItem ? craftItem.name : "Неизвестный предмет";
    },

    closeModal() {
      this.$emit("hide-modal");
    },
  },
};
</script>

<style scoped>
.chest_opener-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-height: 100%;
  padding: 30px 50px;
  background-color: var(--color-blue);
  color: var(--color-light);
}

.chest_opener-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 13px;
  margin-bottom: 20px;
  padding-right: 32px;
}

.chest_opener-header__icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.16);
  font-size: 24px;
}

.chest_opener-header__content {
  min-width: 0;
}

.chest_opener__heading {
  margin-bottom: 5px;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 23px;
  font-weight: 900;
  line-height: 1.2;
}

.chest_opener__subtitle {
  color: rgba(255, 255, 255, 0.92);
  font-size: 14px;
  line-height: 1.4;
}

.chest_opener__jackpot {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  gap: 9px;
  margin-bottom: 18px;
  padding: 12px 14px;
  border: 1px solid #ffe37b;
  border-radius: 5px;
  background-color: rgba(255, 218, 92, 0.2);
  color: #fff8d2;
  font-family: Bahnschrift, sans-serif;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.4;
}

.chest_opener__jackpot-icon {
  flex-shrink: 0;
}

.chest_opener-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 3px;
  scrollbar-color: rgba(255, 255, 255, 0.72) rgba(0, 0, 0, 0.18);
}

.chest_opener-content::-webkit-scrollbar {
  width: 9px;
}

.chest_opener-content::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.18);
}

.chest_opener-content::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0.18);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.72);
}

.chest_opener-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-light);
}

.chest_opener-section {
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.16);
}

.chest_opener-section__heading {
  margin-bottom: 20px;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.3;
}

.chest_opener-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chest_opener__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.96);
  font-size: 15px;
  line-height: 1.35;
}

.chest_opener__item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.chest_opener__item_gold {
  color: #fff4b5;
}

.chest_opener__resource-name {
  min-width: 0;
}

.chest_opener__resource-count {
  flex-shrink: 0;
  color: #92f5c2;
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
}

.chest_opener__item_gold .chest_opener__resource-count {
  color: #ffe37b;
}

.chest_opener__empty {
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 5px;
  color: rgba(255, 255, 255, 0.94);
  line-height: 1.45;
  text-align: center;
}

.chest_opener-footer {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  margin-top: 18px;
}

.chest_opener__btn {
  min-width: 210px;
}

@media (max-width: 650px) {
  .chest_opener-container {
    min-height: calc(100vh - 66px);
    padding: 22px 18px;
  }

  .chest_opener-header {
    gap: 10px;
    margin-bottom: 16px;
    padding-right: 25px;
  }

  .chest_opener-header__icon {
    width: 40px;
    height: 40px;
    font-size: 21px;
  }

  .chest_opener__heading {
    font-size: 20px;
  }

  .chest_opener__subtitle {
    font-size: 13px;
  }

  .chest_opener__jackpot {
    margin-bottom: 14px;
    font-size: 14px;
  }

  .chest_opener-content {
    gap: 12px;
  }

  .chest_opener-section {
    padding: 13px;
  }

  .chest_opener__item {
    font-size: 14px;
  }

  .chest_opener__resource-count {
    font-size: 16px;
  }

  .chest_opener-footer {
    margin-top: 14px;
  }

  .chest_opener__btn {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .chest_opener-container {
    padding: 18px 14px;
  }

  .chest_opener-header__icon {
    width: 36px;
    height: 36px;
    font-size: 19px;
  }

  .chest_opener__heading {
    font-size: 18px;
  }

  .chest_opener-section__heading {
    font-size: 16px;
  }

  .chest_opener__item {
    gap: 10px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chest_opener-content::-webkit-scrollbar-thumb {
    transition: none;
  }
}
</style>
