export function soundLoader() {
  // MUSIC BELOW
  loadMusic("dungeon1", "./sounds/dungeon1.mp3"); // dungeon 1 music

  // SOUND EFFECTS BELOW
  loadSound("playerWalking", "./sounds/footstepcarpet001.ogg"); // walking sound
  loadSound("swordHit", "./sounds/wooshSoundEffect.mp3"); // sword slashing sound
  loadSound("interact", "./sounds/impactBellheavy002.ogg"); // interacting with object sound
  loadSound("skeletonDeath", "./sounds/creatureDeath.mp3"); // skelton death
  loadSound("playerDeath", "./sounds/playerDeath.mp3"); // playerDeath sounds
  loadSound("upgrade", "./sounds/swordUpgrade.mp3"); // item upgrade sounds
  loadSound("onHitOnEnemy", "./sounds/onHit.mp3"); // on hit
  //loadSound("enemyAttack", "enter route here") // no sound chosen
  loadSound("slimeAttack", "./sounds/slimeAttack.mp3"); // slime sound
  loadSound("healthIncrease", "./sounds/healthPotion.mp3"); // healing
}
