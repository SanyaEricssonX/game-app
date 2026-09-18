<template>
  <div class="profession-container">
    <div class="profession-header">
      <h3 class="profession-title">
        {{ isSecondAct ? "Второй акт воплощения" : "Выбор воплощения" }}
      </h3>
    </div>

    <div
      class="profession-tabs"
      role="tablist"
      :aria-label="
        isSecondAct
          ? 'Выбор специализации второго акта'
          : 'Выбор базового воплощения'
      "
    >
      <button
        v-for="profession in availableProfessions"
        :key="profession.key"
        class="profession-tab"
        :class="{
          'profession-tab_active': selectedTab === profession.key,
        }"
        type="button"
        role="tab"
        :aria-selected="selectedTab === profession.key"
        :aria-controls="`profession-panel-${profession.key}`"
        :id="`profession-tab-${profession.key}`"
        :data-testid="`profession-tab-${profession.key}`"
        :data-action="`select-profession-${profession.key}`"
        @click="selectProfession(profession.key)"
      >
        <span class="profession-tab__icon">
          {{ profession.icon }}
        </span>

        <span class="profession-tab__name">
          {{ profession.name }}
        </span>
      </button>
    </div>

    <section
      class="profession-card"
      v-if="currentProfession"
      role="tabpanel"
      :id="`profession-panel-${currentProfession.key}`"
      :aria-labelledby="`profession-tab-${currentProfession.key}`"
    >
      <div class="profession-card__scroll">
        <div class="profession-card__header">
          <div class="profession-card__title-box">
            <span class="profession-card__icon">
              {{ currentProfession.icon }}
            </span>

            <div>
              <h4 class="profession-card__title">
                {{ currentProfession.name }}
              </h4>

              <span class="profession-card__type">
                {{
                  isSecondAct
                    ? "Специализация второго акта"
                    : "Базовое воплощение"
                }}
              </span>
            </div>
          </div>
        </div>

        <p class="profession-card__description">
          {{ currentProfession.description }}
        </p>

        <div class="profession-stats">
          <h5 class="profession-stats__heading">Характеристики</h5>

          <ul class="profession-stats__list">
            <li
              class="profession-stats__item"
              v-for="stat in currentProfession.stats"
              :key="stat.key"
              :class="{
                'profession-stats__item_negative': stat.isNegative,
                'profession-stats__item_fixed': stat.isFixed,
              }"
            >
              <span class="profession-stats__name">
                {{ stat.icon }} {{ stat.label }}
              </span>

              <strong class="profession-stats__value">
                {{ stat.value }}
              </strong>
            </li>
          </ul>
        </div>
      </div>

      <div class="profession-card__footer">
        <base-button
          class="profession-card__btn"
          :data-testid="`choose-profession-${currentProfession.key}`"
          :data-action="`choose-profession-${currentProfession.key}`"
          @click="choseProfession(currentProfession.key)"
        >
          Выбрать воплощение
        </base-button>
      </div>
    </section>
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";
import { downloadData } from "@/services/downloadData";

export default {
  name: "profession-desc",

  data() {
    return {
      selectedTab: "",

      firstActProfessions: [
        {
          key: "warrior",
          name: "Воин",
          icon: "⚔️",
          description:
            "Настоящая машина для убийств. Воин делает ставку на высокий урон и быстро уничтожает противников.",
          characteristics: player.warriorProfessionCharacteristics,
          statConfig: [
            {
              key: "damage",
              label: "Урон",
              icon: "⚔️",
              type: "increase",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
        {
          key: "knight",
          name: "Рыцарь",
          icon: "🛡️",
          description:
            "Стойкий защитник. Рыцарь получает больше защиты и здоровья, но его уклонение всегда равно 10%.",
          characteristics: player.knightProfessionCharacteristics,
          statConfig: [
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "fixed",
              value: "Фиксированно 10%",
            },
          ],
        },
        {
          key: "assassin",
          name: "Ассассин",
          icon: "🗡️",
          description:
            "Смертоносный убийца, который наносит точные удары по уязвимым местам врага. Сильнее в критах и уклонении, но слабее в защите.",
          characteristics: player.assassinProfessionCharacteristics,
          statConfig: [
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "increase",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
      ],

      warriorSecondAct: [
        {
          key: "berserk",
          name: "Берсерк",
          icon: "🔥",
          description:
            "Это уже не человек, а зверь. Берсерк жертвует живучестью ради огромного урона и неудержимой ярости.",
          characteristics: player.berserkProfessionCharacteristics,
          statConfig: [
            {
              key: "damage",
              label: "Урон",
              icon: "⚔️",
              type: "increase",
            },
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
        {
          key: "gladiator",
          name: "Гладиатор",
          icon: "🏟️",
          description:
            "Расчётливый боец, который наказывает противника за ошибки. Сочетает урон, критические удары и высокую мобильность.",
          characteristics: player.gladiatorProfessionCharacteristics,
          statConfig: [
            {
              key: "damage",
              label: "Урон",
              icon: "⚔️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "increase",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
      ],

      knightSecondAct: [
        {
          key: "templar",
          name: "Храмовник",
          icon: "✠",
          description:
            "Самый живучий среди воплощений. Храмовник выдерживает натиск даже самых опасных противников.",
          characteristics: player.templarProfessionCharacteristics,
          statConfig: [
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "fixed",
              value: "Фиксированно 10%",
            },
          ],
        },
        {
          key: "titan",
          name: "Титан",
          icon: "🗿",
          description:
            "Мощный и выносливый боец. Титан сочетает высокую защиту, здоровье и достойный урон.",
          characteristics: player.titanProfessionCharacteristics,
          statConfig: [
            {
              key: "damage",
              label: "Урон",
              icon: "⚔️",
              type: "increase",
            },
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "fixed",
              value: "Фиксированно 10%",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
      ],

      assassinSecondAct: [
        {
          key: "reaper",
          name: "Жнец",
          icon: "💀",
          description:
            "Невероятно опасный противник, который действует быстро и беспощадно. Жнец получает сильные бонусы к критическим ударам.",
          characteristics: player.reaperProfessionCharacteristics,
          statConfig: [
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "increase",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
        {
          key: "pathfinder",
          name: "Следопыт",
          icon: "🏹",
          description:
            "Выслеживает врага и расправляется с ним мгновенно. Следопыт сочетает урон, мобильность и критические удары.",
          characteristics: player.pathfinderProfessionCharacteristics,
          statConfig: [
            {
              key: "damage",
              label: "Урон",
              icon: "⚔️",
              type: "increase",
            },
            {
              key: "armor",
              label: "Защита",
              icon: "🛡️",
              type: "increase",
            },
            {
              key: "hp",
              label: "HP",
              icon: "❤️",
              type: "increase",
            },
            {
              key: "evasion",
              label: "Уклонение",
              icon: "🌀",
              type: "increase",
            },
            {
              key: "critChance",
              label: "Шанс крита",
              icon: "💢",
              type: "increase",
            },
            {
              key: "critPower",
              label: "Сила крита",
              icon: "💥",
              type: "increase",
            },
          ],
        },
      ],
    };
  },

  computed: {
    isSecondAct() {
      return (
        this.$store.state.playerLevel >= 13 &&
        ["warrior", "knight", "assassin"].includes(
          this.$store.state.playerProfession,
        )
      );
    },

    availableProfessions() {
      if (!this.isSecondAct) {
        return this.firstActProfessions;
      }

      if (this.$store.state.playerProfession === "warrior") {
        return this.warriorSecondAct;
      }

      if (this.$store.state.playerProfession === "knight") {
        return this.knightSecondAct;
      }

      if (this.$store.state.playerProfession === "assassin") {
        return this.assassinSecondAct;
      }

      return [];
    },

    currentProfession() {
      const profession = this.availableProfessions.find((item) => {
        return item.key === this.selectedTab;
      });

      if (!profession) {
        return null;
      }

      return {
        ...profession,
        stats: this.createProfessionStats(profession),
      };
    },
  },

  watch: {
    availableProfessions: {
      immediate: true,
      handler(professions) {
        const isCurrentTabAvailable = professions.some((profession) => {
          return profession.key === this.selectedTab;
        });

        if (!isCurrentTabAvailable && professions.length > 0) {
          this.selectedTab = professions[0].key;
        }
      },
    },
  },

  methods: {
    selectProfession(professionKey) {
      this.selectedTab = professionKey;
    },

    createProfessionStats(profession) {
      return profession.statConfig.map((stat) => {
        if (stat.type === "fixed") {
          return {
            ...stat,
            value: stat.value,
            isFixed: true,
            isNegative: false,
          };
        }

        const value = Number(profession.characteristics[stat.key] || 0);

        return {
          ...stat,
          value: value > 0 ? `+${value}%` : `${value}%`,
          isFixed: false,
          isNegative: value < 0,
        };
      });
    },

    choseProfession(profession) {
      this.$store.state.playerProfession = profession;

      localStorage.setItem("playerProfession", profession);

      player.professionCharacteristics();
      downloadData();

      this.closeModal();
    },

    closeModal() {
      this.$emit("hide-modal");
    },
  },
};
</script>

<style scoped>
.profession-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 600px;
  padding: 30px 50px;
  overflow: hidden;
  background-color: var(--color-blue);
  color: var(--color-light);
}

.profession-header {
  flex-shrink: 0;
  margin-bottom: 20px;
  padding-right: 32px;
  text-align: center;
}

.profession-title {
  margin-bottom: 9px;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 24px;
  font-weight: 900;
  line-height: 1.2;
}

.profession-tabs {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.profession-tab {
  display: inline-flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 120px;
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.08);
  color: var(--color-light);
  cursor: pointer;
  font-family: Bahnschrift, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.1;
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease;
}

.profession-tab:hover:not(.profession-tab_active) {
  border-color: var(--color-light);
  background-color: rgba(255, 255, 255, 0.16);
}

.profession-tab_active {
  border-color: var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
}

.profession-tab:focus-visible {
  position: relative;
  z-index: 2;
  outline: 3px solid var(--color-green);
  outline-offset: 3px;
}

.profession-tab__icon {
  font-size: 18px;
}

.profession-tab__name {
  white-space: nowrap;
}

.profession-card {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.17);
}

.profession-card__scroll {
  flex: 1;
  min-height: 0;
  padding: 18px 18px 10px;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: rgba(255, 255, 255, 0.65) rgba(0, 0, 0, 0.16);
}

.profession-card__scroll::-webkit-scrollbar {
  width: 9px;
}

.profession-card__scroll::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.16);
}

.profession-card__scroll::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.65);
}

.profession-card__scroll::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-light);
}

.profession-card__header {
  margin-bottom: 16px;
}

.profession-card__title-box {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profession-card__icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.12);
  font-size: 25px;
}

.profession-card__title {
  margin-bottom: 4px;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 22px;
  font-weight: 900;
}

.profession-card__type {
  color: rgba(255, 255, 255, 0.74);
  font-size: 13px;
}

.profession-card__description {
  margin-bottom: 18px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.5;
}

.profession-stats {
  margin-bottom: 8px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.14);
}

.profession-stats__heading {
  margin-bottom: 10px;
  color: var(--color-light);
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
}

.profession-stats__list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.profession-stats__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.3;
}

.profession-stats__item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.profession-stats__name {
  min-width: 0;
}

.profession-stats__value {
  flex-shrink: 0;
  color: #88f0bb;
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
}

.profession-stats__item_negative .profession-stats__value {
  color: #ffaaa4;
}

.profession-stats__item_fixed .profession-stats__value {
  color: #ffe69a;
  font-size: 15px;
}

.profession-card__footer {
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  padding: 12px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  background-color: rgba(0, 0, 0, 0.1);
}

.profession-card__btn {
  min-width: 220px;
}

@media (max-width: 650px) {
  .profession-container {
    min-height: calc(100vh - 66px);
    height: calc(100vh - 66px);
    padding: 22px 18px;
  }

  .profession-header {
    margin-bottom: 16px;
    padding-right: 25px;
  }

  .profession-title {
    font-size: 21px;
  }

  .profession-tabs {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 7px;
    margin-bottom: 14px;
  }

  .profession-tab {
    width: 100%;
    min-height: 38px;
    padding: 8px;
  }

  .profession-card__scroll {
    padding: 15px 14px 8px;
  }

  .profession-card__title {
    font-size: 20px;
  }

  .profession-card__description {
    font-size: 14px;
  }

  .profession-stats {
    padding: 12px;
  }

  .profession-card__footer {
    padding: 10px 14px 14px;
  }

  .profession-card__btn {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 420px) {
  .profession-container {
    padding: 18px 14px;
  }

  .profession-card__title-box {
    gap: 9px;
  }

  .profession-card__icon {
    width: 40px;
    height: 40px;
    font-size: 21px;
  }

  .profession-card__title {
    font-size: 18px;
  }

  .profession-stats__item {
    gap: 8px;
    font-size: 14px;
  }

  .profession-stats__value {
    font-size: 15px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .profession-tab {
    transition: none;
  }
}
</style>
