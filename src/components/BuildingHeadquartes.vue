<template>
  <div class="headquarters-container">
    <div class="headquarters-header">
      <div>
        <h3 class="headquarters__heading">Штаб</h3>

        <p class="headquarters__description">
          Координирует отряд и постоянно усиливает боевые характеристики
          персонажа.
        </p>
      </div>

      <span class="headquarters__level">
        Уровень {{ headquartersLevel }}/3
      </span>
    </div>

    <div class="headquarters-current" v-if="headquartersLevel > 0">
      <h4 class="headquarters-current__heading">Активные эффекты</h4>

      <div class="headquarters-effects">
        <div class="headquarters-effect">
          <span class="headquarters-effect__title">Урон</span>

          <span class="headquarters-effect__value">
            +{{ headquartersBonuses.damage }}%
          </span>
        </div>

        <div class="headquarters-effect">
          <span class="headquarters-effect__title">Защита</span>

          <span class="headquarters-effect__value">
            +{{ headquartersBonuses.armor }}%
          </span>
        </div>

        <div class="headquarters-effect">
          <span class="headquarters-effect__title">Критическая сила</span>

          <span class="headquarters-effect__value">
            +{{ headquartersBonuses.critPower }}%
          </span>
        </div>
      </div>
    </div>

    <div class="headquarters-empty" v-else>
      <p>
        Штаб ещё не построен. Постройте его в лагере, чтобы получить постоянные
        бонусы к урону, защите и критической силе.
      </p>
    </div>

    <div class="headquarters-levels">
      <h4 class="headquarters-levels__heading">Эффекты по уровням</h4>

      <ul class="headquarters-levels__list">
        <li
          class="headquarters-levels__item"
          :class="{
            'headquarters-levels__item_active': headquartersLevel === 1,
          }"
        >
          <span class="headquarters-levels__title">Уровень 1</span>
          <span>Урон +10%</span>
          <span>Защита +10%</span>
          <span>Критическая сила +20%</span>
        </li>

        <li
          class="headquarters-levels__item"
          :class="{
            'headquarters-levels__item_active': headquartersLevel === 2,
          }"
        >
          <span class="headquarters-levels__title">Уровень 2</span>
          <span>Урон +25%</span>
          <span>Защита +20%</span>
          <span>Критическая сила +40%</span>
        </li>

        <li
          class="headquarters-levels__item"
          :class="{
            'headquarters-levels__item_active': headquartersLevel === 3,
          }"
        >
          <span class="headquarters-levels__title">Уровень 3</span>
          <span>Урон +40%</span>
          <span>Защита +30%</span>
          <span>Критическая сила +70%</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
import camp from "@/game/camp";

export default {
  name: "BuildingHeadquartes",

  computed: {
    headquartersLevel() {
      return Number(this.$store.state.playerBuildings.currentLevel0 || 0);
    },

    headquartersBonuses() {
      return this.$store.state.playerHeadquartesCharacteristics;
    },
  },

  created() {
    camp.syncHeadquartersCharacteristics();
  },
};
</script>

<style scoped>
.headquarters-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border: 2px solid var(--color-light);
  border-radius: 8px;
}

.headquarters-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.headquarters__heading {
  margin-bottom: 10px;
  font-size: 24px;
}

.headquarters__description {
  max-width: 650px;
  line-height: 1.45;
}

.headquarters__level {
  flex-shrink: 0;
  padding: 7px 10px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
  font-family: Bahnschrift, sans-serif;
  font-weight: 900;
}

.headquarters-current {
  padding: 15px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.08);
}

.headquarters-current__heading,
.headquarters-levels__heading {
  margin-bottom: 15px;
  font-size: 18px;
}

.headquarters-effects {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.headquarters-effect {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 12px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
}

.headquarters-effect__title {
  font-size: 15px;
}

.headquarters-effect__value {
  color: var(--color-green);
  font-family: Bahnschrift, sans-serif;
  font-size: 26px;
  font-weight: 900;
}

.headquarters-empty {
  padding: 15px;
  border: 1px solid var(--color-light);
  border-radius: 6px;
  line-height: 1.45;
}

.headquarters-levels {
  display: flex;
  flex-direction: column;
}

.headquarters-levels__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.headquarters-levels__item {
  display: grid;
  grid-template-columns: 130px 1fr 1fr 1.3fr;
  gap: 15px;
  padding: 12px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
  opacity: 0.65;
}

.headquarters-levels__item_active {
  border-color: var(--color-green);
  background-color: rgba(73, 165, 85, 0.15);
  opacity: 1;
}

.headquarters-levels__title {
  font-family: Bahnschrift, sans-serif;
  font-weight: 900;
}

@media (max-width: 750px) {
  .headquarters-header {
    flex-direction: column;
  }

  .headquarters-effects {
    grid-template-columns: 1fr;
  }

  .headquarters-levels__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
}
</style>
