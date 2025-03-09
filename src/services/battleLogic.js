export function startBattle(playerCurrentHp, playerDamage, enemy) {
  let enemyCurrentHp = enemy.hp;
  let battleLog = [];

  while (playerCurrentHp > 0 && enemyCurrentHp > 0) {
    enemyCurrentHp -= playerDamage;
    battleLog.push(`Вы нанесли ${playerDamage} урона по цели ${enemy.name}.`);

    if (enemyCurrentHp <= 0) {
      battleLog.push("Враг повержен!");
      return { result: "win", log: battleLog, currentHp: playerCurrentHp, experience: enemy.experience };
    }

    playerCurrentHp -= enemy.damage;
    battleLog.push(`${enemy.name} нанес вам ${enemy.damage} урона`);

    if (playerCurrentHp <= 0) {
      battleLog.push("Вас убили!");
      return { result: "lose", log: battleLog, currentHp: playerCurrentHp };
    }
  }

  return { result: "ongoing", battleLog, currentHp: playerCurrentHp };
}
