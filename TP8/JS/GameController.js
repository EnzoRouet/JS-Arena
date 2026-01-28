import { Game } from "./Game.js";

class GameController {
  constructor() {
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;
    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    this.game = new Game();
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
    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);

    this.initInput();
    this.initSocket();
    this.startInputSender();
  }

  // === Main render loop ===
  loop(timestamp) {
    // Request the next frame
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
      const dataServ = JSON.parse(e.data);
      this.game.update(dataServ);
    };
  }

  initInput() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z" || e.key === "ArrowUp") {
        this.inputState.up = true;
      } else if (e.key === "q" || e.key === "ArrowLeft") {
        this.inputState.left = true;
      } else if (e.key === "d" || e.key === "ArrowRight") {
        this.inputState.right = true;
      } else if (e.key === "s" || e.key === "ArrowDown") {
        this.inputState.down = true;
      } else if (e.key === " ") {
        this.inputState.attack = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "z" || e.key === "ArrowUp") {
        this.inputState.up = false;
      } else if (e.key === "q" || e.key === "ArrowLeft") {
        this.inputState.left = false;
      } else if (e.key === "d" || e.key === "ArrowRight") {
        this.inputState.right = false;
      } else if (e.key === "s" || e.key === "ArrowDown") {
        this.inputState.down = false;
      } else if (e.key === " ") {
        this.inputState.attack = false;
      }
    });
  }

  startInputSender() {
    setInterval(() => {
      if (WebSocket.OPEN !== this.socket.readyState) {
        return;
      } else {
        this.socket.send(
          JSON.stringify({
            type: "input",
            input: this.inputState,
          }),
        );
      }
    }, this.SERVER_INTERVAL);
  }
}
// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
const myGame = new GameController();
