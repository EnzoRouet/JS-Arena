import Game from "./Model/Game.js";
import GameView from "./Vue/GameView.js";
import GameController from "./Controller/GameController.js";

const game = new Game();
const gameView = new GameView(game);
const gameController = new GameController(game, gameView);
