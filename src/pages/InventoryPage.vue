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
          </span>
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
          </span>
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
          </span>
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
            ></span
          >
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
          </span>
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
          </span>
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
          <span class="item__level" v-if="item.id > 999"
            >Ур.{{ item.requiredLevel }}</span
          >
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
      <ul
        class="craft-list"
        v-else-if="selectedTab == 3 && playerCraftRecipes.length > 0"
      >
        <li
          class="craft__item"
          v-for="item in playerCraftRecipes"
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
                  {{ ingredientName(ingredient.material) }}:
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

          <base-button
            class="craft__item__btn"
            :style="{
              'background-color': checkCraftBtnColor(item),
            }"
            @click="craftItem(item)"
            >Создать</base-button
          >
        </li>
      </ul>
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
      selectedTab: 2,
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
    };
  },
  computed: {
    triggerUpdateInventory() {
      return this.$store.state.triggerUpdateInventory;
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
    materialName(materialId) {
      return items.findCraftIngredient(materialId).name;
    },
    currentResourceCount(id) {
      for (let i = 0; i < this.playerCraftResources.length; i++) {
        if (this.playerCraftResources[i].craftItemId == id) {
          return this.playerCraftResources[i].count;
        }
      }
      return 0;
    },
    ingredientName(id) {
      const ingredient = items.findCraftIngredient(id);
      return ingredient.name;
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
      this.playerCraftInventory = [];
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
          let material = items.findCraftIngredient(
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

      this.playerCraftRecipes.sort((a, b) => a.id - b.id);
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
}
.equipment__item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.equipment__item__header {
  margin-bottom: 15px;
  font-size: 16px;
}
.equipment__item__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 74px;
  border: 2px solid var(--color-light);
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
.nav-list {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
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
.material-block {
  display: flex;
  flex-wrap: wrap;
  /* align-items: flex-start; */
  padding-right: 15px;
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
  /* justify-content: space-between; */
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
.craft-list {
  display: flex;
  flex-direction: column;
  padding-right: 15px;
  max-height: 50vh;
  overflow: auto;
}
.craft__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
  border: 2px solid var(--color-light);
}
.craft__item__icon {
  position: relative;
  align-content: center;
  text-align: center;
  height: 74px;
  width: 74px;
  border: 1px solid var(--color-dark);
  cursor: pointer;
}
.craft__item__icon:hover {
  border: 1px solid var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
}
.craft__item-box {
  width: 500px;
}
.craft__item__title {
  margin-bottom: 10px;
}
.craft__item__desc-block {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.craft__item__desc-block:last-child {
  margin-bottom: 0;
}
.craft__item__btn {
  border: 1px solid var(--color-dark);
}
.craft__item__btn:hover {
  border: 1px solid var(--color-light);
  background-color: var(--color-dark);
  color: var(--color-light);
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
