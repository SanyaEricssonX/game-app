<template>
  <div class="modal" v-if="isModalOpen" @click.self="closeModal">
    <div
      class="modal-position"
      role="dialog"
      aria-modal="true"
      aria-label="Модальное окно"
      @click.stop
    >
      <div class="modal-header">
        <span class="modal-header__title"> Project R </span>

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

      <div class="modal-content">
        <slot />
      </div>
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
  background-color: rgba(0, 0, 0, 0.58);
  backdrop-filter: blur(2px);
}

.modal-position {
  display: flex;
  flex-direction: column;
  width: min(680px, 100%);
  max-height: calc(100vh - 40px);
  overflow: hidden;
  border: 1px solid var(--color-dark);
  background-color: var(--color-blue);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.38);
}

.modal-header {
  position: relative;
  z-index: 3;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  padding: 0 10px 0 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.42);
  background-color: rgba(0, 0, 0, 0.14);
  color: var(--color-light);
}

.modal-header__title {
  font-family: Bahnschrift, sans-serif;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  opacity: 0.9;
}

.modal-content {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
}

.close_btn {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.8);
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
    overflow-y: auto;
  }

  .modal-position {
    width: 100%;
    max-height: calc(100vh - 24px);
    margin: auto 0;
  }
}
</style>
