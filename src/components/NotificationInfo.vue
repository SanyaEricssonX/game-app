<template>
  <div
    class="modal-container"
    :class="{
      'modal-container--whatsnew': $store.state.modalNotification.from == 'app',
    }"
  >
    <div
      class="map-block"
      v-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from == 'map'
      "
    >
      <div
        class="levelup-block"
        :style="{
          'margin-bottom': checkBottom(),
        }"
        v-if="$store.state.levelIsUp"
      >
        <h4 class="modal__header">
          Вы достигли уровня {{ $store.state.playerLevel }}
        </h4>
        <p class="modal__desc" v-for="info in infoByLevel" :key="info.id">
          {{ info }}
        </p>
      </div>
      <div
        class="drop-block"
        v-if="
          $store.state.modalNotification.text != '' &&
          $store.state.modalNotification.from == 'map'
        "
      >
        <h4 class="modal__header">Вы нашли:</h4>
        <ul class="drop-list">
          <li
            class="drop__item"
            v-for="text in $store.state.modalNotification.text"
            :key="text.id"
          >
            {{ craftItemName(text.craftItemId) }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="inventory-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from == 'inventory'
      "
    >
      <h4
        class="inventory__header"
        v-if="typeof $store.state.modalNotification.text == 'string'"
      >
        {{ $store.state.modalNotification.text }}
      </h4>
      <div
        class="craft-block"
        v-else-if="typeof $store.state.modalNotification.text == 'object'"
      >
        <h4 class="modal__header">
          {{ $store.state.modalNotification.text.name }}
        </h4>
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.desc"
          >{{ $store.state.modalNotification.text.desc }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.damage"
          >Урон: {{ $store.state.modalNotification.text.damage }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.armor"
          >Защита: {{ $store.state.modalNotification.text.armor }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.hp"
          >HP: {{ $store.state.modalNotification.text.hp }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.evasion"
          >Уклонение: {{ $store.state.modalNotification.text.evasion }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.critChance"
          >Шанс крита:
          {{ $store.state.modalNotification.text.critChance }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.critPower"
          >Сила крита: {{ $store.state.modalNotification.text.critPower }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.durability"
          >Прочность: {{ $store.state.modalNotification.text.durability }}</span
        >
        <span
          class="craft__characteristic"
          v-show="$store.state.modalNotification.text.requiredLevel"
          >Уровень:
          {{ $store.state.modalNotification.text.requiredLevel }}</span
        >
      </div>
    </div>

    <div
      class="shop-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from == 'shop'
      "
    >
      <h4 class="shop__header">
        {{ $store.state.modalNotification.text }}
      </h4>
    </div>

    <div
      class="whats_new-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from == 'app'
      "
    >
      <h4 class="modal__header">
        = {{ $store.state.modalNotification.text }} =
      </h4>
      <span class="whats_new__title">Что нового:</span>
      <div class="whats_new-box">
        <p
          class="whats_new__desc"
          v-for="paragraph in updateInfo"
          :key="paragraph.id"
        >
          {{ paragraph }}
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";
import items from "@/services/items";

export default {
  name: "notification-info",
  extends: {},
  props: {},
  data() {
    return {
      infoByLevel: [],
      updateInfo: [
        "Добавлена система крафта предметов:",
        "На старнице инвентаря во вкладке Крафт теперь отображаются выпавшие с монстров рецепты, а также материалы и ресурсы, которые необходимы для создания предмета. Сами создаваемые предметы по характеристикам превосходят аналогичные по уровню, что продаются в магазине. Материалы и рецепты выпадают в зависимости от локации в которой вы сражаетесь. Чем выше сложность локации, тем лучше рецепты и материалы.",
        "Добавлены крафт предметы:",
        "Синтезированный эликсир здоровья I",
        "Синтезированный эликсир здоровья II",
        "Синтезированный эликсир здоровья III",
        "Синтезированный эликсир здоровья IV",
        "Меч благих намерений (лв.1)",
        "Ритуальный кинжал (лв.1)",
        "Темный легион (лв.4)",
        "Последний вздох (лв.4)",
        "Оптимизирована работа модальных окон. Произведены улучшения на страницах: Карта, Магазин.",
        "",
      ],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    craftItemName(itemId) {
      return items.findAllCraftItems(itemId).name;
    },
    checkBottom() {
      if (this.$store.state.modalNotification.text == "") {
        return "0";
      } else {
        return "15px";
      }
    },
  },
  beforeCreate() {},
  created() {
    this.infoByLevel = player.levelUpInfo();
  },
  mounted() {},
};
</script>

<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
  max-width: 600px;
  background-color: var(--color-blue);
  border: 1px solid var(--color-dark);
}
.modal-container--whatsnew {
  background-color: var(--color-light);
  color: var(--color-dark);
  max-height: 45vh;
  overflow: auto;
}
.modal__header {
  margin-bottom: 10px;
}
.modal__desc {
  margin-bottom: 7px;
}
.craft-block,
.drop-list {
  display: flex;
  flex-direction: column;
}
.drop__item:not(:last-child) {
  margin-bottom: 7px;
}
.craft__characteristic:not(:last-child) {
  margin-bottom: 5px;
}
.whats_new-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.whats_new__title {
  margin-bottom: 10px;
  font-size: 20px;
}
.whats_new__desc {
  margin-bottom: 7px;
  font-size: 18px;
  line-height: 1.1;
}
</style>