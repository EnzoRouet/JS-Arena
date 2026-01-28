export default class Player {
  constructor(id, pseudo, skin, pos) {
    this.dead = false;
    this.pseudo = pseudo;
    this.skin = skin;
    this.x = pos[0];
    this.y = pos[1];
    this.id = id;
    this.maxHp = 100;
    this.hp = 100;
    this.speed = 1.5;
    this.lvl = 1;
    this.attackCooldown = 1;
    this.currentAttackCooldown = 0;
    this.hpRegenRate = 0.2;
    this.direction = "Sud";
    this.isAttacking = false;
    this.isWalking = false;
    this.isDying = false;

    this.currentWalkSpriteStep = 0;
    this.walkSpriteDuration = 4;
    this.walkSpriteIndex = 0;
    this.walkSpriteNumber = 9;

    this.currentAttackSpriteStep = 0;
    this.attackSpriteDuration = 4;
    this.attackSpriteIndex = 0;
    this.attackSpriteNumber = 6;

    this.currentDyingSpriteStep = 0;
    this.dyingSpriteDuration = 12;
    this.dyingSpriteIndex = 0;
    this.dyingSpriteNumber = 6;

    // Ici c'est les anciens x et y
    this.currentX = this.x;
    this.currentY = this.y;

    // Ici c'est les positions qu'on va donner en fonction du temps qu'on a entre 2 requêtes.
    this.currentRenderX = this.x;
    this.currentRenderY = this.y;
  }

  update(data) {
    this.currentX = this.x;
    this.currentY = this.y;
    this.skin = data.skinPath;
    this.x = data.position[0];
    this.y = data.position[1];
    this.maxHp = data.maxHp;
    this.hp = data.hp;
    // this.ATK = data.ATK;
    this.speed = data.speed;
    this.lvl = data.lvl;
    this.currentAttackCooldown = data.currentAttackCooldown;
    this.attackCooldown = data.attackCooldown;
    this.hpRegenRate = data.hpRegenRate;
    this.direction = data.direction;
    this.isAttacking = data.isAttacking;
    this.isWalking = data.isWalking;
    this.isDying = data.isDying;
  }

  animate() {
    if (this.isDying) {
      this.walkSpriteIndex = 0;
      this.currentWalkSpriteStep = 0;

      this.currentDyingSpriteStep++;
      if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
        this.currentDyingSpriteStep = 0;
        this.dyingSpriteIndex++;
      }
      if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
        this.dead = true;
      }
    } else if (
      this.isAttacking ||
      this.currentAttackSpriteStep > 0 ||
      this.attackSpriteIndex > 0
    ) {
      this.walkSpriteIndex = 0;
      this.currentWalkSpriteStep = 0;

      this.currentAttackSpriteStep++;
      if (this.currentAttackSpriteStep >= this.attackSpriteDuration) {
        this.currentAttackSpriteStep = 0;
        this.attackSpriteIndex++;
      }
      if (this.attackSpriteIndex >= this.attackSpriteNumber) {
        this.attackSpriteIndex = 0;
      }
    } else if (this.isWalking) {
      this.currentAttackSpriteStep = 0;
      this.attackSpriteIndex = 0;

      this.currentWalkSpriteStep++;
      if (this.currentWalkSpriteStep >= this.walkSpriteDuration) {
        this.currentWalkSpriteStep = 0;
        this.walkSpriteIndex++;
      }
      if (this.walkSpriteIndex >= this.walkSpriteNumber) {
        this.walkSpriteIndex = 0;
      }
    } else {
      this.walkSpriteIndex = 0;
    }
  }

  interpolate(alpha) {
    this.currentRenderX = this.currentX + (this.x - this.currentX) * alpha;
    this.currentRenderY = this.currentY + (this.y - this.currentY) * alpha;
  }
}
