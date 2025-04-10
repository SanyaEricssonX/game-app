<template>
  <div class="container help-container">
    <h2>Помощь по игре</h2>
    <div class="help-section" v-html="compiledMarkdown"></div>
  </div>
</template>

<script type="text/javascript">
import { marked } from "marked";
import DOMPurify from "dompurify";

export default {
  name: "HelpPage",
  data() {
    return {
      markdownContent: "",
      filename: "main",
      files: ["main", "characteristics", "items", "craft", "combat"],
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
/* .help-section {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
} */
</style>
