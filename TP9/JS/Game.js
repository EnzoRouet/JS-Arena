import Player from "./Player.js";

export default class Game {
  constructor() {
    this.isRunning = false;
    this.isOver = false;
    this.timer = 0;
    this.players = {};
  }

  update(gameStateFromServer) {
    // On met les métadonnées a jour
    for (let key in gameStateFromServer) {
      // Si le truc qu'on récupère c'est pas players:{"..."}
      if (key !== "players") {
        this[key] = gameStateFromServer[key]; // On met a jour le reste des métadonnées
      }
      // Si le truc qu'on récupère c'est players:{"..."}
      if (key === "players") {
        // On récupère les id donné par le serveur
        for (let id in gameStateFromServer.players) {
          // On vérifie si ces id sont dans le local => le local c'est this.player !
          if (id in this.players) {
            // Si oui on met a jour en reprenant les données du serveur et on les attributs au local
            for (let keys in gameStateFromServer.players[id]) {
              this.players[id][keys] = gameStateFromServer.players[id][keys];
              // console.log(gameStateFromServer.players[id][keys]);
            }
            this.players[id].update(gameStateFromServer.players[id]);
          } else {
            // Sinon ca veut dire que tu n'as pas en local tous les players et tu en crée un.
            this.players[id] = new Player(
              gameStateFromServer[id],
              gameStateFromServer.players[id].name,
              gameStateFromServer.players[id].skinPath,
              gameStateFromServer.players[id].position,
            );
          }
        }
      }
      // On récupère l'id des players en local
      for (let id in this.players) {
        // Si on a pas cet id dans le serveur alors on le dégage
        if (!(id in gameStateFromServer.players)) {
          delete this.players[id];
        }
      }
    }
  }
}
