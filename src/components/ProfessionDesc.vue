<template>
  <div class="profession-container">
    <div
      class="profession_one"
      v-if="
        $store.state.playerLevel >= 4 &&
        $store.state.playerProfession == 'standart'
      "
    >
      <ul class="profession-nav">
        <li
          class="nav__item"
          :class="{ active: isActiveBtn(1) }"
          @click="activeContent(1)"
        >
          <h4 class="header">Воин</h4>
        </li>
        <li
          class="nav__item"
          :class="{ active: isActiveBtn(2) }"
          @click="activeContent(2)"
        >
          <h4 class="header">Рыцарь</h4>
        </li>
        <li
          class="nav__item"
          :class="{ active: isActiveBtn(3) }"
          @click="activeContent(3)"
        >
          <h4 class="header">Ассассин</h4>
        </li>
      </ul>
      <ul class="profession-list">
        <li class="profession__item warrior" v-if="selectedTab == 1">
          <span class="desc warrior__desc"
            ><strong class="profession__header">Воин</strong> - это настоящая
            машина для убийств. Имея увеличенный урон, воин с легкостью
            уничтожает врагов буквально втаптывая их в землю.</span
          >
          <span class="characteristic"
            >Урон увеличен на {{ professionWarrior.damage }}%</span
          >
          <span class="characteristic"
            >Шанс крита увеличен на {{ professionWarrior.critChance }}%</span
          >
          <span class="characteristic"
            >Сила крита увеличена на {{ professionWarrior.critPower }}%</span
          >
          <base-button
            class="btn warrior__btn"
            @click="choseProfession('warrior')"
            >Выбрать</base-button
          >
        </li>

        <li class="profession__item knight" v-if="selectedTab == 2">
          <span class="desc warrior__desc"
            ><strong class="profession__header">Воин</strong> - это настоящая
            машина для убийств. Имея увеличенный урон, воин с легкостью
            уничтожает врагов буквально втаптывая их в землю.</span
          >
          <span class="desc warrior__desc"
            >Разъяренный воин - это настоящая машина для убийств. Имея
            увеличенный урон воин с легкостью уничтожает врагов буквально
            втаптывая их в землю.</span
          >
          <span class="characteristic"
            >Урон увеличен на {{ professionWarrior.damage }}%</span
          >
          <span class="characteristic"
            >Шанс крита увеличен на {{ professionWarrior.critChance }}%</span
          >
          <span class="characteristic"
            >Сила крита увеличена на {{ professionWarrior.critPower }}%</span
          >
          <base-button
            class="btn warrior__btn"
            @click="choseProfession('knight')"
            >Выбрать</base-button
          >
        </li>

        <li class="profession__item assassin" v-if="selectedTab == 3">
          <span class="desc warrior__desc"
            ><strong class="profession__header">Воин</strong> - это настоящая
            машина для убийств. Имея увеличенный урон, воин с легкостью
            уничтожает врагов буквально втаптывая их в землю.</span
          >
          <span class="desc warrior__desc"
            >Разъяренный воин - это настоящая машина для убийств. Имея
            увеличенный урон воин с легкостью уничтожает врагов буквально
            втаптывая их в землю.</span
          >
          <span class="characteristic"
            >Урон увеличен на {{ professionWarrior.damage }}%</span
          >
          <span class="characteristic"
            >Шанс крита увеличен на {{ professionWarrior.critChance }}%</span
          >
          <span class="characteristic"
            >Сила крита увеличена на {{ professionWarrior.critPower }}%</span
          >
          <base-button
            class="btn warrior__btn"
            @click="choseProfession('assassin')"
            >Выбрать</base-button
          >
        </li>
      </ul>
    </div>
    <div
      class="profession_two"
      v-else-if="
        $store.state.playerLevel >= 13 &&
        ($store.state.playerProfession == 'warrior' ||
          $store.state.playerProfession == 'knight' ||
          $store.state.playerProfession == 'assassin')
      "
    >
      2 ACT
    </div>
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";
import { downloadData } from "@/services/downloadData";

export default {
  name: "profession-desc",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      professionWarrior: {},
      professionKnight: {},
      professionAssassin: {},
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },

    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
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
  beforeCreate() {},
  created() {
    this.professionWarrior = player.warriorProfessionCharacteristics;
    this.professionKnight = player.knightProfessionCharacteristics;
    this.professionAssassin = player.assassinProfessionCharacteristics;
  },
  mounted() {},
};
</script>

<style scoped>
.profession-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
  max-width: 600px;
  background-color: var(--color-blue);
  border: 1px solid var(--color-dark);
}
.profession-nav {
  display: flex;
  margin-bottom: 20px;
}
.nav__item {
  padding: 5px 10px;
  outline: 1px solid var(--color-light);
  cursor: pointer;
}
.nav__item:not(:last-child) {
  margin-right: auto;
}
.nav__item:hover {
  outline: 1px solid var(--color-dark);
  background-color: var(--color-light);
  color: var(--color-dark);
}
.profession-list {
  display: flex;
  flex-direction: row;
}
.profession__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.profession__header {
  font-size: 20px;
}
.header {
  font-size: 20px;
}
.desc {
  margin-bottom: 20px;
}
.characteristic {
  margin-bottom: 10px;
}
.btn {
  margin-top: 10px;
  padding: 7px 20px;
}
.btn:hover {
  background-color: var(--color-green);
  color: var(--color-light);
  font-weight: 900;
}
.active {
  outline: 1px solid var(--color-dark);
  background-color: var(--color-light);
  color: var(--color-dark);
}
</style>