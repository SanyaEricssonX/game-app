<template>
  <div class="forge-block">
    <div class="forge-header">
      <div>
        <h3 class="forge__heading">Кузница</h3>

        <p class="forge__description">
          Восстанавливает прочность экипировки и предметов в инвентаре за
          железо.
        </p>
      </div>

      <div class="forge-resource">
        <span class="forge-resource__title">Железо</span>

        <strong class="forge-resource__value">
          {{ $store.state.playerResources.iron }}
        </strong>
      </div>
    </div>

    <div class="forge-rules">
      <span class="forge-rules__title">Стоимость ремонта:</span>

      <span class="forge-rules__text">
        1 железо за каждые 3 потерянной прочности. Максимум — 25 железа за
        предмет.
      </span>
    </div>

    <ul class="forge-nav-list">
      <li
        class="forge-nav__item"
        :class="{ 'forge-nav__item_active': selectedTab === 'equipment' }"
        @click="selectTab('equipment')"
      >
        Экипировка

        <span class="forge-nav__count">
          {{ damagedEquipment.length }}
        </span>
      </li>

      <li
        class="forge-nav__item"
        :class="{ 'forge-nav__item_active': selectedTab === 'inventory' }"
        @click="selectTab('inventory')"
      >
        Инвентарь

        <span class="forge-nav__count">
          {{ damagedInventory.length }}
        </span>
      </li>
    </ul>

    <template v-if="selectedTab === 'equipment'">
      <div class="forge-section-header">
        <div>
          <h4 class="forge-section__heading">Надетая экипировка</h4>

          <p class="forge-section__description">
            После ремонта характеристики предмета сразу восстанавливаются до
            полной силы.
          </p>
        </div>

        <div class="forge-repair-all" v-if="damagedEquipment.length > 0">
          <span class="forge-repair-all__cost">
            Все предметы: {{ equipmentRepairCost }} железа
          </span>

          <base-button
            class="forge__btn forge__btn_all"
            :disabled="!canRepair(equipmentRepairCost)"
            @click="repairAllEquipment"
          >
            Починить всё
          </base-button>
        </div>
      </div>

      <ul class="item-list" v-if="damagedEquipment.length > 0">
        <li
          class="list__item"
          v-for="item in damagedEquipment"
          :key="item.slot"
        >
          <span class="item__logo">
            <img
              :src="getImage(item.image)"
              :alt="item.name"
              v-if="item.image"
            />
          </span>

          <div class="item-box">
            <div class="item-title-box">
              <h4 class="item__heading">{{ item.name }}</h4>

              <span class="item__level"> Ур. {{ item.requiredLevel }} </span>
            </div>

            <div class="desc-box">
              <span class="item__desc">
                Прочность: {{ item.currentDurability }} /
                {{ item.maxDurability }}
              </span>
            </div>
          </div>

          <div class="price-box">
            <span class="price-box__title">Стоимость</span>

            <span class="item__desc price">
              Железо: {{ item.repairCost }}
            </span>

            <base-button
              class="forge__btn"
              :disabled="!canRepair(item.repairCost)"
              @click="repairEquipmentItem(item)"
            >
              Починить
            </base-button>
          </div>
        </li>
      </ul>

      <div class="fix-desc" v-else>
        Вся надетая экипировка полностью отремонтирована.
      </div>
    </template>

    <template v-else>
      <div class="forge-section-header">
        <div>
          <h4 class="forge-section__heading">Предметы в инвентаре</h4>

          <p class="forge-section__description">
            Здесь можно починить предметы, которые ещё не надеты на персонажа.
          </p>
        </div>

        <div class="forge-repair-all" v-if="damagedInventory.length > 0">
          <span class="forge-repair-all__cost">
            Все предметы: {{ inventoryRepairCost }} железа
          </span>

          <base-button
            class="forge__btn forge__btn_all"
            :disabled="!canRepair(inventoryRepairCost)"
            @click="repairAllInventory"
          >
            Починить всё
          </base-button>
        </div>
      </div>

      <ul class="item-list" v-if="damagedInventory.length > 0">
        <li
          class="list__item"
          v-for="item in damagedInventory"
          :key="`${item.cellId}-${item.id}`"
        >
          <span class="item__logo">
            <img
              :src="getImage(item.image)"
              :alt="item.name"
              v-if="item.image"
            />
          </span>

          <div class="item-box">
            <div class="item-title-box">
              <h4 class="item__heading">{{ item.name }}</h4>

              <span class="item__level"> Ур. {{ item.requiredLevel }} </span>
            </div>

            <div class="desc-box">
              <span class="item__desc">
                Прочность: {{ item.currentDurability }} /
                {{ item.maxDurability }}
              </span>
            </div>
          </div>

          <div class="price-box">
            <span class="price-box__title">Стоимость</span>

            <span class="item__desc price">
              Железо: {{ item.repairCost }}
            </span>

            <base-button
              class="forge__btn"
              :disabled="!canRepair(item.repairCost)"
              @click="repairInventoryItem(item)"
            >
              Починить
            </base-button>
          </div>
        </li>
      </ul>

      <div class="fix-desc" v-else>
        В инвентаре нет предметов, требующих починки.
      </div>
    </template>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import items from "@/services/items";
import player from "@/services/player";

export default {
  name: "BuildingForge",

  data() {
    return {
      selectedTab: "equipment",
      damagedEquipment: [],
      damagedInventory: [],
    };
  },

  computed: {
    equipmentRepairCost() {
      return this.damagedEquipment.reduce((total, item) => {
        return total + item.repairCost;
      }, 0);
    },

    inventoryRepairCost() {
      return this.damagedInventory.reduce((total, item) => {
        return total + item.repairCost;
      }, 0);
    },
  },

  watch: {
    "$store.state.playerEquipment": {
      deep: true,
      handler() {
        this.createEquipment();
      },
    },

    "$store.state.playerInventory": {
      deep: true,
      handler() {
        this.createInventoryItems();
      },
    },
  },

  methods: {
    showModal() {
      this.$emit("show-modal");
    },

    selectTab(tab) {
      this.selectedTab = tab;
    },

    getImage(image) {
      if (!image) {
        return "";
      }

      return require(`@/assets/images/${image}`);
    },

    repairCost(currentDurability, maxDurability) {
      const lostDurability = Math.max(
        0,
        Number(maxDurability) - Number(currentDurability),
      );

      if (lostDurability === 0) {
        return 0;
      }

      const calculatedCost = Math.ceil(lostDurability / 3);

      return Math.min(calculatedCost, 25);
    },

    canRepair(cost) {
      return (
        Number(this.$store.state.playerResources.iron || 0) >= Number(cost)
      );
    },

    showNotEnoughIronModal() {
      this.$store.state.modalNotification.text =
        "Для починки не хватает железа.";
      this.$store.state.modalNotification.from = "forge";
      this.$store.state.modalNotification.visible = true;

      this.showModal();
    },

    getEquipmentSlots() {
      return [
        {
          slot: "weapon",
          itemId: this.$store.state.playerEquipment.weapon,
          durabilityKey: "weaponDurability",
        },
        {
          slot: "helmet",
          itemId: this.$store.state.playerEquipment.helmet,
          durabilityKey: "helmetDurability",
        },
        {
          slot: "upper",
          itemId: this.$store.state.playerEquipment.upper,
          durabilityKey: "upperDurability",
        },
        {
          slot: "lower",
          itemId: this.$store.state.playerEquipment.lower,
          durabilityKey: "lowerDurability",
        },
        {
          slot: "gloves",
          itemId: this.$store.state.playerEquipment.gloves,
          durabilityKey: "glovesDurability",
        },
        {
          slot: "boots",
          itemId: this.$store.state.playerEquipment.boots,
          durabilityKey: "bootsDurability",
        },
      ];
    },

    createEquipment() {
      const equipment = this.$store.state.playerEquipment;

      this.damagedEquipment = this.getEquipmentSlots()
        .map((slot) => {
          const itemId = Number(slot.itemId);

          if (!itemId) {
            return null;
          }

          const item = items.findItem(itemId);

          if (!item || !item.durability) {
            return null;
          }

          const maxDurability = Number(item.durability);
          const currentDurability = Math.max(
            0,
            Number(equipment[slot.durabilityKey] || 0),
          );

          if (currentDurability >= maxDurability) {
            return null;
          }

          return {
            slot: slot.slot,
            durabilityKey: slot.durabilityKey,
            id: item.id,
            name: item.name,
            image: item.image,
            requiredLevel: Number(item.requiredLevel || 1),
            currentDurability,
            maxDurability,
            repairCost: this.repairCost(currentDurability, maxDurability),
          };
        })
        .filter(Boolean);
    },

    createInventoryItems() {
      const inventory = this.$store.state.playerInventory || [];

      this.damagedInventory = inventory
        .map((inventoryItem, index) => {
          if (!inventoryItem || !inventoryItem.id) {
            return null;
          }

          const item = items.findItem(inventoryItem.id);

          if (!item || !item.durability) {
            return null;
          }

          const maxDurability = Number(item.durability);
          const currentDurability = Math.max(
            0,
            Number(inventoryItem.durability || 0),
          );

          if (currentDurability >= maxDurability) {
            return null;
          }

          return {
            cellId:
              inventoryItem.cellId !== undefined ? inventoryItem.cellId : index,
            id: item.id,
            name: item.name,
            image: item.image,
            requiredLevel: Number(item.requiredLevel || 1),
            currentDurability,
            maxDurability,
            repairCost: this.repairCost(currentDurability, maxDurability),
          };
        })
        .filter(Boolean);
    },

    saveGameData() {
      localStorage.setItem(
        "playerEquipment",
        JSON.stringify(this.$store.state.playerEquipment),
      );

      localStorage.setItem(
        "playerInventory",
        JSON.stringify(this.$store.state.playerInventory),
      );

      localStorage.setItem(
        "playerResources",
        JSON.stringify(this.$store.state.playerResources),
      );
    },

    refreshAfterEquipmentRepair() {
      this.saveGameData();

      player.equipmentCharacteristics();
      downloadData();

      this.createEquipment();
      this.createInventoryItems();

      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");
    },

    refreshAfterInventoryRepair() {
      this.saveGameData();

      downloadData();

      this.createEquipment();
      this.createInventoryItems();

      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");
    },

    repairEquipmentItem(item) {
      if (!this.canRepair(item.repairCost)) {
        this.showNotEnoughIronModal();
        return;
      }

      this.$store.state.playerResources.iron -= item.repairCost;

      this.$store.state.playerEquipment[item.durabilityKey] =
        item.maxDurability;

      this.refreshAfterEquipmentRepair();
    },

    repairInventoryItem(item) {
      if (!this.canRepair(item.repairCost)) {
        this.showNotEnoughIronModal();
        return;
      }

      const inventory = this.$store.state.playerInventory;
      const inventoryItem = inventory[item.cellId];

      if (!inventoryItem || Number(inventoryItem.id) !== Number(item.id)) {
        this.createInventoryItems();
        return;
      }

      this.$store.state.playerResources.iron -= item.repairCost;

      inventoryItem.durability = item.maxDurability;

      this.$store.state.playerInventory = inventory;

      this.refreshAfterInventoryRepair();
    },

    repairAllEquipment() {
      if (this.damagedEquipment.length === 0) {
        return;
      }

      if (!this.canRepair(this.equipmentRepairCost)) {
        this.showNotEnoughIronModal();
        return;
      }

      this.$store.state.playerResources.iron -= this.equipmentRepairCost;

      this.damagedEquipment.forEach((item) => {
        this.$store.state.playerEquipment[item.durabilityKey] =
          item.maxDurability;
      });

      this.refreshAfterEquipmentRepair();
    },

    repairAllInventory() {
      if (this.damagedInventory.length === 0) {
        return;
      }

      if (!this.canRepair(this.inventoryRepairCost)) {
        this.showNotEnoughIronModal();
        return;
      }

      const inventory = this.$store.state.playerInventory;

      this.$store.state.playerResources.iron -= this.inventoryRepairCost;

      this.damagedInventory.forEach((item) => {
        const inventoryItem = inventory[item.cellId];

        if (inventoryItem && Number(inventoryItem.id) === Number(item.id)) {
          inventoryItem.durability = item.maxDurability;
        }
      });

      this.$store.state.playerInventory = inventory;

      this.refreshAfterInventoryRepair();
    },
  },

  created() {
    this.createEquipment();
    this.createInventoryItems();
  },
};
</script>

<style scoped>
.forge-block {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid var(--color-light);
  border-radius: 8px;
}

.forge-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.forge__heading {
  margin-bottom: 10px;
  font-size: 22px;
}

.forge__description {
  max-width: 590px;
  line-height: 1.45;
}

.forge-resource {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-end;
  min-width: 90px;
  padding: 10px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
}

.forge-resource__title {
  margin-bottom: 5px;
  font-size: 14px;
}

.forge-resource__value {
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
  font-size: 24px;
}

.forge-rules {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.07);
}

.forge-rules__title {
  font-family: Bahnschrift, sans-serif;
  font-weight: 900;
}

.forge-rules__text {
  font-size: 14px;
  line-height: 1.35;
}

.forge-nav-list {
  display: flex;
  margin-bottom: 25px;
  border: 2px solid var(--color-light);
}

.forge-nav__item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
}

.forge-nav__item_active {
  background-color: var(--color-light);
  color: var(--color-dark);
  font-weight: 900;
}

.forge-nav__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 10px;
  background-color: var(--color-green);
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 13px;
}

.forge-nav__item_active .forge-nav__count {
  background-color: var(--color-dark);
  color: var(--color-light);
}

.forge-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 15px;
}

.forge-section__heading {
  margin-bottom: 7px;
  font-size: 19px;
}

.forge-section__description {
  max-width: 520px;
  font-size: 14px;
  line-height: 1.4;
}

.forge-repair-all {
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.forge-repair-all__cost {
  font-family: Bahnschrift, sans-serif;
  font-size: 14px;
  font-weight: 900;
}

.item-list {
  display: flex;
  flex-direction: column;
}

.list__item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 0;
  border-top: 1px solid var(--color-light);
}

.item__logo {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 74px;
  height: 74px;
  overflow: hidden;
  border: 1px solid var(--color-light);
  background-color: var(--color-light);
}

.item__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-box {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.item-title-box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.item__heading {
  font-size: 18px;
}

.item__level {
  padding: 3px 6px;
  border: 1px solid var(--color-light);
  border-radius: 4px;
  font-family: Bahnschrift, sans-serif;
  font-size: 13px;
}

.desc-box {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.item__desc {
  font-size: 15px;
}

.price-box {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 125px;
}

.price-box__title {
  margin-bottom: 5px;
  font-size: 14px;
}

.price {
  margin-bottom: 12px;
  font-family: Bahnschrift, sans-serif;
  font-size: 16px;
  font-weight: 900;
}

.forge__btn {
  padding: 7px 12px;
  border: 2px solid var(--color-dark);
  border-radius: 5px;
  background-color: var(--color-green);
  color: var(--color-light);
  font-size: 16px;
  font-weight: 900;
}

.forge__btn:hover:not(:disabled) {
  background-color: var(--color-light);
  color: var(--color-dark);
}

.forge__btn:disabled {
  border-color: #777;
  background-color: #999;
  color: #ddd;
  cursor: not-allowed;
}

.forge__btn_all {
  white-space: nowrap;
}

.fix-desc {
  display: flex;
  justify-content: center;
  margin: 35px 0 20px;
  text-align: center;
}

@media (max-width: 700px) {
  .forge-header,
  .forge-section-header,
  .list__item {
    flex-direction: column;
    align-items: flex-start;
  }

  .forge-resource,
  .forge-repair-all,
  .price-box {
    align-items: flex-start;
  }
}

@media (max-width: 450px) {
  .forge-nav-list {
    flex-direction: column;
  }

  .item-title-box {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>
