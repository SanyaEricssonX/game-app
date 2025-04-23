<template>
  <div class="container help-container">
    <base-loader v-if="!isDataLoaded" />
    <template v-if="isDataLoaded">
      <div
        class="help-section"
        v-html="compiledMarkdown"
        v-if="tab !== 'craft'"
      ></div>
      <craft-tab v-if="tab === 'craft'"></craft-tab>
    </template>
  </div>
</template>

<script>
import { marked } from "marked";
import DOMPurify from "dompurify";
import CraftTab from "@/components/craftTab.vue";
import imageLoader from "@/services/imageLoader";

export default {
  name: "KnowledgeBasePage",
  components: {
    CraftTab,
  },
  props: {
    tab: {
      type: String,
      default: "general",
    },
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
      return this.files.includes(this.tab) ? this.tab : "general";
    },
  },
  methods: {
    getImage(key) {
      return imageLoader.getImage(key);
    },
    async loadContent() {
      this.isDataLoaded = false;

      if (this.tab === "craft") {
        // Для вкладки craft просто устанавливаем флаг загрузки
        this.isDataLoaded = true;
      } else {
        // Для остальных вкладок загружаем markdown
        await this.loadMarkdownFile(this.currentFile);
      }
    },
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
    tab() {
      this.loadContent();
    },
  },
  created() {
    imageLoader.preloadImages();
    this.loadContent();
  },
};
</script>