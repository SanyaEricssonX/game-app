<template>
  <div class="container inventory-container">
    <div class="equipment-block">
      <h2 class="equipment__header">Экипировка</h2>
      <ul class="equipment-list">
        <!-- Оружие -->
        <li class="equipment__item">
          <h4 class="equipment__item__header">Оружие</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.weapon > 999 }"
            @click="
              showTooltip(
                playerEquipment.weapon,
                playerEquipment.weaponDurability,
                'weapon'
              )
            "
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.weapon)"
              :alt="playerEquipment.weapon"
              v-if="getImage(playerEquipment.weapon) != 0"
            />
            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.weapon > 999"
              >{{ playerEquipment.weapon }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.weapon,
                  playerEquipment.weaponDurability,
                  'weapon'
                )
              "
              v-if="
                playerEquipment.weapon != 0 &&
                tooltip.visible &&
                selectedItem == 'weapon'
              "
            ></base-tooltip>
            <span class="item__level" v-if="playerEquipment.weapon > 999"
              >Ур.{{ itemLevel(playerEquipment.weapon) }}</span
            >
            <div
              class="inventory-item_broken"
              v-if="
                playerEquipment.weapon != 0 &&
                playerEquipment.weaponDurability <= 0
              "
            ></div>
            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.weapon != 0 &&
                levelIsSmall(playerEquipment.weapon)
              "
            ></div>
          </span>
          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.weaponDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.weapon)"
              v-if="playerEquipment.weapon != 0"
            ></base-progress>
          </div>
        </li>

        <!-- Шлем -->
        <li class="equipment__item">
          <h4 class="equipment__item__header">Шлем</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.helmet > 999 }"
            @click="
              showTooltip(
                playerEquipment.helmet,
                playerEquipment.helmetDurability,
                'helmet'
              )
            "
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.helmet)"
              :alt="playerEquipment.helmet"
              v-if="getImage(playerEquipment.helmet) != 0"
            />
            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.helmet > 999"
              >{{ playerEquipment.helmet }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.helmet,
                  playerEquipment.helmetDurability,
                  'helmet'
                )
              "
              v-if="
                playerEquipment.helmet != 0 &&
                tooltip.visible &&
                selectedItem == 'helmet'
              "
            ></base-tooltip>
            <span class="item__level" v-if="playerEquipment.helmet > 999"
              >Ур.{{ itemLevel(playerEquipment.helmet) }}</span
            >
            <div
              class="inventory-item_broken"
              v-if="
                playerEquipment.helmet != 0 &&
                playerEquipment.helmetDurability <= 0
              "
            ></div>
            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.helmet != 0 &&
                levelIsSmall(playerEquipment.helmet)
              "
            ></div>
          </span>
          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.helmetDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.helmet)"
              v-if="playerEquipment.helmet != 0"
            ></base-progress>
          </div>
        </li>

        <!-- Верхний доспех -->
        <li class="equipment__item">
          <h4 class="equipment__item__header">Верхний доспех</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.upper > 999 }"
            @click="
              showTooltip(
                playerEquipment.upper,
                playerEquipment.upperDurability,
                'upper'
              )
            "
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.upper)"
              :alt="playerEquipment.upper"
              v-if="getImage(playerEquipment.upper) != 0"
            />
            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.upper > 999"
              >{{ playerEquipment.upper }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.upper,
                  playerEquipment.upperDurability,
                  'upper'
                )
              "
              v-if="
                playerEquipment.upper != 0 &&
                tooltip.visible &&
                selectedItem == 'upper'
              "
            ></base-tooltip>
            <span class="item__level" v-if="playerEquipment.upper > 999"
              >Ур.{{ itemLevel(playerEquipment.upper) }}</span
            >
            <div
              class="inventory-item_broken"
              v-if="
                playerEquipment.upper != 0 &&
                playerEquipment.upperDurability <= 0
              "
            ></div>
            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.upper != 0 &&
                levelIsSmall(playerEquipment.upper)
              "
            ></div>
          </span>
          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.upperDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.upper)"
              v-if="playerEquipment.upper != 0"
            ></base-progress>
          </div>
        </li>

        <!-- Нижний доспех -->
        <li class="equipment__item">
          <h4 class="equipment__item__header">Нижний доспех</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.lower > 999 }"
            @click="
              showTooltip(
                playerEquipment.lower,
                playerEquipment.lowerDurability,
                'lower'
              )
            "
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.lower)"
              :alt="playerEquipment.lower"
              v-if="getImage(playerEquipment.lower) != 0"
            />
            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.lower > 999"
              >{{ playerEquipment.lower }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.lower,
                  playerEquipment.lowerDurability,
                  'lower'
                )
              "
              v-if="
                playerEquipment.lower != 0 &&
                tooltip.visible &&
                selectedItem == 'lower'
              "
            ></base-tooltip>
            <span class="item__level" v-if="playerEquipment.lower > 999"
              >Ур.{{ itemLevel(playerEquipment.lower) }}</span
            >
            <div
            class="inventory-item_broken"
            v-if="
              playerEquipment.lower != 0 && playerEquipment.lowerDurability <= 0
            "
          ></div>
          <div
            class="equipment--unsuitable"
            v-if="
              playerEquipment.lower != 0 && levelIsSmall(playerEquipment.lower)
            "
          ></div>
          </span>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.lowerDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.lower)"
              v-if="playerEquipment.lower != 0"
            ></base-progress>
          </div>
        </li>

        <!-- Перчатки -->
        <li class="equipment__item">
          <h4 class="equipment__item__header">Перчатки</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.gloves > 999 }"
            @click="
              showTooltip(
                playerEquipment.gloves,
                playerEquipment.glovesDurability,
                'gloves'
              )
            "
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.gloves)"
              :alt="playerEquipment.gloves"
              v-if="getImage(playerEquipment.gloves) != 0"
            />
            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.gloves > 999"
              >{{ playerEquipment.gloves }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.gloves,
                  playerEquipment.glovesDurability,
                  'gloves'
                )
              "
              v-if="
                playerEquipment.gloves != 0 &&
                tooltip.visible &&
                selectedItem == 'gloves'
              "
            ></base-tooltip>
            <span class="item__level" v-if="playerEquipment.gloves > 999"
              >Ур.{{ itemLevel(playerEquipment.gloves) }}</span
            >
            <div
              class="inventory-item_broken"
              v-if="
                playerEquipment.gloves != 0 &&
                playerEquipment.glovesDurability <= 0
              "
            ></div>
            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.gloves != 0 &&
                levelIsSmall(playerEquipment.gloves)
              "
            ></div>
          </span>
          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.glovesDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.gloves)"
              v-if="playerEquipment.gloves != 0"
            ></base-progress>
          </div>
        </li>

        <!-- Сапоги -->
        <li class="equipment__item">
          <h4 class="equipment__item__header">Сапоги</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.boots > 999 }"
            @click="
              showTooltip(
                playerEquipment.boots,
                playerEquipment.bootsDurability,
                'boots'
              )
            "
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.boots)"
              :alt="playerEquipment.boots"
              v-if="getImage(playerEquipment.boots) != 0"
            />
            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.boots > 999"
              >{{ playerEquipment.boots }}</span
            ><base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.boots,
                  playerEquipment.bootsDurability,
                  'boots'
                )
              "
              v-if="
                playerEquipment.boots != 0 &&
                tooltip.visible &&
                selectedItem == 'boots'
              "
            ></base-tooltip>
            <span class="item__level" v-if="playerEquipment.boots > 999"
              >Ур.{{ itemLevel(playerEquipment.boots) }}</span
            >
            <div
              class="inventory-item_broken"
              v-if="
                playerEquipment.boots != 0 &&
                playerEquipment.bootsDurability <= 0
              "
            ></div>
            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.boots != 0 &&
                levelIsSmall(playerEquipment.boots)
              "
            ></div>
          </span>
          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.bootsDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.boots)"
              v-if="playerEquipment.boots != 0"
            ></base-progress>
          </div>
        </li>
      </ul>
    </div>

    <ul class="nav-list">
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(1) }"
        @click="activeContent(1)"
      >
        <h4 class="item__header">Инвентарь</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(2) }"
        @click="activeContent(2)"
      >
        <h4 class="item__header">Материалы для крафта</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(3) }"
        @click="activeContent(3)"
      >
        <h4 class="item__header">Рецепты</h4>
      </li>
    </ul>

    <div class="inventory-block">
      <ul class="inventory-list" v-if="selectedTab == 1">
        <li
          class="inventory__item"
          v-for="item in inventoryCells"
          :key="item.cellId"
          @click="showTooltip(item.id, item.durability, item.cellId)"
        >
          <img :src="getImage(item.image)" :alt="item.id" v-if="item.image" />
          <span class="inventory__item__id" v-else-if="item.id > 999">
            {{ item.id }}
          </span>
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-if="
              tooltip.visible && selectedItem == item.cellId && item.id > 999
            "
            @use="useItem(item)"
          ></base-tooltip>
          <div class="inventory-item_broken" v-if="item.durability <= 0"></div>
          <span class="item__level" v-if="item.id > 999"
            >Ур.{{ item.requiredLevel }}</span
          >
          <div class="inventory-item_broken__icon" v-if="item.durability <= 0">
            !
          </div>
        </li>
      </ul>
      <span
        class="block__title"
        v-else-if="selectedTab == 2 && playerCraftResources.length == 0"
        >У вас пока еще нет материалов для крафта.<br />Их можно получить убивая
        врагов.</span
      >
      <div
        class="material-block"
        v-else-if="selectedTab == 2 && playerCraftResources.length > 0"
      >
        <div class="material-box" v-if="playerCraftResourcesSpecial.length > 0">
          <h4 class="material-box__title">Особые:</h4>
          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesSpecial"
              :key="material.id"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}:
              </h4>
              <span class="material__count">{{ material.count }}</span>
            </li>
          </ul>
        </div>

        <div
          class="material-box"
          v-if="playerCraftResourcesUniversal.length > 0"
        >
          <h4 class="material-box__title">Универсальные:</h4>
          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesUniversal"
              :key="material.id"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}:
              </h4>
              <span class="material__count">{{ material.count }}</span>
            </li>
          </ul>
        </div>

        <div
          class="material-box"
          v-if="playerCraftResourcesConsumables.length > 0"
        >
          <h4 class="material-box__title">Для расходных:</h4>
          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesConsumables"
              :key="material.id"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}:
              </h4>
              <span class="material__count">{{ material.count }}</span>
            </li>
          </ul>
        </div>

        <div class="material-box" v-if="playerCraftResourcesWeapon.length > 0">
          <h4 class="material-box__title">Для оружия:</h4>
          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesWeapon"
              :key="material.id"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}:
              </h4>
              <span class="material__count">{{ material.count }}</span>
            </li>
          </ul>
        </div>
      </div>
      <span
        class="block__title"
        v-else-if="selectedTab == 3 && playerCraftRecipes.length == 0"
        >У вас пока еще нет рецептов для крафта.<br />Их можно получить убивая
        врагов.</span
      >
      <div
        class="craft-block"
        :style="{
          height: '45vh',
          overflowY: filteredRecipes.length ? 'auto' : 'hidden',
        }"
        v-else-if="selectedTab == 3 && playerCraftRecipes.length > 0"
      >
        <div class="craft-filter_box">
          <div class="craft-filter">
            <label v-for="category in categories" :key="category">
              <input
                class="craft__radio_btn"
                type="radio"
                v-model="selectedCategory"
                :value="category.name"
                @change="showFilteredList(category.name)"
              />
              {{ category.label }}
            </label>
          </div>
          <div class="craft-sort">
            <div class="craft-sort_box">
              <p class="craft-sort__title">Уровень:</p>
              <select class="craft-sort__select" v-model="sortDirection">
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
              </select>
            </div>
          </div>
        </div>

        <ul class="craft-list">
          <li
            class="craft__item"
            v-for="item in filteredRecipes"
            :key="item.id"
          >
            <span
              class="craft__item__icon"
              @click="showCraftItemInfo(item.targetId)"
            >
              <img
                class="craft_icon"
                :src="getImage(item.targetId)"
                :alt="item.targetId"
                v-if="getImage(item.targetId) != 0"
              />
              <span class="craft__item__icon__text" v-else>
                {{ item.targetId }}
              </span>
            </span>

            <div class="craft__item-box">
              <h4 class="craft__item__title">{{ item.name }}</h4>
              <div class="craft__item__desc-box">
                <div class="craft__item__resources-box" v-if="item.resources">
                  <span
                    class="resources-box__text"
                    v-show="item.resources.wood && item.resources.wood > 0"
                  >
                    Древесина: {{ item.resources.wood }}
                  </span>
                  <span
                    class="resources-box__text"
                    v-show="item.resources.stone && item.resources.stone > 0"
                  >
                    Камень: {{ item.resources.stone }}
                  </span>
                  <span
                    class="resources-box__text"
                    v-show="item.resources.iron && item.resources.iron > 0"
                  >
                    Железо: {{ item.resources.iron }}
                  </span>
                </div>

                <div
                  class="craft__item__desc-block"
                  v-for="ingredient in item.ingredients"
                  :key="ingredient.material"
                >
                  <span class="block__desc__title">
                    {{ materialName(ingredient.material) }}:
                  </span>
                  <div class="block__desc-box">
                    <span class="craft__item__material_current">
                      {{ currentResourceCount(ingredient.material) }}
                    </span>
                    /
                    <span class="craft__item__material_max">
                      {{ ingredient.count }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="craft-item__btn_block">
              <base-button
                class="craft__item__btn"
                @click="showCraftItemInfo(item.targetId)"
                >Описание</base-button
              >
              <base-button
                class="craft__item__btn"
                :style="{
                  'background-color': checkCraftBtnColor(item),
                }"
                @click="craftItem(item)"
                >Создать</base-button
              >
            </div>
          </li>
        </ul>
        <p
          class="craft__heading"
          v-if="playerCraftRecipes.length > 0 && filteredRecipes.length == 0"
        >
          У вас нет рецептов в данной категории!
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import player from "@/services/player";
import items from "@/services/items";

export default {
  name: "InventoryPage",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      inventoryCells: [], // Основная переменная ячеек инвентаря
      playerEquipment: {},
      playerInventory: [],
      playerCraftResources: [],
      playerCraftRecipes: [],
      playerCraftResourcesSpecial: [],
      playerCraftResourcesUniversal: [],
      playerCraftResourcesConsumables: [],
      playerCraftResourcesWeapon: [],
      tooltip: {
        visible: false,
        text: "Предмет",
        btnText: "",
        btnColor: "green",
        position: "bottom",
      },
      selectedItem: null,
      categories: [
        { name: "all", label: "Все" },
        { name: "elixir", label: "Эликсиры" },
        { name: "weapon", label: "Оружие" },
      ],
      selectedCategory: "all",
      sortDirection: "asc",
    };
  },
  computed: {
    triggerUpdateInventory() {
      return this.$store.state.triggerUpdateInventory;
    },
    filteredRecipes() {
      let recipes =
        this.selectedCategory === "all"
          ? [...this.playerCraftRecipes]
          : this.playerCraftRecipes.filter(
              (recipe) => recipe.category === this.selectedCategory
            );

      return recipes.sort((a, b) => {
        const levelA = a.requiredLevel || 0; // Если undefined, считаем 0
        const levelB = b.requiredLevel || 0;

        return this.sortDirection === "asc" ? levelA - levelB : levelB - levelA;
      });
    },
  },
  components: {},
  watch: {
    triggerUpdateInventory(newValue) {
      if (newValue) {
        this.updateInventory();
        this.updateEquipment();
        this.updateCraftInventory();
      }
    },
  },
  methods: {
    showFilteredList(category) {
      this.selectedCategory = category;
    },
    levelIsSmall(itemId) {
      if (
        items.findItem(itemId).requiredLevel > this.$store.state.playerLevel
      ) {
        return true;
      } else {
        return false;
      }
    },
    itemDurabilityNumber(itemId) {
      return items.findItem(itemId).durability;
    },
    materialName(materialId) {
      return items.findCraftMaterial(materialId).name;
    },
    currentResourceCount(id) {
      for (let i = 0; i < this.playerCraftResources.length; i++) {
        if (this.playerCraftResources[i].craftItemId == id) {
          return this.playerCraftResources[i].count;
        }
      }
      return 0;
    },
    itemLevel(id) {
      const item = items.findItem(id);
      return item.requiredLevel;
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

    updateInventory() {
      this.inventoryCells = player.createInventory();
      this.playerInventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory)
      );

      for (let i = 0; i < this.playerInventory.length; i++) {
        if (this.playerInventory[i].id) {
          const itemDurability = this.playerInventory[i].durability;
          const newItem = items.findItem(this.playerInventory[i].id);

          this.playerInventory[i] = { ...this.playerInventory[i], ...newItem };

          if (itemDurability < newItem.durability) {
            this.playerInventory[i].durability = itemDurability;
          } else {
            this.playerInventory[i].durability = newItem.durability;
          }
        }
      }
      this.$store.state.playerInventory = this.playerInventory;
      localStorage.setItem(
        "playerInventory",
        JSON.stringify(this.playerInventory)
      );
      player.equipmentCharacteristics();
    },
    updateEquipment() {
      this.playerEquipment = JSON.parse(
        JSON.stringify(this.$store.state.playerEquipment)
      );
    },
    updateCraftInventory() {
      this.playerCraftResources = [];
      this.playerCraftResourcesSpecial = [];
      this.playerCraftResourcesUniversal = [];
      this.playerCraftResourcesConsumables = [];
      this.playerCraftResourcesWeapon = [];

      this.playerCraftRecipes = [];
      const playerCraftInventory = JSON.parse(
        JSON.stringify(this.$store.state.playerCraftInventory)
      );

      for (let i = 0; i < playerCraftInventory.length; i++) {
        if (
          playerCraftInventory[i].craftItemId.toString().slice(0, 3) == "104"
        ) {
          this.playerCraftRecipes.push(
            items.findCraftRecipe(playerCraftInventory[i].craftItemId)
          );
        } else if (
          playerCraftInventory[i].craftItemId.toString().slice(0, 3) == "103"
        ) {
          this.playerCraftResources.push({
            craftItemId: playerCraftInventory[i].craftItemId,
            count: playerCraftInventory[i].count,
          });

          // Заполняем также массивы с материалами разбитыми по категории
          let material = items.findCraftMaterial(
            playerCraftInventory[i].craftItemId
          );

          if (material.category == "special") {
            this.playerCraftResourcesSpecial.push({
              craftItemId: playerCraftInventory[i].craftItemId,
              count: playerCraftInventory[i].count,
            });
          } else if (material.category == "universal") {
            this.playerCraftResourcesUniversal.push({
              craftItemId: playerCraftInventory[i].craftItemId,
              count: playerCraftInventory[i].count,
            });
          } else if (material.category == "consumables") {
            this.playerCraftResourcesConsumables.push({
              craftItemId: playerCraftInventory[i].craftItemId,
              count: playerCraftInventory[i].count,
            });
          } else if (material.category == "weapon") {
            this.playerCraftResourcesWeapon.push({
              craftItemId: playerCraftInventory[i].craftItemId,
              count: playerCraftInventory[i].count,
            });
          }
        }
      }
      this.playerCraftResourcesSpecial.sort(
        (a, b) => a.craftItemId - b.craftItemId
      );
      this.playerCraftResourcesUniversal.sort(
        (a, b) => a.craftItemId - b.craftItemId
      );
      this.playerCraftResourcesConsumables.sort(
        (a, b) => a.craftItemId - b.craftItemId
      );
      this.playerCraftResourcesWeapon.sort(
        (a, b) => a.craftItemId - b.craftItemId
      );
    },
    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },
    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
    },
    itemCategory(itemId) {
      return itemId.toString().slice(0, 3);
    },
    allItemsList(itemId) {
      const allItems = JSON.parse(JSON.stringify(items.list()));
      let newItem;

      for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id == itemId) {
          newItem = allItems[i];
        }
      }
      return newItem;
    },

    showTooltip(itemId, durability, target) {
      const newItem = this.allItemsList(itemId);

      // Проверяем где вызывается тултип: в инвентаре или в экипировке
      if (typeof target == "number") {
        if (itemId > 999) {
          this.tooltip.position = "bottom";
          this.tooltip.text = this.tooltipContent(newItem, durability);
        }
      } else {
        if (itemId > 999) {
          this.tooltip.position = "top";
          this.tooltip.text = this.tooltipContent(newItem, durability);
        }
      }
      this.selectedItem = target;
      this.tooltip.visible = true;
    },

    tooltipContent(item, durability) {
      let contentForTooltip = [];

      // Цвет кнопки
      if (this.$store.state.playerLevel < item.requiredLevel) {
        this.tooltip.btnColor = "red";
      } else {
        this.tooltip.btnColor = "green";
      }

      // Текст для кнопки
      if (this.tooltip.position == "bottom") {
        if (
          this.itemCategory(item.id) == "102" &&
          (item.id == 10217 || item.id == 10218 || item.id == 10219)
        ) {
          this.tooltip.btnText = "Открыть";
        } else if (this.itemCategory(item.id) == "102") {
          this.tooltip.btnText = "Использовать";
        } else {
          this.tooltip.btnText = "Надеть";
        }
      } else {
        this.tooltip.btnText = "Снять";
      }

      // Текст в описание предмета
      for (let key in item) {
        switch (key) {
          case "name":
            contentForTooltip.push(item[key]);
            break;
          case "damage":
            contentForTooltip.push(`Урон: ${item[key]}`);
            break;
          case "armor":
            contentForTooltip.push(`Защита: ${item[key]}`);
            break;
          case "hp":
            contentForTooltip.push(`HP: ${item[key]}`);
            break;
          case "evasion":
            contentForTooltip.push(`Уклонение: ${item[key]}`);
            break;
          case "critChance":
            contentForTooltip.push(`Крит шанс: ${item[key]}`);
            break;
          case "critPower":
            contentForTooltip.push(`Крит сила: ${item[key]}`);
            break;
          case "desc":
            contentForTooltip.push(item[key]);
            break;
          case "durability":
            if (this.itemCategory(item.id) == "102") {
              break;
            } else {
              contentForTooltip.push(`Прочность: ${durability}/${item[key]}`);
            }
            break;
          case "requiredLevel":
            contentForTooltip.push(`Уровень: ${item[key]}`);
            break;
          default:
            break;
        }
      }

      if (durability <= 0) {
        contentForTooltip.push("Требуется починка");
      }
      if (item.requiredLevel > this.$store.state.playerLevel) {
        contentForTooltip.push(
          "Уровень персонажа ниже необходимого для этого предмета"
        );
      }

      return contentForTooltip;
    },
    hideTooltip() {
      setTimeout(() => {
        this.tooltip.visible = false;
      }, 1);
    },

    handleClickOutside(event) {
      if (!this.tooltip?.visible) return;

      const tooltip = this.$el.querySelector(".tooltip");
      if (!tooltip) return;

      // Проверяем, был ли клик на tooltip или его дочерних элементах
      const isClickInsideTooltip = tooltip.contains(event.target);
      if (isClickInsideTooltip) return;

      // Проверяем, был ли клик на equipment items
      const equipmentItems = this.$el.querySelectorAll(
        ".equipment__item__icon"
      );
      const isClickOnEquipment = Array.from(equipmentItems).some((item) =>
        item.contains(event.target)
      );

      if (this.selectedTab === 1) {
        const inventory = this.$el.querySelector(".inventory-list");
        if (!inventory?.contains(event.target) && !isClickOnEquipment) {
          this.hideTooltip();
        }
      } else if (this.selectedTab === 2 && !isClickOnEquipment) {
        this.hideTooltip();
      } else if (this.selectedTab === 3 && !isClickOnEquipment) {
        this.hideTooltip();
      }
    },

    useItem(item) {
      const category = this.itemCategory(item.id);

      if (this.$store.state.playerLevel >= item.requiredLevel) {
        if (category == "100") {
          // Код, если предмет оружие
          // Закидываем предмет в ячейку экипировки если в ней пусто
          if (this.playerEquipment.weapon == 0) {
            // Экипируем предмет и сохраняем в стор
            this.playerEquipment.weapon = item.id;
            this.playerEquipment.weaponDurability = item.durability;
            this.$store.state.playerEquipment = this.playerEquipment;
          } else {
            // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
            let newItem = JSON.parse(
              JSON.stringify(this.allItemsList(this.playerEquipment.weapon))
            );
            newItem.durability = JSON.parse(
              JSON.stringify(this.playerEquipment.weaponDurability)
            );
            this.playerInventory.push(newItem);
            this.playerEquipment.weapon = item.id;
            this.playerEquipment.weaponDurability = item.durability;
            this.$store.state.playerEquipment = this.playerEquipment;
          }
        } else if (category == "101") {
          // Код, если предмет броня
          // Закидываем предмет в соответствующую ячейку
          switch (item.category) {
            case "helmet":
              if (this.playerEquipment.helmet == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.helmet = item.id;
                this.playerEquipment.helmetDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                let newItem = JSON.parse(
                  JSON.stringify(this.allItemsList(this.playerEquipment.helmet))
                );
                newItem.durability = JSON.parse(
                  JSON.stringify(this.playerEquipment.helmetDurability)
                );
                this.playerInventory.push(newItem);
                this.playerEquipment.helmet = item.id;
                this.playerEquipment.helmetDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              }
              break;
            case "upper":
              if (this.playerEquipment.upper == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.upper = item.id;
                this.playerEquipment.upperDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                let newItem = JSON.parse(
                  JSON.stringify(this.allItemsList(this.playerEquipment.upper))
                );
                newItem.durability = JSON.parse(
                  JSON.stringify(this.playerEquipment.upperDurability)
                );
                this.playerInventory.push(newItem);
                this.playerEquipment.upper = item.id;
                this.playerEquipment.upperDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              }
              break;
            case "lower":
              if (this.playerEquipment.lower == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.lower = item.id;
                this.playerEquipment.lowerDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                let newItem = JSON.parse(
                  JSON.stringify(this.allItemsList(this.playerEquipment.lower))
                );
                newItem.durability = JSON.parse(
                  JSON.stringify(this.playerEquipment.lowerDurability)
                );
                this.playerInventory.push(newItem);
                this.playerEquipment.lower = item.id;
                this.playerEquipment.lowerDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              }
              break;
            case "gloves":
              if (this.playerEquipment.gloves == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.gloves = item.id;
                this.playerEquipment.glovesDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                let newItem = JSON.parse(
                  JSON.stringify(this.allItemsList(this.playerEquipment.gloves))
                );
                newItem.durability = JSON.parse(
                  JSON.stringify(this.playerEquipment.glovesDurability)
                );
                this.playerInventory.push(newItem);
                this.playerEquipment.gloves = item.id;
                this.playerEquipment.glovesDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              }
              break;
            case "boots":
              if (this.playerEquipment.boots == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.boots = item.id;
                this.playerEquipment.bootsDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                let newItem = JSON.parse(
                  JSON.stringify(this.allItemsList(this.playerEquipment.boots))
                );
                newItem.durability = JSON.parse(
                  JSON.stringify(this.playerEquipment.bootsDurability)
                );
                this.playerInventory.push(newItem);
                this.playerEquipment.boots = item.id;
                this.playerEquipment.bootsDurability = item.durability;
                this.$store.state.playerEquipment = this.playerEquipment;
              }
              break;
            default:
              break;
          }
        } else if (category == "102") {
          // Код, если предмет расходник
          let currentHp = this.$store.state.playerCurrentHp;

          switch (item.category) {
            case "restoreHp":
              currentHp += item.amount;
              if (currentHp > this.$store.state.playerMaxHp) {
                currentHp = this.$store.state.playerMaxHp;
                this.$store.state.playerCurrentHp = currentHp;
                localStorage.setItem("playerCurrentHp", currentHp);
              } else {
                this.$store.state.playerCurrentHp = currentHp;
                localStorage.setItem("playerCurrentHp", currentHp);
              }
              break;
            case "buffDamage":
              this.$store.state.playerBuffCharacteristics.damage = item.amount;
              this.$store.state.playerBuffCharacteristics.damageBuffDuration =
                item.duration;
              break;
            case "buffArmor":
              this.$store.state.playerBuffCharacteristics.armor = item.amount;
              this.$store.state.playerBuffCharacteristics.armorBuffDuration =
                item.duration;
              break;
            case "buffHp":
              this.$store.state.playerBuffCharacteristics.hp = item.amount;
              this.$store.state.playerBuffCharacteristics.hpBuffDuration =
                item.duration;
              break;
            case "buffEvasion":
              this.$store.state.playerBuffCharacteristics.evasion = item.amount;
              this.$store.state.playerBuffCharacteristics.evasionBuffDuration =
                item.duration;
              break;
            case "buffCritChance":
              this.$store.state.playerBuffCharacteristics.critChance =
                item.amount;
              this.$store.state.playerBuffCharacteristics.critChanceBuffDuration =
                item.duration;
              break;
            case "buffCritPower":
              this.$store.state.playerBuffCharacteristics.critPower =
                item.amount;
              this.$store.state.playerBuffCharacteristics.critPowerBuffDuration =
                item.duration;
              break;
            case "buffDrop":
              this.$store.state.playerBuffCharacteristics.drop = item.amount;
              this.$store.state.playerBuffCharacteristics.dropBuffDuration =
                item.duration;
              break;
            case "magicChest": {
              const playerCraftInventory = JSON.parse(
                JSON.stringify(this.$store.state.playerCraftInventory)
              );
              let keyCount = 0;

              // Смотрим есть ли у нас ключи
              for (let i = 0; i < playerCraftInventory.length; i++) {
                if (playerCraftInventory[i].craftItemId == 10316) {
                  keyCount = playerCraftInventory[i].count;
                  break;
                }
              }
              // Если ключи есть
              if (keyCount > 0) {
                // Находим индекс элемента с нужным craftItemId
                const index = playerCraftInventory.findIndex(
                  (item) => item.craftItemId === 10316
                );

                if (index !== -1) {
                  // Если элемент найден
                  playerCraftInventory[index].count -= 1;

                  if (playerCraftInventory[index].count <= 0) {
                    // Если count стал 0 или меньше, удаляем элемент из массива
                    playerCraftInventory.splice(index, 1);
                  }
                }

                const drop = items.magicChestRandomDrop(item.id, item.amount);
                this.$store.state.chestIsOpen.drop = drop;
                this.$store.state.chestIsOpen.visible = true;
                this.showModal();

                // Сохраняем дроп крафт предметов игрока
                drop.forEach((dropItem) => {
                  // Ищем соответствующий элемент в инвентаре
                  const existingItem = playerCraftInventory.find(
                    (invItem) => invItem.craftItemId === dropItem.craftItemId
                  );

                  if (existingItem) {
                    // Если элемент найден, увеличиваем count
                    existingItem.count += dropItem.count;
                  } else {
                    // Если элемент не найден, добавляем новый
                    playerCraftInventory.push({
                      craftItemId: dropItem.craftItemId,
                      count: dropItem.count,
                    });
                  }
                });

                // Сохраняем предметы с сундука в инвентаре
                this.$store.state.playerCraftInventory = playerCraftInventory;
                localStorage.setItem(
                  "playerCraftInventory",
                  JSON.stringify(this.$store.state.playerCraftInventory)
                );

                this.updateCraftInventory();
                // Если ключей нет
              } else {
                this.$store.state.modalNotification.text =
                  "Невозможно открыть сундук. Нет магических ключей.";
                this.$store.state.modalNotification.from = "basic";
                this.$store.state.modalNotification.visible = true;
                this.showModal();
                this.hideTooltip();

                return;
              }
              break;
            }
            default:
              break;
          }
          // Сохраняем баф с расходника в LocalStarage
          localStorage.setItem(
            "playerBuffCharacteristics",
            JSON.stringify(this.$store.state.playerBuffCharacteristics)
          );
        }

        // Сохраняем экипировку в LocalStarage
        localStorage.setItem(
          "playerEquipment",
          JSON.stringify(this.playerEquipment)
        );

        // Удаляем надетый предмет из инвентаря и сохраняем в LocalStorage
        this.playerInventory.splice(item.cellId, 1);
        this.$store.state.playerInventory = this.playerInventory;
        localStorage.setItem(
          "playerInventory",
          JSON.stringify(this.$store.state.playerInventory)
        );
        // Обновляем отображение инвентаря
        this.updateInventory();
        this.updateEquipment();

        // Вычисляем характеристики в зависимости от надетых предметов
        player.equipmentCharacteristics();

        downloadData();
      } else {
        this.$store.state.modalNotification.text =
          "Невозможно надеть. Уровень предмета выше вашего.";
        this.$store.state.modalNotification.from = "inventory";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
      this.hideTooltip();
    },

    removeItem(itemId, itemDurability, target) {
      if (this.$store.state.playerInventory.length < 50) {
        let item = this.allItemsList(itemId);

        item.durability = itemDurability;
        this.playerInventory = JSON.parse(
          JSON.stringify(this.$store.state.playerInventory)
        );
        this.playerInventory.push(item);
        this.$store.state.playerInventory = this.playerInventory;
        localStorage.setItem(
          "playerInventory",
          JSON.stringify(this.playerInventory)
        );

        switch (target) {
          case "weapon":
            this.playerEquipment.weapon = 0;
            this.playerEquipment.weaponDurability = 0;
            break;
          case "helmet":
            this.playerEquipment.helmet = 0;
            this.playerEquipment.helmetDurability = 0;
            break;
          case "upper":
            this.playerEquipment.upper = 0;
            this.playerEquipment.upperDurability = 0;
            break;
          case "lower":
            this.playerEquipment.lower = 0;
            this.playerEquipment.lowerDurability = 0;
            break;
          case "gloves":
            this.playerEquipment.gloves = 0;
            this.playerEquipment.glovesDurability = 0;
            break;
          case "boots":
            this.playerEquipment.boots = 0;
            this.playerEquipment.bootsDurability = 0;
            break;
          default:
            break;
        }

        this.$store.state.playerEquipment = this.playerEquipment;
        localStorage.setItem(
          "playerEquipment",
          JSON.stringify(this.playerEquipment)
        );

        this.updateInventory();
        this.updateEquipment();

        // Вычисляем характеристики в зависимости от надетых предметов
        player.equipmentCharacteristics();

        downloadData();
      } else {
        this.$store.state.modalNotification.text =
          "Невозможно снять предмет. Инвентарь переполнен.";
        this.$store.state.modalNotification.from = "inventory";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
      this.hideTooltip();
    },

    hasEnoughResources(item) {
      let recipe = item;
      let playerResources = JSON.parse(
        JSON.stringify(this.$store.state.playerResources)
      );
      let playerCraftInventory = JSON.parse(
        JSON.stringify(this.playerCraftResources)
      );

      // Проверяем достаточно ли ресурсов
      for (const [resource, requiredCount] of Object.entries(
        recipe.resources || {}
      )) {
        const playerCount = playerResources[resource] || 0;
        if (playerCount < requiredCount) {
          return {
            success: false,
            message: "Невозможно создать предмет. Не хватает ресурсов.",
          };
        }
      }

      // Проверяем материалы (craft items)
      for (const ingredient of recipe.ingredients || []) {
        const playerItem = playerCraftInventory.find(
          (item) => item.craftItemId === ingredient.material
        );
        const playerCount = playerItem ? playerItem.count : 0;
        if (playerCount < ingredient.count) {
          return {
            success: false,
            message: "Невозможно создать предмет. Не хватает материалов.",
          };
        }
      }

      if (this.$store.state.playerInventory.length < 50) {
        return { success: true, message: "Вы создали предмет!" };
      } else {
        return {
          success: false,
          message: "Невозможно создать предмет. Инвентарь переполнен.",
        };
      }
    },

    craftItem(item) {
      // Сначала проверяем, хватает ли ресурсов
      const isEnough = this.hasEnoughResources(item);
      if (isEnough.success == true) {
        let recipe = item;
        let playerResources = JSON.parse(
          JSON.stringify(this.$store.state.playerResources)
        );
        let playerCraftInventory = JSON.parse(
          JSON.stringify(this.$store.state.playerCraftInventory)
        );

        // Вычитаем ресурсы
        for (const [resource, requiredCount] of Object.entries(
          recipe.resources || {}
        )) {
          playerResources[resource] -= requiredCount;
        }

        // Вычитаем материалы
        for (const ingredient of recipe.ingredients || []) {
          const playerItemIndex = playerCraftInventory.findIndex(
            (item) => item.craftItemId === ingredient.material
          );
          if (playerItemIndex !== -1) {
            playerCraftInventory[playerItemIndex].count -= ingredient.count;

            // Удаляем предмет, если количество стало 0
            if (playerCraftInventory[playerItemIndex].count <= 0) {
              playerCraftInventory.splice(playerItemIndex, 1);
            }
          }
        }

        let foundItem = this.allItemsList(item.targetId);

        this.playerInventory = JSON.parse(
          JSON.stringify(this.$store.state.playerInventory)
        );

        this.playerInventory.push(foundItem);

        this.$store.state.playerInventory = this.playerInventory;
        localStorage.setItem(
          "playerInventory",
          JSON.stringify(this.playerInventory)
        );

        this.$store.state.playerResources = playerResources;
        localStorage.setItem(
          "playerResources",
          JSON.stringify(this.$store.state.playerResources)
        );

        this.$store.state.playerCraftInventory = playerCraftInventory;
        localStorage.setItem(
          "playerCraftInventory",
          JSON.stringify(this.$store.state.playerCraftInventory)
        );

        downloadData();

        this.updateInventory();
        this.updateCraftInventory();

        this.$store.state.modalNotification.text = isEnough.message;
        this.$store.state.modalNotification.from = "inventory";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      } else {
        this.$store.state.modalNotification.text = isEnough.message;
        this.$store.state.modalNotification.from = "inventory";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
    },

    showModal() {
      this.$emit("show-modal");
    },
    showCraftItemInfo(itemId) {
      let item = items.findItem(itemId);
      this.$store.state.modalNotification.text = item;
      this.$store.state.modalNotification.from = "inventory";
      this.$store.state.modalNotification.visible = true;
      this.showModal();
    },
    checkCraftBtnColor(item) {
      if (this.hasEnoughResources(item).success == true) {
        return "var(--color-green)";
      } else {
        return "var(--color-red)";
      }
    },
  },
  beforeCreate() {},
  created() {
    this.updateInventory();
    this.updateEquipment();
    this.updateCraftInventory();
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.equipment-block {
  margin-bottom: 30px;
}
.equipment__header {
  margin-bottom: 30px;
  font-size: 22px;
}
.equipment-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.equipment__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94px;
}
.equipment__item__header {
  margin-bottom: 15px;
  height: 35px;
  font-size: 16px;
  align-content: center;
  text-align: center;
}
.equipment__item__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94px;
  height: 94px;
  border: 2px solid var(--color-light);
}
.equipment__image {
  width: 90px;
  height: 90px;
}
.item__level {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 2px;
  background-color: var(--color-light);
  color: var(--color-dark);
  font-family: Bahnschrift, sans-serif;
  font-weight: 900;
  font-size: 14px;
  z-index: 100;
}
.equipment-durability_block {
  width: 100%;
  height: 20px;
}
.equipment__durability {
  font-size: 14px;
}
.equipment--unsuitable {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(212, 99, 93, 0.5);
}
.nav-list {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  border: 2px solid var(--color-light);
}
.nav__item {
  padding: 5px 10px;
  cursor: pointer;
}
.inventory-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px solid var(--color-light);
}
.inventory__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 10%;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--color-light);
}
.inventory-item_broken {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.7);
}
.inventory-item_broken__icon {
  position: absolute;
  left: 5%;
  top: 60%;
  color: rgb(224, 43, 43);
  font-weight: 900;
  font-size: 25px;
}
.material-block {
  display: flex;
  flex-wrap: wrap;
  max-height: 50vh;
  overflow: auto;
}
.material-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-basis: 47%;
  margin-bottom: 30px;
  margin-right: 30px;
  padding: 15px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
}
.material-box:nth-child(2n) {
  margin-right: 0;
}
.material-box__title {
  margin-bottom: 15px;
}
.material-list {
  display: flex;
  flex-direction: column;
}
.material__item {
  display: flex;
  align-items: center;
}
.material__item:not(:last-child) {
  margin-bottom: 10px;
}
.material__title {
  margin-right: 10px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 400;
  font-size: 16px;
}
.craft-block {
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  max-height: 45vh;
}
.craft-filter_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 714px;
}
.craft-filter {
  margin-bottom: 20px;
}
.craft-filter label {
  margin-right: 15px;
  cursor: pointer;
}
.craft__radio_btn {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid #999;
  transition: 0.2s all linear;
  outline: none;
  margin-right: 2px;

  position: relative;
  top: 4px;
  cursor: pointer;
}
.craft__radio_btn:checked {
  border: 6px solid var(--color-green);
}
.craft-sort_box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.craft-sort__select {
  padding: 2px 5px;
  border: 1px solid var(--color-light);
  border-radius: 4px;
}
.craft__heading {
  margin-top: 50px;
  text-align: center;
}
.craft-list {
  display: flex;
  flex-direction: column;
}
.craft__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 15px;
  max-width: 714px;
  border: 2px solid var(--color-light);
}
.craft__item__icon {
  position: relative;
  align-content: center;
  text-align: center;
  height: 74px;
  width: 74px;
  border: 1px solid var(--color-light);
  cursor: pointer;
}
.craft__item__icon:hover {
  border: 1px solid var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
}
.craft__item-box {
  width: 480px;
}
.craft__item__title {
  margin-bottom: 15px;
}
.craft__item__desc-block {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.craft__item__desc-block:last-child {
  margin-bottom: 0;
}
.craft-item__btn_block {
  display: flex;
  flex-direction: column;
}
.craft__item__btn {
  padding: 7px 10px;
  border: 1px solid var(--color-dark);
}
.craft__item__btn:hover {
  border: 1px solid var(--color-light);
  background-color: var(--color-dark);
  color: var(--color-light);
}
.craft__item__btn:not(:last-child) {
  margin-bottom: 10px;
}
.block__desc__title {
  margin-right: 10px;
  width: 250px;
}
.craft__item__resources-box {
  display: flex;
}
.resources-box__text {
  margin-right: 30px;
  margin-bottom: 10px;
}
.resources-box__text:last-child {
  margin-bottom: 0;
  margin-right: 0;
}
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.equipped {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.block__title {
  display: block;
  margin-top: 30px;
  text-align: center;
  line-height: 1.5;
}
</style>
