# 🏰 Dungeon & Dragons

Le déploiement continu est une pratique de développement logiciel où les modifications du code sont automatiquement testées et déployées en production sans intervention humaine, permettant ainsi une livraison rapide et fiable des nouvelles fonctionnalités aux utilisateurs.

Dans le cadre du cours sur le déploiement continu suivi à l'IMT Mines Alès, notre binôme avons développé l'application "Dungeon & Dragons". Ce projet consistait notamment à créer une application web avec un front end et un back end, avec pour principal objectif de mettre en place la conteneurisation et un déploiement continu en automatisant l'intégration via GitHub Actions.

## Fonctionnalités

- 🎢 **Obtenir un personnage aléatoire**
- ⚔️ **Comparer deux classes**

---

## Installation

### Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- **Node.js** : [Télécharger Node.js](https://nodejs.org/)
- **Docker** : [Télécharger Docker](https://www.docker.com/get-started)
- **Docker Compose** : [Télécharger Docker Compose](https://docs.docker.com/compose/install/)

### Cloner le projet

```bash
git clone https://github.com/MagicIrfan/projet-cicd.git
```

### Lancer avec Docker Compose

```bash
cd projet-cicd
docker-compose up --build
```

### Lancer les tests

#### Backend
  - Construire le backend :
    ```bash
    cd backend
    npm install
    npm run build
    ```
  - Executer les tests :
    ```bash
    npm run test
    ```
    
#### Frontend (avec Cypress) 
  - Construire le frontend :
    ```bash
    cd frontend
    npm install
    npm run build
    ```
  - Lancer le frontend :
    ```bash
    npm run dev
    ```
  - Exécuter Cypress :
    ```bash
    npx cypress open
    ```

---

## Endpoints

| Méthode | Route                 | Description                                     | Réponse attendue |
|---------|----------------------|---------------------------------|----------------|
| **GET** | `/characters/random` | Récupère un personnage aléatoire | `{ name: "Guerrier", race: "Elfe", classe: "Mage" }` |
| **GET** | `/classes/compare?class1=warrior&class2=wizard` | Compare deux classes et retourne leurs caractéristiques | `{ class1: { name: "Warrior", hitPoints: 12, ... }, class2: { name: "Wizard", hitPoints: 6, ... } }` |
| **GET** | `/classes` | Liste les noms des classes disponibles | `["Warrior", "Wizard", "Rogue", "Cleric"]` |

---

## Gestion des erreurs

| Cas d'erreur | Code HTTP | Réponse attendue |
|-------------|----------|----------------|
| Erreur interne | `500` | `{ "error": "Internal server error" }` |
| Comparaison de classes sans paramètre | `400` | `{ "error": "Two classes must be specified." }` |
| Classe introuvable | `404` | `{ "error": "Class not found: NomClasse" }` |
| Données invalides depuis l’API externe | `500` | `{ "error": "Invalid data format received from /api/classes" }` |

---

## Technologies utilisées

- **Backend** : Node.js + Express, Disponible sur le port `8080`
- **Frontend** : React + Vite, Disponible sur le port `5173`
- **Tests** : Jest côté back et Cypress coté front
- **API utilisée** : [DnD 5e API](https://www.dnd5eapi.co/)
- **CI/CD** : GitHub Actions
- **Containerisation** : Docker

---

## Visuel

### Générateur de personnage aléatoire
![Générateur de personnage aléatoire](https://private-user-images.githubusercontent.com/57560785/411749838-742d9ec4-1848-4ae5-a18d-bc7a68be27db.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkyMjM1MDksIm5iZiI6MTczOTIyMzIwOSwicGF0aCI6Ii81NzU2MDc4NS80MTE3NDk4MzgtNzQyZDllYzQtMTg0OC00YWU1LWExOGQtYmM3YTY4YmUyN2RiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjEwVDIxMzMyOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWE3ZDk0MDYxZjU4YmZlYjAzZWU3ZTA5ZGYxMzAyZTJlMTI3NjAzNGIwM2FiMmVlNjUxYzEzMzY1MjRmODFjN2YmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.s-ybJbI4JXt6GILKlxcYvYegaUiEZ_o7_tnG6kpkrOI)
### Comparateur de classes
![Comparateur de classes](https://private-user-images.githubusercontent.com/57560785/411749836-77abf0eb-98e3-4c65-9463-1230a702b93a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzkyMjM1MDksIm5iZiI6MTczOTIyMzIwOSwicGF0aCI6Ii81NzU2MDc4NS80MTE3NDk4MzYtNzdhYmYwZWItOThlMy00YzY1LTk0NjMtMTIzMGE3MDJiOTNhLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAyMTAlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMjEwVDIxMzMyOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJhODQ0MjRmOGE0ODViZTZjM2YxMDBkNWZkZjljYTRlZDc4Yjc3ZWY0M2UwOGMwY2RiNzhkMjk3M2JlZmVjNDAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.R2loLNL5QvBzfukJGYinfJS9Dw13TbBKHwy5Zccttdk)

---

## Auteurs

Irfan BOUHENAF et Rayan BELKESSAM

---



