<template>
  <div class="chest_opener-container">
    <h3 class="chest_opener__heading">Поздравляем! Вы получаете:</h3>

    <div class="chest_opener__jackpot" v-if="isJackpot">
      ✨ Джекпот! Найдено золото в размере двойной стоимости сундука.
    </div>

    <div class="chest_opener-section" v-if="hasResources">
      <h4 class="chest_opener-section__heading">Обычные ресурсы</h4>

      <ul class="chest_opener-list chest_opener-list_resources">
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
      <h4 class="chest_opener-section__heading">Материалы и рецепты</h4>

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
      Сундук оказался пуст.
    </p>

    <base-button class="chest_opener__btn" @click="closeModal">
      Забрать награды
    </base-button>
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
  width: 100%;
  max-width: none;
  padding: 30px 50px;
  border: 0;
  background-color: var(--color-blue);
}

.chest_opener__heading {
  margin-bottom: 20px;
  padding-right: 30px;
  font-size: 22px;
  line-height: 1.25;
  text-align: center;
}

.chest_opener__jackpot {
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #f3cf5e;
  border-radius: 5px;
  background-color: rgba(255, 218, 92, 0.18);
  color: #fff2b8;
  font-family: Bahnschrift, sans-serif;
  font-weight: 900;
  line-height: 1.4;
  text-align: center;
}

.chest_opener-section {
  margin-bottom: 18px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.12);
}

.chest_opener-section__heading {
  margin-bottom: 12px;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
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
  line-height: 1.3;
}

.chest_opener__item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.chest_opener__item_gold {
  color: #fff0a5;
}

.chest_opener__resource-name {
  min-width: 0;
}

.chest_opener__resource-count {
  flex-shrink: 0;
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
}

.chest_opener__item_gold .chest_opener__resource-count {
  color: #ffe37b;
}

.chest_opener__empty {
  margin-bottom: 18px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 5px;
  text-align: center;
}

.chest_opener__btn {
  align-self: center;
  min-width: 200px;
  margin-top: 4px;
}

@media (max-width: 650px) {
  .chest_opener-container {
    width: 100%;
    padding: 25px 20px;
  }

  .chest_opener__heading {
    font-size: 19px;
  }

  .chest_opener__btn {
    align-self: stretch;
    width: 100%;
  }
}
</style>
