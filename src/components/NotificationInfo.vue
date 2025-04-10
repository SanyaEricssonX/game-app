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
          $store.state.modalNotification.resources !=
            { gold: 0, wood: 0, stone: 0, iron: 0 } &&
          $store.state.modalNotification.from == 'map'
        "
      >
        <h4 class="modal__header">Вы нашли:</h4>
        <ul class="drop-list">
          <li
            class="drop__item"
            v-if="$store.state.modalNotification.resources.gold > 0"
          >
            <span class="drop_gold"
              >Золото: {{ $store.state.modalNotification.resources.gold }}</span
            >
          </li>
          <li
            class="drop__item"
            v-if="$store.state.modalNotification.resources.wood > 0"
          >
            <span class="drop_gold"
              >Древесина:
              {{ $store.state.modalNotification.resources.wood }}</span
            >
          </li>
          <li
            class="drop__item"
            v-if="$store.state.modalNotification.resources.stone > 0"
          >
            <span class="drop_gold"
              >Камень:
              {{ $store.state.modalNotification.resources.stone }}</span
            >
          </li>
          <li
            class="drop__item"
            v-if="$store.state.modalNotification.resources.iron > 0"
          >
            <span class="drop_gold"
              >Железо: {{ $store.state.modalNotification.resources.iron }}</span
            >
          </li>
        </ul>
        <div
          class="material-block"
          v-if="$store.state.modalNotification.text != ''"
        >
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
      <div class="update-block">
        <h3 class="update__title">
          Новая версия {{ currentUpdate.version }}
          <span class="date">{{ currentUpdate.date }}</span>
        </h3>
        <ul>
          <li
            class="update__item"
            v-for="(change, i) in currentUpdate.changes"
            :key="i"
          >
            {{ change }}
          </li>
        </ul>
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
      updates: [],
      currentUpdate: [],
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
        return "10px";
      } else {
        return "0";
      }
    },
    async loadUpdates() {
      try {
        const response = await fetch("/updates.json");
        this.updates = (await response.json()).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } catch (error) {
        console.error("Ошибка загрузки обновлений:", error);
      }
    },
  },
  beforeCreate() {},
  created() {
    this.infoByLevel = player.levelUpInfo();
  },
  async mounted() {
    await this.loadUpdates();
    this.currentUpdate = this.updates[0];
  },
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
.levelup-block {
  margin-bottom: 10px;
}
.modal__header {
  margin-bottom: 10px;
}
.modal__desc:not(:last-child) {
  margin-bottom: 7px;
}
.craft-block,
.drop-list {
  display: flex;
  flex-direction: column;
}
.drop-list:not(:last-child) {
  margin-bottom: 7px;
}
.drop__item:not(:last-child) {
  margin-bottom: 7px;
}
.craft__characteristic:not(:last-child) {
  margin-bottom: 5px;
}
.update__title {
  margin-bottom: 10px;
  font-size: 25px;
}
.date {
  margin-left: 15px;
  color: #666;
  font-size: 18px;
}
.update__item {
  margin-bottom: 10px;
  line-height: 1.2;
  font-size: 18px;
}
</style>