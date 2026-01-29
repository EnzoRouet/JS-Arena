export default class GameController {
  constructor(game, GameView) {
    this.SERVER_TICK_RATE = 20;
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    this.loop = this.loop.bind(this);

    this.lastServerUpdate = performance.now();

    this.game = game;

    this.view = GameView;

    const localStore = JSON.parse(localStorage.getItem("BR"));
    this.name = localStore[0];
    this.serverURL = localStore[1];
    this.spritePath = localStore[2];

    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };

    this.socket = new WebSocket(this.serverURL);

    this.initInput();
    this.initSocket();
    this.startInputSender();

    requestAnimationFrame(this.loop);
  }

  // === Main render loop ===
  loop(timestamp) {
    let alpha = (timestamp - this.lastServerUpdate) / this.SERVER_INTERVAL;

    if (alpha > 1) alpha = 1;
    if (alpha < 0) alpha = 0;

    // Application de l'interpolation
    for (let id in this.game.players) {
      let player = this.game.players[id];
      if (player.interpolate) {
        player.interpolate(alpha);
      }
    }

    this.view.render();
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Connected to server");
      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
    };

    this.socket.onmessage = (e) => {
      this.lastServerUpdate = performance.now();

      const dataServ = JSON.parse(e.data);
      this.game.update(dataServ);
    };
  }

  initInput() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z" || e.key === "ArrowUp") this.inputState.up = true;
      else if (e.key === "q" || e.key === "ArrowLeft")
        this.inputState.left = true;
      else if (e.key === "d" || e.key === "ArrowRight")
        this.inputState.right = true;
      else if (e.key === "s" || e.key === "ArrowDown")
        this.inputState.down = true;
      else if (e.key === " " || e.key === "SPACE")
        this.inputState.attack = true;
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "z" || e.key === "ArrowUp") this.inputState.up = false;
      else if (e.key === "q" || e.key === "ArrowLeft")
        this.inputState.left = false;
      else if (e.key === "d" || e.key === "ArrowRight")
        this.inputState.right = false;
      else if (e.key === "s" || e.key === "ArrowDown")
        this.inputState.down = false;
      else if (e.key === " ") this.inputState.attack = false;
    });
  }

  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(
          JSON.stringify({ type: "input", input: this.inputState }),
        );
      }
    }, this.SERVER_INTERVAL);
  }
}
