class Player {
  constructor(pseudo, skin, pos) {
    this.pseudo = pseudo;
    this.skin = skin;
    this.x = pos[0];
    this.y = pos[1];
    this.hpMax = 100;
    this.hp = 100;
    this.ATK = 20;
    this.speedATK = 1.2;
    this.speed = 1.5;
    this.lvl = 1;
    this.previouslvl = 1;
    this.cooldownATK = 2000;
    this.maxCooldownATK = 2000;
    this.isAlive = true;
    this.regenHP = 0.2;
    this.direction = "Sud";
    this.ATKing = false;
    this.moving = false;
    this.dying = false;
  }

  update(data) {
    this.x = data.pos[0];
    this.y = data.pos[1];
    this.hpMax = data.hpMax;
    this.hp = data.hp;
    this.ATK = data.ATK;
    this.speedATK = data.speedATK;
    this.speed = data.speed;
    this.previouslvl = this.lvl;
    this.lvl = data.lvl;
    this.cooldownATK = data.cooldownATK;
    this.maxCooldownATK = data.maxCooldownATK;
    this.isAlive = data.isAlive;
    this.regenHP = data.regenHP;
    this.direction = data.direction;
    this.ATKing = data.ATKing;
    this.canATK = data.canATK;
    this.moving = data.moving;
    this.dying = data.dying;
  }

  isATKing() {
    while (this.ATKing) {
      // Jouer attaque
    }
  }

  isMoving() {
    while (this.isMoving) {
      // Jouer la marche
    }
  }

  isDying() {
    while (this.dying) {
      // Jouer la mort
    }
  }

  lvlUp() {
    if (this.previouslvl !== this.lvl) {
      // Jouer l'animation de lvlup
    }
  }
}
