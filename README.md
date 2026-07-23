# ACHRAF-CAR - Plateforme de Location de Voitures Luxe

Ce projet est une application web moderne pour la location de voitures de luxe, développée avec React, Vite et Tailwind CSS.

## Déploiement sur GitHub Pages

Pour déployer ce projet sur GitHub Pages, suivez ces étapes :

1.  **Configuration de Vite** : Assurez-vous que le champ `base` dans `vite.config.ts` correspond au nom de votre dépôt GitHub.
    ```typescript
    // vite.config.ts
    export default defineConfig({
      base: "/votre-nom-de-depot/",
      // ... reste de la config
    });
    ```
2.  **Build** : Générez les fichiers statiques.
    ```bash
    npm install
    npm run build
    ```
3.  **Déploiement** : Poussez le contenu du dossier `dist` vers la branche `gh-pages` ou configurez GitHub Actions pour le faire automatiquement.

## Nettoyage effectué

- Suppression des dépendances et scripts spécifiques à l'environnement de développement Manus.
- Nettoyage du fichier `package.json` et `vite.config.ts`.
- Suppression des fichiers de logs et des dossiers de serveur non nécessaires pour un déploiement statique.
- Ajout d'un fichier `.nojekyll` pour assurer le bon chargement des fichiers par GitHub Pages.

## Technologies utilisées

- **Frontend** : React 19, Vite, Tailwind CSS
- **UI Components** : Radix UI, Lucide React, Framer Motion
- **Formulaires** : React Hook Form, Zod
- **Animations** : Tailwind CSS Animate
