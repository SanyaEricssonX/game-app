<template>
  <div class="forge-block">
    <h3 class="forge__heading">Экипировка</h3>
    <ul class="item-list" v-if="playerFilteredEquipment.length > 0">
      <li
        class="list__item"
        v-for="item in playerFilteredEquipment"
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
          <h6 class="item__heading">{{ item.name }}</h6>
          <div class="desc-box">
            <span class="item__desc desc"
              >Прочность: {{ item.currentDurability }} /
              {{ item.maxDurability }}</span
            >
          </div>
        </div>
        <div class="price-box">
          <span>Железо: </span>
          <span class="item__desc price">{{
            repairCost(item.currentDurability, item.maxDurability)
          }}</span>
          <base-button
            class="btn btn__buy"
            :style="{
              'background-color': checkBtnRepairColor(
                repairCost(item.currentDurability, item.maxDurability)
              ),
            }"
            @click="
              repairItem(
                item,
                repairCost(item.currentDurability, item.maxDurability)
              )
            "
            >Починить</base-button
          >
        </div>
      </li>
    </ul>
    <div class="fix-desc" v-else>
      Ваши надетые предметы не неуждаются в починке.
    </div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import items from "@/services/items";

export default {
  name: "BuildingForge",
  extends: {},
  props: {},
  data() {
    return {
      playerEquipment:
        JSON.parse(localStorage.getItem("playerEquipment")) ||
        this.$store.state.playerEquipment,
      playerFilteredEquipment: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    showModal() {
      this.$emit("show-modal");
    },

    repairItem(item, repairCost) {
      if (repairCost < this.$store.state.playerResources.iron) {
        const newCount = this.$store.state.playerResources.iron - repairCost;
        this.$store.state.playerResources.iron = newCount;

        if (item.id == this.playerEquipment.weapon) {
          this.playerEquipment.weaponDurability = item.maxDurability;
        }
        if (item.id == this.playerEquipment.helmet) {
          this.playerEquipment.helmetDurability = item.maxDurability;
        }
        if (item.id == this.playerEquipment.upper) {
          this.playerEquipment.upperDurability = item.maxDurability;
        }
        if (item.id == this.playerEquipment.lower) {
          this.playerEquipment.lowerDurability = item.maxDurability;
        }
        if (item.id == this.playerEquipment.gloves) {
          this.playerEquipment.glovesDurability = item.maxDurability;
        }
        if (item.id == this.playerEquipment.boots) {
          this.playerEquipment.bootsDurability = item.maxDurability;
        }

        localStorage.setItem(
          "playerEquipment",
          JSON.stringify(this.playerEquipment)
        );
        localStorage.setItem(
          "playerResources",
          JSON.stringify(this.$store.state.playerResources)
        );
        downloadData();

        this.createEquipment();

        this.$store.state.modalNotification.text = `Вы починили ${item.name}`;
        this.$store.state.modalNotification.from = "basic";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      } else {
        this.$store.state.modalNotification.text =
          "Для починки не хватает железа!";
        this.$store.state.modalNotification.from = "basic";
        this.$store.state.modalNotification.visible = true;
        this.showModal();
      }
    },

    repairCost(itemCurrentDurability, itemMaxDurability) {
      let cost = itemMaxDurability - itemCurrentDurability;
      return Math.ceil(cost / 3);
    },

    checkBtnRepairColor(itemPrice) {
      if (this.$store.state.playerResources.iron >= itemPrice) {
        return "var(--color-green)";
      } else {
        return "var(--color-red)";
      }
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
    createEquipment() {
      this.playerFilteredEquipment = [];

      if (
        this.playerEquipment.weapon != 0 &&
        this.playerEquipment.weaponDurability <
          items.findItem(this.playerEquipment.weapon).durability
      ) {
        this.playerFilteredEquipment.push({
          id: this.playerEquipment.weapon,
          currentDurability: this.playerEquipment.weaponDurability,
          maxDurability: items.findItem(this.playerEquipment.weapon).durability,
        });
      }
      if (
        this.playerEquipment.helmet != 0 &&
        this.playerEquipment.helmetDurability <
          items.findItem(this.playerEquipment.helmet).durability
      ) {
        this.playerFilteredEquipment.push({
          id: this.playerEquipment.helmet,
          currentDurability: this.playerEquipment.helmetDurability,
          maxDurability: items.findItem(this.playerEquipment.helmet).durability,
        });
      }
      if (
        this.playerEquipment.upper != 0 &&
        this.playerEquipment.upperDurability <
          items.findItem(this.playerEquipment.upper).durability
      ) {
        this.playerFilteredEquipment.push({
          id: this.playerEquipment.upper,
          currentDurability: this.playerEquipment.upperDurability,
          maxDurability: items.findItem(this.playerEquipment.upper).durability,
        });
      }
      if (
        this.playerEquipment.lower != 0 &&
        this.playerEquipment.lowerDurability <
          items.findItem(this.playerEquipment.lower).durability
      ) {
        this.playerFilteredEquipment.push({
          id: this.playerEquipment.lower,
          currentDurability: this.playerEquipment.lowerDurability,
          maxDurability: items.findItem(this.playerEquipment.lower).durability,
        });
      }
      if (
        this.playerEquipment.gloves != 0 &&
        this.playerEquipment.glovesDurability <
          items.findItem(this.playerEquipment.gloves).durability
      ) {
        this.playerFilteredEquipment.push({
          id: this.playerEquipment.gloves,
          currentDurability: this.playerEquipment.glovesDurability,
          maxDurability: items.findItem(this.playerEquipment.gloves).durability,
        });
      }
      if (
        this.playerEquipment.boots != 0 &&
        this.playerEquipment.bootsDurability <
          items.findItem(this.playerEquipment.boots).durability
      ) {
        this.playerFilteredEquipment.push({
          id: this.playerEquipment.boots,
          currentDurability: this.playerEquipment.bootsDurability,
          maxDurability: items.findItem(this.playerEquipment.boots).durability,
        });
      }
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
.forge-block {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid var(--color-light);
  border-radius: 8px;
}

.forge__heading {
  margin-bottom: 15px;
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
.item__heading {
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
.fix-desc {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  overflow: hidden;
}
</style>