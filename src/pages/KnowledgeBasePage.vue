<template>
  <div class="container help-container">
    <base-loader v-if="!isDataLoaded" />
    <div class="help-section" v-html="compiledMarkdown" v-else></div>
  </div>
</template>

<script>
import { marked } from "marked";
import DOMPurify from "dompurify";

export default {
  name: "KnowledgeBasePage",
  props: {
    tab: {
      type: String,
      default: 'general'
    }
  },
  data() {
    return {
      isDataLoaded: false,
      markdownContent: "",
      files: ["general", "combat", "profession", "items", "craft"],
    };
  },
  computed: {
    compiledMarkdown() {
      return DOMPurify.sanitize(marked(this.markdownContent));
    },
    currentFile() {
      // Проверяем, что запрошенный таб существует
      return this.files.includes(this.tab) ? this.tab : 'general';
    }
  },
  methods: {
    async loadMarkdownFile(name) {
      try {
        const response = await fetch(`/help/${name}.md`);
        this.markdownContent = await response.text();
      } catch (error) {
        console.error("Ошибка загрузки файла:", error);
        this.markdownContent = "## Ошибка загрузки статьи. Обратитесь к администратору!";
      }
      this.isDataLoaded = true;
    },
  },
  watch: {
    // Отслеживаем изменения query-параметра tab
    tab() {
      this.loadMarkdownFile(this.currentFile);
    }
  },
  created() {
    // Первоначальная загрузка
    this.loadMarkdownFile(this.currentFile);
  }
};
</script>