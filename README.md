# 🎮 Battle Royale JS - Multiplayer Web Engine (MVC Architecture)

**Projet académique fil rouge** réalisé durant mon Bachelor Full Stack.
Développement d'un moteur de jeu multijoueur en temps réel, structuré selon le pattern **MVC** pour séparer la logique métier du rendu graphique. Ce projet démontre une capacité à concevoir des systèmes complexes et synchronisés en environnement asynchrone.

## 🎯 Contexte & Objectifs Pédagogiques

Ce projet a été structuré en 10 Travaux Pratiques (TP), simulant un cycle de production réel. La particularité résidait dans le **développement découplé** : le client a été entièrement conçu avant la mise à disposition du backend (TP6), imposant une modularité rigoureuse et l'utilisation de données simulées (Mocks).

**Objectifs validés :**

- Implémentation du pattern **MVC** (Modèle-Vue-Contrôleur) en JavaScript natif.
- Manipulation de **Spritesheets** : Découpage dynamique et animation de personnages sur Canvas.
- Communication asynchrone (Fetch API) avec un backend **Uvicorn/FastAPI**.
- Débuggage et optimisation d'une base de données relationnelle **SQLite**.

## 🛠️ Stack Technique

- **Frontend :** JavaScript Vanilla (ES6+), HTML5 Canvas, CSS3.
- **Backend :** Python (FastAPI), SQLite (`game.db`).
- **Serveur :** Uvicorn (ASGI server).
- **Architecture :** Programmation Orientée Objet (Classes `Game`, `Player`, `GameController`).

## 🏗️ Focus Architecture : Le Pattern MVC

Pour garantir la maintenabilité malgré l'absence initiale de serveur, le projet suit une séparation stricte des responsabilités :

1. **Le Modèle (`Game.js`, `Player.js`)** : Gère l'état pur du jeu (coordonnées, points de vie, inventaire) et les règles de collision. Il est totalement indépendant de l'affichage.
2. **La Vue (`GameView.js`)** : Observe le Modèle et s'occupe exclusivement du rendu graphique (dessin des sprites, décors, effets visuels).
3. **Le Contrôleur (`GameController.js`)** : Intercepte les entrées utilisateur (clavier/souris) et orchestre les mises à jour du Modèle en fonction des retours du serveur.

## ✨ Fonctionnalités Développées

### 1. Moteur d'Animation de Sprites

Le moteur JavaScript découpe dynamiquement les planches de sprites (Spritesheets) stockées dans les assets. Les animations (marche, repos, actions) sont synchronisées avec le cycle de rafraîchissement du jeu (Game Loop).

### 2. Dashboard & Persistance

Interface complète de gestion de profil (`dashboard.html`) permettant de choisir son skin et de consulter ses statistiques, le tout relié au backend Python pour la persistance des données.

### 3. Synchronisation Multi-Joueurs (Uvicorn)

Gestion des flux de données en temps réel. Le client communique avec un serveur asynchrone performant capable de gérer les interactions simultanées de plusieurs dizaines de joueurs.

## 🧠 Challenges Techniques Résolus

### Développement "API-First" et Isolation

Le plus grand défi a été de coder la logique de jeu sans backend disponible durant 60% du projet.

- **Solution :** Grâce au MVC, j'ai pu tester toute la logique de déplacement dans le Modèle avec des données fictives. Lors de l'arrivée du backend au TP6, l'intégration a été quasi instantanée car seule la couche de données du Contrôleur a dû être adaptée.

### Optimisation des accès Concurrents (SQLite)

Lors des tests en charge, le serveur Python présentait des bugs de verrouillage de base de données.

- **Solution :** Analyse du code `db.py` et optimisation des requêtes SQL pour assurer que les écritures de scores et de positions ne bloquent pas le serveur Uvicorn.

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
