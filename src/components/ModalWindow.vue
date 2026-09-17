<template>
  <div class="modal" v-if="isModalOpen" @click.self="closeModal">
    <div
      class="modal-position"
      role="dialog"
      aria-modal="true"
      aria-label="Модальное окно"
      @click.stop
    >
      <slot />

      <button
        class="close_btn"
        type="button"
        aria-label="Закрыть окно"
        data-testid="modal-close-button"
        data-action="close-modal"
        @click="closeModal"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="12"
          height="12"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M23.707.293a1 1 0 0 0-1.414 0L12 10.586 1.707.293A1 1 0 0 0 .293 1.707L10.586 12 .293 22.293a1 1 0 0 0 1.414 1.414L12 13.414l10.293 10.293a1 1 0 0 0 1.414-1.414L13.414 12 23.707 1.707a1 1 0 0 0 0-1.414Z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "modal-window",

  props: {
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    isModalOpen(isOpen) {
      if (isOpen) {
        document.addEventListener("keydown", this.handleKeyDown);
      } else {
        document.removeEventListener("keydown", this.handleKeyDown);
      }
    },
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },

    handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        this.closeModal();
      }
    },
  },

  beforeUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(2px);
}

.modal-position {
  position: relative;
  display: flex;
  width: fit-content;
  max-width: 100%;
  max-height: calc(100vh - 40px);
  overflow: auto;
}

.close_btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--color-dark);
  border-radius: 4px;
  background-color: var(--color-light);
  color: var(--color-dark);
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease,
    color 0.15s ease, transform 0.1s ease;
}

.close_btn:hover {
  border-color: var(--color-red);
  background-color: var(--color-red);
  color: var(--color-light);
}

.close_btn:active {
  transform: translateY(1px);
}

.close_btn:focus-visible {
  outline: 3px solid var(--color-light);
  outline-offset: 3px;
}

.close_btn svg {
  display: block;
  width: 12px;
  height: 12px;
  fill: currentColor;
}

@media (max-width: 650px) {
  .modal {
    align-items: flex-start;
    padding: 12px;
  }

  .modal-position {
    width: 100%;
    max-height: calc(100vh - 24px);
  }

  .close_btn {
    top: 6px;
    right: 6px;
  }
}
</style>
