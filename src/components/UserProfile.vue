<template>
  <div class="profile-container">
    <h2 class="profile__header">Профиль</h2>
    <ul class="list characteristics-list">
      <li class="item characteristics__item">
        <h4 class="item__title">Уровень :</h4>
        {{ $store.state.playerLevel }}
      </li>
      <li class="item characteristics__item">
        <h4 class="item__title">HP :</h4>
        {{ $store.state.playerCurrentHp }}/{{ $store.state.playerMaxHp }}
      </li>
      <li class="item characteristics__item">
        <h4 class="item__title">Урон :</h4>
        {{ $store.state.playerDamage }}
      </li>
      <li class="item characteristics__item">
        <h4 class="item__title">Защита :</h4>
        {{ $store.state.playerArmor }}
      </li>
    </ul>

    <ul class="list resources-list">
      <li class="item resources__item">
        <h4 class="item__title">Золото :</h4>
        {{ $store.state.playerGold }}
      </li>
      <li class="item resources__item">
        <h4 class="item__title">Древесина :</h4>
        {{ $store.state.playerResources.wood }}
      </li>
      <li class="item resources__item">
        <h4 class="item__title">Камень :</h4>
        {{ $store.state.playerResources.stone }}
      </li>
      <li class="item resources__item">
        <h4 class="item__title">Железо :</h4>
        {{ $store.state.playerResources.iron }}
      </li>
    </ul>
    <base-button class="profile__btn" @click="resetData"
      >Сброс данных</base-button
    >
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";

export default {
  name: "user-profile",
  extends: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    resetData() {
      localStorage.clear();
      downloadData();
      this.$store.dispatch("triggerSortEnemies");
    },
  },
  updated() {},
  beforeCreate() {},
  mounted() {
    downloadData();
  },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;
  /* width: 33%; */
  max-height: 42vh;
  background-color: var(--color-light);
  color: var(--color-dark);
}
.profile__header {
  margin-bottom: 30px;
}
.list {
  width: 100%;
}
.characteristics-list,
.resources-list {
  margin-bottom: 30px;
}
.item {
  display: flex;
  margin-bottom: 7px;
}
.item__title {
  font-weight: 600;
  font-size: 18px;
  margin-right: 5px;
}
.profile__btn {
  width: 100%;
  padding: 5px;
  font-size: 14px;
}
.profile__btn:hover {
  background-color: var(--color-red);
  color: var(--color-light);
}
</style>
