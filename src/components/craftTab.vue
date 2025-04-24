<template>
  <div class="craft_tab-container">
    <h2 class="craft_tab__heading">Крафт</h2>

    <div class="block">
      <strong>Крафт система</strong>
      позволяет создавать предметы, которые заметно превосходят те, что
      продаются в магазине. Для создания предмета необходим рецепт, а также
      специальные материалы, которые выпадают с побежденных противников. Все
      крафтовые материалы и рецепты отображаются в соответствующих вкладках на
      странице "Инвентарь".
    </div>

    <h3 class="heading">Оружие</h3>

    <div class="simple-table">
      <table>
        <thead>
          <tr>
            <th><h4 class="title">Предмет</h4></th>
            <th><h4 class="title">Характеристики</h4></th>
            <th><h4 class="title">Необходимые материалы</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in weaponList" :key="index">
            <td>
              <div class="item-main_box">
                <a
                  class="item__link"
                  role="button"
                  @click="showMaterialInfo(item.id)"
                >
                  <h4 class="item__heading">{{ item.name }}</h4>
                </a>
                <span class="item__icon">
                  <img
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
                  <li class="item__desc" v-if="item.category">
                    {{ categoryName(item.category) }}
                  </li>
                  <li class="item__desc" v-if="item.requiredLevel">
                    Уровень: {{ item.requiredLevel }}
                  </li>
                  <li class="item__desc" v-if="item.desc">
                    Описание: {{ item.desc }}
                  </li>
                  <li class="item__desc" v-if="item.damage">
                    Урон {{ item.damage }}
                  </li>
                  <li class="item__desc" v-if="item.armor">
                    Защита: {{ item.armor }}
                  </li>
                  <li class="item__desc" v-if="item.hp">HP: {{ item.hp }}</li>
                  <li class="item__desc" v-if="item.evasion">
                    Уклонение: {{ item.evasion }}
                  </li>
                  <li class="item__desc" v-if="item.critChance">
                    Крит шанс: {{ item.critChance }}
                  </li>
                  <li class="item__desc" v-if="item.critPower">
                    Крит сила: {{ item.critPower }}
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div class="item-recipe_box">
                <ul>
                  <li
                    class="material__item"
                    v-for="recipe in itemCraftMaterials(item.id)"
                    :key="recipe.id"
                  >
                    <a
                      class="material__name"
                      role="button"
                      @click="showMaterialInfo(recipe.material)"
                      >{{ materialName(recipe.material) }}:</a
                    >
                    <span class="material__count">{{ recipe.count }}</span>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="heading">Расходные</h3>

    <div class="simple-table">
      <table>
        <thead>
          <tr>
            <th><h4 class="title">Предмет</h4></th>
            <th><h4 class="title">Описание</h4></th>
            <th><h4 class="title">Необходимые материалы</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in consumableList" :key="index">
            <td>
              <div class="item-main_box">
                <a
                  class="item__link"
                  role="button"
                  @click="showMaterialInfo(item.id)"
                >
                  <h4 class="item__heading">{{ item.name }}</h4>
                </a>
                <span class="item__icon">
                  <img
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
                  <li class="item__desc" v-if="item.requiredLevel">
                    {{ categoryName(item.category) }}
                  </li>
                  <li class="item__desc" v-if="item.requiredLevel">
                    Уровень: {{ item.requiredLevel }}
                  </li>
                  <li class="item__desc" v-if="item.desc">
                    Описание: {{ item.desc }}
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div class="item-recipe_box">
                <ul>
                  <li
                    class="material__item"
                    v-for="recipe in itemCraftMaterials(item.id)"
                    :key="recipe.id"
                  >
                    <a
                      class="material__name"
                      role="button"
                      @click="showMaterialInfo(recipe.material)"
                      >{{ materialName(recipe.material) }}:</a
                    >

                    <span class="material__count">{{ recipe.count }}</span>
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
  name: "craft-tab",
  extends: {},
  props: {},
  data() {
    return {
      craftItemList: [],
      itemList: [],
      weaponList: [],
      consumableList: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    showMaterialInfo(id) {
      console.log(id);
    },

    categoryName(category) {
      if (category == "sword") {
        return "Меч";
      } else if (category == "dagger") {
        return "Кинжал";
      }
      return "Эликсир";
    },

    itemCraftMaterials(itemId) {
      const recipe = JSON.parse(
        JSON.stringify(
          this.craftItemList.filter((item) => item.targetId == itemId)
        )
      );
      return recipe[0].ingredients;
    },

    materialName(materialId) {
      return items.findCraftMaterial(materialId).name;
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
  },
  beforeCreate() {},
  created() {
    this.craftItemList = JSON.parse(JSON.stringify(items.recipeList));
    this.itemList = JSON.parse(JSON.stringify(items.list()));
    this.weaponList = this.itemList.filter(
      (item) =>
        item.type == "craft" &&
        (item.category == "sword" || item.category == "dagger")
    );
    this.weaponList.sort((a, b) => a.requiredLevel - b.requiredLevel);

    this.consumableList = this.itemList.filter(
      (item) =>
        item.type == "craft" &&
        (item.category == "restoreHp" || item.category == "buffDrop")
    );
    this.consumableList.sort((a, b) => a.requiredLevel - b.requiredLevel);
  },
  mounted() {},
};
</script>

<style scoped>
strong {
  font-family: Bahnschrift, sans-serif;
}

.craft_tab-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.block {
  margin-bottom: 20px;
  line-height: 1.4;
}

.heading {
  color: var(--color-green);
  border-bottom: 1px solid white;
  padding-bottom: 5px;
  margin-bottom: 20px;
  margin-top: 40px;
}

.craft_tab__heading {
  color: #32b17a;
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
  border: 1px solid #32b17a;
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
  color: var(--color-blue);
  margin-bottom: 15px;
  width: 200px;
  cursor: pointer;
}

.item__icon img {
  max-width: 100px;
  max-height: 100px;
}

.item__desc {
  width: 250px;
}

.item-characteristics_box ul,
.item-recipe_box ul {
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

.material__name {
  width: 190px;
  color: var(--color-blue);
}

.item__heading:hover,
.material__name:hover {
  text-decoration: underline;
}
</style>