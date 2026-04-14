# Guide de demarrage - Gestion des etudiants

Ce document explique comment lancer l'application en local sur Windows (PowerShell).

## 1. Prerequis

- Python installe
- Node.js et npm installes
- Le projet deja clone

## 2. Lancer le backend Django

Placez-vous a la racine du projet :

    cd "C:\Users\Idea\Documents\Projects Code\Application complète de gestion des étudiants"

Activez l'environnement virtuel :

    .\.venv\Scripts\Activate.ps1

Installez les dependances Python (si necessaire) :

    pip install -r requirements.txt

Appliquez les migrations :

    python manage.py makemigrations
    python manage.py migrate

Lancez le serveur Django :

    python manage.py runserver

Backend disponible sur :
- http://127.0.0.1:8000/
- API : http://127.0.0.1:8000/api/students/
- Admin : http://127.0.0.1:8000/admin/

## 3. Lancer le frontend React

Ouvrez un deuxieme terminal PowerShell.

Placez-vous dans le dossier frontend :

    cd "C:\Users\Idea\Documents\Projects Code\Application complète de gestion des étudiants\frontend"

Installez les dependances npm (si necessaire) :

    npm install

Lancez le serveur de developpement Vite :

    npm run dev

Frontend disponible sur :
- http://localhost:5173/

## 4. Demarrage rapide (resume)

Terminal 1 (backend):

    .\.venv\Scripts\Activate.ps1
    python manage.py migrate
    python manage.py runserver

Terminal 2 (frontend):

    cd frontend
    npm run dev

## 5. Creation d'un compte administrateur (optionnel)

    python manage.py createsuperuser

Ensuite connectez-vous sur :
- http://127.0.0.1:8000/admin/

## 6. Verification rapide

- Le backend repond sur http://127.0.0.1:8000/api/students/
- Le frontend repond sur http://localhost:5173/
- La liste des etudiants se charge sans erreur

## 7. Problemes frequents

1. Erreur PowerShell sur l'activation du venv

    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
    .\.venv\Scripts\Activate.ps1

2. Port deja utilise

- Django : changer le port

    python manage.py runserver 8001

- Vite :

    npm run dev -- --port 5174

3. Erreur CORS

- Verifiez que le frontend tourne bien sur http://localhost:5173/
- Verifiez la configuration CORS dans les settings Django
