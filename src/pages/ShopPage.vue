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
            <span class="item__logo"></span>
            <div class="item-box">
              <h6 class="item__header">{{ item.name }}</h6>
              <div class="desc-box">
                <span class="item__desc">Урон: {{ item.damage }}</span>
                <span class="item__desc">Прочность: {{ item.durability }}</span>
                <span class="item__desc"
                  >Уровень: {{ item.requiredLevel }}</span
                >
              </div>
            </div>
            <div class="price-box">
              <span>Цена: </span>
              <span class="item__desc price">{{ item.price }}</span>
              <base-button class="btn" @click="buyItem(item.id)"
                >Купить</base-button
              >
            </div>
          </li>
        </ul>
      </div>

      <div class="shop-box" v-if="selectedTab == 2">
        <ul class="item-list">
          <li class="list__item" v-for="item in armorList" :key="item.id">
            <span class="item__logo"></span>
            <div class="item-box">
              <h6 class="item__header">{{ item.name }}</h6>
              <div class="desc-box">
                <span class="item__desc">Защита: {{ item.armor }}</span>
                <span class="item__desc">HP: {{ item.hp }}</span>
                <span class="item__desc">Прочность: {{ item.durability }}</span>
                <span class="item__desc"
                  >Уровень: {{ item.requiredLevel }}</span
                >
              </div>
            </div>
            <div class="price-box">
              <span>Цена: </span>
              <span class="item__desc price">{{ item.price }}</span>
              <base-button class="btn" @click="buyItem(item.id)"
                >Купить</base-button
              >
            </div>
          </li>
        </ul>
      </div>

      <div class="shop-box" v-if="selectedTab == 3">
        <ul class="item-list">
          <li class="list__item" v-for="item in consumablesList" :key="item.id">
            <span class="item__logo"></span>
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
              <base-button class="btn" @click="buyItem(item.id)"
                >Купить</base-button
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import items from "@/services/items";
import BaseButton from "../components/UI/BaseButton.vue";

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
      selectedTab: 1,
    };
  },
  computed: {},
  components: { BaseButton },
  watch: {},
  methods: {
    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },
    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
    },
    buyItem(itemId) {
      let inventory = this.$store.state.playerInventory;
      let item;

      for (let i = 0; i < this.allItems.length; i++) {
        if (this.allItems[i].id == itemId) {
          item = this.allItems[i];
          break;
        }
      }

      if (item.price <= this.$store.state.playerGold) {
        this.$store.state.playerGold -= item.price;
        localStorage.setItem("playerGold", this.$store.state.playerGold);

        inventory.push(itemId);
        this.$store.state.playerInventory = inventory;
        localStorage.setItem("playerInventory", JSON.stringify(inventory));
      } else {
        this.$store.state.purchaseFailed = true;
        this.showModal();
      }
    },
    showModal() {
      this.$emit("show-modal");
    },
  },
  beforeCreate() {},
  created() {
    this.weaponList = items.weaponList;
    this.armorList = items.armorList;
    this.consumablesList = items.consumablesList;
    this.allItems = items.list();
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
  width: 60px;
  height: 60px;
  background-color: var(--color-light);
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
}
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>
