const form = document.querySelector("form");
const selectPlayer = document.getElementById("player-select");
let interval = false;
let currentSort = "gamesPlayed";

form.addEventListener("submit", Dashboard);

selectPlayer.addEventListener("change", updatePlayerStats);

async function Dashboard(e) {
  e.preventDefault();
  console.log("Démarrage du Dashboard...");

  initTableSorting();

  await updatePlayerList();

  await updateRanking();

  setDashboard();
}

function initTableSorting() {
  const sortableHeaders = document.querySelectorAll("th[data-sort]");

  sortableHeaders.forEach((th) => {
    th.style.cursor = "pointer";

    th.addEventListener("click", () => {
      const criteria = th.dataset.sort;

      console.log("Tri changé pour :", criteria);
      currentSort = criteria;
      updateRanking();
    });
  });
}

async function loadPlayers() {
  let players = [];
  try {
    const IP_Port = IP.value;
    const EndPoint = `http://${IP_Port}/api/listPlayers`;

    const response = await fetch(EndPoint);

    if (!response.ok) {
      throw new Error(`Erreur Nom : ${response.status}`);
    }

    const data = await response.json();

    for (let object in data) {
      players.push(data[object].name);
    }

    // console.log(players);
    return players;
  } catch (err) {
    console.error(err);
  }
}

async function loadPlayerStats(name) {
  const IP_Port = IP.value;
  try {
    const EndPoint = `http://${IP_Port}/api/stats?name=${name}`;

    const response = await fetch(EndPoint);

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const data = await response.json();

    // console.log(data);

    return data;
  } catch (err) {
    console.error(err);
  }
}

async function loadRanking() {
  try {
    const data = await loadPlayers();

    const promiseDataPlayer = data.map((playerName) =>
      loadPlayerStats(playerName),
    );

    const dataPlayer = await Promise.all(promiseDataPlayer);

    // console.log("Classement général :", dataPlayer);
    return dataPlayer;
  } catch (err) {
    console.error(err);
  }
}

async function setDashboard() {
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    updatePlayerStats();
    updateRanking();
  }, 5000);
}

async function updatePlayerList() {
  const names = await loadPlayers();
  const option = document.getElementById("player-select");

  option.innerHTML = "";

  option.innerHTML += ` <option value=""></option>`;

  if (!names) {
    return;
  }

  names.map((playerName) => {
    const options = document.createElement("option");

    options.textContent = playerName;
    options.value = playerName;

    option.appendChild(options);
  });
}

async function updatePlayerStats() {
  const options = document.getElementById("player-select");
  const container = document.getElementById("player-stats-container");
  const select = options.value;

  if (!select) {
    container.classList.add("disable");
    return;
  } else {
    container.classList.remove("disable");
  }

  const data = await loadPlayerStats(select);

  document.getElementById("stat-name").textContent = data.name;
  document.getElementById("stat-kills").textContent = data.totalKills;
  document.getElementById("stat-deaths").textContent = data.totalDeaths;
  document.getElementById("stat-ratio").textContent = data.kdRatio;
  document.getElementById("stat-last-rank").textContent = data.lastGameRank;
  document.getElementById("stat-avg-rank").textContent = data.overallRanking;
  document.getElementById("stat-games").textContent = data.gamesPlayed;
}

async function updateRanking() {
  const body = document.getElementById("ranking-body");
  const selectedPlayerName = document.getElementById("player-select").value;
  const data = await loadRanking();

  body.innerHTML = "";

  data.sort((a, b) => {
    // On vérifie si c'est un nombre
    if (typeof a[currentSort] === "number") {
      // On vérifie si notre classement au niveau des rank,
      // dans ce cas c'est le plus petit qu'on veut car première position < dernière position en chiffre
      if (currentSort === "lastGameRank" || currentSort === "overallRanking") {
        return a[currentSort] - b[currentSort];
      }
      // Si c'est pas le classement ca veut dire que c'est le KD ou le nb de mort et dans ce cas on veut le plus grand
      return b[currentSort] - a[currentSort];
    }
    // Sinon c'est pas un nombre et donc on fait un tri alphabétique croissant
    return a[currentSort].localeCompare(b[currentSort]);
  });

  data.map((player, index) => {
    const highlightClass =
      player.name === selectedPlayerName ? "selected-row" : "";
    body.innerHTML += `
      <tr class="${highlightClass}">
       <td>#${index + 1}</td>      <td>${player.name}</td>
        <td>${player.totalKills}</td>
        <td>${player.totalDeaths}</td>
        <td>${player.kdRatio}</td>
        <td>${player.lastGameRank}</td>
        <td>${player.overallRanking}</td>
        <td>${player.gamesPlayed}</td>
      </tr>
    `;
  });
}
