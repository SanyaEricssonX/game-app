import player from "../services/player";

export function startBattle(playerCurrentHp, playerDamage, playerArmor, enemy) {
  let enemyCurrentHp = enemy.hp;
  let battleLog = [];

  while (playerCurrentHp > 0 && enemyCurrentHp > 0) {
    // Игрок атакует
    const decreasePlayerDamage = player.decreaseDamage(enemy.armor);
    const finalPlayerDamage = playerDamage - Math.ceil(playerDamage / 100 * decreasePlayerDamage);
    enemyCurrentHp -= finalPlayerDamage;
    battleLog.push(`Вы нанесли ${finalPlayerDamage} урона по цели ${enemy.name}.`);

    if (enemyCurrentHp <= 0) {
      battleLog.push("Враг повержен!");
      return { result: "win", log: battleLog, currentHp: playerCurrentHp, experience: enemy.experience };
    }

    // Монстр атакует
    const decreaseEnemyDamage = player.decreaseDamage(playerArmor);
    const finalEnemyDamage = enemy.damage - Math.ceil(enemy.damage / 100 * decreaseEnemyDamage);
    playerCurrentHp -= finalEnemyDamage;
    battleLog.push(`${enemy.name} нанес вам ${finalEnemyDamage} урона`);

    if (playerCurrentHp <= 0) {
      battleLog.push("Вас убили!");
      return { result: "lose", log: battleLog, currentHp: playerCurrentHp };
    }
  }

  return { result: "ongoing", battleLog, currentHp: playerCurrentHp };
}
