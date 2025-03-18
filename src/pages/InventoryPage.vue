<template>
  <div class="container inventory-container">
    <div class="equipment-block">
      <h2 class="equipment__header">Экипировка</h2>
      <ul class="equipment-list">
        <li class="equipment__item">
          <h4 class="equipment__item__header">Оружие</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Шлем</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Верхний доспех</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Нижний доспех</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Перчатки</h4>
          <span class="equipment__item__icon"></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Сапоги</h4>
          <span class="equipment__item__icon"></span>
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
          :key="item.id"
          @click="showTooltip(item)"
        >
          <span class="inventory__item__id" v-show="item.id > 999">
            {{ item.id }}
          </span>
          <base-tooltip
            :tooltip="tooltip"
            v-show="
              tooltip.visible && selectedItem == item.cellId && item.id > 999
            "
          ></base-tooltip>
        </li>
      </ul>
      <div class="inventory-list" v-if="selectedTab == 2">
        Доступные рецепты
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";

export default {
  name: "InventoryPage",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      inventoryCells: [],
      playerInventory: [],
      allItems: [],
      tooltip: {
        visible: false,
        text: "Предмет",
        btnText: "",
        btnColor: "green",
      },
      selectedItem: null,
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },
    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
    },
    showTooltip(item) {
      if (item.id > 999) {
        let newItem;

        this.selectedItem = item.cellId;

        for (let i = 0; i < this.allItems.length; i++) {
          if (this.allItems[i].id == item.id) {
            newItem = this.allItems[i];
          }
        }

        this.tooltip.visible = true;
        this.tooltip.text = this.tooltipContent(newItem);
      }
    },

    tooltipContent(item) {
      let contentForTooltip = [];
      const category = item.id.toString().slice(0, 3);

      // Цвет кнопки
      if (this.$store.state.playerLevel < item.requiredLevel) {
        this.tooltip.btnColor = "red";
      }

      // Текст для кнопки
      if (category == "102") {
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
            if (category == "102") {
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
  },
  beforeCreate() {},
  created() {
    this.allItems = items.list();
    this.playerInventory = this.$store.state.playerInventory;

    // Заполняем ячейки инвентаря купленными предметами
    for (let i = 0; i < 50; i++) {
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
  mounted() {},
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
</style>
