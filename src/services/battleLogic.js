import player from "../services/player";

export function startBattle(playerCurrentHp, playerDamage, playerArmor, enemy) {
  let enemyCurrentHp = enemy.hp;
  let battleLog = [];

  while (playerCurrentHp > 0 && enemyCurrentHp > 0) {
    enemyCurrentHp -= playerDamage;
    battleLog.push(`Вы нанесли ${playerDamage} урона по цели ${enemy.name}.`);

    if (enemyCurrentHp <= 0) {
      battleLog.push("Враг повержен!");
      return { result: "win", log: battleLog, currentHp: playerCurrentHp, experience: enemy.experience };
    }

    const decreaseDamage = player.decreaseDamage(playerArmor);
    const finalDamage = enemy.damage - Math.ceil(enemy.damage / 100 * decreaseDamage);
    playerCurrentHp -= finalDamage;
    battleLog.push(`${enemy.name} нанес вам ${finalDamage} урона`);

    if (playerCurrentHp <= 0) {
      battleLog.push("Вас убили!");
      return { result: "lose", log: battleLog, currentHp: playerCurrentHp };
    }
  }

  return { result: "ongoing", battleLog, currentHp: playerCurrentHp };
}
