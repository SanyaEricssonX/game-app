<template>
  <div class="modal-container">
    <div class="levelup-block" v-if="$store.state.levelIsUp">
      <h4 class="modal__header">
        Вы достигли уровня {{ $store.state.playerLevel }}
      </h4>
      <p class="modal__desc" v-for="info in infoByLevel" :key="info.id">
        {{ info }}
      </p>
    </div>

    <div
      class="purchase-block"
      v-else-if="$store.state.modalNotification.visible"
    >
      <h4
        class="modal__header"
        v-if="typeof $store.state.modalNotification.text == 'string'"
      >
        {{ $store.state.modalNotification.text }}
      </h4>
      <div
        class="craft-block"
        v-else-if="typeof $store.state.modalNotification.text == 'object'"
      >
        <h4 class="craft__title">
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
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";

export default {
  name: "notification-info",
  extends: {},
  props: {},
  data() {
    return {
      infoByLevel: [],
    };
  },
  computed: {},
  components: {},
  watch: {},
  methods: {},
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
.modal__desc {
  margin-top: 10px;
}
.craft-block {
  display: flex;
  flex-direction: column;
}
.craft__title {
  margin-bottom: 10px;
}
.craft__characteristic:not(:last-child) {
  margin-bottom: 5px;
}
</style>