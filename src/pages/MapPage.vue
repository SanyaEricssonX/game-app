<template>
  <div class="container map-container">
    <ul class="nav-list">
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(1) }"
        @click="activeContent(1)"
      >
        <h4 class="item__header">Локации</h4>
      </li>
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(2) }"
        @click="activeContent(2)"
      >
        <h4 class="item__header">Рейдовые подземелья</h4>
      </li>
    </ul>
    <div class="location-block" v-if="selectedTab == 1">
      <ul class="location-list" v-if="!isLocationSelected">
        <li
          class="location__item"
          :class="{
            location__item_active: $store.state.playerCurrentLocation == map.id,
          }"
          v-for="map in maps"
          :key="map.id"
        >
          <div
            class="location--closed"
            v-if="$store.state.playerLevel + 1 < map.minLevel"
          >
            <h4 class="location--closed__heading">
              Откроется на {{ map.minLevel - 1 }} уровне
            </h4>
          </div>
          <h4
            class="location__title"
            :class="{
              location__element_active:
                $store.state.playerCurrentLocation == map.id,
            }"
          >
            {{ map.name }}
          </h4>
          <div class="level-box">
            <span
              class="level__desc"
              :class="{
                location__element_active:
                  $store.state.playerCurrentLocation == map.id,
              }"
              >Уровень врагов:</span
            >
            <span
              class="level__number"
              :class="{
                location__element_active:
                  $store.state.playerCurrentLocation == map.id,
              }"
              >{{ map.minLevel }} - {{ map.maxLevel }}</span
            >
          </div>
          <base-button
            class="location__btn"
            :class="{
              location__btn_active:
                $store.state.playerCurrentLocation == map.id,
            }"
            @click="toggleLocation"
            v-if="$store.state.playerCurrentLocation == map.id"
            >Напасть</base-button
          >
          <base-button
            class="location__btn"
            @click="goToLocation(map.id)"
            v-else
            >Отправиться</base-button
          >
        </li>
      </ul>
      <div class="enemies-block" v-else>
        <div class="enemy-block" v-if="!selectedEnemy && !isBattleEnd">
          <base-button
            class="location__btn enemies__btn"
            @click="toggleLocation"
            >Назад</base-button
          >

          <h3 class="enemy-block__header">Найдены противники:</h3>
          <ul class="enemy-list">
            <li
              class="enemy__item"
              v-for="enemy in sortedEnemies"
              :key="enemy.id"
            >
              <div class="enemy-title_box">
                <h4 class="enemy__name">{{ enemy.name }}</h4>
                <span class="enemy__level">{{ enemy.level }} Ур.</span>
              </div>
              <div class="enemy-body_box">
                <div class="enemy-characteristics">
                  <span class="enemy__text">HP: {{ enemy.hp }}</span>
                  <span class="enemy__text">Урон: {{ enemy.damage }}</span>
                  <span class="enemy__text">Защита: {{ enemy.armor }}</span>
                  <span class="enemy__text"
                    >Уклонение: {{ enemy.evasion }}</span
                  >
                  <span class="enemy__text"
                    >Шанс крита: {{ enemy.critChance }}</span
                  >
                  <span class="enemy__text"
                    >Сила крита: {{ enemy.critPower }}</span
                  >
                  <span class="enemy__experience"
                    >Опыт: {{ enemy.experience }}</span
                  >
                </div>
                <img
                  :src="getImage(enemy.image)"
                  alt=""
                  class="enemy__image"
                  v-if="enemy.image"
                />
              </div>
              <div class="enemy-bottom_box">
                <base-button class="enemy__btn" @click="startBattle(enemy)">
                  Атаковать
                </base-button>
              </div>
            </li>
          </ul>
        </div>
        <div class="battle-block" v-else-if="selectedEnemy && !isBattleEnd">
          Битва в разгаре
        </div>
        <div class="result-block" v-else>
          <ul class="result-list" v-for="log in battleLog" :key="log.id">
            <li class="result__item">{{ log }}</li>
          </ul>
          <base-button @click="resetSelection"
            >Найти новых противников</base-button
          >
        </div>
      </div>
    </div>
    <div class="dungeons-block" v-if="selectedTab == 2">
      Подземелья в разработке
    </div>
  </div>
</template>

<script type="text/javascript">
import map from "@/services/map";
import { startBattle } from "@/services/battleLogic";
import enemies from "@/services/enemies";
import { downloadData } from "@/services/downloadData";
import player from "@/services/player";

export default {
  name: "MapPage",
  extends: {},
  props: {},
  data() {
    return {
      selectedTab: 1,
      isLocationSelected: false,
      result: null,
      battleLog: [],
      selectedEnemy: null,
      isBattleEnd: false,
      currentLocation: 9990,
      sortedEnemies: [],
      maps: [],
      enemies: [],
    };
  },
  computed: {
    triggerSortEnemies() {
      return this.$store.state.triggerSortEnemies;
    },
  },
  components: {},
  watch: {
    triggerSortEnemies(newValue) {
      if (newValue) {
        this.sortEnemies();
      }
    },
  },
  methods: {
    getImage(key) {
      return require(`@/assets/images/${key}`);
    },
    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
    },
    isActiveBtn(tabNumber) {
      return this.selectedTab == tabNumber;
    },
    async startBattle(enemy) {
      this.selectedEnemy = enemy;
      const battleResult = startBattle(
        this.$store.state.playerCurrentHp,
        this.$store.state.playerDamage,
        this.$store.state.playerArmor,
        this.$store.state.playerEvasion,
        this.$store.state.playerCritChance,
        this.$store.state.playerCritPower,
        enemy
      );

      setTimeout(() => {
        localStorage.removeItem("sortedEnemies");
        this.battleLog = battleResult.log;

        // Оставшееся ХП
        if (battleResult.currentHp > 0) {
          localStorage.setItem("playerCurrentHp", battleResult.currentHp);
        } else {
          player.isDead(battleResult.currentHp);
          downloadData();
          this.isBattleEnd = true;
          this.$store.state.playerCurrentHp = this.$store.state.playerMaxHp;
          localStorage.setItem(
            "playerCurrentHp",
            this.$store.state.playerCurrentHp
          );

          this.sortEnemies();

          if (
            this.$store.state.playerEquipment.weapon == 0 &&
            this.$store.state.playerEquipment.helmet == 0 &&
            this.$store.state.playerEquipment.upper == 0 &&
            this.$store.state.playerEquipment.lower == 0 &&
            this.$store.state.playerEquipment.gloves == 0 &&
            this.$store.state.playerEquipment.boots == 0
          ) {
            this.$store.state.modalNotification.text =
              "Ваш персонаж погиб! Прогресс сброшен.";
          } else {
            this.$store.state.modalNotification.text = [
              "Ваш персонаж погиб.",
              "Прогресс сброшен, а надетая экипировка утратила свою эффективность и нуждается в починке!",
            ];
          }
          this.$store.state.modalNotification.from = "basic";
          this.$store.state.modalNotification.visible = true;
          this.showModal();

          return;
        }

        // Опыт
        this.$store.state.playerExperience += battleResult.experience;
        localStorage.setItem(
          "playerExperience",
          this.$store.state.playerExperience
        );
        player.characteristics();

        // Дроп
        const drop = enemies.randomDrop(enemy.id);
        const minDropGold = Math.floor(drop.gold / 1.4);
        let dropGold = 0;
        let dropWood = 0;
        let dropStone = 0;
        let dropIron = 0;

        if (this.$store.state.playerBuffCharacteristics.dropBuffDuration > 0) {
          dropGold =
            Math.floor(
              Math.random() * (drop.gold - minDropGold + 1) + minDropGold
            ) * this.$store.state.playerBuffCharacteristics.drop;

          this.$store.state.playerGold += dropGold;

          if (drop.wood != 0) {
            dropWood =
              Math.floor(Math.random() * (drop.wood - 1 + 1) + 1) *
              this.$store.state.playerBuffCharacteristics.drop;

            this.$store.state.playerResources.wood += dropWood;
          }
          if (drop.stone != 0) {
            dropStone =
              Math.floor(Math.random() * (drop.stone - 1 + 1) + 1) *
              this.$store.state.playerBuffCharacteristics.drop;

            this.$store.state.playerResources.stone += dropStone;
          }
          if (drop.iron != 0) {
            dropIron =
              Math.floor(Math.random() * (drop.iron - 1 + 1) + 1) *
              this.$store.state.playerBuffCharacteristics.drop;

            this.$store.state.playerResources.iron += dropIron;
          }
        } else {
          dropGold = Math.floor(
            Math.random() * (drop.gold - minDropGold + 1) + minDropGold
          );

          this.$store.state.playerGold += dropGold;
          if (drop.wood != 0) {
            dropWood = Math.floor(Math.random() * (drop.wood - 1 + 1) + 1);

            this.$store.state.playerResources.wood += dropWood;
          }
          if (drop.stone != 0) {
            dropStone = Math.floor(Math.random() * (drop.stone - 1 + 1) + 1);

            this.$store.state.playerResources.stone += dropStone;
          }
          if (drop.iron != 0) {
            dropIron = Math.floor(Math.random() * (drop.iron - 1 + 1) + 1);

            this.$store.state.playerResources.iron += dropIron;
          }
        }

        // Дроп с локаций
        const locationCraftDrop = map.drop(this.currentLocation);
        let playerCraftInventory = JSON.parse(
          JSON.stringify(this.$store.state.playerCraftInventory)
        );

        // Выводим модальное окно с информацией о дропе и поднятому уровню
        if (this.$store.state.levelIsUp && locationCraftDrop.length > 0) {
          this.$store.state.modalNotification.text = locationCraftDrop;
          this.$store.state.modalNotification.resources = {
            gold: dropGold,
            wood: dropWood,
            stone: dropStone,
            iron: dropIron,
          };
          this.$store.state.modalNotification.from = "map";
          this.$store.state.modalNotification.visible = true;
          this.showModal();

          this.$store.state.playerCurrentHp = this.$store.state.playerMaxHp;
          localStorage.setItem(
            "playerCurrentHp",
            this.$store.state.playerCurrentHp
          );
        } else if (
          this.$store.state.levelIsUp &&
          locationCraftDrop.length == 0
        ) {
          this.$store.state.modalNotification.text = "";
          this.$store.state.modalNotification.resources = {
            gold: dropGold,
            wood: dropWood,
            stone: dropStone,
            iron: dropIron,
          };
          this.$store.state.modalNotification.from = "map";
          this.$store.state.modalNotification.visible = true;
          this.showModal();

          this.$store.state.playerCurrentHp = this.$store.state.playerMaxHp;
          localStorage.setItem(
            "playerCurrentHp",
            this.$store.state.playerCurrentHp
          );
        } else if (locationCraftDrop.length > 0) {
          this.$store.state.modalNotification.text = locationCraftDrop;
          this.$store.state.modalNotification.resources = {
            gold: dropGold,
            wood: dropWood,
            stone: dropStone,
            iron: dropIron,
          };
          this.$store.state.modalNotification.from = "map";
          this.$store.state.modalNotification.visible = true;
          this.showModal();
        } else {
          this.$store.state.modalNotification.resources = {
            gold: dropGold,
            wood: dropWood,
            stone: dropStone,
            iron: dropIron,
          };
          this.$store.state.modalNotification.from = "map";
          this.$store.state.modalNotification.visible = true;
          this.showModal();
        }

        // Сохраняем дроп крафт предметов игрока
        locationCraftDrop.forEach((dropItem) => {
          // Ищем соответствующий элемент в инвентаре
          const existingItem = playerCraftInventory.find(
            (invItem) => invItem.craftItemId === dropItem.craftItemId
          );

          if (existingItem) {
            // Если элемент найден, увеличиваем count
            existingItem.count += dropItem.count;
          } else {
            // Если элемент не найден, добавляем новый
            playerCraftInventory.push({
              craftItemId: dropItem.craftItemId,
              count: dropItem.count,
            });
          }
        });

        this.$store.state.playerCraftInventory = playerCraftInventory;
        localStorage.setItem(
          "playerCraftInventory",
          JSON.stringify(this.$store.state.playerCraftInventory)
        );

        localStorage.setItem("playerGold", this.$store.state.playerGold);
        localStorage.setItem(
          "playerResources",
          JSON.stringify(this.$store.state.playerResources)
        );

        // Проверяем время действия бафов
        if (
          this.$store.state.playerBuffCharacteristics.damageBuffDuration > 0
        ) {
          this.$store.state.playerBuffCharacteristics.damageBuffDuration -= 1;
          player.buffDuration("damage");
        }
        if (this.$store.state.playerBuffCharacteristics.armorBuffDuration > 0) {
          this.$store.state.playerBuffCharacteristics.armorBuffDuration -= 1;
          player.buffDuration("armor");
        }
        if (this.$store.state.playerBuffCharacteristics.hpBuffDuration > 0) {
          this.$store.state.playerBuffCharacteristics.hpBuffDuration -= 1;
          player.buffDuration("hp");
        }
        if (
          this.$store.state.playerBuffCharacteristics.evasionBuffDuration > 0
        ) {
          this.$store.state.playerBuffCharacteristics.evasionBuffDuration -= 1;
          player.buffDuration("evasion");
        }
        if (
          this.$store.state.playerBuffCharacteristics.critChanceBuffDuration > 0
        ) {
          this.$store.state.playerBuffCharacteristics.critChanceBuffDuration -= 1;
          player.buffDuration("critChance");
        }
        if (
          this.$store.state.playerBuffCharacteristics.critPowerBuffDuration > 0
        ) {
          this.$store.state.playerBuffCharacteristics.critPowerBuffDuration -= 1;
          player.buffDuration("critPower");
        }
        if (this.$store.state.playerBuffCharacteristics.dropBuffDuration > 0) {
          this.$store.state.playerBuffCharacteristics.dropBuffDuration -= 1;
          player.buffDuration("drop");
        }

        // Проверяем прочность экипировки
        if (this.$store.state.playerEquipment.weaponDurability > 0) {
          this.$store.state.playerEquipment.weaponDurability -= 1;
        }
        if (this.$store.state.playerEquipment.helmetDurability > 0) {
          this.$store.state.playerEquipment.helmetDurability -= 1;
        }
        if (this.$store.state.playerEquipment.upperDurability > 0) {
          this.$store.state.playerEquipment.upperDurability -= 1;
        }
        if (this.$store.state.playerEquipment.lowerDurability > 0) {
          this.$store.state.playerEquipment.lowerDurability -= 1;
        }
        if (this.$store.state.playerEquipment.glovesDurability > 0) {
          this.$store.state.playerEquipment.glovesDurability -= 1;
        }
        if (this.$store.state.playerEquipment.bootsDurability > 0) {
          this.$store.state.playerEquipment.bootsDurability -= 1;
        }

        localStorage.setItem(
          "playerEquipment",
          JSON.stringify(this.$store.state.playerEquipment)
        );

        player.equipmentCharacteristics();

        downloadData();

        this.sortEnemies();
        this.isBattleEnd = true;
      }, enemy.time);
    },
    resetSelection() {
      this.selectedEnemy = null;
      this.battleLog = [];
      this.isBattleEnd = false;
      if (this.$store.state.playerCurrentLocation == 9990) {
        this.isLocationSelected = false;
      }
    },

    sortEnemies() {
      this.sortedEnemies = [];
      this.enemies = JSON.parse(JSON.stringify(enemies.list));
      this.currentLocation = this.$store.state.playerCurrentLocation;
      this.maps = JSON.parse(JSON.stringify(map.locationList));

      // Если есть сохраненные враги, то просто их записываем, а иначе ищем новых врагов
      if (localStorage.getItem("sortedEnemies")) {
        this.sortedEnemies = JSON.parse(localStorage.getItem("sortedEnemies"));
      } else {
        const playerLevel = this.$store.state.playerLevel;

        // Находим текущую локацию
        const currentMap = this.maps.find(
          (map) => map.id == this.currentLocation
        );
        if (!currentMap) return;

        // Фильтруем врагов по уровню локации и отсутствию типа (кроме тестовых)
        let availableEnemies = this.enemies.filter((enemy) => {
          return (
            enemy.level &&
            enemy.level >= currentMap.minLevel &&
            enemy.level <= currentMap.maxLevel &&
            !enemy.type
          );
        });

        // Дополнительно фильтруем по уровню игрока (+1 уровня)
        const maxAllowedLevel = playerLevel + 1;
        availableEnemies = availableEnemies.filter(
          (enemy) => enemy.level <= maxAllowedLevel
        );

        // Если нет подходящих врагов, выходим
        if (availableEnemies.length === 0) return;

        // Определяем случайное количество врагов (от 3 до 6)
        const enemyCount = Math.min(
          Math.floor(Math.random() * 4) + 3,
          availableEnemies.length // теперь без дублирования, поэтому просто availableEnemies.length
        );

        // Создаем копию массива для работы
        let remainingEnemies = [...availableEnemies];

        // Гарантируем минимум 2 врага уровня игрока
        const playerLevelEnemies = remainingEnemies.filter(
          (e) => e.level === playerLevel
        );

        // Добавляем 2 врагов уровня игрока (если есть)
        if (playerLevelEnemies.length >= 2) {
          // Выбираем случайных 2 врагов уровня игрока
          const shuffled = [...playerLevelEnemies].sort(
            () => 0.5 - Math.random()
          );
          this.sortedEnemies.push(shuffled[0], shuffled[1]);

          // Удаляем их из оставшихся врагов
          remainingEnemies = remainingEnemies.filter(
            (e) => e.id !== shuffled[0].id && e.id !== shuffled[1].id
          );
        } else if (playerLevelEnemies.length === 1) {
          // Если только 1 враг уровня игрока
          this.sortedEnemies.push(playerLevelEnemies[0]);
          remainingEnemies = remainingEnemies.filter(
            (e) => e.id !== playerLevelEnemies[0].id
          );
        }

        // Добавляем оставшихся врагов до нужного количества
        while (
          this.sortedEnemies.length < enemyCount &&
          remainingEnemies.length > 0
        ) {
          // Случайный индекс
          const randomIndex = Math.floor(
            Math.random() * remainingEnemies.length
          );
          this.sortedEnemies.push(remainingEnemies[randomIndex]);

          // Удаляем добавленного врага из оставшихся
          remainingEnemies.splice(randomIndex, 1);
        }

        // Если после этого у нас меньше врагов, чем нужно (из-за требования по уровню)
        // Добавляем любых подходящих врагов
        if (this.sortedEnemies.length < enemyCount) {
          const additionalEnemies = availableEnemies.filter(
            (e) => !this.sortedEnemies.some((se) => se.id === e.id)
          );

          while (
            this.sortedEnemies.length < enemyCount &&
            additionalEnemies.length > 0
          ) {
            const randomIndex = Math.floor(
              Math.random() * additionalEnemies.length
            );
            this.sortedEnemies.push(additionalEnemies[randomIndex]);
            additionalEnemies.splice(randomIndex, 1);
          }
        }

        // Сортируем врагов по уровню (от меньшего к большему)
        this.sortedEnemies.sort((a, b) => a.level - b.level);

        // Добавляем тестовых врагов, если статус аккаунта Тестовый
        if (this.$store.state.accountStatus == "Тестовый") {
          const testEnemies = this.enemies.filter(
            (enemy) =>
              enemy.type === "test" &&
              !this.sortedEnemies.some((e) => e.id === enemy.id)
          );
          this.sortedEnemies.push(...testEnemies);
        }
        // Сохраняем врагов в local storage
        localStorage.setItem(
          "sortedEnemies",
          JSON.stringify(this.sortedEnemies)
        );
      }
    },
    goToLocation(locationId) {
      this.$store.state.playerCurrentLocation = locationId;
      localStorage.setItem("playerCurrentLocation", locationId);

      localStorage.removeItem("sortedEnemies");

      this.sortEnemies();
    },
    toggleLocation() {
      this.isLocationSelected = !this.isLocationSelected;
    },
    showModal() {
      this.$emit("show-modal");
    },
  },
  beforeCreate() {},
  created() {
    this.sortEnemies();
  },
  mounted() {},
};
</script>

<style scoped>
.map-container {
  display: flex;
}
.nav-list {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
  border: 2px solid var(--color-light);
}
.nav__item {
  padding: 5px 10px;
  cursor: pointer;
}
.location-block {
  height: 70vh;
  overflow: auto;
}
.location-list {
  display: flex;
  flex-direction: column;
}
.location__item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 2px solid var(--color-light);
  border-radius: 5px;
}
.location__item:not(:last-child) {
  margin-bottom: 15px;
}
.location--closed {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.7);
}
.location--closed__heading {
  padding: 10px 15px;
  background-color: var(--color-dark);
  border-radius: 7px;
  color: var(--color-red);
}
.location__title {
  margin-right: 10px;
  width: 200px;
}
.level-box {
  display: flex;
  flex-direction: column;
  margin-right: auto;
}
.level__desc {
  margin-bottom: 5px;
}
.level__number {
  padding: 5px;
  border-radius: 5px;
  text-align: end;
  font-weight: 900;
}
.location__btn {
  padding: 7px 10px;
  border: 1px solid var(--color-dark);
}
.location__btn:hover {
  background-color: var(--color-dark);
  color: var(--color-light);
  border: 1px solid var(--color-light);
}
.enemies__btn {
  margin-bottom: 30px;
}
.enemy-block__header {
  margin-bottom: 30px;
}
.enemy-list {
  display: flex;
  flex-wrap: wrap;
}
.enemy__item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  flex-basis: 47%;
  margin-right: 20px;
  margin-bottom: 30px;
  padding: 10px;
  border: 2px solid var(--color-light);
  border-radius: 5px;
}
.enemy-title_box {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
  min-height: 60px;
}
.enemy__name {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 200px;
  font-size: 20px;
  color: var(--color-dark);
  background-color: var(--color-light);
}
.enemy__level {
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid var(--color-dark);
  line-height: 1;
  color: var(--color-dark);
  background-color: var(--color-light);
}
.enemy-body_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  width: 100%;
}
.enemy-characteristics {
  display: flex;
  flex-direction: column;
}
.enemy__text {
  font-size: 16px;
}
.enemy__text:not(:last-child) {
  margin-bottom: 7px;
}
.enemy__image {
  left: 0;
  top: 0;
  width: 150px;
  height: 230px;
}
.enemy-bottom_box {
  display: flex;
  align-items: center;
  width: 100%;
}
.enemy__btn {
  border: 1px solid var(--color-dark);
  border-radius: 5px;
}
.enemy__btn:hover {
  background-color: var(--color-green);
  font-weight: 900;
  color: var(--color-light);
  border: 1px solid var(--color-light);
}
.enemy__experience {
  margin-top: 15px;
  font-weight: 900;
  color: var(--color-green);
}
.result {
  max-width: 200px;
}
.result__item {
  margin-bottom: 15px;
}
.result-block {
  max-height: 70vh;
  overflow: auto;
}
.active {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.location__item_active {
  background-color: var(--color-light);
}
.location__element_active {
  color: var(--color-dark);
  font-weight: 900;
}
.location__btn_active {
  border-width: 2px;
}
.location__btn_active:hover {
  border-width: 2px;
}
</style>
