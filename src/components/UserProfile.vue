<template>
  <div class="profile-container">
    <div class="profile-block" v-if="$store.state.playerLevel >= 4">
      <h2 class="profile__header">Воплощение</h2>

      <div
        class="profession-box"
        v-if="
          ($store.state.playerLevel >= 4 &&
            $store.state.playerProfession === 'standart') ||
          ($store.state.playerLevel >= 13 &&
            ($store.state.playerProfession === 'warrior' ||
              $store.state.playerProfession === 'knight' ||
              $store.state.playerProfession === 'assassin'))
        "
      >
        <base-button
          class="profession__btn"
          v-if="$store.state.playerProfession === 'standart'"
          @click="choseProfession"
        >
          Выбрать воплощение
        </base-button>

        <base-button
          class="profession__btn"
          v-if="
            $store.state.playerLevel >= 13 &&
            ($store.state.playerProfession === 'warrior' ||
              $store.state.playerProfession === 'knight' ||
              $store.state.playerProfession === 'assassin')
          "
          @click="choseProfession"
        >
          Выбрать 2 акт воплощения
        </base-button>
      </div>

      <span class="profession__title" v-else>
        {{ profession() }}
      </span>
    </div>

    <div class="profile-block">
      <h2 class="profile__header">Характеристики</h2>

      <ul class="list characteristics-list">
        <li
          class="item characteristics__item level__item"
          @mouseenter="showTooltip('level')"
          @mouseleave="hideTooltip"
        >
          <div class="experience-bar">
            <div
              class="progress"
              :style="{ width: progressPercentage + '%' }"
            ></div>

            <h4 class="level-text">Уровень {{ $store.state.playerLevel }}</h4>
          </div>

          <base-profile-tooltip
            :content="activeTooltip"
            :visible="isTooltipVisible"
            v-if="isTooltipVisible && activeTooltip === 'level'"
          />
        </li>

        <li class="item hp__item">
          <h4 class="item__title hp__title">HP:</h4>

          <base-progress
            class="hp__bar"
            :currentValue="$store.state.playerCurrentHp"
            :maxValue="$store.state.playerMaxHp"
          />
        </li>

        <li class="item characteristics__item">
          <h4 class="item__title">Урон:</h4>
          {{ $store.state.playerDamage }}
        </li>

        <li
          class="item characteristics__item level__item"
          @mouseenter="showTooltip('armor')"
          @mouseleave="hideTooltip"
        >
          <h4 class="item__title">Защита:</h4>
          {{ $store.state.playerArmor }}

          <base-profile-tooltip
            :content="activeTooltip"
            :visible="isTooltipVisible"
            v-if="isTooltipVisible && activeTooltip === 'armor'"
          />
        </li>

        <li class="item characteristics__item">
          <h4 class="item__title">Уклонение:</h4>
          {{ $store.state.playerEvasion }}
          <span class="symbol">%</span>
        </li>

        <li class="item characteristics__item">
          <h4 class="item__title">Крит шанс:</h4>
          {{ $store.state.playerCritChance }}
          <span class="symbol">%</span>
        </li>

        <li class="item characteristics__item crit_power">
          <h4 class="item__title">Крит сила:</h4>
          {{ $store.state.playerCritPower }}
          <span class="symbol">%</span>
        </li>
      </ul>
    </div>

    <div
      class="profile-block profile-block_camp-effects"
      v-if="hasHeadquartersBonuses"
    >
      <h2 class="profile__header">Лагерь</h2>

      <ul class="list camp-effects-list">
        <li
          class="item camp-effects__item"
          v-if="$store.state.playerHeadquartesCharacteristics.damage > 0"
        >
          <h4 class="item__title">Урон:</h4>
          +{{ $store.state.playerHeadquartesCharacteristics.damage }}
          <span class="symbol">%</span>
        </li>

        <li
          class="item camp-effects__item"
          v-if="$store.state.playerHeadquartesCharacteristics.armor > 0"
        >
          <h4 class="item__title">Защита:</h4>
          +{{ $store.state.playerHeadquartesCharacteristics.armor }}
          <span class="symbol">%</span>
        </li>

        <li
          class="item camp-effects__item"
          v-if="$store.state.playerHeadquartesCharacteristics.critPower > 0"
        >
          <h4 class="item__title">Крит сила:</h4>
          +{{ $store.state.playerHeadquartesCharacteristics.critPower }}
          <span class="symbol">%</span>
        </li>
      </ul>
    </div>

    <div class="profile-block" v-if="hasActiveBuffs">
      <h2 class="profile__header">Бафы</h2>

      <ul class="list buff-list">
        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.hp > 0"
        >
          <h4 class="item__title">HP:</h4>
          {{ $store.state.playerBuffCharacteristics.hp }}
          ({{ $store.state.playerBuffCharacteristics.hpBuffDuration }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.hpBuffDuration,
            )
          }})
        </li>

        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.damage > 0"
        >
          <h4 class="item__title">Урон:</h4>
          {{ $store.state.playerBuffCharacteristics.damage }}
          ({{ $store.state.playerBuffCharacteristics.damageBuffDuration }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.damageBuffDuration,
            )
          }})
        </li>

        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.armor > 0"
        >
          <h4 class="item__title">Защита:</h4>
          {{ $store.state.playerBuffCharacteristics.armor }}
          ({{ $store.state.playerBuffCharacteristics.armorBuffDuration }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.armorBuffDuration,
            )
          }})
        </li>

        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.evasion > 0"
        >
          <h4 class="item__title">Уклонение:</h4>
          {{ $store.state.playerBuffCharacteristics.evasion }}
          ({{ $store.state.playerBuffCharacteristics.evasionBuffDuration }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.evasionBuffDuration,
            )
          }})
        </li>

        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.critChance > 0"
        >
          <h4 class="item__title">Крит шанс:</h4>
          {{ $store.state.playerBuffCharacteristics.critChance }}
          ({{ $store.state.playerBuffCharacteristics.critChanceBuffDuration }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.critChanceBuffDuration,
            )
          }})
        </li>

        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.critPower > 0"
        >
          <h4 class="item__title">Крит сила:</h4>
          {{ $store.state.playerBuffCharacteristics.critPower }}
          ({{ $store.state.playerBuffCharacteristics.critPowerBuffDuration }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.critPowerBuffDuration,
            )
          }})
        </li>

        <li
          class="item buff__item"
          v-show="$store.state.playerBuffCharacteristics.drop > 0"
        >
          <h4 class="item__title">Дроп:</h4>
          x{{ $store.state.playerBuffCharacteristics.drop }} ({{
            $store.state.playerBuffCharacteristics.dropBuffDuration
          }}
          {{
            correctEnding(
              $store.state.playerBuffCharacteristics.dropBuffDuration,
            )
          }})
        </li>
      </ul>
    </div>

    <div class="profile-block">
      <h2 class="profile__header">Ресурсы</h2>

      <ul class="list resources-list">
        <li class="item resources__item">
          <h4 class="item__title">Золото:</h4>
          {{ $store.state.playerGold }}
        </li>

        <li class="item resources__item">
          <h4 class="item__title">Древесина:</h4>
          {{ $store.state.playerResources.wood }}
        </li>

        <li class="item resources__item">
          <h4 class="item__title">Камень:</h4>
          {{ $store.state.playerResources.stone }}
        </li>

        <li class="item resources__item">
          <h4 class="item__title">Железо:</h4>
          {{ $store.state.playerResources.iron }}
        </li>
      </ul>
    </div>

    <base-button
      class="profile__btn"
      v-if="$store.state.accountStatus === 'Тестовый'"
      @click="resetData"
    >
      Сброс данных
    </base-button>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import player from "@/services/player";
import camp from "@/game/camp";

export default {
  name: "user-profile",

  data() {
    return {
      playerProfession: "",
      activeTooltip: "",
      isTooltipVisible: false,
      timeout: null,
    };
  },

  computed: {
    progressPercentage() {
      let nextLevelExperience = 0;
      let previousLevelExperience = 0;

      const experienceList = player.experienceForLevel;

      if (this.$store.state.playerLevel >= experienceList.length + 1) {
        const lastLevelIndex = experienceList.length - 1;
        nextLevelExperience = experienceList[lastLevelIndex];
      } else {
        for (let i = 0; i < experienceList.length; i += 1) {
          if (this.$store.state.playerLevel - 1 === i) {
            nextLevelExperience = experienceList[i];

            if (this.$store.state.playerLevel > 1) {
              previousLevelExperience = experienceList[i - 1];
            }

            break;
          }
        }
      }

      const levelRange = nextLevelExperience - previousLevelExperience;

      if (levelRange <= 0) {
        return 100;
      }

      return Math.min(
        100,
        ((this.$store.state.playerExperience - previousLevelExperience) /
          levelRange) *
          100,
      );
    },

    hasHeadquartersBonuses() {
      const bonuses = this.$store.state.playerHeadquartesCharacteristics;

      return (
        Number(bonuses.damage || 0) > 0 ||
        Number(bonuses.armor || 0) > 0 ||
        Number(bonuses.critPower || 0) > 0
      );
    },

    hasActiveBuffs() {
      const buffs = this.$store.state.playerBuffCharacteristics;

      return (
        buffs.hp > 0 ||
        buffs.damage > 0 ||
        buffs.armor > 0 ||
        buffs.drop > 0 ||
        buffs.evasion > 0 ||
        buffs.critChance > 0 ||
        buffs.critPower > 0
      );
    },
  },

  methods: {
    showTooltip(content) {
      this.timeout = setTimeout(() => {
        this.activeTooltip = content;
        this.isTooltipVisible = true;
      }, 500);
    },

    hideTooltip() {
      clearTimeout(this.timeout);
      this.activeTooltip = "";
      this.isTooltipVisible = false;
    },

    showModal() {
      this.$emit("show-modal");
    },

    choseProfession() {
      this.$store.state.professionIsChosen = true;
      this.showModal();
    },

    resetData() {
      const currentVersion = localStorage.getItem("appVersion");

      localStorage.clear();

      if (currentVersion) {
        localStorage.setItem("appVersion", currentVersion);
      }

      downloadData();

      this.$store.state.playerCurrentLocation = 9990;

      this.$store.dispatch("triggerSortEnemies");
      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");
    },

    correctEnding(number) {
      const value = Math.abs(Number(number || 0)) % 100;
      const lastDigit = value % 10;

      if (value >= 11 && value <= 19) {
        return "боев";
      }

      if (lastDigit === 1) {
        return "бой";
      }

      if (lastDigit >= 2 && lastDigit <= 4) {
        return "боя";
      }

      return "боев";
    },

    profession() {
      switch (this.$store.state.playerProfession) {
        case "warrior":
          return "Воин";

        case "knight":
          return "Рыцарь";

        case "assassin":
          return "Ассассин";

        case "berserk":
          return "Берсерк";

        case "gladiator":
          return "Гладиатор";

        case "templar":
          return "Храмовник";

        case "titan":
          return "Титан";

        case "reaper":
          return "Жнец";

        case "pathfinder":
          return "Следопыт";

        default:
          return "";
      }
    },
  },

  mounted() {
    camp.syncHeadquartersCharacteristics();
    downloadData();
  },

  beforeUnmount() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.profile-container {
  border: 2px solid var(--color-light);
}

.profile-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 210px;
  padding: 10px;
}

.profession__btn {
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: var(--color-green);
  color: var(--color-light);
  font-size: 16px;
  font-weight: 900;
}

.profession__btn:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}

.profession__title {
  width: 100%;
  font-family: Bahnschrift, sans-serif;
}

.profile__header {
  margin-bottom: 20px;
  font-size: 18px;
}

.list {
  width: 100%;
}

.item {
  position: relative;
  display: flex;
  margin-bottom: 6px;
}

.level__item {
  width: max-content;
  cursor: pointer;
}

.hp__item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.hp__bar {
  width: 100%;
}

.hp__title {
  width: 40px;
}

.crit_power {
  margin-bottom: 0;
}

.item__title {
  margin-right: 5px;
  font-size: 15px;
  font-weight: 600;
}

.camp-effects__item {
  color: var(--color-light);
}

.camp-effects__item:last-child {
  margin-bottom: 0;
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

.symbol {
  margin-left: 2px;
  font-family: Bahnschrift, sans-serif;
  font-weight: 300;
}

.experience-bar {
  position: relative;
  width: 190px;
  height: 25px;
  margin-bottom: 14px;
  overflow: hidden;
  border: 1px solid var(--color-light);
  background-color: var(--color-dark);
}

.progress {
  display: flex;
  align-items: center;
  height: 100%;
  background: linear-gradient(90deg, var(--color-blue), var(--color-green));
  transition: width 1.5s ease;
}

.level-text {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 100%;
  transform: translate(-50%, -50%);
  color: var(--color-light);
  font-size: 16px;
  font-weight: 900;
  text-align: center;
}
</style>
