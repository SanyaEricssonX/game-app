<template>
  <div class="container shop-container">
    <h2 class="shop__header">Магазин</h2>
    <ul class="nav-list">
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(1) }"
        @click="activeContent(1)"
      >
        <h4 class="item__header">Оружие</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(2) }"
        @click="activeContent(2)"
      >
        <h4 class="item__header">Броня</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(3) }"
        @click="activeContent(3)"
      >
        <h4 class="item__header">Расходные</h4>
      </li>
      <li
        class="nav__item partition"
        :class="{ active: isActiveBtn(4) }"
        @click="activeContent(4)"
      >
        <h4 class="item__header">Починка</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(5) }"
        @click="activeContent(5)"
      >
        <h4 class="item__header">Продажа</h4>
      </li>
    </ul>

    <div class="shop-block">
      <div class="shop-box" v-if="selectedTab == 1">
        <ul class="item-list">
          <li class="list__item" v-for="item in weaponList" :key="item.id">
            <span class="item__logo">
              <img
                :src="getImage(item.image)"
                :alt="item.id"
                v-if="item.image"
              />
            </span>
            <div class="item-box">
              <h6 class="item__header">{{ item.name }}</h6>
              <div class="desc-box">
                <span class="item__desc" v-show="item.damage && item.damage > 0"
                  >Атака: {{ item.damage }}</span
                >
                <span class="item__desc" v-show="item.armor && item.armor > 0"
                  >Защита: {{ item.armor }}</span
                >
                <span class="item__desc" v-show="item.hp && item.hp > 0"
                  >HP: {{ item.hp }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.evasion && item.evasion > 0"
                  >Уклонение: {{ item.evasion }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.critChance && item.critChance > 0"
                  >Крит шанс: {{ item.critChance }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.critPower && item.critPower > 0"
                  >Крит сила: {{ item.critPower }}</span
                >
                <span class="item__desc">Прочность: {{ item.durability }}</span>
                <span class="item__desc"
                  >Уровень: {{ item.requiredLevel }}</span
                >
              </div>
            </div>
            <div class="price-box">
              <span>Цена: </span>
              <span class="item__desc price">{{ item.price }}</span>
              <base-button
                class="btn btn__buy"
                :style="{
                  'background-color': checkBtnColor(
                    item.requiredLevel,
                    item.price
                  ),
                }"
                @click="buyItem(item.id)"
                >Купить</base-button
              >
            </div>
          </li>
        </ul>
      </div>

      <div class="shop-box" v-if="selectedTab == 2">
        <ul class="item-list">
          <li class="list__item" v-for="item in armorList" :key="item.id">
            <span class="item__logo">
              <img
                :src="getImage(item.image)"
                :alt="item.id"
                v-if="item.image"
              />
            </span>
            <div class="item-box">
              <h6 class="item__header">{{ item.name }}</h6>
              <div class="desc-box">
                <span class="item__desc" v-show="item.damage && item.damage > 0"
                  >Атака: {{ item.damage }}</span
                >
                <span class="item__desc" v-show="item.armor && item.armor > 0"
                  >Защита: {{ item.armor }}</span
                >
                <span class="item__desc" v-show="item.hp && item.hp > 0"
                  >HP: {{ item.hp }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.evasion && item.evasion > 0"
                  >Уклонение: {{ item.evasion }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.critChance && item.critChance > 0"
                  >Крит шанс: {{ item.critChance }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.critPower && item.critPower > 0"
                  >Крит сила: {{ item.critPower }}</span
                >
                <span class="item__desc">Прочность: {{ item.durability }}</span>
                <span class="item__desc"
                  >Уровень: {{ item.requiredLevel }}</span
                >
              </div>
            </div>
            <div class="price-box">
              <span>Цена: </span>
              <span class="item__desc price">{{ item.price }}</span>
              <base-button
                class="btn btn__buy"
                :style="{
                  'background-color': checkBtnColor(
                    item.requiredLevel,
                    item.price
                  ),
                }"
                @click="buyItem(item.id)"
                >Купить</base-button
              >
            </div>
          </li>
        </ul>
      </div>

      <div class="shop-box" v-if="selectedTab == 3">
        <ul class="item-list">
          <li class="list__item" v-for="item in consumablesList" :key="item.id">
            <span class="item__logo">
              <img
                :src="getImage(item.image)"
                :alt="item.id"
                v-if="item.image"
              />
            </span>
            <div class="item-box">
              <h6 class="item__header">{{ item.name }}</h6>
              <div class="desc-box">
                <span class="item__desc desc">{{ item.desc }}</span>
                <span class="item__desc"
                  >Уровень: {{ item.requiredLevel }}</span
                >
              </div>
            </div>
            <div class="price-box">
              <span>Цена: </span>
              <span class="item__desc price">{{ item.price }}</span>
              <base-button
                class="btn btn__buy"
                :style="{
                  'background-color': checkBtnColor(
                    item.requiredLevel,
                    item.price
                  ),
                }"
                @click="buyItem(item.id)"
                >Купить</base-button
              >
            </div>
          </li>
        </ul>
      </div>

      <div
        class="shop-box"
        v-if="selectedTab == 4 && (repairCost > 0 || inventoryRepairCost > 0)"
      >
        <div class="equipment-box" v-if="repairCost > 0">
          <span class="repair__header">Экипировка</span>
          <div class="repair-box" v-show="repairCost > 0">
            <span class="repair-box__header"
              >Починить все ({{ repairCost }})</span
            >
            <base-button
              class="btn btn__buy btn__repair"
              :style="{
                'background-color': checkBtnRepairColor(repairCost),
              }"
              @click="repairAllItems(repairCost, 'equipment')"
              >Починить</base-button
            >
          </div>
          <ul class="item-list">
            <li
              class="list__item"
              v-for="item in playerEquipment"
              :key="item.id"
              v-show="item.durability != item.currentDurability"
            >
              <span class="item__logo">
                <img
                  :src="getImage(item.id)"
                  :alt="item.id"
                  v-if="getImage(item.id) != 0"
                />
              </span>
              <div class="item-box">
                <h6 class="item__header">{{ item.name }}</h6>
                <div class="desc-box">
                  <span class="item__desc desc"
                    >Прочность: {{ item.currentDurability }} /
                    {{ item.durability }}</span
                  >
                </div>
              </div>
              <div class="price-box">
                <span>Цена: </span>
                <span class="item__desc price">{{
                  lowCost(Math.floor(item.price / 3))
                }}</span>
                <base-button
                  class="btn btn__buy"
                  :style="{
                    'background-color': checkBtnRepairColor(
                      lowCost(Math.floor(item.price / 3))
                    ),
                  }"
                  @click="repairItem(item)"
                  >Починить</base-button
                >
              </div>
            </li>
          </ul>
        </div>

        <div class="inventory-box" v-if="inventoryRepairCost > 0">
          <span class="repair__header">Инвентарь</span>
          <div class="repair-box" v-show="inventoryRepairCost > 0">
            <span class="repair-box__header"
              >Починить все ({{ inventoryRepairCost }})</span
            >
            <base-button
              class="btn btn__buy btn__repair"
              :style="{
                'background-color': checkBtnRepairColor(inventoryRepairCost),
              }"
              @click="repairAllItems(inventoryRepairCost, 'inventory')"
              >Починить</base-button
            >
          </div>
          <ul class="item-list">
            <li
              class="list__item"
              v-for="item in playerInventory"
              :key="item.id"
              v-show="item.durability != findItemDurability(item.id)"
            >
              <span class="item__logo">
                <img
                  :src="getImage(item.id)"
                  :alt="item.id"
                  v-if="getImage(item.id) != 0"
                />
              </span>
              <div class="item-box">
                <h6 class="item__header">{{ item.name }}</h6>
                <div class="desc-box">
                  <span class="item__desc desc"
                    >Прочность: {{ item.durability }} /
                    {{ findItemDurability(item.id) }}</span
                  >
                </div>
              </div>
              <div class="price-box">
                <span>Цена: </span>
                <span class="item__desc price">{{
                  lowCost(Math.floor(item.price / 3))
                }}</span>
                <base-button
                  class="btn btn__buy"
                  :style="{
                    'background-color': checkBtnRepairColor(
                      lowCost(Math.floor(item.price / 3))
                    ),
                  }"
                  @click="repairInventoryItem(item)"
                  >Починить</base-button
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="fix-desc"
        v-else-if="
          selectedTab == 4 && repairCost == 0 && inventoryRepairCost == 0
        "
      >
        Ваши предметы не неуждаются в починке
      </div>

      <div class="shop-box" v-if="selectedTab == 5">
        <ul class="item-list">
          <li class="list__item" v-for="item in playerInventory" :key="item.id">
            <span class="item__logo">
              <img
                :src="getImage(item.image)"
                :alt="item.id"
                v-if="getImage(item.image) != 0"
              />
            </span>
            <div class="item-box">
              <h6 class="item__header">{{ item.name }}</h6>
              <div class="desc-box">
                <span class="item__desc" v-show="item.damage && item.damage > 0"
                  >Атака: {{ item.damage }}</span
                >
                <span class="item__desc" v-show="item.armor && item.armor > 0"
                  >Защита: {{ item.armor }}</span
                >
                <span class="item__desc" v-show="item.hp && item.hp > 0"
                  >HP: {{ item.hp }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.evasion && item.evasion > 0"
                  >Уклонение: {{ item.evasion }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.critChance && item.critChance > 0"
                  >Крит шанс: {{ item.critChance }}</span
                >
                <span
                  class="item__desc"
                  v-show="item.critPower && item.critPower > 0"
                  >Крит сила: {{ item.critPower }}</span
                >
                <div class="desc-box" v-show="item.desc">
                  <span class="item__desc desc">{{ item.desc }}</span>
                </div>
                <span class="item__desc" v-show="!item.amount"
                  >Прочность: {{ item.durability }} /
                  {{ findItemDurability(item.id) }}</span
                >
                <span class="item__desc"
                  >Уровень: {{ item.requiredLevel }}</span
                >
              </div>
            </div>
            <div class="price-box">
              <span>Цена: </span>
              <span class="item__desc price">{{
                lowCost(Math.floor(item.price / 3))
              }}</span>
              <base-button class="btn btn__sell" @click="sellItem(item)"
                >Продать</base-button
              >
            </div>
          </li>
        </ul>
        <div
          class="fix-desc"
          v-show="selectedTab == 5 && playerInventoryCount == 0"
        >
          Нет предметов в инвентаре
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";
import player from "@/services/player";
import { downloadData } from "@/services/downloadData";

export default {
  name: "ShopPage",
  extends: {},
  props: {},
  data() {
    return {
      weaponList: [],
      armorList: [],
      consumablesList: [],
      allItems: [],
      playerEquipment: [],
      playerInventory: [],
      repairCost: 0,
      inventoryRepairCost: 0,
      playerInventoryCount: 0,
      selectedTab: 1,
    };
  },
  computed: {
    triggerUpdateShop() {
      return this.$store.state.triggerUpdateShop;
    },
  },
  components: {},
  watch: {
    triggerUpdateShop(newValue) {
      if (newValue) {
        this.createEquipment();
      }
    },
  },
  methods: {
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

    createEquipment() {
      this.playerEquipment = [];
      this.playerInventory = [];
      this.repairCost = 0;
      this.inventoryRepairCost = 0;
      this.playerInventoryCount = 0;

      this.weaponList = JSON.parse(JSON.stringify(items.weaponList));
      this.armorList = JSON.parse(JSON.stringify(items.armorList));
      this.consumablesList = JSON.parse(JSON.stringify(items.consumablesList));
      this.allItems = JSON.parse(JSON.stringify(items.list()));

      this.playerInventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory)
      );

      for (let index = 0; index < this.playerInventory.length; index++) {
        if (this.playerInventory[index].name) {
          this.playerInventoryCount += 1;
        }

        Object.assign(this.playerInventory[index], { cellId: index });

        if (
          this.playerInventory[index].durability <
          items.findItem(this.playerInventory[index].id).durability
        ) {
          const cost = Math.floor(this.playerInventory[index].price / 3);

          if (cost < 1) {
            this.inventoryRepairCost += 1;
          } else {
            this.inventoryRepairCost += cost;
          }
        }
      }

      let weaponId = Number(this.$store.state.playerEquipment.weapon);
      let helmetId = Number(this.$store.state.playerEquipment.helmet);
      let upperId = Number(this.$store.state.playerEquipment.upper);
      let lowerId = Number(this.$store.state.playerEquipment.lower);
      let glovesId = Number(this.$store.state.playerEquipment.gloves);
      let bootsId = Number(this.$store.state.playerEquipment.boots);

      // Оружие
      if (weaponId != 0 && weaponId == items.findItem(weaponId).id) {
        let item = items.findItem(weaponId);

        Object.assign(item, {
          currentDurability: Number(
            this.$store.state.playerEquipment.weaponDurability
          ),
        });
        this.playerEquipment.push(item);

        if (item.currentDurability < item.durability) {
          const cost = Math.floor(item.price / 3);

          if (cost < 1) {
            this.repairCost += 1;
          } else {
            this.repairCost += cost;
          }
        }
      }
      // Шлем
      if (helmetId != 0 && helmetId == items.findItem(helmetId).id) {
        let item = items.findItem(helmetId);

        Object.assign(item, {
          currentDurability: Number(
            this.$store.state.playerEquipment.helmetDurability
          ),
        });
        this.playerEquipment.push(item);

        if (item.currentDurability < item.durability) {
          const cost = Math.floor(item.price / 3);

          if (cost < 1) {
            this.repairCost += 1;
          } else {
            this.repairCost += cost;
          }
        }
      }
      // Верхний доспех
      if (upperId != 0 && upperId == items.findItem(upperId).id) {
        let item = items.findItem(upperId);

        Object.assign(item, {
          currentDurability: Number(
            this.$store.state.playerEquipment.upperDurability
          ),
        });
        this.playerEquipment.push(item);

        if (item.currentDurability < item.durability) {
          const cost = Math.floor(item.price / 3);

          if (cost < 1) {
            this.repairCost += 1;
          } else {
            this.repairCost += cost;
          }
        }
      }
      // Нижний доспех
      if (lowerId != 0 && lowerId == items.findItem(lowerId).id) {
        let item = items.findItem(lowerId);

        Object.assign(item, {
          currentDurability: Number(
            this.$store.state.playerEquipment.lowerDurability
          ),
        });
        this.playerEquipment.push(item);

        if (item.currentDurability < item.durability) {
          const cost = Math.floor(item.price / 3);

          if (cost < 1) {
            this.repairCost += 1;
          } else {
            this.repairCost += cost;
          }
        }
      }
      // Перчатки
      if (glovesId != 0 && glovesId == items.findItem(glovesId).id) {
        let item = items.findItem(glovesId);

        Object.assign(item, {
          currentDurability: Number(
            this.$store.state.playerEquipment.glovesDurability
          ),
        });
        this.playerEquipment.push(item);

        if (item.currentDurability < item.durability) {
          const cost = Math.floor(item.price / 3);

          if (cost < 1) {
            this.repairCost += 1;
          } else {
            this.repairCost += cost;
          }
        }
      }
      // Сапоги
      if (bootsId != 0 && bootsId == items.findItem(bootsId).id) {
        let item = items.findItem(bootsId);

        Object.assign(item, {
          currentDurability: Number(
            this.$store.state.playerEquipment.bootsDurability
          ),
        });
        this.playerEquipment.push(item);

        if (item.currentDurability < item.durability) {
          const cost = Math.floor(item.price / 3);

          if (cost < 1) {
            this.repairCost += 1;
          } else {
            this.repairCost += cost;
          }
        }
      }
    },

    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },
    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
    },
    checkBtnColor(itemLevel, itemPrice) {
      if (
        this.$store.state.playerLevel >= itemLevel &&
        this.$store.state.playerGold >= itemPrice
      ) {
        return "var(--color-green)";
      } else {
        return "var(--color-red)";
      }
    },
    checkBtnRepairColor(itemPrice) {
      if (this.$store.state.playerGold >= itemPrice) {
        return "var(--color-green)";
      } else {
        return "var(--color-red)";
      }
    },
    lowCost(price) {
      if (price == 0) {
        return 1;
      } else {
        return price;
      }
    },
    findItemDurability(itemId) {
      return items.findItem(itemId).durability;
    },
    buyItem(itemId) {
      let inventory = this.$store.state.playerInventory;
      let item;

      if (inventory.length < this.$store.state.playerInventorySize) {
        // Находим предмет в общем списке предметов
        item = items.findItem(itemId);

        // Проверяем хватает ли золота на покупку
        if (item.price <= this.$store.state.playerGold) {
          // Проверяем уровень игрока и предмета
          if (item.requiredLevel <= this.$store.state.playerLevel) {
            this.$store.state.playerGold -= item.price;
            localStorage.setItem("playerGold", this.$store.state.playerGold);

            inventory.push(item);
            this.$store.state.playerInventory = inventory;
            localStorage.setItem("playerInventory", JSON.stringify(inventory));
          } else {
            this.$store.state.modalNotification.text =
              "Невозможно совершить покупку. Уровень предмета выше вашего.";
            this.$store.state.modalNotification.visible = true;
            this.showModal();
          }
        } else {
          this.$store.state.modalNotification.text =
            "Невозможно совершить покупку. Не хватает золота.";
          this.$store.state.modalNotification.visible = true;
          this.showModal();
        }
      } else {
        this.$store.state.modalNotification.text =
          "Невозможно совершить покупку. Инвентарь полон.";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }

      downloadData();

      this.createEquipment();
    },

    repairItem(item) {
      let cost = Math.floor(item.price / 3);

      if (cost == 0) {
        cost = 1;
      }

      if (this.$store.state.playerGold >= cost) {
        this.$store.state.playerGold -= cost;

        switch (item.id.toString().slice(0, 3)) {
          case "100":
            this.$store.state.playerEquipment.weaponDurability =
              item.durability;
            break;
          case "101":
            if (item.category == "helmet") {
              this.$store.state.playerEquipment.helmetDurability =
                item.durability;
            } else if (item.category == "upper") {
              this.$store.state.playerEquipment.upperDurability =
                item.durability;
            } else if (item.category == "lower") {
              this.$store.state.playerEquipment.lowerDurability =
                item.durability;
            } else if (item.category == "gloves") {
              this.$store.state.playerEquipment.glovesDurability =
                item.durability;
            } else if (item.category == "boots") {
              this.$store.state.playerEquipment.bootsDurability =
                item.durability;
            }
            break;
          default:
            break;
        }

        localStorage.setItem(
          "playerEquipment",
          JSON.stringify(this.$store.state.playerEquipment)
        );
        localStorage.setItem("playerGold", this.$store.state.playerGold);

        downloadData();
        player.equipmentCharacteristics();
        downloadData();

        this.createEquipment();
      } else {
        this.$store.state.modalNotification.text =
          "Невозможно совершить покупку. Не зватает золота.";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
    },

    repairInventoryItem(item) {
      let cost = Math.floor(item.price / 3);

      if (cost == 0) {
        cost = 1;
      }

      if (this.$store.state.playerGold >= cost) {
        this.$store.state.playerGold -= cost;

        let newItem = item;

        this.playerInventory.splice(item.cellId, 1);
        newItem.durability = items.findItem(newItem.id).durability;
        this.playerInventory.push(newItem);

        localStorage.setItem(
          "playerInventory",
          JSON.stringify(this.playerInventory)
        );
        localStorage.setItem("playerGold", this.$store.state.playerGold);

        downloadData();

        this.createEquipment();
      } else {
        this.$store.state.modalNotification.text =
          "Невозможно совершить покупку. Не зватает золота.";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
    },

    repairAllItems(repairCost, target) {
      if (this.$store.state.playerGold >= repairCost) {
        this.$store.state.playerGold -= repairCost;

        if (target == "equipment") {
          for (let i = 0; i < this.playerEquipment.length; i++) {
            let item = this.playerEquipment[i];

            switch (item.id.toString().slice(0, 3)) {
              case "100":
                this.$store.state.playerEquipment.weaponDurability =
                  item.durability;
                break;
              case "101":
                if (item.category == "helmet") {
                  this.$store.state.playerEquipment.helmetDurability =
                    item.durability;
                } else if (item.category == "upper") {
                  this.$store.state.playerEquipment.upperDurability =
                    item.durability;
                } else if (item.category == "lower") {
                  this.$store.state.playerEquipment.lowerDurability =
                    item.durability;
                } else if (item.category == "gloves") {
                  this.$store.state.playerEquipment.glovesDurability =
                    item.durability;
                } else if (item.category == "boots") {
                  this.$store.state.playerEquipment.bootsDurability =
                    item.durability;
                }
                break;
              default:
                break;
            }
          }

          localStorage.setItem(
            "playerEquipment",
            JSON.stringify(this.$store.state.playerEquipment)
          );

          player.equipmentCharacteristics();
        } else {
          // Условия для предметов в инвентаре
          for (let index = 0; index < this.playerInventory.length; index++) {
            if (
              this.playerInventory[index].durability <
              items.findItem(this.playerInventory[index].id).durability
            ) {
              this.playerInventory[index].durability = items.findItem(
                this.playerInventory[index].id
              ).durability;
            }
          }
          localStorage.setItem(
            "playerInventory",
            JSON.stringify(this.playerInventory)
          );
        }
        localStorage.setItem("playerGold", this.$store.state.playerGold);

        downloadData();

        this.createEquipment();
      } else {
        this.$store.state.modalNotification.text =
          "Невозможно совершить покупку. Не зватает золота.";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
    },

    sellItem(item) {
      const cost = Math.floor(item.price / 3);
      if (cost == 0) {
        this.$store.state.playerGold += 1;
      } else {
        this.$store.state.playerGold += cost;
      }

      localStorage.setItem("playerGold", this.$store.state.playerGold);

      this.playerInventory.splice(item.cellId, 1);
      this.$store.state.playerInventory = this.playerInventory;
      localStorage.setItem(
        "playerInventory",
        JSON.stringify(this.$store.state.playerInventory)
      );

      downloadData();

      this.createEquipment();
    },

    showModal() {
      this.$emit("show-modal");
    },
  },
  beforeCreate() {},
  created() {
    this.createEquipment();
  },
  mounted() {},
};
</script>

<style scoped>
.shop__header {
  margin-bottom: 30px;
  font-size: 22px;
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
.shop-block {
  display: flex;
  flex-direction: column;
  padding-right: 30px;
  max-height: 65vh;
  overflow: auto;
}
.shop-box {
  display: flex;
  flex-direction: column;
}
.list__item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-light);
}
.item__logo {
  display: block;
  margin-right: 30px;
  width: 74px;
  height: 74px;
  background-color: var(--color-light);
  border: 1px solid var(--color-light);
}
.item-box {
  display: flex;
  flex-direction: column;
  margin-right: auto;
}
.item__header {
  max-width: 350px;
}
.desc-box {
  display: flex;
  flex-direction: column;
}
.item__desc {
  margin-top: 10px;
}
.desc {
  width: 400px;
  margin-right: 50px;
}
.price-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.btn {
  margin-top: 15px;
  padding: 5px 10px;
  font-size: 17px;
}
.btn__buy:hover {
  font-weight: 900;
  color: var(--color-light);
}
.btn__sell:hover {
  font-weight: 900;
  background-color: var(--color-green);
  color: var(--color-light);
}
.repair-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.repair__header {
  font-family: Bahnschrift;
  font-size: 20px;
}
.repair-box__header {
  font-size: 18px;
  margin-right: 15px;
}
.btn__repair {
  margin-top: 0;
}
.fix-desc {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
}
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
