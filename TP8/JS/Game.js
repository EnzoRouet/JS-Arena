import { Player } from "./Player.js";

export class Game {
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
              console.log(gameStateFromServer.players[id][keys]);
            }
          } else {
            // Sinon ca veut dire que tu n'as pas en local tous les players et tu en crée un.
            this.players[id] = new Player(
              gameStateFromServer[id],
              gameStateFromServer.players[id].name,
              gameStateFromServer.players[id].skinPath,
              gameStateFromServer.players[id].position
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

// Exemple de message recu par le backend, à utiliser pour vos tests :
const backendData = {
  isRunning: true,
  isOver: false,
  timer: 190.6000000000091,
  players: {
    "3cd71bbb-6a6b-4d4e-80e3-107130328a27": {
      name: "blabla",
      skinPath: "./spritesheets/3.png",
      position: [0.5600000000000003, 0.17999999999999977],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 3,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
    "28ead291-fcea-4b41-a596-d3c876c49a53": {
      name: "bloublou",
      skinPath: "./spritesheets/4.png",
      position: [0.44, 0.19],
      lvl: 1,
      hp: 100,
      maxHp: 100,
      hpRegenRate: 10,
      speed: 0.2,
      direction: 0,
      isAttacking: false,
      isWalking: false,
      isDying: false,
      attackCooldown: 1,
      currentAttackCooldown: 0,
    },
  },
};

// console.log("==========Instance de la Game 1==========");

// const game1 = new Game();
// game1.update(backendData);
// console.log(structuredClone(game1));

// console.log("==========MetaData Test==========");
// backendData.isOver = true;
// backendData.timer = 192;
// backendData.players["28ead291-fcea-4b41-a596-d3c876c49a53"].name =
//   "MetaDataTEST";
// backendData.players["3cd71bbb-6a6b-4d4e-80e3-107130328a27"].hp = 2;
// game1.update(backendData);
// console.log(structuredClone(game1));

// console.log("==========AddPlayer Test==========");
// const newPlayer = "new-player-666";

// backendData.players[newPlayer] = {
//   name: "Le Petit Nouveau",
//   skinPath: "./assets/1.png",
//   position: [0.5, 0.5],
//   lvl: 1,
//   hp: 100,
//   maxHp: 100,
//   hpRegenRate: 10,
//   speed: 0.2,
//   direction: 1,
//   isAttacking: false,
//   isWalking: true,
//   isDying: false,
//   attackCooldown: 1,
//   currentAttackCooldown: 0,
// };

// game1.update(backendData);
// console.log(structuredClone(game1));

// console.log("==========DeletePlayer Test==========");

// delete backendData.players[newPlayer];
// game1.update(backendData);
// console.log(structuredClone(game1));
