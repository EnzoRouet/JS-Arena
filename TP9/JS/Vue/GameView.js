export default class GameView {
  constructor(game) {
    this.canvas = document.querySelector("canvas");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext("2d");
    this.game = game;

    this.skins = {};
    for (let i = 1; i <= 29; i++) {
      const img = new Image();
      img.src = `assets/${i}.png`;
      this.skins[`assets/${i}.png`] = img;
    }
  }

  drawBackground() {
    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(0,0,0)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.stroke();
  }

  render() {
    this.drawBackground();

    for (let id in this.game.players) {
      let player = this.game.players[id];

      player.animate();
      this.drawPlayer(player);
      this.drawHUD(player);
    }
    this.drawClassment();
    this.drawTimer();
  }

  drawPlayer(player) {
    let skinPlayer = this.skins[player.skinPath];

    if (!skinPlayer) return;
    if (player.dead) return;

    const spriteSize = 64;
    const spriteSizeATK = 192;

    let xCanvas = player.currentRenderX * this.width;
    let yCanvas = player.currentRenderY * this.height;

    player.animate();

    let sx = player.walkSpriteIndex * 64;
    let sy = 0;
    let sWidth = 64;
    let middle = 32;

    if (player.isWalking) {
      if (player.direction === 0) {
        sy = 8 * spriteSize;
        sx = player.walkSpriteIndex * spriteSize;
      } else if (player.direction === 3) {
        sy = 9 * spriteSize;
        sx = player.walkSpriteIndex * spriteSize;
      } else if (player.direction === 2) {
        sy = 10 * spriteSize;
        sx = player.walkSpriteIndex * spriteSize;
      } else if (player.direction === 1) {
        sy = 11 * spriteSize;
        sx = player.walkSpriteIndex * spriteSize;
      }
    } else if (
      player.isAttacking ||
      player.currentAttackSpriteStep > 0 ||
      player.attackSpriteIndex > 0
    ) {
      sWidth = spriteSizeATK;
      middle = 96;

      if (player.direction === 0) {
        sy = 54 * spriteSize;
        sx = player.attackSpriteIndex * spriteSizeATK;
      } else if (player.direction === 3) {
        sy = 57 * spriteSize;
        sx = player.attackSpriteIndex * spriteSizeATK;
      } else if (player.direction === 2) {
        sy = 60 * spriteSize;
        sx = player.attackSpriteIndex * spriteSizeATK;
      } else if (player.direction === 1) {
        sy = 63 * spriteSize;
        sx = player.attackSpriteIndex * spriteSizeATK;
      }
    } else if (player.isDying) {
      sy = 20 * spriteSize;
      sx = player.dyingSpriteIndex * spriteSize;
    } else {
      if (player.direction === 0) {
        sy = 8 * spriteSize;
      } else if (player.direction === 3) {
        sy = 9 * spriteSize;
      } else if (player.direction === 2) {
        sy = 10 * spriteSize;
      } else if (player.direction === 1) {
        sy = 11 * spriteSize;
      }
      sx = 0;
    }

    this.ctx.drawImage(
      skinPlayer,
      sx,
      sy,
      sWidth,
      sWidth,
      xCanvas - middle,
      yCanvas - middle,
      sWidth,
      sWidth,
    );
  }

  drawHUD(player) {
    if (player.dead || player.hp <= 0) return;
    let x = player.currentRenderX * this.width - 32;
    let y = player.currentRenderY * this.height - 55;

    let ratio = player.hp / player.maxHp;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(255,0,0)";
    this.ctx.fillRect(x, y, 64, 12);
    this.ctx.fillStyle = "rgb(0,255,0)";
    this.ctx.fillRect(x, y, 64 * ratio, 12);
    this.ctx.stroke();

    let xCooldown = player.currentRenderX * this.width - 32;
    let yCooldwn = player.currentRenderY * this.height - 43;
    let ratioCooldown = player.currentAttackCooldown / player.attackCooldown;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgb(32,187,187)";
    this.ctx.fillRect(xCooldown, yCooldwn, 64 * ratioCooldown, 12);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText(`${player.pseudo} (lvl : ${player.lvl})`, x, y - 2);
    this.ctx.stroke();
  }

  drawClassment() {
    let tabAlive = [];
    let tabDead = [];
    let tabTotal = [];
    let x = this.width - 150;
    let y = 30;
    for (let id in this.game.players) {
      if (this.game.players[id].dead) {
        tabDead.push(this.game.players[id]);
        tabTotal.push(this.game.players[id]);
      } else {
        tabAlive.push(this.game.players[id]);
        tabTotal.push(this.game.players[id]);
      }
    }
    tabAlive.sort((a, b) => b.lvl - a.lvl);
    tabDead.sort((a, b) => b.lvl - a.lvl);

    this.ctx.font = "14px sans-serif";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText("CLASSEMENT :", x, y);
    y += 20;

    tabAlive.forEach((player) => {
      this.ctx.fillText(`${player.pseudo} | lvl ${player.lvl}`, x, y);
      y += 20;
    });

    this.ctx.fillStyle = "rgb(89, 89, 89)";
    tabDead.forEach((player) => {
      this.ctx.fillText(`${player.pseudo} | lvl ${player.lvl}`, x, y);
      y += 20;
    });

    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText(
      `Joueurs restants : ${tabAlive.length}/${tabTotal.length}`,
      x,
      y,
    );

    if (tabAlive.length === 1) {
      this.ctx.font = "bold 40px sans-serif";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "rgb(207, 202, 6)";
      this.ctx.fillText("VICTOIRE !!!", this.width / 2, this.height / 2);
      this.ctx.font = "bold 24px sans-serif";
      this.ctx.fillText(
        `Félicitation "${tabAlive[0].pseudo}" est le vainqueur !`,
        this.width / 2,
        this.height / 2 + 23,
      );
    }
  }

  drawTimer() {
    this.ctx.font = "14px sans-serif";
    this.ctx.fillStyle = "rgb(255,255,255)";
    this.ctx.fillText(
      `Temps : ${this.game.timer.toFixed(0)}`,
      this.width / 2,
      20,
    );
  }
}
