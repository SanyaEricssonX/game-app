// src/services/imageLoader.js
const imageCache = new Map();

export default {
  preloadImages() {
    const context = require.context(
      '@/assets/images/',
      true,
      /\.(png|jpe?g|gif|svg|webp)$/
    );

    context.keys().forEach(key => {
      imageCache.set(key, context(key));
    });
  },

  getImage(key) {
    if (!key) return null;

    // Если ключ - число, находим соответствующий предмет
    if (typeof key === 'number') {
      const item = this.$items.findItem(key);
      if (!item?.image) return null;
      return imageCache.get(`./${item.image}`) || null;
    }

    // Если ключ - строка
    if (typeof key === 'string') {
      return imageCache.get(`./${key}`) || null;
    }

    return null;
  }
}