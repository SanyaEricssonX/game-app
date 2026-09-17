<template>
  <div
    class="modal-container"
    :class="{
      'modal-container--whatsnew':
        $store.state.modalNotification.from === 'app',
    }"
  >
    <div
      class="map-block"
      v-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from === 'map'
      "
    >
      <div class="modal-section levelup-block" v-if="$store.state.levelIsUp">
        <h4 class="modal-section__heading">
          ⬆️ Вы достигли уровня {{ $store.state.playerLevel }}
        </h4>

        <ul class="modal-list" v-if="infoByLevel.length > 0">
          <li
            class="modal-list__item"
            v-for="(info, index) in infoByLevel"
            :key="index"
          >
            {{ info }}
          </li>
        </ul>
      </div>

      <div
        class="modal-section drop-block"
        v-if="hasMapResources || hasMapCraftDrop"
      >
        <h4 class="modal-section__heading">🎁 Вы получили</h4>

        <div class="reward-group" v-if="hasMapResources">
          <h5 class="reward-group__heading">Ресурсы</h5>

          <ul class="reward-list">
            <li
              class="reward-list__item reward-list__item_gold"
              v-if="mapResources.gold > 0"
            >
              <span class="reward-list__name">💰 Золото</span>
              <strong class="reward-list__count">
                +{{ mapResources.gold }}
              </strong>
            </li>

            <li class="reward-list__item" v-if="mapResources.wood > 0">
              <span class="reward-list__name">🌲 Древесина</span>
              <strong class="reward-list__count">
                +{{ mapResources.wood }}
              </strong>
            </li>

            <li class="reward-list__item" v-if="mapResources.stone > 0">
              <span class="reward-list__name">🪨 Камень</span>
              <strong class="reward-list__count">
                +{{ mapResources.stone }}
              </strong>
            </li>

            <li class="reward-list__item" v-if="mapResources.iron > 0">
              <span class="reward-list__name">⛓️ Железо</span>
              <strong class="reward-list__count">
                +{{ mapResources.iron }}
              </strong>
            </li>
          </ul>
        </div>

        <div class="reward-group" v-if="hasMapCraftDrop">
          <h5 class="reward-group__heading">Материалы и рецепты</h5>

          <ul class="reward-list">
            <li
              class="reward-list__item"
              v-for="(dropItem, index) in mapCraftDrop"
              :key="`${dropItem.craftItemId}-${index}`"
            >
              <span class="reward-list__name">
                {{ craftItemName(dropItem.craftItemId) }}
              </span>

              <strong class="reward-list__count">
                +{{ dropItem.count }}
              </strong>
            </li>
          </ul>
        </div>
      </div>

      <p
        class="modal-empty"
        v-if="!$store.state.levelIsUp && !hasMapResources && !hasMapCraftDrop"
      >
        Награды не найдены.
      </p>
    </div>

    <div
      class="inventory-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from === 'inventory'
      "
    >
      <div class="modal-section" v-if="isNotificationTextString">
        <h4 class="inventory__header">
          {{ $store.state.modalNotification.text }}
        </h4>
      </div>

      <div
        class="modal-section craft-block"
        v-else-if="isNotificationTextObject"
      >
        <h4 class="modal-section__heading">
          {{ $store.state.modalNotification.text.name }}
        </h4>

        <ul class="modal-list">
          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.desc"
          >
            {{ $store.state.modalNotification.text.desc }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.damage"
          >
            ⚔️ Урон:
            {{ $store.state.modalNotification.text.damage }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.armor"
          >
            🛡️ Защита:
            {{ $store.state.modalNotification.text.armor }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.hp"
          >
            ❤️ HP:
            {{ $store.state.modalNotification.text.hp }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.evasion"
          >
            🌀 Уклонение:
            {{ $store.state.modalNotification.text.evasion }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.critChance"
          >
            💢 Шанс крита:
            {{ $store.state.modalNotification.text.critChance }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.critPower"
          >
            💥 Сила крита:
            {{ $store.state.modalNotification.text.critPower }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.durability"
          >
            🛠️ Прочность:
            {{ $store.state.modalNotification.text.durability }}
          </li>

          <li
            class="modal-list__item"
            v-if="$store.state.modalNotification.text.requiredLevel"
          >
            ⬆️ Уровень:
            {{ $store.state.modalNotification.text.requiredLevel }}
          </li>
        </ul>
      </div>
    </div>

    <div
      class="basic-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from === 'basic'
      "
    >
      <div
        class="modal-section basic-block--main"
        v-if="isNotificationTextString"
      >
        <h4 class="basic__header">
          {{ $store.state.modalNotification.text }}
        </h4>
      </div>

      <div
        class="modal-section basic-block--array"
        v-else-if="isNotificationTextArray"
      >
        <h4
          class="basic__header basic-block__header--array"
          v-for="(paragraph, index) in $store.state.modalNotification.text"
          :key="index"
        >
          {{ paragraph }}
        </h4>
      </div>
    </div>

    <div
      class="main-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from === 'main'
      "
    >
      <div class="modal-section">
        <h4 class="main__heading">
          {{ $store.state.modalNotification.text }}
        </h4>

        <div class="main-box">
          <base-button
            class="main__btn main__btn--yes"
            @click="setAction(true)"
          >
            Подтвердить
          </base-button>

          <base-button
            class="main__btn main__btn--no"
            @click="setAction(false)"
          >
            Отменить
          </base-button>
        </div>
      </div>
    </div>

    <div
      class="whats_new-block"
      v-else-if="
        $store.state.modalNotification.visible &&
        $store.state.modalNotification.from === 'app'
      "
    >
      <div class="update-block">
        <h3 class="update__title">
          Новая версия {{ currentUpdate.version }}

          <span class="date">
            {{ currentUpdate.date }}
          </span>
        </h3>

        <ul class="update-list">
          <li
            class="update__item"
            v-for="(change, index) in currentUpdate.changes"
            :key="index"
          >
            {{ change }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import player from "@/services/player";
import items from "@/services/items";
import { mapActions } from "vuex";

export default {
  name: "notification-info",

  data() {
    return {
      infoByLevel: [],
      updates: [],
      currentUpdate: {
        version: "",
        date: "",
        changes: [],
      },
    };
  },

  computed: {
    notificationText() {
      return this.$store.state.modalNotification.text;
    },

    mapResources() {
      return (
        this.$store.state.modalNotification.resources || {
          gold: 0,
          wood: 0,
          stone: 0,
          iron: 0,
        }
      );
    },

    mapCraftDrop() {
      return Array.isArray(this.notificationText) ? this.notificationText : [];
    },

    hasMapResources() {
      return (
        Number(this.mapResources.gold || 0) > 0 ||
        Number(this.mapResources.wood || 0) > 0 ||
        Number(this.mapResources.stone || 0) > 0 ||
        Number(this.mapResources.iron || 0) > 0
      );
    },

    hasMapCraftDrop() {
      return this.mapCraftDrop.length > 0;
    },

    isNotificationTextString() {
      return typeof this.notificationText === "string";
    },

    isNotificationTextArray() {
      return Array.isArray(this.notificationText);
    },

    isNotificationTextObject() {
      return (
        typeof this.notificationText === "object" &&
        this.notificationText !== null &&
        !Array.isArray(this.notificationText)
      );
    },
  },

  methods: {
    ...mapActions(["updateActionType"]),

    setAction(type) {
      this.updateActionType(type);
      this.$emit("hide-modal");
    },

    craftItemName(itemId) {
      return items.findAllCraftItems(itemId)?.name || "Неизвестный предмет";
    },

    async loadUpdates() {
      try {
        const response = await fetch("/updates.json");

        if (!response.ok) {
          throw new Error("Не удалось загрузить updates.json");
        }

        this.updates = (await response.json()).sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        this.currentUpdate = this.updates[0] || {
          version: "",
          date: "",
          changes: [],
        };
      } catch (error) {
        console.error("Ошибка загрузки обновлений:", error);
      }
    },
  },

  created() {
    this.infoByLevel = player.levelUpInfo() || [];
  },

  async mounted() {
    await this.loadUpdates();
  },
};
</script>

<style scoped>
.modal-container {
  width: 100%;
  max-width: none;
  padding: 30px 50px;
  border: 0;
  background-color: var(--color-blue);
}

.modal-container--whatsnew {
  max-height: 55vh;
  overflow: auto;
  background-color: var(--color-light);
  color: var(--color-dark);
}

.map-block,
.inventory-block,
.basic-block,
.main-block,
.whats_new-block {
  width: 100%;
}

.modal-section {
  width: 100%;
  margin-bottom: 18px;
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.12);
}

.modal-section:last-child {
  margin-bottom: 0;
}

.modal-section__heading {
  margin-bottom: 12px;
  font-family: Bahnschrift, sans-serif;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.3;
}

.modal-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.modal-list__item {
  line-height: 1.4;
}

.reward-group:not(:last-child) {
  margin-bottom: 18px;
}

.reward-group__heading {
  margin-bottom: 10px;
  font-family: Bahnschrift, sans-serif;
  font-size: 16px;
  font-weight: 900;
}

.reward-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.reward-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  line-height: 1.3;
}

.reward-list__item:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.reward-list__item_gold {
  color: #fff0a5;
}

.reward-list__name {
  min-width: 0;
}

.reward-list__count {
  flex-shrink: 0;
  color: #fff;
  font-family: Bahnschrift, sans-serif;
  font-size: 17px;
  font-weight: 900;
}

.reward-list__item_gold .reward-list__count {
  color: #ffe37b;
}

.modal-empty {
  padding: 15px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 5px;
  text-align: center;
}

.inventory__header,
.basic__header {
  line-height: 1.45;
  text-align: center;
}

.craft-block {
  display: flex;
  flex-direction: column;
}

.basic-block__header--array:not(:last-child) {
  margin-bottom: 10px;
}

.main__heading {
  margin-bottom: 20px;
  line-height: 1.45;
  text-align: center;
}

.main-box {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.main__btn {
  min-width: 130px;
  padding: 8px 10px;
}

.main__btn--yes:hover {
  background-color: var(--color-green);
  color: var(--color-light);
}

.main__btn--no:hover {
  background-color: var(--color-red);
  color: var(--color-light);
}

.update-block {
  width: 100%;
}

.update__title {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--color-dark);
  font-size: 25px;
  line-height: 1.3;
}

.date {
  margin-left: 15px;
  color: #666;
  font-size: 16px;
  font-weight: 400;
  white-space: nowrap;
}

.update-list {
  margin: 0;
  padding-left: 20px;
}

.update__item {
  margin-bottom: 10px;
  font-size: 17px;
  line-height: 1.35;
}

.update__item:last-child {
  margin-bottom: 0;
}

@media (max-width: 650px) {
  .modal-container {
    width: 100%;
    padding: 25px 20px;
  }

  .main-box {
    flex-direction: column;
    gap: 10px;
  }

  .main__btn {
    width: 100%;
  }

  .update__title {
    font-size: 20px;
  }

  .date {
    display: block;
    margin-top: 5px;
    margin-left: 0;
  }
}
</style>
