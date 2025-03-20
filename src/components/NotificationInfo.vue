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

    <div class="purchase-block" v-else-if="$store.state.modalNotification.visible">
      <h4 class="modal__header">{{ $store.state.modalNotification.text }}</h4>
    </div>
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";

export default {
  name: "notification-info",
  extends: {},
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
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
</style>