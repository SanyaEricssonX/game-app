<template>
  <button class="btn" :class="`btn--${variant}`" type="button">
    <slot />
  </button>
</template>

<script>
export default {
  name: "base-button",

  props: {
    variant: {
      type: String,
      default: "1",
      validator(value) {
        return ["1", "2", "3"].includes(value);
      },
    },
  },
};
</script>

<style>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-family: Bahnschrift, sans-serif;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.2s linear,
    transform 0.15s ease;
}

.btn:active {
  transform: translateY(2px);
}

/* Обычная кнопка белая */
.btn--1 {
  color: var(--color-dark);
  background-color: var(--color-light);
}

.btn--1:hover {
  background-color: #e5e5e5;
}

/* Зеленая кнопка: успех */
.btn--2 {
  color: #fff;
  background-color: var(--color-green);
}

.btn--2:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}

/* Красная кнопка: удаление / опасное действие */
.btn--3 {
  color: #fff;
  background-color: var(--color-red);
}

.btn--3:hover {
  background-color: var(--color-light);
  color: var(--color-dark);
}

/* Белая кнопка становится зеленой */
.btn-4 {
  border-color: 1px solid var(--color-dark);
  background-color: var(--color-light);
  color: var(--color-dark);
}

.btn--4:hover {
  background-color: var(--color-green);
  color: var(--color-light);
}
</style>
