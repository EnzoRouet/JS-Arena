# 🎮 Battle Royale JS - Multiplayer Web Engine

**Projet académique fil rouge** réalisé durant mon Bachelor Full Stack.
Développement d'un moteur de jeu multijoueur en temps réel, intégrant un système de sprites animés et une synchronisation serveur asynchrone via Uvicorn.

## 🎯 Contexte & Objectifs Pédagogiques

Ce projet a été structuré en 10 Travaux Pratiques (TP), simulant un cycle de production réel. La particularité du projet résidait dans le **découplage Frontend/Backend** : le client a été développé "à l'aveugle" jusqu'au TP6, nécessitant une architecture modulaire pour intégrer tardivement le serveur Python.

**Objectifs validés :**

- Architecture de code asynchrone (Promises, Async/Await) pour les échanges API.
- Gestion d'un **Dashboard utilisateur** avec authentification et portail de connexion.
- Manipulation de **Spritesheets** : Découpage et animation de personnages en JavaScript.
- Débuggage et adaptation d'un backend existant (Python/FastAPI) pour assurer la stabilité des sessions.
- Déploiement et exécution d'un serveur asynchrone via **Uvicorn**.

## 🛠️ Stack Technique

- **Frontend :** JavaScript Vanilla (ES6+), HTML5, CSS3.
- **Backend :** Python (Moteur de jeu asynchrone), SQLite (`game.db`).
- **Serveur :** Uvicorn (ASGI server).
- **Architecture :** Programmation Orientée Objet (Classes `Game`, `Player`, `GameController`).

## ✨ Structure du Projet

L'application sépare la logique métier, le rendu et la persistance :

### 1. Moteur de Jeu & Contrôle (`Game.js`, `GameController.js`)

Gestion du cycle de vie du jeu (Game Loop) et interception des entrées clavier/souris pour piloter les actions du joueur.

- `Game.js` : Orchestre l'état global du monde.
- `Player.js` : Gère les propriétés individuelles (position, santé, skin).

### 2. Gestion des Ressources (Assets)

Utilisation de **Spritesheets** complexes. Le moteur JavaScript découpe dynamiquement les planches de sprites pour animer les déplacements et les actions des joueurs de manière fluide.

### 3. Backend Asynchrone (`main.py`, `db.py`)

Point d'entrée Python gérant la base de données SQLite pour stocker les scores et les profils. Le serveur est optimisé pour traiter plusieurs requêtes simultanées grâce à Uvicorn.

## 🏗️ Architecture : Développement en Isolation

Le défi de coder sans backend pendant 60% du projet a imposé une structure "Plug & Play" :

- **Abstraction des données :** Création d'interfaces de données fictives (Mocks) pour simuler les réponses du serveur.
- **Découplage :** Utilisation de classes indépendantes pour que l'intégration finale du backend au TP6 ne nécessite pas de réécrire toute la logique graphique.

## 🧠 Challenges Techniques Résolus

### Synchronisation Client/Serveur Asynchrone

Gérer les délais de réponse du serveur sans bloquer l'animation du jeu côté client.

- **Solution :** Implémentation de patterns asynchrones robustes dans `GameController.js` pour mettre à jour les positions uniquement lors de la réception des paquets valides.

### Débogage du Backend (Uvicorn/Python)

L'intégration du backend a révélé des instabilités lors des pics de connexion de la promotion.

- **Solution :** Analyse du code `main.py` et correction des requêtes SQL dans `db.py` pour éviter les verrous (locks) sur la base de données `game.db` lors des accès concurrents.

## ⚙️ Installation & Lancement

1. **Cloner le dépôt :**

   ```bash
   git clone [https://github.com/EnzoRouet/JS-Arena]
   ```

2. **Lancer le backend :**

```Bash
pip install uvicorn fastapi
python main.py
# Ou via uvicorn : uvicorn main:app --reload
```

3. **Lancer le client :**
   Ouvrez portail.html via Live Server.
