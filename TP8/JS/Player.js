export class Player {
  constructor(id, pseudo, skin, pos) {
    this.pseudo = pseudo;
    this.skin = skin;
    this.x = pos[0];
    this.y = pos[1];
    this.id = id;
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

    this.currentWalkSpriteStep = 0;
    this.walkSpriteDuration = 4;
    this.walkSpriteIndex = 0;
    this.walkSpriteNumber = 9;

    this.currentAttackSpriteStep = 0;
    this.attackSpriteDuration = 4;
    this.attackSpriteIndex = 0;
    this.attackSpriteNumber = 6;

    this.currentDyingSpriteStep = 0;
    this.dyingSpriteDuration = 6;
    this.dyingSpriteIndex = 0;
    this.dyingSpriteNumber = 6;
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
    this.moving = data.moving;
    this.dying = data.dying;
  }

  animate() {
    if (this.moving) {
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
    } else if (
      this.ATKing ||
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
    } else if (this.dying) {
      this.currentDyingSpriteStep++;
      if (this.currentDyingSpriteStep >= this.dyingSpriteDuration) {
        this.currentDyingSpriteStep = 0;
        this.dyingSpriteIndex++;
      }
      if (this.dyingSpriteIndex >= this.dyingSpriteNumber) {
        this.dead = true;
      }
    } else {
      this.walkSpriteIndex = 0;
    }
    console.log(
      "**************************************************************************"
    );
    console.log("Walk animation : \n");
    console.log("isWalking : " + this.moving);
    console.log("walkSpriteIndex : " + this.walkSpriteIndex);
    console.log("Walk current sprite step : " + this.currentWalkSpriteStep);

    console.log("ATK animation : \n");
    console.log("isATKing : " + this.ATKing);
    console.log("attackSpriteIndex : " + this.attackSpriteIndex);

    console.log("Dying animation : \n");
    console.log("isDying : " + this.dying);
    console.log("dyingSpriteIndex : " + this.dyingSpriteIndex);
    console.log("Dying current sprite step : " + this.currentDyingSpriteStep);
    console.log(
      "**************************************************************************"
    );
  }

  draw(ctx, img) {
    const spriteSize = 64;
    const spriteSizeATK = 192;

    let sx, sy;
    let sWidth = spriteSize;
    let sHeight = spriteSize;
    let middle = 0;

    if (this.moving) {
      if (this.direction === "North") {
        sy = 8 * spriteSize;
        sx = this.walkSpriteIndex * spriteSize;
      } else if (this.direction === "West") {
        sy = 9 * spriteSize;
        sx = this.walkSpriteIndex * spriteSize;
      } else if (this.direction === "Sud") {
        sy = 10 * spriteSize;
        sx = this.walkSpriteIndex * spriteSize;
      } else if (this.direction === "Est") {
        sy = 11 * spriteSize;
        sx = this.walkSpriteIndex * spriteSize;
      }
    } else if (
      this.ATKing ||
      this.currentAttackSpriteStep > 0 ||
      this.attackSpriteIndex > 0
    ) {
      sWidth = spriteSizeATK;
      sHeight = spriteSizeATK;
      middle = 64;

      if (this.direction === "North") {
        sy = 54 * spriteSize;
        sx = this.attackSpriteIndex * spriteSizeATK;
      } else if (this.direction === "West") {
        sy = 57 * spriteSize;
        sx = this.attackSpriteIndex * spriteSizeATK;
      } else if (this.direction === "Sud") {
        sy = 60 * spriteSize;
        sx = this.attackSpriteIndex * spriteSizeATK;
      } else if (this.direction === "Est") {
        sy = 63 * spriteSize;
        sx = this.attackSpriteIndex * spriteSizeATK;
      }
    } else if (this.dying) {
      sy = 20 * spriteSize;
      sx = this.dyingSpriteIndex * spriteSize;
    } else {
      if (this.direction === "North") {
        sy = 8 * spriteSize;
      } else if (this.direction === "West") {
        sy = 9 * spriteSize;
      } else if (this.direction === "Sud") {
        sy = 10 * spriteSize;
      } else if (this.direction === "Est") {
        sy = 11 * spriteSize;
      }
      sx = 0;
    }

    ctx.drawImage(
      img,
      sx,
      sy,
      sWidth,
      sHeight,
      this.x - middle,
      this.y - middle,
      sWidth,
      sHeight
    );
  }
}

// const p1 = new Player(
//   "3cd71bbb-6a6b-4d4e-80e3-107130328a27",
//   "blabla",
//   "./spritesheets/3.png",
//   [0.5600000000000003, 0.17999999999999977]
// );

// const data = {
//   name: "blabla",
//   skinPath: "./spritesheets/3.png",
//   pos: [0.5600000000000003, 0.17999999999999977],
//   lvl: 1,
//   hp: 100,
//   maxHp: 100,
//   hpRegenRate: 10,
//   speed: 0.2,
//   direction: 3,
//   isAttacking: false,
//   isWalking: false,
//   isDying: false,
//   attackCooldown: 1,
//   currentAttackCooldown: 0,
// };

// p1.update(data);
// console.log(p1);
