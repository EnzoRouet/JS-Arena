import Game from "./JS/Game.js";
import GameView from "./JS/GameView.js";
import GameController from "./JS/GameController.js";

const game = new Game();
const gameView = new GameView(game);
const gameController = new GameController(game, gameView);
