<template>
  <div class="container inventory-container">
    <div class="equipment-block">
      <h2 class="equipment__header">Экипировка</h2>
      <ul class="equipment-list">
        <li
          class="equipment__item"
          @click="showTooltip(playerEquipment.weapon, 'weapon')"
        >
          <h4 class="equipment__item__header">Оружие</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.weapon > 999 }"
          >
            <span
              class="equipment__item__text"
              v-show="playerEquipment.weapon > 999"
              >{{ playerEquipment.weapon }}</span
            >
          </span>
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="tooltip.visible && selectedItem == 'weapon'"
          ></base-tooltip>
        </li>
        <li
          class="equipment__item"
          @click="showTooltip(playerEquipment.helmet, 'helmet')"
        >
          <h4 class="equipment__item__header">Шлем</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.helmet > 999 }"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.helmet > 999"
              >{{ playerEquipment.helmet }}</span
            ></span
          >
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="tooltip.visible && selectedItem == 'helmet'"
          ></base-tooltip>
        </li>
        <li
          class="equipment__item"
          @click="showTooltip(playerEquipment.upper, 'upper')"
        >
          <h4 class="equipment__item__header">Верхний доспех</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.upper > 999 }"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.upper > 999"
              >{{ playerEquipment.upper }}</span
            ></span
          >
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="tooltip.visible && selectedItem == 'upper'"
          ></base-tooltip>
        </li>
        <li
          class="equipment__item"
          @click="showTooltip(playerEquipment.lower, 'lower')"
        >
          <h4 class="equipment__item__header">Нижний доспех</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.lower > 999 }"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.lower > 999"
              >{{ playerEquipment.lower }}</span
            ></span
          >
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="tooltip.visible && selectedItem == 'lower'"
          ></base-tooltip>
        </li>
        <li
          class="equipment__item"
          @click="showTooltip(playerEquipment.gloves, 'gloves')"
        >
          <h4 class="equipment__item__header">Перчатки</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.gloves > 999 }"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.gloves > 999"
              >{{ playerEquipment.gloves }}</span
            ></span
          >
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="tooltip.visible && selectedItem == 'gloves'"
          ></base-tooltip>
        </li>
        <li
          class="equipment__item"
          @click="showTooltip(playerEquipment.boots, 'boots')"
        >
          <h4 class="equipment__item__header">Сапоги</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.boots > 999 }"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.boots > 999"
              >{{ playerEquipment.boots }}</span
            ></span
          >
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="tooltip.visible && selectedItem == 'boots'"
          ></base-tooltip>
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
        <h4 class="item__header">Крафт</h4>
      </li>
    </ul>

    <div class="inventory-block">
      <ul class="inventory-list" v-if="selectedTab == 1">
        <li
          class="inventory__item"
          v-for="item in inventoryCells"
          :key="item.cellId"
          @click="showTooltip(item, item.cellId)"
        >
          <span class="inventory__item__id" v-show="item.id > 999">
            {{ item.id }}
          </span>
          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-show="
              tooltip.visible && selectedItem == item.cellId && item.id > 999
            "
            @use="useItem(item)"
          ></base-tooltip>
        </li>
      </ul>
      <div class="craft-list" v-if="selectedTab == 2">Доступные рецепты</div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import items from "@/services/items";
import player from "@/services/player";

export default {
  name: "InventoryPage",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      inventoryCells: [], // Основная переменная ячеек инвентаря
      playerInventory: [], // Вспомогательная переменная инвентаря
      playerEquipment: {
        weapon: 0,
        helmet: 0,
        upper: 0,
        lower: 0,
        gloves: 0,
        boots: 0,
      },
      allItems: [],
      tooltip: {
        visible: false,
        text: "Предмет",
        btnText: "",
        btnColor: "green",
        position: "bottom"
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
        this.createInventory();
      }
    },
  },
  methods: {
    createInventory() {
      this.inventoryCells = [];
      this.allItems = items.list();
      this.playerInventory = this.$store.state.playerInventory;

      // Заполняем ячейки инвентаря купленными предметами
      for (let i = 0; i < this.$store.state.playerInventorySize; i++) {
        let item = {};
        let newValue;
        const newKey = "cellId";

        // Если есть купленный предмет, то записываем в ячейку полный объект из списка всех предметов
        if (this.playerInventory[i]) {
          for (let index = 0; index < this.allItems.length; index++) {
            if (this.allItems[index].id == this.playerInventory[i]) {
              item = this.allItems[index];
            }
          }
          this.inventoryCells.push(item);
          newValue = i;
          let newInventoryCells = this.inventoryCells[i];
          // Дописываем в объект id ячейки, чтобы при нажатии на ячейку открывался тултип только у этой ячейки
          this.inventoryCells[i] = { [newKey]: newValue, ...newInventoryCells };
        } else {
          this.inventoryCells.push({ [newKey]: i });
        }
      }
    },
    createEquipment() {
      this.playerEquipment = this.$store.state.playerEquipment;
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
    showTooltip(item, target) {
      // Проверяем где вызывается тултип: в инвентаре или в экипировке
      if (typeof item == "object") {
        if (item.id > 999) {
          let newItem;

          this.selectedItem = target;

          for (let i = 0; i < this.allItems.length; i++) {
            if (this.allItems[i].id == item.id) {
              newItem = this.allItems[i];
            }
          }

          this.tooltip.text = this.tooltipContent(newItem);
          this.tooltip.position = "bottom"
          this.tooltip.visible = true;
        }
      } else {
        if (item > 999) {
          let newItem;

          this.selectedItem = target;

          for (let i = 0; i < this.allItems.length; i++) {
            if (this.allItems[i].id == item) {
              newItem = this.allItems[i];
            }
          }

          this.tooltip.text = this.tooltipContent(newItem);
          this.tooltip.position = "top"
          this.tooltip.visible = true;
        }
      }
    },

    tooltipContent(item) {
      let contentForTooltip = [];

      // Цвет кнопки
      if (this.$store.state.playerLevel < item.requiredLevel) {
        this.tooltip.btnColor = "red";
      }

      // Текст для кнопки
      if (this.itemCategory(item.id) == "102") {
        this.tooltip.btnText = "Использовать";
      } else {
        this.tooltip.btnText = "Надеть";
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
          case "desc":
            contentForTooltip.push(item[key]);
            break;
          case "durability":
            if (this.itemCategory(item.id) == "102") {
              break;
            } else {
              contentForTooltip.push(`Прочность: ${item[key]}`);
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
      if (this.tooltip.visible) {
        const tooltip = this.$el.querySelector(".tooltip");
        const inventory = this.$el.querySelector(".inventory-list");
        const equipment = this.$el.querySelector(".equipment__item");

        // Проверяем, кликнули ли мы вне инвентаря и тултипа
        if (
          this.tooltip.visible &&
          tooltip &&
          inventory &&
          equipment &&
          !tooltip.contains(event.target) &&
          !inventory.contains(event.target) &&
          !equipment.contains(event.target)
        ) {
          this.hideTooltip();
        }
      }
    },
    useItem(item) {
      const category = this.itemCategory(item.id);

      if (this.$store.state.playerLevel >= item.requiredLevel) {
        if (category == "100") {
          // Код, если предмет оружие
          // Закидываем предмет в ячейку экипировки
          this.playerEquipment.weapon = item.id;

          // Сохраняем экипировку в localStorage
          this.$store.state.playerEquipment.weapon = item.id;
          localStorage.setItem(
            "playerEquipment",
            JSON.stringify(this.playerEquipment)
          );

          // Удаляем надетый предмет из инвентаря и сохраняем изменения в LocalStorage
          this.playerInventory.splice(item.cellId, 1);
          this.$store.state.playerInventory = this.playerInventory;
          localStorage.setItem(
            "playerInventory",
            JSON.stringify(this.playerInventory)
          );
        } else if (category == "101") {
          // Код, если предмет броня
        } else {
          // Код, если предмет расходник
          console.log("Использовать предмет");
        }
      } else {
        console.log("Вы не можете пользоваться этим предметом");
      }

      // Обновляем отображение инвентаря
      this.createInventory();

      // Вычмсляем характеристики в зависимости от надетых предметов
      player.equipmentCharacteristics();

      downloadData();

      this.hideTooltip();
    },
  },
  beforeCreate() {},
  created() {
    this.createInventory();
    this.createEquipment();
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.equipment__item__header {
  margin-bottom: 15px;
  font-size: 16px;
}
.equipment__item__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border: 2px solid var(--color-light);
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
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.equipped {
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
