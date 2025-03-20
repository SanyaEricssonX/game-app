<template>
  <div class="container inventory-container">
    <div class="equipment-block">
      <h2 class="equipment__header">Экипировка</h2>
      <ul class="equipment-list">
        <li class="equipment__item">
          <h4 class="equipment__item__header">Оружие</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.weapon > 999 }"
            @click="showTooltip(playerEquipment.weapon, 'weapon')"
          >
            <span
              class="equipment__item__text"
              v-show="playerEquipment.weapon > 999"
              >{{ playerEquipment.weapon }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              v-if="tooltip.visible && selectedItem == 'weapon'"
            ></base-tooltip>
          </span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Шлем</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.helmet > 999 }"
            @click="showTooltip(playerEquipment.helmet, 'helmet')"
          >
            <span
              class="equipment__item__text"
              v-show="playerEquipment.helmet > 999"
              >{{ playerEquipment.helmet }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              v-if="tooltip.visible && selectedItem == 'helmet'"
            ></base-tooltip>
          </span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Верхний доспех</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.upper > 999 }"
            @click="showTooltip(playerEquipment.upper, 'upper')"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.upper > 999"
              >{{ playerEquipment.upper }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              v-if="tooltip.visible && selectedItem == 'upper'"
            ></base-tooltip>
          </span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Нижний доспех</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.lower > 999 }"
            @click="showTooltip(playerEquipment.lower, 'lower')"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.lower > 999"
              >{{ playerEquipment.lower }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              v-if="tooltip.visible && selectedItem == 'lower'"
            ></base-tooltip
          ></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Перчатки</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.gloves > 999 }"
            @click="showTooltip(playerEquipment.gloves, 'gloves')"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.gloves > 999"
              >{{ playerEquipment.gloves }}</span
            >
            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              v-if="tooltip.visible && selectedItem == 'gloves'"
            ></base-tooltip
          ></span>
        </li>
        <li class="equipment__item">
          <h4 class="equipment__item__header">Сапоги</h4>
          <span
            class="equipment__item__icon"
            :class="{ equipped: playerEquipment.boots > 999 }"
            @click="showTooltip(playerEquipment.boots, 'boots')"
            ><span
              class="equipment__item__text"
              v-show="playerEquipment.boots > 999"
              >{{ playerEquipment.boots }}</span
            ><base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              v-if="tooltip.visible && selectedItem == 'boots'"
            ></base-tooltip
          ></span>
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
            v-if="
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
        this.createInventory();
        this.createEquipment();
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
          this.tooltip.position = "bottom";
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
          this.tooltip.position = "top";
          this.tooltip.visible = true;
        }
      }
    },

    tooltipContent(item) {
      let contentForTooltip = [];

      // Цвет кнопки
      if (this.$store.state.playerLevel < item.requiredLevel) {
        this.tooltip.btnColor = "red";
      } else {
        this.tooltip.btnColor = "green";
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
        const equipmentItems = this.$el.querySelectorAll(
          ".equipment__item__icon"
        );
        const isOutsideEquipment = Array.from(equipmentItems).every(
          (item) => !item.contains(event.target)
        );

        // Проверяем, кликнули ли мы вне инвентаря и тултипа
        if (
          this.tooltip.visible &&
          tooltip &&
          inventory &&
          !tooltip.contains(event.target) &&
          !inventory.contains(event.target) &&
          isOutsideEquipment
        ) {
          this.hideTooltip();
        } else if (
          this.tooltip.visible &&
          this.selectedTab == 2 &&
          tooltip &&
          !tooltip.contains(event.target) &&
          isOutsideEquipment
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
          // Закидываем предмет в ячейку экипировки если в ней пусто
          if (this.playerEquipment.weapon == 0) {
            // Экипируем предмет и сохраняем в стор
            this.playerEquipment.weapon = item.id;
            this.$store.state.playerEquipment.weapon = item.id;
          } else {
            // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
            const equippedItem = this.playerEquipment.weapon;
            this.playerInventory.push(equippedItem);
            this.playerEquipment.weapon = item.id;
            this.$store.state.playerEquipment.weapon = item.id;
          }
        } else if (category == "101") {
          // Код, если предмет броня
          // Закидываем предмет в соответствующую ячейку
          switch (item.category) {
            case "helmet":
              if (this.playerEquipment.helmet == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.helmet = item.id;
                this.$store.state.playerEquipment.helmet = item.id;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                const equippedItem = this.playerEquipment.helmet;
                this.playerInventory.push(equippedItem);
                this.playerEquipment.helmet = item.id;
                this.$store.state.playerEquipment.helmet = item.id;
              }
              break;
            case "upper":
              if (this.playerEquipment.upper == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.upper = item.id;
                this.$store.state.playerEquipment.upper = item.id;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                const equippedItem = this.playerEquipment.upper;
                this.playerInventory.push(equippedItem);
                this.playerEquipment.upper = item.id;
                this.$store.state.playerEquipment.upper = item.id;
              }
              break;
            case "lower":
              if (this.playerEquipment.lower == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.lower = item.id;
                this.$store.state.playerEquipment.lower = item.id;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                const equippedItem = this.playerEquipment.lower;
                this.playerInventory.push(equippedItem);
                this.playerEquipment.lower = item.id;
                this.$store.state.playerEquipment.lower = item.id;
              }
              break;
            case "gloves":
              if (this.playerEquipment.gloves == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.gloves = item.id;
                this.$store.state.playerEquipment.gloves = item.id;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                const equippedItem = this.playerEquipment.gloves;
                this.playerInventory.push(equippedItem);
                this.playerEquipment.gloves = item.id;
                this.$store.state.playerEquipment.gloves = item.id;
              }
              break;
            case "boots":
              if (this.playerEquipment.boots == 0) {
                // Экипируем предмет и сохраняем в стор
                this.playerEquipment.boots = item.id;
                this.$store.state.playerEquipment.boots = item.id;
              } else {
                // Закидываем новый предмет в экипировку, а ранее экипированный предмет записываем в инвентарь
                const equippedItem = this.playerEquipment.boots;
                this.playerInventory.push(equippedItem);
                this.playerEquipment.boots = item.id;
                this.$store.state.playerEquipment.boots = item.id;
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
            case "buffDrop":
              this.$store.state.playerBuffCharacteristics.drop = item.amount;
              this.$store.state.playerBuffCharacteristics.dropBuffDuration =
                item.duration;
              break;
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
          JSON.stringify(this.playerInventory)
        );

        // Обновляем отображение инвентаря
        this.createInventory();

        // Вычисляем характеристики в зависимости от надетых предметов
        player.equipmentCharacteristics();

        downloadData();
      } else {
        console.log("Вы не можете пользоваться этим предметом");
      }
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
