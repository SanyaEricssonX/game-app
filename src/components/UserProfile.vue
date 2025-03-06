<template>
  <div class="profile-container">
    <h2 class="profile__header">Профиль</h2>
    <ul class="characteristics-list">
      <li class="characteristics__item"><h4 class="item__title"> HP : </h4>{{ playerCurrentHp }}/{{ playerMaxHp }}</li>
      <li class="characteristics__item"><h4 class="item__title"> Урон : </h4>{{ playerDamage }}</li>
      <li class="characteristics__item"><h4 class="item__title"> Защита : </h4>{{ playerArmor }}</li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "user-profile",
  extends: {},
  props: {},
  data() {
    return {
      playerMaxHp: 100,
      playerCurrentHp: 100,
      playerDamage: 10,
      playerArmor: 5,
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.profile-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 10px;
  width: 33%;
  max-height: 20vh;
  background-color: var(--color-light);
  color: var(--color-dark);
}
.profile__header {
  margin-bottom: 20px;
}
.characteristics-list {
  width: 100%;
}
.characteristics__item {
  display: flex;
  margin-bottom: 5px;
}
.item__title {
  font-weight: 600;
  font-size: 18px;
  margin-right: 5px;
}
</style>
