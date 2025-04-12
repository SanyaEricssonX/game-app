<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="scroll-to-top"
    aria-label="Scroll to top"
  >
    ↑
  </button>
</template>

<script>
export default {
  name: "scroll-to-top-button",
  data() {
    return {
      showButton: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      // Проверяем, превышает ли высота страницы 130vh
      const isPageTallEnough =
        document.body.scrollHeight > window.innerHeight * 2;
      // Показываем кнопку если проскроллили больше 20% и страница достаточно высокая
      this.showButton =
        isPageTallEnough && window.pageYOffset > window.innerHeight * 0.8;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-green);
  color: white;
  border: none;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  transition: opacity 0.3s;
}

.scroll-to-top:hover {
  background: #25704d;
}
</style>