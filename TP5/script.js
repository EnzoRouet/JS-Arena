const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "character-spritesheet.png";

const centerX = canvas.width / 2 - 32;
const centerY = canvas.height / 2 - 32;

const p1 = new Player("Enzo", "Skin1", [centerX, centerY]);

p1.moving = false;
p1.dying = false;
p1.ATKing = false;

img.onload = () => {
  animate();
};

window.addEventListener("keydown", (e) => {
  if (e.key === "z") {
    p1.direction = "North";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "q") {
    p1.direction = "West";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "d") {
    p1.direction = "Est";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "s") {
    p1.direction = "Sud";
    p1.moving = true;
    window.addEventListener("keyup", (e) => {
      p1.moving = false;
    });
  } else if (e.key === "e") {
    p1.ATKing = true;
    window.addEventListener("keyup", (e) => {
      p1.ATKing = false;
    });
  } else if (e.key === "r") {
    p1.dying = true;
    window.addEventListener("keyup", (e) => {
      p1.dying = false;
    });
  }
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  p1.animate();

  p1.draw(ctx, img);

  requestAnimationFrame(animate);
}
