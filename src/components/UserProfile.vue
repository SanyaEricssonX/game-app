<template>
  <div class="profile-container">
    <div class="profile-block">
      <h2 class="profile__header">Характеристики</h2>
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
        <li class="item characteristics__item">
          <h4 class="item__title">Уклонение :</h4>
          {{ $store.state.playerEvasion }} <span class="symbol">%</span>
        </li>
        <li class="item characteristics__item">
          <h4 class="item__title">Крит шанс :</h4>
          {{ $store.state.playerCritChance }} <span class="symbol">%</span>
        </li>
        <li class="item characteristics__item">
          <h4 class="item__title">Крит сила :</h4>
          {{ $store.state.playerCritPower }} <span class="symbol">%</span>
        </li>
      </ul>
    </div>

    <div
      class="profile-block"
      v-if="
        $store.state.playerBuffCharacteristics.hp > 0 ||
        $store.state.playerBuffCharacteristics.damage > 0 ||
        $store.state.playerBuffCharacteristics.armor > 0 ||
        $store.state.playerBuffCharacteristics.drop > 0 ||
        $store.state.playerBuffCharacteristics.evasion > 0 ||
        $store.state.playerBuffCharacteristics.critChance > 0 ||
        $store.state.playerBuffCharacteristics.critPower > 0
      "
    >
      <h2 class="profile__header">Бафы</h2>
      <ul class="list buff-list">
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.hp > 0"
        >
          <h4 class="item__title">HP :</h4>
          {{ $store.state.playerBuffCharacteristics.hp }} ({{
            $store.state.playerBuffCharacteristics.hpBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.hpBuffDuration
            )
          }})
        </li>
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.damage > 0"
        >
          <h4 class="item__title">Урон :</h4>
          {{ $store.state.playerBuffCharacteristics.damage }} ({{
            $store.state.playerBuffCharacteristics.damageBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.damageBuffDuration
            )
          }})
        </li>
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.armor > 0"
        >
          <h4 class="item__title">Защита :</h4>
          {{ $store.state.playerBuffCharacteristics.armor }} ({{
            $store.state.playerBuffCharacteristics.armorBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.armorBuffDuration
            )
          }})
        </li>
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.evasion > 0"
        >
          <h4 class="item__title">Уклонение :</h4>
          {{ $store.state.playerBuffCharacteristics.evasion }} ({{
            $store.state.playerBuffCharacteristics.evasionBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.evasionBuffDuration
            )
          }})
        </li>
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.critChance > 0"
        >
          <h4 class="item__title">Крит шанс :</h4>
          {{ $store.state.playerBuffCharacteristics.critChance }} ({{
            $store.state.playerBuffCharacteristics.critChanceBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.critChanceBuffDuration
            )
          }})
        </li>
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.critPower > 0"
        >
          <h4 class="item__title">Крит сила :</h4>
          {{ $store.state.playerBuffCharacteristics.critPower }} ({{
            $store.state.playerBuffCharacteristics.critPowerBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.critPowerBuffDuration
            )
          }})
        </li>
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.drop > 0"
        >
          <h4 class="item__title">Дроп :</h4>
          x{{ $store.state.playerBuffCharacteristics.drop }} ({{
            $store.state.playerBuffCharacteristics.dropBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.dropBuffDuration
            )
          }})
        </li>
      </ul>
    </div>

    <div class="profile-block">
      <h2 class="profile__header">Ресурсы</h2>
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
    </div>
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
      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");
    },

    correctEnding(number) {
      if (number == 1) {
        return "бой";
      } else if (number >= 2 && number <= 4) {
        return "боя";
      } else if (number >= 5 && number <= 20) {
        return "боев";
      } else if (number == 21) {
        return "бой";
      } else if (number >= 22 && number <= 24) {
        return "боя";
      } else if (number >= 25 && number <= 30) {
        return "боев";
      }
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
  border: 2px solid var(--color-light);
}
.profile-block {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 210px;
}
.profile__header {
  margin-bottom: 30px;
  font-size: 22px;
}
.list {
  width: 100%;
}
.item {
  display: flex;
  margin-bottom: 10px;
}
.item__title {
  margin-right: 5px;
  font-weight: 600;
  font-size: 17px;
}
.profile__btn {
  width: 100%;
  padding: 5px;
  font-size: 14px;
}
.profile__btn:hover {
  background-color: var(--color-red);
  color: var(--color-light);
  font-weight: 900;
}
.symbol {
  font-family: Bahnschrift;
  font-weight: 300;
}
</style>
