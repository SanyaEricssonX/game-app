<template>
  <div class="chests_tab-container">
    <h2 class="chests_tab__heading">Магические сундуки</h2>

    <div class="block block--before_table">
      <strong>Магические сундуки</strong> содержат случайное количество
      материалов и рецептов для крафта, которые выпадают с определенным шансом. Для открытия требуется 1 магический ключ (5% шанс дропа).
    </div>

    <h3 class="heading">Сундуки</h3>

    <div class="simple-table">
      <table>
        <thead>
          <tr>
            <th><h4 class="title">Сундук</h4></th>
            <th><h4 class="title">Описание</h4></th>
            <th><h4 class="title">Дроп</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in chestList" :key="index">
            <td>
              <div class="item-main_box">
                <h4 class="item__heading">{{ item.name }}</h4>
                <span class="item__icon">
                  <img
                    class="item__img"
                    loading="lazy"
                    :src="getImage(item.image)"
                    :alt="item.id"
                    v-if="item.image"
                  />
                </span>
              </div>
            </td>
            <td>
              <div class="item-characteristics_box">
                <ul>
                  <li class="item__desc chest__desc" v-if="item.amount">
                    Шанс дропа предметов: {{ item.amount }}
                  </li>
                  <li class="item__desc" v-if="item.amount">
                    Цена в магазине: {{ item.price }}
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div class="item-characteristics_box">
                <ul>
                  <li
                    class="material__item"
                    v-for="(drop, index2) in chestDrop(item.id)"
                    :key="index2"
                  >
                    <span class="material__name"
                      >{{ itemName(drop.craftItemId) }}:</span
                    >
                    <span class="material__count">{{ drop.count }}</span>
                  </li>
                </ul>
              </div>
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
  extends: {},
  props: {},
  data() {
    return {
      chestList: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    itemName(itemId) {
      return items.findAllCraftItems(itemId).name;
    },

    chestDrop(chestId) {
      if (chestId == 10217) {
        return items.silverDrop;
      }
      if (chestId == 10218) {
        return items.goldenDrop;
      }
      if (chestId == 10219) {
        return items.platinumDrop;
      }
      if (chestId == 10220) {
        return items.rubyDrop;
      }
      if (chestId == 10221) {
        return items.divineDrop;
      }
      return chestId;
    },

    getImage(key) {
      if (key != 0 && typeof key == "number") {
        const item = items.findItem(key);
        if (item.image) {
          return require(`@/assets/images/${item.image}`);
        } else {
          return 0;
        }
      } else if (key != 0 && typeof key == "string") {
        return require(`@/assets/images/${key}`);
      } else {
        return 0;
      }
    },

    getData() {
      this.chestList = JSON.parse(
        JSON.stringify(
          items.consumablesList.filter((item) => item.category == "magicChest")
        )
      );
    },
  },
  beforeCreate() {},
  created() {
    this.getData();
  },
  mounted() {},
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

.block {
  margin-bottom: 20px;
  line-height: 1.4;
}
.block--before_table {
  margin-bottom: 0;
}

.heading {
  color: var(--color-green);
  border-bottom: 1px solid white;
  padding-bottom: 5px;
  margin-bottom: 30px;
  margin-top: 60px;
}

.chests_tab__heading {
  color: var(--color-green);
  margin-bottom: 30px;
}

.simple-table {
  margin: 0;
  overflow-x: auto;
  width: 100%;
}

.simple-table table {
  width: 100%;
  border-collapse: collapse;
}

.simple-table th,
.simple-table td {
  padding: 12px;
  border: 1px solid var(--color-green);
  text-align: left;
  vertical-align: top;
}

.simple-table td {
  align-content: center;
}

.simple-table tr:nth-child(even) {
  background-color: rgba(50, 177, 122, 0.1);
}

.item__link {
  text-decoration: none;
  cursor: default;
}

.item__heading {
  line-height: 1.2;
  color: var(--color-green);
  margin-bottom: 15px;
  width: 200px;
}

.item__icon img {
  width: 90px;
  height: 90px;
}

.item__desc {
  max-width: 230px;
}
.item__desc:last-child {
  margin-bottom: 0;
}

.chest__desc {
  width: 200px;
}

.item-characteristics_box ul,
.item-recipe_box ul,
.item-location_box ul,
.item-material_box {
  padding-left: 0;
  list-style-type: none;
}

.item-characteristics_box li,
.item-recipe_box li {
  margin-bottom: 10px;
}

.material__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.material__item:last-child {
  margin-bottom: 0;
}

.material__name {
  margin-right: 15px;
}

.location__name:not(:last-child) {
  margin-bottom: 20px;
}
.recipe__heading,
.material__heading {
  margin-bottom: 0;
}
</style>