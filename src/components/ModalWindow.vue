<template>
  <div class="modal" v-if="isModalOpen == true">
    <div class="modal-position">
      <slot />
      <button class="close_btn" @click="closeModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="Outline"
          viewBox="0 0 24 24"
          width="10"
          height="10"
        >
          <path
            d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "modal-window",
  extends: {},
  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  watch: {},
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
  beforeCreate() {},
  mounted() {},
};
</script>

<style scoped>
.modal {
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 1000;
}
.modal-position {
  position: relative;
  margin: 25vh auto;
}
.close_btn {
  position: absolute;
  right: 0;
  top: 0;
}
svg {
  fill: var(--color-dark);
}
</style>