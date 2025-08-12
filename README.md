# Locn'Go - Frontend (Angular 19)

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 19.x.

## 🚀 Démarrage rapide

### Prérequis
- Node.js >= 22.x
- Yarn ou npm

### Installation
```bash
yarn install
# ou
npm install
```

### Lancer en développement
```bash
yarn start
# ou
npm start
```
Par défaut, l'application est disponible sur [http://localhost:4200/](http://localhost:4200/) et se recharge automatiquement lors des modifications de fichiers.

### Build pour la production
```bash
yarn build
# ou
npm run build
```
Les fichiers de build seront stockés dans le dossier `dist/`.

### Génération de code
```bash
ng generate component component-name
# ou
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## 🏗️ Architecture
- Standalone components
- Routing par feature + lazy loading
- State management avec Angular signals/store
- Interceptors pour auth et gestion des erreurs
- Design : Angular Material 19, responsive, accessibilité RGAA

## 🔐 Authentification & Rôles
- OIDC/JWT avec interceptor et guards (RENTER/OWNER/ADMIN)
- Rafraîchissement automatique du token

## 🧪 Tests
### Unitaires
```bash
yarn test
# ou
npm test
```
Exécutés via Jest ou Karma selon configuration.

### End-to-end
```bash
yarn e2e
# ou
npm run e2e
```
Exécutés via Playwright ou Cypress.

## 📈 Performance
- Budgets Angular configurés
- Route preloading
- `trackBy` et `OnPush` pour optimiser le rendu
- Lighthouse/Web Vitals en CI

## 🔁 CI/CD
- GitHub Actions : install → lint → tests → build → artefacts
- Versionning avec Conventional Commits + CHANGELOG.md

## ♿ Accessibilité & i18n
- Labels ARIA, navigation clavier, contraste AA
- i18n (fr/en), dates/nombres localisés

## 🛠️ Supervision
- Capture des erreurs JS (ex: Sentry)
- Dashboard uptime (pages clés)

## 📚 Documentation & Scripts
- README + captures
- Scripts : `start`, `build`, `test`, `e2e`, `lint`, `format`
