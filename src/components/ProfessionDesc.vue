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
            ><strong class="profession__header">Рыцарь</strong> всегда готов
            противостоять даже самым опасным противникам, а все благодаря его
            непревзойденной целеустремленности и желанию защишать слабых.</span
          >
          <span class="characteristic"
            >Защита увеличена на {{ professionKnight.armor }}%</span
          >
          <span class="characteristic"
            >HP увеличено на {{ professionKnight.hp }}%</span
          >
          <span class="characteristic"
            >Уклонение фиксированно 10%</span
          >
          <base-button
            class="btn warrior__btn"
            @click="choseProfession('knight')"
            >Выбрать</base-button
          >
        </li>

        <li class="profession__item assassin" v-if="selectedTab == 3">
          <span class="desc warrior__desc"
            ><strong class="profession__header">Ассассин</strong> - смертоносный
            убийца, который привык нападать из тени и наносить удары в самые
            уязвимые места.
          </span>
          <span class="characteristic"
            >Защита: {{ professionAssassin.armor }}%</span
          >
          <span class="characteristic">HP: {{ professionAssassin.hp }}%</span>
          <span class="characteristic"
            >Уклонение увеличено на {{ professionAssassin.evasion }}%</span
          >
          <span class="characteristic"
            >Шанс крита увеличен на {{ professionAssassin.critChance }}%</span
          >
          <span class="characteristic"
            >Сила крита увеличена на {{ professionAssassin.critPower }}%</span
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
      <div
        class="warriors-block"
        v-if="$store.state.playerProfession == 'warrior'"
      >
        <ul class="profession-nav">
          <li
            class="nav__item"
            :class="{ active: isActiveBtn(1) }"
            @click="activeContent(1)"
          >
            <h4 class="header">Берсерк</h4>
          </li>
          <li
            class="nav__item"
            :class="{ active: isActiveBtn(2) }"
            @click="activeContent(2)"
          >
            <h4 class="header">Гладиатор</h4>
          </li>
        </ul>
        <ul class="profession-list">
          <li class="profession__item berserk" v-if="selectedTab == 1">
            <span class="desc berserk__desc"
              ><strong class="profession__header">Берсерк</strong> - это уже не
              человек. Он зверь, который невзирая на преграды мчится к цели и
              разрывает ее на кусочки. Его ярость не угомонить, пока на поле боя
              жив хоть один враг.</span
            >
            <span class="characteristic"
              >Урон увеличен на {{ professionBerserk.damage }}%</span
            >
            <span class="characteristic"
              >Защита: {{ professionBerserk.armor }}%</span
            >
            <span class="characteristic">HP: {{ professionBerserk.hp }}%</span>
            <span class="characteristic"
              >Уклонение увеличено на {{ professionBerserk.evasion }}%</span
            >
            <span class="characteristic"
              >Шанс крита увеличен на {{ professionBerserk.critChance }}%</span
            >
            <span class="characteristic"
              >Сила крита увеличена на {{ professionBerserk.critPower }}%</span
            >
            <base-button
              class="btn berserk__btn"
              @click="choseProfession('berserk')"
              >Выбрать</base-button
            >
          </li>

          <li class="profession__item gladiator" v-if="selectedTab == 2">
            <span class="desc gladiator__desc"
              ><strong class="profession__header">Гладиатор</strong> рассчетлив
              и практичен. В бою он внимательно наблюдает за действиями
              противника и безжалостно наказывает, когда тот допускает малейшую
              ошибку.</span
            >
            <span class="characteristic"
              >Урон увеличен на {{ professionGladiator.damage }}%</span
            >
            <span class="characteristic"
              >HP увеличено на {{ professionGladiator.hp }}%</span
            >
            <span class="characteristic"
              >Уклонение увеличено на {{ professionGladiator.evasion }}%</span
            >
            <span class="characteristic"
              >Шанс крита увеличен на
              {{ professionGladiator.critChance }}%</span
            >
            <span class="characteristic"
              >Сила крита увеличена на
              {{ professionGladiator.critPower }}%</span
            >
            <base-button
              class="btn gladiator__btn"
              @click="choseProfession('gladiator')"
              >Выбрать</base-button
            >
          </li>
        </ul>
      </div>

      <div
        class="knights-block"
        v-if="$store.state.playerProfession == 'knight'"
      >
        <ul class="profession-nav">
          <li
            class="nav__item"
            :class="{ active: isActiveBtn(1) }"
            @click="activeContent(1)"
          >
            <h4 class="header">Храмовник</h4>
          </li>
          <li
            class="nav__item"
            :class="{ active: isActiveBtn(2) }"
            @click="activeContent(2)"
          >
            <h4 class="header">Титан</h4>
          </li>
        </ul>
        <ul class="profession-list">
          <li class="profession__item templar" v-if="selectedTab == 1">
            <span class="desc templar__desc"
              ><strong class="profession__header">Храмовник</strong> самый
              живучий среди всех воплощений. Он выстоит перед натиском даже
              самых свирепых врагов.</span
            >
            <span class="characteristic"
              >Защита: {{ professionTemplar.armor }}%</span
            >
            <span class="characteristic">HP: {{ professionTemplar.hp }}%</span>
            <span class="characteristic"
              >Уклонение фиксированно 10%</span
            >
            <base-button
              class="btn templar__btn"
              @click="choseProfession('templar')"
              >Выбрать</base-button
            >
          </li>

          <li class="profession__item titan" v-if="selectedTab == 2">
            <span class="desc titan__desc"
              ><strong class="profession__header">Титан</strong> привык
              рассчитывать только на самого себя, благодаря чему готов
              преодолевать любые препятствия. Он не просто имеет высокую защиту,
              но и вполне представляет опасность для любых врагов.
            </span>
            <span class="characteristic"
              >Урон увеличен на {{ professionTitan.damage }}%</span
            >
            <span class="characteristic"
              >Защита увеличена на {{ professionTitan.armor }}%</span
            >
            <span class="characteristic"
              >HP увеличено на {{ professionTitan.hp }}%</span
            >
            <span class="characteristic"
              >Уклонение фиксированно 10%</span
            >
            <span class="characteristic"
              >Шанс крита увеличен на {{ professionTitan.critChance }}%</span
            >
            <span class="characteristic"
              >Сила крита увеличена на {{ professionTitan.critPower }}%</span
            >
            <base-button
              class="btn titan__btn"
              @click="choseProfession('titan')"
              >Выбрать</base-button
            >
          </li>
        </ul>
      </div>

      <div
        class="assassins-block"
        v-if="$store.state.playerProfession == 'assassin'"
      >
        <ul class="profession-nav">
          <li
            class="nav__item"
            :class="{ active: isActiveBtn(1) }"
            @click="activeContent(1)"
          >
            <h4 class="header">Жнец</h4>
          </li>
          <li
            class="nav__item"
            :class="{ active: isActiveBtn(2) }"
            @click="activeContent(2)"
          >
            <h4 class="header">Следопыт</h4>
          </li>
        </ul>
        <ul class="profession-list">
          <li class="profession__item reaper" v-if="selectedTab == 1">
            <span class="desc reaper__desc"
              ><strong class="profession__header">Жнец</strong> невероятно
              опасный противник, который молниеносно вырезает врагов на поле
              боя. Многие считают, что сама смерть покровительствует ему.</span
            >
            <span class="characteristic"
              >Защита: {{ professionReaper.armor }}%</span
            >
            <span class="characteristic">HP: {{ professionReaper.hp }}%</span>
            <span class="characteristic"
              >Уклонение увеличено на {{ professionReaper.evasion }}%</span
            >
            <span class="characteristic"
              >Шанс крита увеличен на {{ professionReaper.critChance }}%</span
            >
            <span class="characteristic"
              >Сила крита увеличена на {{ professionReaper.critPower }}%</span
            >
            <base-button
              class="btn reaper__btn"
              @click="choseProfession('reaper')"
              >Выбрать</base-button
            >
          </li>

          <li class="profession__item pathfinder" v-if="selectedTab == 2">
            <span class="desc pathfinder__desc"
              ><strong class="profession__header">Следопыт</strong> выслеживает
              врага и разделывается с ним мгновенно и безжалостно.</span
            >
            <span class="characteristic"
              >Урон увеличен на {{ professionPathfinder.damage }}%</span
            >
            <span class="characteristic"
              >Защита увеличена на {{ professionPathfinder.armor }}%</span
            >
            <span class="characteristic"
              >HP увеличено на {{ professionPathfinder.hp }}%</span
            >
            <span class="characteristic"
              >Уклонение увеличено на {{ professionPathfinder.evasion }}%</span
            >
            <span class="characteristic"
              >Шанс крита увеличен на
              {{ professionPathfinder.critChance }}%</span
            >
            <span class="characteristic"
              >Сила крита увеличена на
              {{ professionPathfinder.critPower }}%</span
            >
            <base-button
              class="btn pathfinder__btn"
              @click="choseProfession('pathfinder')"
              >Выбрать</base-button
            >
          </li>
        </ul>
      </div>
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
      professionBerserk: {},
      professionGladiator: {},
      professionTemplar: {},
      professionTitan: {},
      professionReaper: {},
      professionPathfinder: {},
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

    this.professionBerserk = player.berserkProfessionCharacteristics;
    this.professionGladiator = player.gladiatorProfessionCharacteristics;

    this.professionTemplar = player.templarProfessionCharacteristics;
    this.professionTitan = player.titanProfessionCharacteristics;

    this.professionReaper = player.reaperProfessionCharacteristics;
    this.professionPathfinder = player.pathfinderProfessionCharacteristics;
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
  justify-content: space-evenly;
  margin-bottom: 20px;
}
.nav__item {
  padding: 5px 10px;
  outline: 1px solid var(--color-light);
  cursor: pointer;
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