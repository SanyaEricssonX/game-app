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
      <!-- <div class="location-open">

      </div> -->
      <ul class="location-list" v-if="!isLocationSelected">
        <li
          class="location__item"
          :class="{
            location__item_active: $store.state.playerCurrentLocation == map.id,
          }"
          v-for="map in maps"
          :key="map.id"
        >
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
        availableEnemies.length * 2 // но не больше чем доступно с учетом дублирования
      );

      // Создаем пул врагов с возможностью дублирования (каждый может встречаться до 2 раз)
      let enemyPool = [];
      availableEnemies.forEach((enemy) => {
        enemyPool.push(enemy);
        enemyPool.push({ ...enemy }); // Добавляем копию для возможного дублирования
      });

      // Перемешиваем пул
      enemyPool.sort(() => Math.random() - 0.5);

      // Выбираем случайных врагов
      for (let i = 0; i < enemyCount && enemyPool.length > 0; i++) {
        // Если осталось 2 места и еще нет 2 врагов уровня игрока
        const currentSameLevel = this.sortedEnemies.filter(
          (e) => e.level === playerLevel
        ).length;
        if (enemyCount - i <= 2 && currentSameLevel < 2) {
          // Ищем врагов с уровнем игрока
          const sameLevelEnemies = enemyPool.filter(
            (enemy) => enemy.level === playerLevel
          );
          if (sameLevelEnemies.length > 0) {
            const enemyToAdd = sameLevelEnemies[0];
            this.sortedEnemies.push(enemyToAdd);

            // Удаляем добавленного врага из пула
            const indexToRemove = enemyPool.findIndex(
              (e) => e.id === enemyToAdd.id
            );
            if (indexToRemove !== -1) {
              enemyPool.splice(indexToRemove, 1);
            }
            continue;
          }
        }

        // Обычный случайный выбор
        const randomIndex = Math.floor(Math.random() * enemyPool.length);
        this.sortedEnemies.push(enemyPool[randomIndex]);

        // Удаляем дубликаты этого врага, если уже добавили 2 раза
        const addedEnemyId = enemyPool[randomIndex].id;
        let addedCount = this.sortedEnemies.filter(
          (e) => e.id === addedEnemyId
        ).length;

        if (addedCount >= 2) {
          enemyPool = enemyPool.filter((enemy) => enemy.id !== addedEnemyId);
        } else {
          // Удаляем только один экземпляр
          enemyPool.splice(randomIndex, 1);
        }
      }

      // Проверяем, что есть минимум 2 врага уровня игрока
      const sameLevelCount = this.sortedEnemies.filter(
        (e) => e.level === playerLevel
      ).length;
      if (sameLevelCount < 2) {
        // Добавляем недостающих врагов уровня игрока
        const sameLevelAvailable = availableEnemies.filter(
          (e) => e.level === playerLevel
        );
        let added = 0;

        while (added < 2 - sameLevelCount && sameLevelAvailable.length > 0) {
          // Берем врагов по порядку (можно добавить случайность)
          const enemyToAdd = {
            ...sameLevelAvailable[added % sameLevelAvailable.length],
          };
          this.sortedEnemies.push(enemyToAdd);
          added++;
        }
      }

      // Сортируем врагов по уровню (от меньшего к большему)
      this.sortedEnemies.sort((a, b) => a.level - b.level);

      // Добавляем тестовых врагов, если статус аккаунта Тестовый
      if (this.$store.state.accountStatus == "Тестовый") {
        const testEnemies = this.enemies.filter(
          (enemy) => enemy.type === "test"
        );
        this.sortedEnemies.push(...testEnemies);
      }
    },
    goToLocation(locationId) {
      this.$store.state.playerCurrentLocation = locationId;
      localStorage.setItem("playerCurrentLocation", locationId);

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
  display: flex;
  align-items: center;
  padding: 10px 15px;
  border: 2px solid var(--color-light);
  border-radius: 5px;
}
.location__item:not(:last-child) {
  margin-bottom: 15px;
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
  /* justify-content: space-between; */
}
.enemy__name {
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  max-width: 200px;
  color: var(--color-dark);
  background-color: var(--color-light);
}
.enemy__level {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid var(--color-dark);
  line-height: 1;
  font-weight: 900;
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
  max-height: 60vh;
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
