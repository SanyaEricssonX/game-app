import player from "../services/player";

export function startBattle(playerCurrentHp, playerDamage, playerArmor, playerEvasion, playerCritChance, playerCritPower, enemy) {
  let enemyCurrentHp = enemy.hp;
  let battleLog = [];

  while (playerCurrentHp > 0 && enemyCurrentHp > 0) {
    // Игрок атакует
    const decreasePlayerDamage = player.decreaseDamage(enemy.armor);
    const finalPlayerDamage = playerDamage - Math.ceil(playerDamage / 100 * decreasePlayerDamage);

    // Условие для промаха по врагу
    if (Math.random() <= enemy.evasion / 100) {
      battleLog.push("Вы промахнулись");
    } else {
      // Условие для крита по врагу
      if (Math.random() <= playerCritChance / 100) {
        const finalPlayerCritDamage = finalPlayerDamage + Math.floor(finalPlayerDamage * (playerCritPower / 100));

        enemyCurrentHp -= finalPlayerCritDamage;
        battleLog.push(`Вы нанесли критический удар по цели ${enemy.name} и нанесли ${finalPlayerCritDamage} урона!`);
      } else {
        enemyCurrentHp -= finalPlayerDamage;
        battleLog.push(`Вы нанесли ${finalPlayerDamage} урона по цели ${enemy.name}.`);
      }
    }

    if (enemyCurrentHp <= 0) {
      battleLog.push("Враг повержен!");
      return { result: "win", log: battleLog, currentHp: playerCurrentHp, experience: enemy.experience };
    }

    // Монстр атакует
    const decreaseEnemyDamage = player.decreaseDamage(playerArmor);
    const finalEnemyDamage = enemy.damage - Math.ceil(enemy.damage / 100 * decreaseEnemyDamage);

    // Условие для промаха по игроку
    if (Math.random() <= playerEvasion / 100) {
      battleLog.push(`Вы уклонились от атаки ${enemy.name}!`);
    } else {
      // Условия для крита по игроку
      if (Math.random() <= enemy.critChance / 100) {
        const finalEnemyCritDamage = finalEnemyDamage + Math.floor(finalEnemyDamage * (enemy.critPower / 100));

        playerCurrentHp -= finalEnemyCritDamage;
        battleLog.push(`${enemy.name} нанес вам критический удар ${finalEnemyCritDamage} урона!`);
      } else {
        playerCurrentHp -= finalEnemyDamage;
        battleLog.push(`${enemy.name} нанес вам ${finalEnemyDamage} урона.`);
      }
    }

    if (playerCurrentHp <= 0) {
      battleLog.push("Вас убили!");
      return { result: "lose", log: battleLog, currentHp: playerCurrentHp };
    }
  }
  return { result: "ongoing", battleLog, currentHp: playerCurrentHp };
}

