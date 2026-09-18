<template>
  <div class="chests_tab-container">
    <h2 class="chests_tab__heading">🎁 Магические сундуки</h2>

    <div class="block block--before_table">
      <strong>Магические сундуки</strong> содержат случайные материалы и рецепты
      для крафта, которые выпадают с определённым шансом. Для открытия требуется
      1 🔑 магический ключ. Шанс выпадения ключа с противника — 5%.
    </div>

    <h3 class="heading">📦 Материалы и рецепты</h3>

    <div class="simple-table">
      <table class="chest-table">
        <thead>
          <tr>
            <th>
              <h4 class="title">Сундук</h4>
            </th>

            <th>
              <h4 class="title">Описание</h4>
            </th>

            <th>
              <h4 class="title">Дроп</h4>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in chestList" :key="item.id">
            <td>
              <div class="item-main_box">
                <h4 class="item__heading">
                  {{ item.name }}
                </h4>

                <span class="item__icon">
                  <img
                    class="item__img"
                    loading="lazy"
                    :src="getImage(item.image)"
                    :alt="item.name"
                    v-if="item.image"
                  />
                </span>
              </div>
            </td>

            <td>
              <div class="item-characteristics_box">
                <ul>
                  <li class="item__desc chest__desc" v-if="item.amount">
                    ✨ Шанс каждого материала или рецепта:
                    {{ item.amount }}%
                  </li>

                  <li class="item__desc" v-if="item.price">
                    💰 Цена в магазине:
                    {{ item.price }} золота
                  </li>
                </ul>
              </div>
            </td>

            <td>
              <div class="item-characteristics_box">
                <ul>
                  <li
                    class="material__item"
                    v-for="drop in chestDrop(item.id)"
                    :key="drop.craftItemId"
                  >
                    <span class="material__name">
                      {{ itemName(drop.craftItemId) }}:
                    </span>

                    <span class="material__count"> до {{ drop.count }} </span>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="heading">💰 Награды версии 0.6.1</h3>

    <div class="block">
      Начиная с версии <strong>0.6.1</strong>, каждый магический сундук
      дополнительно содержит случайное 💰 золото, а также 🌲 древесину, 🪨
      камень и ⛓️ железо. Материалы и рецепты из таблицы выше продолжают
      выпадать по прежним правилам.
    </div>

    <div class="chest-rewards-rules">
      <ul class="chest-rewards-rules__list">
        <li class="chest-rewards-rules__item">
          💰 Золото выпадает гарантированно в указанном диапазоне.
        </li>

        <li class="chest-rewards-rules__item">
          🌲 Древесина, 🪨 камень и ⛓️ железо имеют одинаковый шанс выпадения —
          50%.
        </li>

        <li class="chest-rewards-rules__item">
          Каждый базовый ресурс проверяется отдельно: можно получить все три
          ресурса, один ресурс или не получить ни одного.
        </li>

        <li class="chest-rewards-rules__item">
          🎰 С вероятностью 3% обычный золотой дроп заменяется джекпотом:
          двойной стоимостью сундука.
        </li>
      </ul>
    </div>

    <div class="simple-table chest-rewards-table-wrapper">
      <table class="chest-rewards-table">
        <thead>
          <tr>
            <th>
              <h4 class="title">Сундук</h4>
            </th>

            <th>
              <h4 class="title">Дополнительные награды</h4>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in chestList" :key="`rewards-${item.id}`">
            <td>
              <div class="reward-chest-title">
                <span class="reward-chest-title__name">
                  {{ shortChestName(item.name) }}
                </span>

                <span class="reward-chest-title__price">
                  Цена: {{ item.price }} 💰
                </span>
              </div>
            </td>

            <td>
              <div class="reward-info" v-if="chestResources(item.id)">
                <div class="reward-info__row reward-info__row_gold">
                  <span>💰 Золото</span>

                  <strong>
                    {{ chestResources(item.id).gold.min }}–
                    {{ chestResources(item.id).gold.max }}
                  </strong>
                </div>

                <div class="reward-info__row reward-info__row_jackpot">
                  <span>🎰 Джекпот золота</span>

                  <strong> 3%: {{ jackpotGold(item) }} </strong>
                </div>

                <div class="reward-info__row">
                  <span>🌲 Древесина</span>

                  <strong>
                    50%: {{ chestResources(item.id).resources.min }}–
                    {{ chestResources(item.id).resources.max }}
                  </strong>
                </div>

                <div class="reward-info__row">
                  <span>🪨 Камень</span>

                  <strong>
                    50%: {{ chestResources(item.id).resources.min }}–
                    {{ chestResources(item.id).resources.max }}
                  </strong>
                </div>

                <div class="reward-info__row">
                  <span>⛓️ Железо</span>

                  <strong>
                    50%: {{ chestResources(item.id).resources.min }}–
                    {{ chestResources(item.id).resources.max }}
                  </strong>
                </div>
              </div>

              <span class="empty__text" v-else> Нет данных о наградах. </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";

export default {
  name: "magic-chests-tab",

  data() {
    return {
      chestList: [],
    };
  },

  methods: {
    itemName(itemId) {
      const item = items.findAllCraftItems(itemId);

      return item ? item.name : "Неизвестный предмет";
    },

    chestDrop(chestId) {
      const dropsByChestId = {
        10217: items.silverDrop,
        10218: items.goldenDrop,
        10219: items.platinumDrop,
        10220: items.rubyDrop,
        10221: items.divineDrop,
      };

      return dropsByChestId[chestId] || [];
    },

    chestResources(chestId) {
      return items.chestResourceDrops?.[chestId] || null;
    },

    jackpotGold(chest) {
      return Number(chest.price || 0) * 2;
    },

    shortChestName(name) {
      if (!name) {
        return "Неизвестный сундук";
      }

      if (name.includes("Серебряный")) {
        return "🥈 Серебряный";
      }

      if (name.includes("Золотой")) {
        return "🥇 Золотой";
      }

      if (name.includes("Платиновый")) {
        return "⬜ Платиновый";
      }

      if (name.includes("Рубиновый")) {
        return "🔴 Рубиновый";
      }

      if (name.includes("Небесный")) {
        return "☁️ Небесный";
      }

      return name;
    },

    getImage(key) {
      if (key && typeof key === "string") {
        return require(`@/assets/images/${key}`);
      }

      if (key && typeof key === "number") {
        const item = items.findItem(key);

        if (item?.image) {
          return require(`@/assets/images/${item.image}`);
        }
      }

      return "";
    },

    getData() {
      this.chestList = JSON.parse(
        JSON.stringify(
          items.consumablesList.filter((item) => {
            return item.category === "magicChest";
          }),
        ),
      );
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
strong {
  font-family: Bahnschrift, sans-serif;
}

.chests_tab-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.chests_tab__heading {
  margin-bottom: 30px;
  color: var(--color-green);
}

.block {
  margin-bottom: 20px;
  line-height: 1.5;
}

.block--before_table {
  margin-bottom: 0;
}

.heading {
  margin-top: 60px;
  margin-bottom: 30px;
  padding-bottom: 5px;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-green);
}

.simple-table {
  width: 100%;
  margin: 0;
}

.simple-table table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.simple-table th,
.simple-table td {
  padding: 12px;
  border: 1px solid var(--color-green);
  text-align: left;
  vertical-align: top;
}

.simple-table tr:nth-child(even) {
  background-color: rgba(50, 177, 122, 0.1);
}

.chest-table th:nth-child(1) {
  width: 31%;
}

.chest-table th:nth-child(2) {
  width: 27%;
}

.chest-table th:nth-child(3) {
  width: 42%;
}

.title {
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 16px;
}

.item-main_box {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item__heading {
  width: 100%;
  margin-bottom: 15px;
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  line-height: 1.3;
}

.item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border: 1px solid var(--color-light);
  background-color: rgba(255, 255, 255, 0.08);
}

.item__img {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.item-characteristics_box ul {
  margin: 0;
  padding-left: 0;
  list-style-type: none;
}

.item__desc {
  max-width: 100%;
  line-height: 1.45;
}

.item__desc:not(:last-child) {
  margin-bottom: 12px;
}

.chest__desc {
  width: 100%;
}

.material__item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  line-height: 1.35;
}

.material__item:not(:last-child) {
  margin-bottom: 10px;
}

.material__name {
  min-width: 0;
}

.material__count {
  flex-shrink: 0;
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
  font-weight: 900;
  white-space: nowrap;
}

.chest-rewards-rules {
  margin-bottom: 25px;
  padding: 15px;
  border: 1px solid var(--color-green);
  border-radius: 5px;
  background-color: rgba(50, 177, 122, 0.08);
}

.chest-rewards-rules__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.chest-rewards-rules__item {
  line-height: 1.45;
}

.chest-rewards-table-wrapper {
  margin-bottom: 10px;
}

.chest-rewards-table th:first-child {
  width: 30%;
}

.chest-rewards-table th:last-child {
  width: 70%;
}

.reward-chest-title {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reward-chest-title__name {
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.3;
}

.reward-chest-title__price {
  color: rgba(255, 255, 255, 0.78);
  font-size: 14px;
}

.reward-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.reward-info__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  line-height: 1.35;
}

.reward-info__row:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.reward-info__row strong {
  flex-shrink: 0;
  color: var(--color-green);
  white-space: nowrap;
}

.reward-info__row_gold {
  color: #fff4bd;
}

.reward-info__row_gold strong,
.reward-info__row_jackpot strong {
  color: #ffe37b;
}

.reward-info__row_jackpot {
  color: #fff1b4;
}

.empty__text {
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.4;
}

@media (max-width: 650px) {
  .chests_tab__heading {
    margin-bottom: 20px;
    font-size: 21px;
  }

  .heading {
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .simple-table {
    overflow-x: hidden;
  }

  .simple-table th,
  .simple-table td {
    padding: 9px;
    font-size: 13px;
  }

  .chest-table th:nth-child(1) {
    width: 30%;
  }

  .chest-table th:nth-child(2) {
    width: 25%;
  }

  .chest-table th:nth-child(3) {
    width: 45%;
  }

  .title {
    font-size: 13px;
  }

  .item__heading {
    margin-bottom: 10px;
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  .item__icon,
  .item__img {
    width: 58px;
    height: 58px;
  }

  .item__desc,
  .material__item,
  .reward-info__row {
    font-size: 12px;
    overflow-wrap: anywhere;
  }

  .material__item,
  .reward-info__row {
    flex-direction: column;
    gap: 3px;
  }

  .material__count,
  .reward-info__row strong {
    align-self: flex-start;
  }

  .chest-rewards-rules {
    padding: 12px;
  }

  .reward-chest-title__name {
    font-size: 14px;
  }

  .reward-chest-title__price {
    font-size: 12px;
  }

  .chest-rewards-table th:first-child {
    width: 35%;
  }

  .chest-rewards-table th:last-child {
    width: 65%;
  }
}
</style>
