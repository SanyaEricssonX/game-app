<template>
  <div class="craft_tab-container">
    <h2 class="craft_tab__heading">Крафт</h2>

    <div class="block block--before_table">
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
                <h4 class="item__heading">{{ item.name }}</h4>
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
                    <span class="material__name"
                      >{{ materialName(recipe.material) }}:</span
                    >
                    <span class="material__count">{{ recipe.count }}</span>
                  </li>
                  <li
                    class="material__item"
                    v-for="resource in resourcesForCraft(item.id)"
                    :key="resource.id"
                  >
                    <span class="material__name">{{ resource.name }}:</span>
                    <span class="material__count">{{ resource.count }}</span>
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
          <tr v-for="(item, index2) in consumableList" :key="index2">
            <td>
              <div class="item-main_box">
                <h4 class="item__heading">{{ item.name }}</h4>
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
                    <span class="material__name"
                      >{{ materialName(recipe.material) }}:</span
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

    <h3 class="heading">Рецепты</h3>

    <div class="simple-table">
      <table>
        <thead>
          <tr>
            <th><h4 class="title">Рецепт</h4></th>
            <th><h4 class="title">Где найти</h4></th>
            <th><h4 class="title">Шанс дропа</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index3) in recipeList" :key="index3">
            <td>
              <div class="item-main_box">
                <h4 class="item__heading recipe__heading">{{ item.name }}</h4>
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
              <div class="item-location_box">
                <ul>
                  <li
                    class="item__desc location__name"
                    v-for="location in getCraftItemLocation(item.id)"
                    :key="location.index4"
                  >
                    {{ location }}
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div class="item-recipe_box">{{ item.dropChance }}%</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 class="heading">Материалы</h3>

    <div class="simple-table">
      <table>
        <thead>
          <tr>
            <th><h4 class="title">Рецепт</h4></th>
            <th><h4 class="title">Где найти</h4></th>
            <th><h4 class="title">Шанс дропа</h4></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index4) in materialList" :key="index4">
            <td>
              <div class="item-main_box">
                <h4 class="item__heading recipe__heading">{{ item.name }}</h4>
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
              <div class="item-location_box">
                <ul>
                  <li
                    class="item__desc location__name"
                    v-for="location in getCraftItemLocation(item.id)"
                    :key="location.index4"
                  >
                    {{ location }}
                  </li>
                </ul>
              </div>
            </td>
            <td>
              <div class="item-material_box">{{ item.dropChance }}%</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";
import map from "@/services/map";

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
      recipeList: [],
      materialList: [],
      maps: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
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

    resourcesForCraft(itemId) {
      const resourceTranslations = {
        wood: "Древесина",
        stone: "Камень",
        iron: "Железо",
      };

      // Находим рецепт для указанного itemId
      const recipes = this.recipeList.filter(
        (recipe) => recipe.targetId == itemId
      );

      // Если рецепт не найден, возвращаем пустой массив
      if (!recipes.length) return [];

      // Получаем объект ресурсов из первого найденного рецепта
      const resources = recipes[0].resources;

      // Преобразуем объект ресурсов в массив объектов с переводом
      const craftResources = Object.entries(resources).map(([key, value]) => {
        return {
          name: resourceTranslations[key] || key, // если перевода нет, используем оригинальный ключ
          count: value,
        };
      });

      return craftResources;
    },

    materialName(materialId) {
      return items.findCraftMaterial(materialId).name;
    },
    resourceName(resource) {
      // console.log(resource);
      return resource;
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

    getCraftItemLocation(itemId) {
      let locations = [];
      for (let i = 0; i < this.maps.length; i++) {
        let drop = this.maps[i].drop;
        for (let j = 0; j < drop.length; j++) {
          if (drop[j] == itemId) {
            locations.push(this.maps[i].name);
          }
        }
      }
      return locations;
    },

    getData() {
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
      this.recipeList = JSON.parse(JSON.stringify(items.recipeList));
      this.materialList = JSON.parse(JSON.stringify(items.craftMaterialList));
      this.maps = JSON.parse(JSON.stringify(map.locationList));
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

.craft_tab-container {
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

.craft_tab__heading {
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
  color: var(--color-green);
  margin-bottom: 15px;
  width: 220px;
}

.item__icon img {
  max-width: 100px;
  max-height: 100px;
}

.item__desc {
  max-width: 230px;
}
.item__desc:last-child {
  margin-bottom: 0;
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
  width: 190px;
}
.location__name:not(:last-child) {
  margin-bottom: 20px;
}
.recipe__heading,
.material__heading {
  margin-bottom: 0;
}
</style>