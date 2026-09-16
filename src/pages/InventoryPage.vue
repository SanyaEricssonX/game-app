<template>
  <div class="container inventory-container">
    <div class="equipment-block">
      <h2 class="equipment__header">Экипировка</h2>

      <p class="equipment__hint" id="equipment-drag-hint">
        Перетащите снаряжение из инвентаря в подходящий слот. Чтобы снять
        предмет, перетащите его из слота экипировки в ячейку инвентаря.
      </p>

      <ul class="equipment-list" aria-label="Слоты экипировки">
        <li class="equipment__item">
          <h4 class="equipment__item__header">Оружие</h4>

          <button
            class="equipment__item__icon equipment-drop-zone"
            :class="{
              equipped: playerEquipment.weapon > 999,
              'equipment-drop-zone_active': dragOverEquipmentSlot === 'weapon',
              'equipment-drop-zone_invalid':
                dragOverEquipmentSlot === 'weapon' &&
                !canDropInventoryItemToEquipmentSlot('weapon'),
              'equipment-item_dragging': draggedEquipmentSlot === 'weapon',
            }"
            type="button"
            :draggable="playerEquipment.weapon > 0"
            data-testid="equipment-slot-weapon"
            data-equipment-slot="weapon"
            data-action="equip-drop-or-unequip-drag"
            :data-item-id="playerEquipment.weapon || ''"
            :aria-label="equipmentSlotAriaLabel('weapon', 'Оружие')"
            aria-describedby="equipment-drag-hint"
            @click="handleEquipmentSlotClick('weapon')"
            @dragstart="handleEquipmentDragStart('weapon', $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleEquipmentDragOver('weapon', $event)"
            @dragenter.prevent="handleEquipmentDragEnter('weapon', $event)"
            @dragleave="handleEquipmentDragLeave('weapon')"
            @drop.prevent="handleDropToEquipment('weapon', $event)"
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.weapon)"
              :alt="getItemName(playerEquipment.weapon)"
              v-if="getImage(playerEquipment.weapon) != 0"
            />

            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.weapon > 999"
            >
              {{ playerEquipment.weapon }}
            </span>

            <span class="equipment__empty-text" v-else> Оружие </span>

            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.weapon,
                  playerEquipment.weaponDurability,
                  'weapon',
                )
              "
              v-if="
                playerEquipment.weapon != 0 &&
                tooltip.visible &&
                selectedItem === 'weapon'
              "
            ></base-tooltip>

            <span class="item__level" v-if="playerEquipment.weapon > 999">
              Ур.{{ itemLevel(playerEquipment.weapon) }}
            </span>

            <div
              class="inventory-item_broken"
              v-if="isEquipmentBroken('weapon')"
            ></div>

            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.weapon != 0 &&
                levelIsSmall(playerEquipment.weapon)
              "
            ></div>
          </button>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.weaponDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.weapon)"
              v-if="playerEquipment.weapon != 0"
            ></base-progress>
          </div>
        </li>

        <li class="equipment__item">
          <h4 class="equipment__item__header">Шлем</h4>

          <button
            class="equipment__item__icon equipment-drop-zone"
            :class="{
              equipped: playerEquipment.helmet > 999,
              'equipment-drop-zone_active': dragOverEquipmentSlot === 'helmet',
              'equipment-drop-zone_invalid':
                dragOverEquipmentSlot === 'helmet' &&
                !canDropInventoryItemToEquipmentSlot('helmet'),
              'equipment-item_dragging': draggedEquipmentSlot === 'helmet',
            }"
            type="button"
            :draggable="playerEquipment.helmet > 0"
            data-testid="equipment-slot-helmet"
            data-equipment-slot="helmet"
            data-action="equip-drop-or-unequip-drag"
            :data-item-id="playerEquipment.helmet || ''"
            :aria-label="equipmentSlotAriaLabel('helmet', 'Шлем')"
            aria-describedby="equipment-drag-hint"
            @click="handleEquipmentSlotClick('helmet')"
            @dragstart="handleEquipmentDragStart('helmet', $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleEquipmentDragOver('helmet', $event)"
            @dragenter.prevent="handleEquipmentDragEnter('helmet', $event)"
            @dragleave="handleEquipmentDragLeave('helmet')"
            @drop.prevent="handleDropToEquipment('helmet', $event)"
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.helmet)"
              :alt="getItemName(playerEquipment.helmet)"
              v-if="getImage(playerEquipment.helmet) != 0"
            />

            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.helmet > 999"
            >
              {{ playerEquipment.helmet }}
            </span>

            <span class="equipment__empty-text" v-else> Шлем </span>

            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.helmet,
                  playerEquipment.helmetDurability,
                  'helmet',
                )
              "
              v-if="
                playerEquipment.helmet != 0 &&
                tooltip.visible &&
                selectedItem === 'helmet'
              "
            ></base-tooltip>

            <span class="item__level" v-if="playerEquipment.helmet > 999">
              Ур.{{ itemLevel(playerEquipment.helmet) }}
            </span>

            <div
              class="inventory-item_broken"
              v-if="isEquipmentBroken('helmet')"
            ></div>

            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.helmet != 0 &&
                levelIsSmall(playerEquipment.helmet)
              "
            ></div>
          </button>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.helmetDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.helmet)"
              v-if="playerEquipment.helmet != 0"
            ></base-progress>
          </div>
        </li>

        <li class="equipment__item">
          <h4 class="equipment__item__header">Верхний доспех</h4>

          <button
            class="equipment__item__icon equipment-drop-zone"
            :class="{
              equipped: playerEquipment.upper > 999,
              'equipment-drop-zone_active': dragOverEquipmentSlot === 'upper',
              'equipment-drop-zone_invalid':
                dragOverEquipmentSlot === 'upper' &&
                !canDropInventoryItemToEquipmentSlot('upper'),
              'equipment-item_dragging': draggedEquipmentSlot === 'upper',
            }"
            type="button"
            :draggable="playerEquipment.upper > 0"
            data-testid="equipment-slot-upper"
            data-equipment-slot="upper"
            data-action="equip-drop-or-unequip-drag"
            :data-item-id="playerEquipment.upper || ''"
            :aria-label="equipmentSlotAriaLabel('upper', 'Верхний доспех')"
            aria-describedby="equipment-drag-hint"
            @click="handleEquipmentSlotClick('upper')"
            @dragstart="handleEquipmentDragStart('upper', $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleEquipmentDragOver('upper', $event)"
            @dragenter.prevent="handleEquipmentDragEnter('upper', $event)"
            @dragleave="handleEquipmentDragLeave('upper')"
            @drop.prevent="handleDropToEquipment('upper', $event)"
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.upper)"
              :alt="getItemName(playerEquipment.upper)"
              v-if="getImage(playerEquipment.upper) != 0"
            />

            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.upper > 999"
            >
              {{ playerEquipment.upper }}
            </span>

            <span class="equipment__empty-text" v-else> Верхний доспех </span>

            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.upper,
                  playerEquipment.upperDurability,
                  'upper',
                )
              "
              v-if="
                playerEquipment.upper != 0 &&
                tooltip.visible &&
                selectedItem === 'upper'
              "
            ></base-tooltip>

            <span class="item__level" v-if="playerEquipment.upper > 999">
              Ур.{{ itemLevel(playerEquipment.upper) }}
            </span>

            <div
              class="inventory-item_broken"
              v-if="isEquipmentBroken('upper')"
            ></div>

            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.upper != 0 &&
                levelIsSmall(playerEquipment.upper)
              "
            ></div>
          </button>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.upperDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.upper)"
              v-if="playerEquipment.upper != 0"
            ></base-progress>
          </div>
        </li>

        <li class="equipment__item">
          <h4 class="equipment__item__header">Нижний доспех</h4>

          <button
            class="equipment__item__icon equipment-drop-zone"
            :class="{
              equipped: playerEquipment.lower > 999,
              'equipment-drop-zone_active': dragOverEquipmentSlot === 'lower',
              'equipment-drop-zone_invalid':
                dragOverEquipmentSlot === 'lower' &&
                !canDropInventoryItemToEquipmentSlot('lower'),
              'equipment-item_dragging': draggedEquipmentSlot === 'lower',
            }"
            type="button"
            :draggable="playerEquipment.lower > 0"
            data-testid="equipment-slot-lower"
            data-equipment-slot="lower"
            data-action="equip-drop-or-unequip-drag"
            :data-item-id="playerEquipment.lower || ''"
            :aria-label="equipmentSlotAriaLabel('lower', 'Нижний доспех')"
            aria-describedby="equipment-drag-hint"
            @click="handleEquipmentSlotClick('lower')"
            @dragstart="handleEquipmentDragStart('lower', $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleEquipmentDragOver('lower', $event)"
            @dragenter.prevent="handleEquipmentDragEnter('lower', $event)"
            @dragleave="handleEquipmentDragLeave('lower')"
            @drop.prevent="handleDropToEquipment('lower', $event)"
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.lower)"
              :alt="getItemName(playerEquipment.lower)"
              v-if="getImage(playerEquipment.lower) != 0"
            />

            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.lower > 999"
            >
              {{ playerEquipment.lower }}
            </span>

            <span class="equipment__empty-text" v-else> Нижний доспех </span>

            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.lower,
                  playerEquipment.lowerDurability,
                  'lower',
                )
              "
              v-if="
                playerEquipment.lower != 0 &&
                tooltip.visible &&
                selectedItem === 'lower'
              "
            ></base-tooltip>

            <span class="item__level" v-if="playerEquipment.lower > 999">
              Ур.{{ itemLevel(playerEquipment.lower) }}
            </span>

            <div
              class="inventory-item_broken"
              v-if="isEquipmentBroken('lower')"
            ></div>

            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.lower != 0 &&
                levelIsSmall(playerEquipment.lower)
              "
            ></div>
          </button>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.lowerDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.lower)"
              v-if="playerEquipment.lower != 0"
            ></base-progress>
          </div>
        </li>

        <li class="equipment__item">
          <h4 class="equipment__item__header">Перчатки</h4>

          <button
            class="equipment__item__icon equipment-drop-zone"
            :class="{
              equipped: playerEquipment.gloves > 999,
              'equipment-drop-zone_active': dragOverEquipmentSlot === 'gloves',
              'equipment-drop-zone_invalid':
                dragOverEquipmentSlot === 'gloves' &&
                !canDropInventoryItemToEquipmentSlot('gloves'),
              'equipment-item_dragging': draggedEquipmentSlot === 'gloves',
            }"
            type="button"
            :draggable="playerEquipment.gloves > 0"
            data-testid="equipment-slot-gloves"
            data-equipment-slot="gloves"
            data-action="equip-drop-or-unequip-drag"
            :data-item-id="playerEquipment.gloves || ''"
            :aria-label="equipmentSlotAriaLabel('gloves', 'Перчатки')"
            aria-describedby="equipment-drag-hint"
            @click="handleEquipmentSlotClick('gloves')"
            @dragstart="handleEquipmentDragStart('gloves', $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleEquipmentDragOver('gloves', $event)"
            @dragenter.prevent="handleEquipmentDragEnter('gloves', $event)"
            @dragleave="handleEquipmentDragLeave('gloves')"
            @drop.prevent="handleDropToEquipment('gloves', $event)"
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.gloves)"
              :alt="getItemName(playerEquipment.gloves)"
              v-if="getImage(playerEquipment.gloves) != 0"
            />

            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.gloves > 999"
            >
              {{ playerEquipment.gloves }}
            </span>

            <span class="equipment__empty-text" v-else> Перчатки </span>

            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.gloves,
                  playerEquipment.glovesDurability,
                  'gloves',
                )
              "
              v-if="
                playerEquipment.gloves != 0 &&
                tooltip.visible &&
                selectedItem === 'gloves'
              "
            ></base-tooltip>

            <span class="item__level" v-if="playerEquipment.gloves > 999">
              Ур.{{ itemLevel(playerEquipment.gloves) }}
            </span>

            <div
              class="inventory-item_broken"
              v-if="isEquipmentBroken('gloves')"
            ></div>

            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.gloves != 0 &&
                levelIsSmall(playerEquipment.gloves)
              "
            ></div>
          </button>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.glovesDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.gloves)"
              v-if="playerEquipment.gloves != 0"
            ></base-progress>
          </div>
        </li>

        <li class="equipment__item">
          <h4 class="equipment__item__header">Сапоги</h4>

          <button
            class="equipment__item__icon equipment-drop-zone"
            :class="{
              equipped: playerEquipment.boots > 999,
              'equipment-drop-zone_active': dragOverEquipmentSlot === 'boots',
              'equipment-drop-zone_invalid':
                dragOverEquipmentSlot === 'boots' &&
                !canDropInventoryItemToEquipmentSlot('boots'),
              'equipment-item_dragging': draggedEquipmentSlot === 'boots',
            }"
            type="button"
            :draggable="playerEquipment.boots > 0"
            data-testid="equipment-slot-boots"
            data-equipment-slot="boots"
            data-action="equip-drop-or-unequip-drag"
            :data-item-id="playerEquipment.boots || ''"
            :aria-label="equipmentSlotAriaLabel('boots', 'Сапоги')"
            aria-describedby="equipment-drag-hint"
            @click="handleEquipmentSlotClick('boots')"
            @dragstart="handleEquipmentDragStart('boots', $event)"
            @dragend="handleDragEnd"
            @dragover.prevent="handleEquipmentDragOver('boots', $event)"
            @dragenter.prevent="handleEquipmentDragEnter('boots', $event)"
            @dragleave="handleEquipmentDragLeave('boots')"
            @drop.prevent="handleDropToEquipment('boots', $event)"
          >
            <img
              class="equipment__image"
              :src="getImage(playerEquipment.boots)"
              :alt="getItemName(playerEquipment.boots)"
              v-if="getImage(playerEquipment.boots) != 0"
            />

            <span
              class="equipment__item__text"
              v-else-if="playerEquipment.boots > 999"
            >
              {{ playerEquipment.boots }}
            </span>

            <span class="equipment__empty-text" v-else> Сапоги </span>

            <base-tooltip
              class="tooltip"
              :tooltip="tooltip"
              @remove="
                removeItem(
                  playerEquipment.boots,
                  playerEquipment.bootsDurability,
                  'boots',
                )
              "
              v-if="
                playerEquipment.boots != 0 &&
                tooltip.visible &&
                selectedItem === 'boots'
              "
            ></base-tooltip>

            <span class="item__level" v-if="playerEquipment.boots > 999">
              Ур.{{ itemLevel(playerEquipment.boots) }}
            </span>

            <div
              class="inventory-item_broken"
              v-if="isEquipmentBroken('boots')"
            ></div>

            <div
              class="equipment--unsuitable"
              v-if="
                playerEquipment.boots != 0 &&
                levelIsSmall(playerEquipment.boots)
              "
            ></div>
          </button>

          <div class="equipment-durability_block">
            <base-progress
              class="equipment__durability"
              :currentValue="playerEquipment.bootsDurability"
              :maxValue="itemDurabilityNumber(playerEquipment.boots)"
              v-if="playerEquipment.boots != 0"
            ></base-progress>
          </div>
        </li>
      </ul>
    </div>

    <ul class="nav-list" aria-label="Разделы инвентаря">
      <li
        class="nav__item"
        :class="{ active: isActiveBtn(1) }"
        data-testid="inventory-tab-items"
        data-action="open-inventory"
        role="button"
        tabindex="0"
        @click="activeContent(1)"
        @keydown.enter.prevent="activeContent(1)"
        @keydown.space.prevent="activeContent(1)"
      >
        <h4 class="item__header">Инвентарь</h4>
      </li>

      <li
        class="nav__item"
        :class="{ active: isActiveBtn(2) }"
        data-testid="inventory-tab-materials"
        data-action="open-craft-materials"
        role="button"
        tabindex="0"
        @click="activeContent(2)"
        @keydown.enter.prevent="activeContent(2)"
        @keydown.space.prevent="activeContent(2)"
      >
        <h4 class="item__header">Материалы для крафта</h4>
      </li>

      <li
        class="nav__item"
        :class="{ active: isActiveBtn(3) }"
        data-testid="inventory-tab-recipes"
        data-action="open-craft-recipes"
        role="button"
        tabindex="0"
        @click="activeContent(3)"
        @keydown.enter.prevent="activeContent(3)"
        @keydown.space.prevent="activeContent(3)"
      >
        <h4 class="item__header">Рецепты</h4>
      </li>
    </ul>

    <div class="inventory-block">
      <ul
        class="inventory-list"
        v-if="selectedTab === 1"
        aria-label="Ячейки инвентаря"
      >
        <li
          class="inventory__item"
          :class="{
            inventory__item_selected: selectedInventoryItem === item.cellId,
            inventory__item_draggable: isEquipmentItem(item),
            'inventory-drop-zone_active':
              dragOverInventoryCell === item.cellId && draggedEquipmentSlot,
            'inventory-item_dragging': draggedInventoryCell === item.cellId,
          }"
          v-for="item in inventoryCells"
          :key="item.cellId"
          :draggable="isEquipmentItem(item)"
          role="button"
          tabindex="0"
          :data-testid="`inventory-slot-${item.cellId}`"
          :data-inventory-cell-id="item.cellId"
          :data-item-id="item.id || ''"
          :data-item-category="item.category || ''"
          :data-action="getInventoryCellAction(item)"
          :aria-label="inventoryCellAriaLabel(item)"
          @click="handleInventoryCellClick(item)"
          @keydown.enter.prevent="handleInventoryCellClick(item)"
          @keydown.space.prevent="handleInventoryCellClick(item)"
          @dragstart="handleInventoryDragStart(item, $event)"
          @dragend="handleDragEnd"
          @dragover.prevent="handleInventoryDragOver(item, $event)"
          @dragenter.prevent="handleInventoryDragEnter(item, $event)"
          @dragleave="handleInventoryDragLeave(item)"
          @drop.prevent="handleDropToInventory(item, $event)"
        >
          <img
            :src="getImage(item.image)"
            :alt="item.name || item.id"
            v-if="item.image"
          />

          <span class="inventory__item__id" v-else-if="item.id > 999">
            {{ item.id }}
          </span>

          <span class="inventory__empty-text" v-else aria-hidden="true">
            Пусто
          </span>

          <base-tooltip
            class="tooltip"
            :tooltip="tooltip"
            v-if="
              tooltip.visible && selectedItem === item.cellId && item.id > 999
            "
            @use="useItem(item)"
          ></base-tooltip>

          <div
            class="inventory-item_broken"
            v-if="isInventoryItemBroken(item)"
          ></div>

          <span class="item__level" v-if="item.id > 999">
            Ур.{{ item.requiredLevel }}
          </span>

          <div
            class="inventory-item_broken__icon"
            v-if="isInventoryItemBroken(item)"
          >
            !
          </div>
        </li>
      </ul>

      <span
        class="block__title"
        v-else-if="selectedTab === 2 && playerCraftResources.length === 0"
      >
        У вас пока ещё нет материалов для крафта.
        <br />
        Их можно получить, убивая врагов.
      </span>

      <div
        class="material-block"
        v-else-if="selectedTab === 2 && playerCraftResources.length > 0"
      >
        <div class="material-box" v-if="playerCraftResourcesSpecial.length > 0">
          <h4 class="material-box__title">Особые:</h4>

          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesSpecial"
              :key="material.craftItemId"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}
              </h4>

              <span class="material__count"> : {{ material.count }} </span>
            </li>
          </ul>
        </div>

        <div
          class="material-box"
          v-if="playerCraftResourcesUniversal.length > 0"
        >
          <h4 class="material-box__title">Универсальные:</h4>

          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesUniversal"
              :key="material.craftItemId"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}
              </h4>

              <span class="material__count"> : {{ material.count }} </span>
            </li>
          </ul>
        </div>

        <div
          class="material-box"
          v-if="playerCraftResourcesConsumables.length > 0"
        >
          <h4 class="material-box__title">Для расходных:</h4>

          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesConsumables"
              :key="material.craftItemId"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}
              </h4>

              <span class="material__count"> : {{ material.count }} </span>
            </li>
          </ul>
        </div>

        <div class="material-box" v-if="playerCraftResourcesWeapon.length > 0">
          <h4 class="material-box__title">Для оружия:</h4>

          <ul class="material-list">
            <li
              class="material__item"
              v-for="material in playerCraftResourcesWeapon"
              :key="material.craftItemId"
            >
              <h4 class="material__title">
                {{ materialName(material.craftItemId) }}
              </h4>

              <span class="material__count"> : {{ material.count }} </span>
            </li>
          </ul>
        </div>
      </div>

      <span
        class="block__title"
        v-else-if="selectedTab === 3 && playerCraftRecipes.length === 0"
      >
        У вас пока ещё нет рецептов для крафта.
        <br />
        Их можно получить, убивая врагов.
      </span>

      <div
        class="craft-block"
        :style="{
          height: '45vh',
          overflowY: filteredRecipes.length ? 'auto' : 'hidden',
        }"
        v-else-if="selectedTab === 3 && playerCraftRecipes.length > 0"
      >
        <div class="craft-filter_box">
          <div class="craft-filter">
            <label v-for="category in categories" :key="category.name">
              <input
                class="craft__radio_btn"
                type="radio"
                v-model="selectedCategory"
                :value="category.name"
                @change="showFilteredList(category.name)"
              />

              {{ category.label }}
            </label>
          </div>

          <div class="craft-sort">
            <div class="craft-sort_box">
              <p class="craft-sort__title">Уровень:</p>

              <select
                class="craft-sort__select"
                v-model="sortDirection"
                aria-label="Сортировка рецептов по уровню"
              >
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
              </select>
            </div>
          </div>
        </div>

        <ul class="craft-list">
          <li
            class="craft__item"
            v-for="item in filteredRecipes"
            :key="item.id"
            :data-testid="`craft-recipe-${item.id}`"
            :data-recipe-id="item.id"
          >
            <button
              class="craft__item__icon"
              type="button"
              :aria-label="`Открыть описание предмета по рецепту ${item.name}`"
              @click="showCraftItemInfo(item.targetId)"
            >
              <img
                class="craft_icon"
                :src="getImage(item.targetId)"
                :alt="item.targetId"
                v-if="getImage(item.targetId) != 0"
              />

              <span class="craft__item__icon__text" v-else>
                {{ item.targetId }}
              </span>
            </button>

            <div class="craft__item-box">
              <h4 class="craft__item__title">{{ item.name }}</h4>

              <div class="craft__item__desc-box">
                <div class="craft__item__resources-box" v-if="item.resources">
                  <span
                    class="resources-box__text"
                    v-show="item.resources.wood && item.resources.wood > 0"
                  >
                    Древесина: {{ item.resources.wood }}
                  </span>

                  <span
                    class="resources-box__text"
                    v-show="item.resources.stone && item.resources.stone > 0"
                  >
                    Камень: {{ item.resources.stone }}
                  </span>

                  <span
                    class="resources-box__text"
                    v-show="item.resources.iron && item.resources.iron > 0"
                  >
                    Железо: {{ item.resources.iron }}
                  </span>
                </div>

                <div
                  class="craft__item__desc-block"
                  v-for="ingredient in item.ingredients"
                  :key="ingredient.material"
                >
                  <span class="block__desc__title">
                    {{ materialName(ingredient.material) }}:
                  </span>

                  <div class="block__desc-box">
                    <span class="craft__item__material_current">
                      {{ currentResourceCount(ingredient.material) }}
                    </span>

                    /

                    <span class="craft__item__material_max">
                      {{ ingredient.count }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="craft-item__btn_block">
              <base-button
                class="craft__item__btn"
                :data-testid="`craft-description-${item.id}`"
                :data-action="`show-craft-description-${item.id}`"
                @click="showCraftItemInfo(item.targetId)"
              >
                Описание
              </base-button>

              <base-button
                class="craft__item__btn"
                :style="{
                  'background-color': checkCraftBtnColor(item),
                }"
                :data-testid="`craft-create-${item.id}`"
                :data-action="`craft-${item.id}`"
                @click="craftItem(item)"
              >
                Создать
              </base-button>
            </div>
          </li>
        </ul>

        <p
          class="craft__heading"
          v-if="playerCraftRecipes.length > 0 && filteredRecipes.length === 0"
        >
          У вас нет рецептов в данной категории.
        </p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { downloadData } from "@/services/downloadData";
import player from "@/services/player";
import items from "@/services/items";

export default {
  name: "InventoryPage",

  data() {
    return {
      selectedTab: 1,
      inventoryCells: [],
      playerEquipment: {},
      playerInventory: [],
      playerCraftResources: [],
      playerCraftRecipes: [],
      playerCraftResourcesSpecial: [],
      playerCraftResourcesUniversal: [],
      playerCraftResourcesConsumables: [],
      playerCraftResourcesWeapon: [],
      tooltip: {
        visible: false,
        text: "Предмет",
        btnText: "",
        btnColor: "green",
        position: "bottom",
      },
      selectedItem: null,
      selectedInventoryItem: null,
      draggedItem: null,
      draggedInventoryCell: null,
      draggedEquipmentSlot: null,
      dragOverEquipmentSlot: null,
      dragOverInventoryCell: null,
      categories: [
        { name: "all", label: "Все" },
        { name: "elixir", label: "Эликсиры" },
        { name: "weapon", label: "Оружие" },
      ],
      selectedCategory: "all",
      sortDirection: "asc",
    };
  },

  computed: {
    triggerUpdateInventory() {
      return this.$store.state.triggerUpdateInventory;
    },

    filteredRecipes() {
      const recipes =
        this.selectedCategory === "all"
          ? [...this.playerCraftRecipes]
          : this.playerCraftRecipes.filter((recipe) => {
              return recipe.category === this.selectedCategory;
            });

      return recipes.sort((a, b) => {
        const levelA = a.requiredLevel || 0;
        const levelB = b.requiredLevel || 0;

        return this.sortDirection === "asc" ? levelA - levelB : levelB - levelA;
      });
    },
  },

  watch: {
    triggerUpdateInventory(newValue) {
      if (newValue) {
        this.updateInventory();
        this.updateEquipment();
        this.updateCraftInventory();
      }
    },
  },

  methods: {
    showFilteredList(category) {
      this.selectedCategory = category;
    },

    activeContent(tabNumber) {
      this.selectedTab = tabNumber;
      this.selectedInventoryItem = null;
      this.hideTooltip();
    },

    isActiveBtn(tabNumber) {
      return this.selectedTab === tabNumber;
    },

    itemCategory(itemId) {
      return itemId ? String(itemId).slice(0, 3) : "";
    },

    getItemName(itemId) {
      const item = items.findItem(itemId);

      return item ? item.name : "";
    },

    getImage(key) {
      if (key != 0 && typeof key === "number") {
        const item = items.findItem(key);

        if (item && item.image) {
          return require(`@/assets/images/${item.image}`);
        }

        return 0;
      }

      if (key != 0 && typeof key === "string") {
        return require(`@/assets/images/${key}`);
      }

      return 0;
    },

    allItemsList(itemId) {
      const item = items.findItem(itemId);

      return item ? JSON.parse(JSON.stringify(item)) : null;
    },

    itemLevel(id) {
      const item = items.findItem(id);

      return item ? item.requiredLevel : 0;
    },

    itemDurabilityNumber(itemId) {
      const item = items.findItem(itemId);

      return item ? Number(item.durability || 0) : 0;
    },

    levelIsSmall(itemId) {
      const item = items.findItem(itemId);

      return item
        ? Number(item.requiredLevel || 0) > this.$store.state.playerLevel
        : false;
    },

    isEquipmentItem(item) {
      if (!item || !item.id) {
        return false;
      }

      const category = this.itemCategory(item.id);

      return category === "100" || category === "101";
    },

    hasDurability(item) {
      return this.isEquipmentItem(item) && Number(item?.durability) >= 0;
    },

    isInventoryItemBroken(item) {
      return this.isEquipmentItem(item) && Number(item.durability) <= 0;
    },

    getEquipmentDurabilityKey(slot) {
      const keys = {
        weapon: "weaponDurability",
        helmet: "helmetDurability",
        upper: "upperDurability",
        lower: "lowerDurability",
        gloves: "glovesDurability",
        boots: "bootsDurability",
      };

      return keys[slot] || null;
    },

    getEquipmentSlotByItem(item) {
      if (!this.isEquipmentItem(item)) {
        return null;
      }

      if (this.itemCategory(item.id) === "100") {
        return "weapon";
      }

      return ["helmet", "upper", "lower", "gloves", "boots"].includes(
        item.category,
      )
        ? item.category
        : null;
    },

    getEquipmentSlotLabel(slot) {
      const labels = {
        weapon: "оружия",
        helmet: "шлема",
        upper: "верхнего доспеха",
        lower: "нижнего доспеха",
        gloves: "перчаток",
        boots: "сапог",
      };

      return labels[slot] || "экипировки";
    },

    isEquipmentBroken(slot) {
      const itemId = Number(this.playerEquipment[slot] || 0);
      const durabilityKey = this.getEquipmentDurabilityKey(slot);

      if (!itemId || !durabilityKey) {
        return false;
      }

      return Number(this.playerEquipment[durabilityKey]) <= 0;
    },

    getInventoryCellAction(item) {
      if (!item || !item.id) {
        return "inventory-drop-target";
      }

      if (this.isEquipmentItem(item)) {
        return "equip-or-drag";
      }

      return "use-item";
    },

    inventoryCellAriaLabel(item) {
      const cellNumber = Number(item?.cellId || 0) + 1;

      if (!item || !item.id) {
        return `Пустая ячейка инвентаря ${cellNumber}. Можно перетащить сюда предмет из экипировки.`;
      }

      const itemName = item.name || `Предмет ${item.id}`;
      const levelText = item.requiredLevel
        ? ` Уровень ${item.requiredLevel}.`
        : "";

      const durabilityText = this.isEquipmentItem(item)
        ? ` Прочность ${item.durability} из ${this.itemDurabilityNumber(
            item.id,
          )}.`
        : "";

      const brokenText = this.isInventoryItemBroken(item)
        ? " Предмет сломан."
        : "";

      if (this.isEquipmentItem(item)) {
        return `${itemName}.${levelText}${durabilityText}${brokenText} Нажмите для выбора или перетащите в слот ${this.getEquipmentSlotLabel(
          this.getEquipmentSlotByItem(item),
        )}.`;
      }

      return `${itemName}.${levelText} Нажмите, чтобы открыть описание или использовать предмет.`;
    },

    equipmentSlotAriaLabel(slot, slotTitle) {
      const itemId = Number(this.playerEquipment[slot] || 0);

      if (!itemId) {
        return `Пустой слот ${slotTitle}. Перетащите сюда подходящий предмет из инвентаря или выберите предмет и нажмите на слот.`;
      }

      const item = items.findItem(itemId);
      const durabilityKey = this.getEquipmentDurabilityKey(slot);

      return `Слот ${slotTitle}. Надет предмет ${
        item?.name || itemId
      }. Прочность ${this.playerEquipment[durabilityKey]} из ${
        item?.durability || 0
      }. Нажмите для просмотра. Предмет можно перетащить в инвентарь.`;
    },

    materialName(materialId) {
      const material = items.findCraftMaterial(materialId);

      return material ? material.name : "Неизвестный материал";
    },

    currentResourceCount(id) {
      const resource = this.playerCraftResources.find((item) => {
        return item.craftItemId === id;
      });

      return resource ? resource.count : 0;
    },

    updateInventory() {
      const inventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory || []),
      );

      this.playerInventory = inventory.map((inventoryItem) => {
        if (!inventoryItem?.id) {
          return inventoryItem;
        }

        const catalogItem = this.allItemsList(inventoryItem.id);

        if (!catalogItem) {
          return inventoryItem;
        }

        const updatedItem = {
          ...inventoryItem,
          ...catalogItem,
        };

        if (this.isEquipmentItem(catalogItem)) {
          const savedDurability = Number(inventoryItem.durability);
          const maxDurability = Number(catalogItem.durability);

          updatedItem.durability =
            Number.isFinite(savedDurability) &&
            savedDurability >= 0 &&
            savedDurability < maxDurability
              ? savedDurability
              : maxDurability;
        }

        return updatedItem;
      });

      this.$store.state.playerInventory = this.playerInventory;

      localStorage.setItem(
        "playerInventory",
        JSON.stringify(this.playerInventory),
      );

      this.inventoryCells = player.createInventory();
      player.equipmentCharacteristics();
    },

    updateEquipment() {
      this.playerEquipment = JSON.parse(
        JSON.stringify(this.$store.state.playerEquipment || {}),
      );
    },

    updateCraftInventory() {
      this.playerCraftResources = [];
      this.playerCraftResourcesSpecial = [];
      this.playerCraftResourcesUniversal = [];
      this.playerCraftResourcesConsumables = [];
      this.playerCraftResourcesWeapon = [];
      this.playerCraftRecipes = [];

      const playerCraftInventory = JSON.parse(
        JSON.stringify(this.$store.state.playerCraftInventory || []),
      );

      playerCraftInventory.forEach((craftItem) => {
        if (!craftItem?.craftItemId) {
          return;
        }

        const itemType = String(craftItem.craftItemId).slice(0, 3);

        if (itemType === "104") {
          const recipe = items.findCraftRecipe(craftItem.craftItemId);

          if (recipe) {
            this.playerCraftRecipes.push(recipe);
          }

          return;
        }

        if (itemType !== "103") {
          return;
        }

        const resource = {
          craftItemId: craftItem.craftItemId,
          count: craftItem.count,
        };

        this.playerCraftResources.push(resource);

        const material = items.findCraftMaterial(craftItem.craftItemId);

        if (material?.category === "special") {
          this.playerCraftResourcesSpecial.push(resource);
        } else if (material?.category === "universal") {
          this.playerCraftResourcesUniversal.push(resource);
        } else if (material?.category === "consumables") {
          this.playerCraftResourcesConsumables.push(resource);
        } else if (material?.category === "weapon") {
          this.playerCraftResourcesWeapon.push(resource);
        }
      });

      const sortById = (a, b) => a.craftItemId - b.craftItemId;

      this.playerCraftResourcesSpecial.sort(sortById);
      this.playerCraftResourcesUniversal.sort(sortById);
      this.playerCraftResourcesConsumables.sort(sortById);
      this.playerCraftResourcesWeapon.sort(sortById);
    },

    refreshEquipmentAndInventory() {
      localStorage.setItem(
        "playerEquipment",
        JSON.stringify(this.$store.state.playerEquipment),
      );

      localStorage.setItem(
        "playerInventory",
        JSON.stringify(this.$store.state.playerInventory),
      );

      player.equipmentCharacteristics();
      downloadData();

      this.updateInventory();
      this.updateEquipment();

      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");
    },

    handleInventoryCellClick(item) {
      if (!item?.id) {
        this.selectedInventoryItem = null;
        this.hideTooltip();
        return;
      }

      if (this.isEquipmentItem(item)) {
        this.selectedInventoryItem =
          this.selectedInventoryItem === item.cellId ? null : item.cellId;
      } else {
        this.selectedInventoryItem = null;
      }

      this.showTooltip(item.id, item.durability, item.cellId);
    },

    handleEquipmentSlotClick(slot) {
      const selectedItem = this.inventoryCells.find((item) => {
        return item.cellId === this.selectedInventoryItem;
      });

      if (selectedItem && this.isEquipmentItem(selectedItem)) {
        this.equipInventoryItemToSlot(selectedItem, slot);
        return;
      }

      const itemId = Number(this.playerEquipment[slot] || 0);

      if (itemId) {
        const durabilityKey = this.getEquipmentDurabilityKey(slot);

        this.showTooltip(itemId, this.playerEquipment[durabilityKey], slot);
      }
    },

    handleInventoryDragStart(item, event) {
      if (!this.isEquipmentItem(item)) {
        event.preventDefault();
        return;
      }

      this.draggedItem = {
        source: "inventory",
        cellId: item.cellId,
        itemId: item.id,
      };

      this.draggedInventoryCell = item.cellId;
      this.selectedInventoryItem = item.cellId;

      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData(
        "application/x-game-inventory-item",
        JSON.stringify(this.draggedItem),
      );
      event.dataTransfer.setData("text/plain", String(item.id));
    },

    handleEquipmentDragStart(slot, event) {
      const itemId = Number(this.playerEquipment[slot] || 0);

      if (!itemId) {
        event.preventDefault();
        return;
      }

      this.draggedItem = {
        source: "equipment",
        slot,
        itemId,
      };

      this.draggedEquipmentSlot = slot;
      this.selectedInventoryItem = null;
      this.hideTooltip();

      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData(
        "application/x-game-equipment-item",
        JSON.stringify(this.draggedItem),
      );
      event.dataTransfer.setData("text/plain", String(itemId));
    },

    handleDragEnd() {
      this.draggedItem = null;
      this.draggedInventoryCell = null;
      this.draggedEquipmentSlot = null;
      this.dragOverEquipmentSlot = null;
      this.dragOverInventoryCell = null;
    },

    getDraggedInventoryItem() {
      if (!this.draggedItem || this.draggedItem.source !== "inventory") {
        return null;
      }

      return this.inventoryCells.find((item) => {
        return (
          Number(item.cellId) === Number(this.draggedItem.cellId) &&
          Number(item.id) === Number(this.draggedItem.itemId)
        );
      });
    },

    canDropInventoryItemToEquipmentSlot(slot) {
      const item = this.getDraggedInventoryItem();

      return item ? this.getEquipmentSlotByItem(item) === slot : false;
    },

    handleEquipmentDragEnter(slot, event) {
      if (!this.draggedItem || this.draggedItem.source !== "inventory") {
        return;
      }

      this.dragOverEquipmentSlot = slot;

      event.dataTransfer.dropEffect = this.canDropInventoryItemToEquipmentSlot(
        slot,
      )
        ? "move"
        : "none";
    },

    handleEquipmentDragOver(slot, event) {
      if (!this.draggedItem || this.draggedItem.source !== "inventory") {
        return;
      }

      this.dragOverEquipmentSlot = slot;

      event.dataTransfer.dropEffect = this.canDropInventoryItemToEquipmentSlot(
        slot,
      )
        ? "move"
        : "none";
    },

    handleEquipmentDragLeave(slot) {
      if (this.dragOverEquipmentSlot === slot) {
        this.dragOverEquipmentSlot = null;
      }
    },

    handleDropToEquipment(slot) {
      if (!this.draggedItem || this.draggedItem.source !== "inventory") {
        return;
      }

      const item = this.getDraggedInventoryItem();

      this.dragOverEquipmentSlot = null;

      if (!item) {
        return;
      }

      this.equipInventoryItemToSlot(item, slot);
    },

    handleInventoryDragEnter(item, event) {
      if (!this.draggedItem || this.draggedItem.source !== "equipment") {
        return;
      }

      this.dragOverInventoryCell = item.cellId;
      event.dataTransfer.dropEffect = "move";
    },

    handleInventoryDragOver(item, event) {
      if (!this.draggedItem || this.draggedItem.source !== "equipment") {
        return;
      }

      this.dragOverInventoryCell = item.cellId;
      event.dataTransfer.dropEffect = "move";
    },

    handleInventoryDragLeave(item) {
      if (this.dragOverInventoryCell === item.cellId) {
        this.dragOverInventoryCell = null;
      }
    },

    handleDropToInventory(targetItem) {
      if (!this.draggedItem || this.draggedItem.source !== "equipment") {
        return;
      }

      const slot = this.draggedItem.slot;

      this.dragOverInventoryCell = null;

      this.moveEquipmentToInventory(slot, targetItem);
    },

    showInventoryModal(text) {
      this.$store.state.modalNotification.text = text;
      this.$store.state.modalNotification.from = "inventory";
      this.$store.state.modalNotification.visible = true;

      this.showModal();
    },

    equipInventoryItemToSlot(item, slot) {
      const targetSlot = this.getEquipmentSlotByItem(item);

      if (targetSlot !== slot) {
        this.showInventoryModal(
          `Предмет «${
            item.name
          }» можно надеть только в слот ${this.getEquipmentSlotLabel(
            targetSlot,
          )}.`,
        );
        return;
      }

      if (Number(item.requiredLevel || 0) > this.$store.state.playerLevel) {
        this.showInventoryModal(
          "Невозможно надеть предмет. Уровень предмета выше вашего.",
        );
        return;
      }

      const inventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory || []),
      );

      const inventoryIndex = inventory.findIndex((inventoryItem, index) => {
        const cellId =
          inventoryItem.cellId !== undefined ? inventoryItem.cellId : index;

        return (
          Number(cellId) === Number(item.cellId) &&
          Number(inventoryItem.id) === Number(item.id)
        );
      });

      if (inventoryIndex === -1) {
        this.updateInventory();
        return;
      }

      const equipment = JSON.parse(
        JSON.stringify(this.$store.state.playerEquipment),
      );

      const durabilityKey = this.getEquipmentDurabilityKey(slot);
      const previousItemId = Number(equipment[slot] || 0);

      if (
        previousItemId &&
        inventory.length >= this.$store.state.playerInventorySize
      ) {
        this.showInventoryModal(
          "Невозможно надеть предмет: инвентарь переполнен, текущий предмет из слота некуда переместить.",
        );
        return;
      }

      if (previousItemId) {
        const previousItem = this.allItemsList(previousItemId);

        if (previousItem) {
          previousItem.durability = Number(equipment[durabilityKey] || 0);

          inventory.push(previousItem);
        }
      }

      equipment[slot] = Number(item.id);
      equipment[durabilityKey] = Number(item.durability);

      inventory.splice(inventoryIndex, 1);

      this.$store.state.playerEquipment = equipment;
      this.$store.state.playerInventory = inventory;

      this.selectedInventoryItem = null;
      this.hideTooltip();
      this.refreshEquipmentAndInventory();
    },

    moveEquipmentToInventory(slot, targetItem) {
      const equipment = JSON.parse(
        JSON.stringify(this.$store.state.playerEquipment),
      );

      const itemId = Number(equipment[slot] || 0);
      const durabilityKey = this.getEquipmentDurabilityKey(slot);

      if (!itemId || !durabilityKey) {
        return;
      }

      const equipmentItem = this.allItemsList(itemId);

      if (!equipmentItem) {
        return;
      }

      equipmentItem.durability = Number(equipment[durabilityKey] || 0);

      const inventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory || []),
      );

      const targetCellId = Number(targetItem.cellId);
      const targetIndex = inventory.findIndex((inventoryItem, index) => {
        const cellId =
          inventoryItem.cellId !== undefined ? inventoryItem.cellId : index;

        return Number(cellId) === targetCellId;
      });

      if (targetIndex === -1) {
        inventory.push(equipmentItem);
      } else {
        const targetInventoryItem = inventory[targetIndex];

        if (!this.isEquipmentItem(targetInventoryItem)) {
          this.showInventoryModal(
            "Эту ячейку занимает расходник. Перетащите экипировку в пустую ячейку или в ячейку с другим снаряжением.",
          );
          return;
        }

        inventory[targetIndex] = equipmentItem;
      }

      equipment[slot] = 0;
      equipment[durabilityKey] = 0;

      this.$store.state.playerEquipment = equipment;
      this.$store.state.playerInventory = inventory;

      this.selectedInventoryItem = null;
      this.hideTooltip();
      this.refreshEquipmentAndInventory();
    },

    showTooltip(itemId, durability, target) {
      const item = this.allItemsList(itemId);

      if (!item) {
        this.hideTooltip();
        return;
      }

      this.tooltip.position = typeof target === "number" ? "bottom" : "top";

      this.tooltip.text = this.tooltipContent(item, durability);
      this.selectedItem = target;
      this.tooltip.visible = true;
    },

    tooltipContent(item, durability) {
      const content = [];

      this.tooltip.btnColor =
        this.$store.state.playerLevel < item.requiredLevel ? "red" : "green";

      if (this.tooltip.position === "bottom") {
        if (
          this.itemCategory(item.id) === "102" &&
          [10217, 10218, 10219].includes(item.id)
        ) {
          this.tooltip.btnText = "Открыть";
        } else if (this.itemCategory(item.id) === "102") {
          this.tooltip.btnText = "Использовать";
        } else {
          this.tooltip.btnText = "Надеть";
        }
      } else {
        this.tooltip.btnText = "Снять";
      }

      Object.keys(item).forEach((key) => {
        switch (key) {
          case "name":
            content.push(item[key]);
            break;
          case "damage":
            content.push(`Урон: ${item[key]}`);
            break;
          case "armor":
            content.push(`Защита: ${item[key]}`);
            break;
          case "hp":
            content.push(`HP: ${item[key]}`);
            break;
          case "evasion":
            content.push(`Уклонение: ${item[key]}`);
            break;
          case "critChance":
            content.push(`Крит шанс: ${item[key]}`);
            break;
          case "critPower":
            content.push(`Крит сила: ${item[key]}`);
            break;
          case "desc":
            content.push(item[key]);
            break;
          case "durability":
            if (this.isEquipmentItem(item)) {
              content.push(`Прочность: ${durability}/${item[key]}`);
            }
            break;
          case "requiredLevel":
            content.push(`Уровень: ${item[key]}`);
            break;
          default:
            break;
        }
      });

      if (this.isEquipmentItem(item) && Number(durability) <= 0) {
        content.push("Требуется починка");
      }

      if (item.requiredLevel > this.$store.state.playerLevel) {
        content.push("Уровень персонажа ниже необходимого для этого предмета");
      }

      return content;
    },

    hideTooltip() {
      setTimeout(() => {
        this.tooltip.visible = false;
        this.selectedItem = null;
      }, 1);
    },

    handleClickOutside(event) {
      if (!this.tooltip?.visible) {
        return;
      }

      const tooltip = this.$el.querySelector(".tooltip");

      if (!tooltip || tooltip.contains(event.target)) {
        return;
      }

      const equipmentItems = this.$el.querySelectorAll(
        ".equipment__item__icon",
      );

      const isClickOnEquipment = Array.from(equipmentItems).some((item) => {
        return item.contains(event.target);
      });

      const inventory = this.$el.querySelector(".inventory-list");

      if (!inventory?.contains(event.target) && !isClickOnEquipment) {
        this.hideTooltip();
      }
    },

    useItem(item) {
      if (!item?.id) {
        return;
      }

      const category = this.itemCategory(item.id);

      if (Number(item.requiredLevel || 0) > this.$store.state.playerLevel) {
        this.showInventoryModal(
          "Невозможно надеть. Уровень предмета выше вашего.",
        );
        return;
      }

      if (category === "100" || category === "101") {
        const slot = this.getEquipmentSlotByItem(item);

        if (slot) {
          this.equipInventoryItemToSlot(item, slot);
        }

        return;
      }

      if (category !== "102") {
        return;
      }

      const inventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory || []),
      );

      const inventoryIndex = inventory.findIndex((inventoryItem, index) => {
        const cellId =
          inventoryItem.cellId !== undefined ? inventoryItem.cellId : index;

        return (
          Number(cellId) === Number(item.cellId) &&
          Number(inventoryItem.id) === Number(item.id)
        );
      });

      if (inventoryIndex === -1) {
        this.updateInventory();
        return;
      }

      let removeUsedItem = true;

      switch (item.category) {
        case "restoreHp": {
          const currentHp = Number(this.$store.state.playerCurrentHp);
          const maxHp = Number(this.$store.state.playerMaxHp);

          this.$store.state.playerCurrentHp = Math.min(
            maxHp,
            currentHp + Number(item.amount || 0),
          );

          localStorage.setItem(
            "playerCurrentHp",
            String(this.$store.state.playerCurrentHp),
          );
          break;
        }

        case "buffDamage":
          this.$store.state.playerBuffCharacteristics.damage = item.amount;
          this.$store.state.playerBuffCharacteristics.damageBuffDuration =
            item.duration;
          break;

        case "buffArmor":
          this.$store.state.playerBuffCharacteristics.armor = item.amount;
          this.$store.state.playerBuffCharacteristics.armorBuffDuration =
            item.duration;
          break;

        case "buffHp":
          this.$store.state.playerBuffCharacteristics.hp = item.amount;
          this.$store.state.playerBuffCharacteristics.hpBuffDuration =
            item.duration;
          break;

        case "buffEvasion":
          this.$store.state.playerBuffCharacteristics.evasion = item.amount;
          this.$store.state.playerBuffCharacteristics.evasionBuffDuration =
            item.duration;
          break;

        case "buffCritChance":
          this.$store.state.playerBuffCharacteristics.critChance = item.amount;
          this.$store.state.playerBuffCharacteristics.critChanceBuffDuration =
            item.duration;
          break;

        case "buffCritPower":
          this.$store.state.playerBuffCharacteristics.critPower = item.amount;
          this.$store.state.playerBuffCharacteristics.critPowerBuffDuration =
            item.duration;
          break;

        case "buffDrop":
          this.$store.state.playerBuffCharacteristics.drop = item.amount;
          this.$store.state.playerBuffCharacteristics.dropBuffDuration =
            item.duration;
          break;

        case "magicChest": {
          const craftInventory = JSON.parse(
            JSON.stringify(this.$store.state.playerCraftInventory || []),
          );

          const keyIndex = craftInventory.findIndex((craftItem) => {
            return Number(craftItem.craftItemId) === 10316;
          });

          if (
            keyIndex === -1 ||
            Number(craftInventory[keyIndex].count || 0) <= 0
          ) {
            this.showInventoryModal(
              "Невозможно открыть сундук. Нет магических ключей.",
            );
            removeUsedItem = false;
            break;
          }

          craftInventory[keyIndex].count -= 1;

          if (craftInventory[keyIndex].count <= 0) {
            craftInventory.splice(keyIndex, 1);
          }

          const drop = items.magicChestRandomDrop(item.id, item.amount);

          if (drop.length > 0) {
            drop.forEach((dropItem) => {
              const existingItem = craftInventory.find((craftItem) => {
                return (
                  Number(craftItem.craftItemId) === Number(dropItem.craftItemId)
                );
              });

              if (existingItem) {
                existingItem.count += dropItem.count;
              } else {
                craftInventory.push({
                  craftItemId: dropItem.craftItemId,
                  count: dropItem.count,
                });
              }
            });

            this.$store.state.playerCraftInventory = craftInventory;

            localStorage.setItem(
              "playerCraftInventory",
              JSON.stringify(craftInventory),
            );

            this.$store.state.chestIsOpen.drop = drop;
            this.$store.state.chestIsOpen.visible = true;

            this.updateCraftInventory();
            this.showModal();
          } else {
            this.showInventoryModal("Сундук оказался пуст.");
          }

          break;
        }

        default:
          removeUsedItem = false;
          break;
      }

      localStorage.setItem(
        "playerBuffCharacteristics",
        JSON.stringify(this.$store.state.playerBuffCharacteristics),
      );

      if (removeUsedItem) {
        inventory.splice(inventoryIndex, 1);
      }

      this.$store.state.playerInventory = inventory;

      localStorage.setItem("playerInventory", JSON.stringify(inventory));

      player.equipmentCharacteristics();
      downloadData();

      this.updateInventory();
      this.updateEquipment();

      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");

      this.hideTooltip();
    },

    removeItem(itemId, itemDurability, target) {
      const inventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory || []),
      );

      if (inventory.length >= this.$store.state.playerInventorySize) {
        this.showInventoryModal(
          "Невозможно снять предмет. Инвентарь переполнен.",
        );
        return;
      }

      const item = this.allItemsList(itemId);
      const durabilityKey = this.getEquipmentDurabilityKey(target);

      if (!item || !durabilityKey) {
        return;
      }

      item.durability = Number(itemDurability || 0);

      const equipment = JSON.parse(
        JSON.stringify(this.$store.state.playerEquipment),
      );

      inventory.push(item);

      equipment[target] = 0;
      equipment[durabilityKey] = 0;

      this.$store.state.playerInventory = inventory;
      this.$store.state.playerEquipment = equipment;

      this.selectedInventoryItem = null;
      this.hideTooltip();
      this.refreshEquipmentAndInventory();
    },

    hasEnoughResources(item) {
      const playerResources = JSON.parse(
        JSON.stringify(this.$store.state.playerResources),
      );

      const playerCraftInventory = JSON.parse(
        JSON.stringify(this.playerCraftResources),
      );

      for (const [resource, requiredCount] of Object.entries(
        item.resources || {},
      )) {
        if (Number(playerResources[resource] || 0) < Number(requiredCount)) {
          return {
            success: false,
            message: "Невозможно создать предмет. Не хватает ресурсов.",
          };
        }
      }

      for (const ingredient of item.ingredients || []) {
        const playerItem = playerCraftInventory.find((craftItem) => {
          return craftItem.craftItemId === ingredient.material;
        });

        if (Number(playerItem?.count || 0) < Number(ingredient.count)) {
          return {
            success: false,
            message: "Невозможно создать предмет. Не хватает материалов.",
          };
        }
      }

      if (
        this.$store.state.playerInventory.length <
        this.$store.state.playerInventorySize
      ) {
        return {
          success: true,
          message: "Вы создали предмет!",
        };
      }

      return {
        success: false,
        message: "Невозможно создать предмет. Инвентарь переполнен.",
      };
    },

    craftItem(item) {
      const isEnough = this.hasEnoughResources(item);

      if (!isEnough.success) {
        this.showInventoryModal(isEnough.message);
        return;
      }

      const playerResources = JSON.parse(
        JSON.stringify(this.$store.state.playerResources),
      );

      const playerCraftInventory = JSON.parse(
        JSON.stringify(this.$store.state.playerCraftInventory),
      );

      const inventory = JSON.parse(
        JSON.stringify(this.$store.state.playerInventory),
      );

      Object.entries(item.resources || {}).forEach(
        ([resource, requiredCount]) => {
          playerResources[resource] -= Number(requiredCount);
        },
      );

      (item.ingredients || []).forEach((ingredient) => {
        const craftItemIndex = playerCraftInventory.findIndex((craftItem) => {
          return craftItem.craftItemId === ingredient.material;
        });

        if (craftItemIndex !== -1) {
          playerCraftInventory[craftItemIndex].count -= Number(
            ingredient.count,
          );

          if (playerCraftInventory[craftItemIndex].count <= 0) {
            playerCraftInventory.splice(craftItemIndex, 1);
          }
        }
      });

      const craftedItem = this.allItemsList(item.targetId);

      if (!craftedItem) {
        this.showInventoryModal(
          "Невозможно создать предмет. Не найден результат рецепта.",
        );
        return;
      }

      inventory.push(craftedItem);

      this.$store.state.playerInventory = inventory;
      this.$store.state.playerResources = playerResources;
      this.$store.state.playerCraftInventory = playerCraftInventory;

      localStorage.setItem("playerInventory", JSON.stringify(inventory));
      localStorage.setItem("playerResources", JSON.stringify(playerResources));
      localStorage.setItem(
        "playerCraftInventory",
        JSON.stringify(playerCraftInventory),
      );

      downloadData();

      this.updateInventory();
      this.updateCraftInventory();

      this.$store.state.modalNotification.text = isEnough.message;
      this.$store.state.modalNotification.from = "inventory";
      this.$store.state.modalNotification.visible = true;

      this.showModal();

      this.$store.dispatch("triggerUpdateInventory");
      this.$store.dispatch("triggerUpdateShop");
    },

    showModal() {
      this.$emit("show-modal");
    },

    showCraftItemInfo(itemId) {
      const item = items.findItem(itemId);

      if (!item) {
        return;
      }

      this.$store.state.modalNotification.text = item;
      this.$store.state.modalNotification.from = "inventory";
      this.$store.state.modalNotification.visible = true;

      this.showModal();
    },

    checkCraftBtnColor(item) {
      return this.hasEnoughResources(item).success
        ? "var(--color-green)"
        : "var(--color-red)";
    },
  },

  created() {
    this.updateInventory();
    this.updateEquipment();
    this.updateCraftInventory();
  },

  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
.inventory-container {
  width: 100%;
}

.equipment-block {
  margin-bottom: 30px;
}

.equipment__header {
  margin-bottom: 15px;
  font-size: 22px;
}

.equipment__hint {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
  font-size: 14px;
  line-height: 1.4;
  opacity: 0.85;
}

.equipment-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.equipment__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94px;
}

.equipment__item__header {
  min-height: 35px;
  margin-bottom: 15px;
  font-size: 16px;
  text-align: center;
}

.equipment__item__icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94px;
  height: 94px;
  padding: 0;
  overflow: visible;
  border: 2px solid var(--color-light);
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  appearance: none;
  transition: border-color 0.15s ease, background-color 0.15s ease,
    box-shadow 0.15s ease, transform 0.15s ease;
}

.equipment__item__icon:hover {
  border-color: var(--color-green);
}

.equipment__item__icon:focus-visible,
.inventory__item:focus-visible,
.nav__item:focus-visible,
.craft__item__icon:focus-visible {
  z-index: 120;
  outline: 3px solid var(--color-green);
  outline-offset: 3px;
}

.equipment-drop-zone_active {
  border-color: var(--color-green);
  background-color: rgba(73, 165, 85, 0.24);
  box-shadow: 0 0 0 3px rgba(73, 165, 85, 0.22);
  transform: scale(1.05);
}

.equipment-drop-zone_invalid {
  border-color: var(--color-red);
  background-color: rgba(212, 99, 93, 0.22);
  box-shadow: 0 0 0 3px rgba(212, 99, 93, 0.18);
}

.equipment-item_dragging,
.inventory-item_dragging {
  opacity: 0.45;
}

.equipment__empty-text {
  max-width: 80px;
  padding: 4px;
  color: var(--color-light);
  font-size: 11px;
  line-height: 1.2;
  text-align: center;
  opacity: 0.65;
  user-select: none;
}

.equipment__item__text {
  display: block;
  max-width: 90px;
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.equipment__image {
  width: 90px;
  height: 90px;
  object-fit: contain;
  pointer-events: none;
}

.item__level {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 100;
  padding: 2px 4px;
  background-color: var(--color-light);
  color: var(--color-dark);
  font-family: Bahnschrift, sans-serif;
  font-size: 14px;
  font-weight: 900;
  pointer-events: none;
}

.equipment-durability_block {
  width: 100%;
  height: 20px;
}

.equipment__durability {
  font-size: 14px;
}

.equipment--unsuitable {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  width: 100%;
  height: 100%;
  background-color: rgba(212, 99, 93, 0.5);
  pointer-events: none;
}

.nav-list {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  border: 2px solid var(--color-light);
}

.nav__item {
  padding: 5px 10px;
  cursor: pointer;
  user-select: none;
}

.nav__item:hover {
  background-color: rgba(255, 255, 255, 0.12);
}

.inventory-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 2px solid var(--color-light);
}

.inventory__item {
  position: relative;
  display: flex;
  flex-basis: 10%;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0;
  aspect-ratio: 1 / 1;
  border: 1px solid var(--color-light);
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, background-color 0.15s ease,
    box-shadow 0.15s ease;
}

.inventory__item:hover {
  border-color: var(--color-green);
  background-color: rgba(73, 165, 85, 0.12);
}

.inventory__item_draggable {
  cursor: grab;
}

.inventory__item_draggable:active {
  cursor: grabbing;
}

.inventory__item_selected {
  z-index: 5;
  border-color: var(--color-green);
  background-color: rgba(73, 165, 85, 0.22);
  box-shadow: inset 0 0 0 2px var(--color-green);
}

.inventory-drop-zone_active {
  border-color: var(--color-green);
  background-color: rgba(73, 165, 85, 0.25);
  box-shadow: inset 0 0 0 2px var(--color-green);
}

.inventory__item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.inventory__item__id {
  padding: 3px;
  font-size: 11px;
  text-align: center;
  word-break: break-all;
}

.inventory__empty-text {
  color: var(--color-light);
  font-size: 11px;
  opacity: 0.24;
  user-select: none;
}

.inventory-item_broken {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.7);
  pointer-events: none;
}

.inventory-item_broken__icon {
  position: absolute;
  top: 60%;
  left: 5%;
  z-index: 102;
  color: rgb(224, 43, 43);
  font-size: 25px;
  font-weight: 900;
  pointer-events: none;
}

.material-block {
  display: flex;
  flex-wrap: wrap;
  max-height: 50vh;
  overflow: auto;
}

.material-box {
  display: flex;
  flex-basis: 47%;
  flex-direction: column;
  justify-content: center;
  margin-right: 30px;
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid var(--color-light);
  border-radius: 5px;
}

.material-box:nth-child(2n) {
  margin-right: 0;
}

.material-box__title {
  margin-bottom: 15px;
}

.material-list {
  display: flex;
  flex-direction: column;
}

.material__item {
  display: flex;
  align-items: center;
}

.material__item:not(:last-child) {
  margin-bottom: 10px;
}

.material__title {
  max-width: 250px;
  margin-right: 10px;
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
  font-weight: 400;
}

.craft-block {
  display: flex;
  flex-direction: column;
  max-height: 45vh;
  padding-right: 15px;
}

.craft-filter_box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 714px;
}

.craft-filter {
  margin-bottom: 20px;
}

.craft-filter label {
  margin-right: 15px;
  cursor: pointer;
}

.craft__radio_btn {
  position: relative;
  top: 4px;
  width: 16px;
  height: 16px;
  margin-right: 2px;
  border: 2px solid #999;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: 0.2s all linear;
}

.craft__radio_btn:checked {
  border: 6px solid var(--color-green);
}

.craft-sort_box {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.craft-sort__select {
  padding: 2px 5px;
  border: 1px solid var(--color-light);
  border-radius: 4px;
}

.craft__heading {
  margin-top: 50px;
  text-align: center;
}

.craft-list {
  display: flex;
  flex-direction: column;
}

.craft__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 714px;
  margin-bottom: 30px;
  padding: 15px;
  border: 2px solid var(--color-light);
}

.craft__item__icon {
  position: relative;
  width: 74px;
  height: 74px;
  padding: 0;
  border: 1px solid var(--color-light);
  background-color: transparent;
  color: inherit;
  text-align: center;
  cursor: pointer;
  appearance: none;
}

.craft__item__icon:hover {
  border-color: var(--color-light);
  background-color: var(--color-light);
  color: var(--color-dark);
}

.craft_icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.craft__item-box {
  width: 480px;
}

.craft__item__title {
  margin-bottom: 15px;
}

.craft__item__desc-block {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.craft__item__desc-block:last-child {
  margin-bottom: 0;
}

.craft-item__btn_block {
  display: flex;
  flex-direction: column;
}

.craft__item__btn {
  padding: 7px 10px;
  border: 1px solid var(--color-dark);
}

.craft__item__btn:hover {
  border: 1px solid var(--color-light);
  background-color: var(--color-dark);
  color: var(--color-light);
}

.craft__item__btn:not(:last-child) {
  margin-bottom: 10px;
}

.block__desc__title {
  width: 250px;
  margin-right: 10px;
}

.craft__item__resources-box {
  display: flex;
}

.resources-box__text {
  margin-right: 30px;
  margin-bottom: 10px;
}

.resources-box__text:last-child {
  margin-right: 0;
  margin-bottom: 0;
}

.active,
.equipped {
  background-color: var(--color-light);
  color: var(--color-dark);
}

.block__title {
  display: block;
  margin-top: 30px;
  line-height: 1.5;
  text-align: center;
}

@media (max-width: 900px) {
  .equipment-list {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
  }

  .inventory__item {
    flex-basis: 12.5%;
  }

  .material-box {
    flex-basis: calc(50% - 15px);
  }

  .craft__item-box {
    width: auto;
    flex: 1;
  }
}

@media (max-width: 650px) {
  .equipment-list {
    justify-content: space-between;
  }

  .equipment__item {
    width: 82px;
  }

  .equipment__item__icon {
    width: 82px;
    height: 82px;
  }

  .equipment__image {
    width: 78px;
    height: 78px;
  }

  .inventory__item {
    flex-basis: 16.666%;
  }

  .nav-list {
    flex-wrap: wrap;
  }

  .nav__item {
    flex: 1;
    min-width: 120px;
    text-align: center;
  }

  .material-box {
    flex-basis: 100%;
    margin-right: 0;
  }

  .craft-filter_box,
  .craft__item {
    flex-direction: column;
    align-items: flex-start;
  }

  .craft__item {
    gap: 15px;
  }

  .craft__item-box {
    width: 100%;
  }

  .craft__item__resources-box {
    flex-direction: column;
  }

  .resources-box__text {
    margin-right: 0;
  }

  .craft-item__btn_block {
    width: 100%;
  }
}

@media (max-width: 420px) {
  .equipment-list {
    gap: 12px;
  }

  .equipment__item {
    width: 74px;
  }

  .equipment__item__icon {
    width: 74px;
    height: 74px;
  }

  .equipment__image {
    width: 70px;
    height: 70px;
  }

  .equipment__item__header {
    min-height: auto;
    margin-bottom: 8px;
    font-size: 13px;
  }

  .item__level {
    font-size: 11px;
  }

  .inventory__item {
    flex-basis: 20%;
  }

  .block__desc__title {
    width: auto;
  }

  .craft__item__desc-block {
    flex-wrap: wrap;
  }
}
</style>
