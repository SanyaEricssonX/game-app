<template>
  <div class="container help-container">
    <base-loader v-if="!isDataLoaded" />
    <div class="help-section" v-html="compiledMarkdown" v-else></div>
    <!-- Испытываем временные трудности с этим контентом. Скоро починим! -->
  </div>
</template>

<script type="text/javascript">
import { marked } from "marked";
import DOMPurify from "dompurify";

export default {
  name: "ManualPage",
  data() {
    return {
      isDataLoaded: false,
      markdownContent: "",
      filename: "main",
      files: ["main", "combat", "profession", "items", "craft"],
    };
  },
  computed: {
    compiledMarkdown() {
      return DOMPurify.sanitize(marked(this.markdownContent));
    },
    currentTab() {
      return this.$store.state.menuContent;
    },
  },
  methods: {
    async loadMarkdownFile(name) {
      try {
        const response = await fetch(`/help/${name}.md`);
        this.markdownContent = await response.text();
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        this.markdownContent =
          "## Ошибка загрузки статьи. Обратитесь к администратору!";
      }

      this.isDataLoaded = true;
    },
  },
  watch: {
    currentTab(newTab) {
      this.filename = this.files[newTab - 1];
      this.loadMarkdownFile(this.filename);
    },
  },
  async created() {
    await this.loadMarkdownFile(this.filename);
  },
};
</script>

<style scoped>
.help-container {
  display: flex;
  flex-direction: column;
}
</style>
