# Locn'Go - Frontend (Angular 19)

Ce projet a été généré avec [Angular CLI](https://github.com/angular/angular-cli) version 19.x.
# Accès au site web
- https://app-locngo.com
# 📌 À propos du projet (Frontend)

**Locn’Go** est une application de **location de logements en montagne de particulier à particulier**.  
Ce dépôt correspond à la **partie Frontend** de l’application, développée avec **Angular 19** (standalone components) et **Angular Material**.

Il fournit l’interface utilisateur pour :
- **Parcourir et rechercher** des logements (filtres, tri, détails d’un lieu).
- **Gérer l’authentification** (JWT côté front : guards, interceptors, rôle-based UI : USER / PROPRIETAIRE / ADMIN).
- **Initier le processus de réservation** et consulter son espace utilisateur.

Le frontend **consomme l’API Locn’Go** (backend) via des **services Angular** et des **interceptors** (auth, erreurs, retry).

Qualité et performance :
- **Lazy loading** des modules et **state management avec signals/store**.
- **Budgets Angular** configurés pour surveiller les performances.
- **Accessibilité** (navigation clavier, contraste AA).
- **Internationalisation** (fr/en).
- **Respect des bonnes pratiques Angular** (architecture en features, composants standalone, OnPush, trackBy, code stylé ESLint).

---

# ⚙️ Installation & exécution en local

## Prérequis
- **Node.js ≥ 22.x** (recommandé via `nvm`)
- **Yarn** ou **npm**
- (Optionnel) **Angular CLI** local via `npx` — pas besoin d’installation globale

### Vérifier / installer Node avec nvm
```bash
nvm install 22
nvm use 22
node -v
```

## Installation des dépendances
```bash
# avec Yarn
yarn install

# ou avec npm
npm install
```

## Variables d'environnement
Le projet utilise les fichiers Angular `environment` pour les configurations (API, i18n, sentry, etc.).

- **Développement** : `src/environments/environment.ts`
- **Production** : `src/environments/environment.prod.ts`

Exemple de configuration :
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

> ℹ️ En CI/CD, ces valeurs sont injectées au build (voir section CI/CD).  
> Évitez de committer des secrets : utilisez des **secrets GitHub** et un script d’injection au build si nécessaire.

## Lancer l’application (dev)
```bash
# avec Yarn
yarn start

# ou avec npm
npm start
```
Par défaut, l’app est disponible sur **http://localhost:4200/** avec rechargement à chaud.

## Build production
```bash
# Yarn
yarn build

# npm
npm run build
```
Les artefacts sont générés dans `dist/`.

## Qualité du code & scripts utiles
```bash
# Lint
yarn lint            # ou: npm run lint

# Format (Prettier)
yarn format          # ou: npm run format

# Tests unitaires
yarn test            # ou: npm test
```

## Dépannage (FAQ rapide)
- **Erreur de version Node** → vérifiez `node -v` (>= 22) et `nvm use 22`.
- **Problème de ports** → l’app Angular utilise 4200 ; changez avec `--port=4300`.
- **CORS en dev** → assurez-vous que l’API backend autorise `http://localhost:4200`.  

---
# 📂 Contenu du repository & conventions

## Structure principale
Le dépôt est organisé de manière à séparer clairement les responsabilités :
- `src/app/` → cœur de l’application Angular
  - `components/` → modules fonctionnels (logements, réservations, utilisateurs)
  - `core/` → services globaux (auth, interceptors, guards)
- `assets/` → ressources statiques (images, i18n, styles globaux)
- `environments/` → configuration spécifique (dev/prod)
- `tests/` → scénarios unitaires

## Conventions de code
- **Linting & formatage** : ESLint (règles Angular & TypeScript strictes)
- **Commits** : respect des **Conventional Commits**
- **Nommage** : kebab-case pour composants (`app-user-card`), camelCase pour services et variables
- **Architecture** : Angular standalone components + routing par feature + lazy loading

## Protections du repo

Le repository est configuré avec des règles de protection afin de garantir la stabilité et la qualité du code.

### 🔒 Branch rules
Les règles suivantes s’appliquent aux branches **main**, **master** et **develop** :
- ✅ Restriction de création : seules les personnes autorisées peuvent créer ces branches
- ✅ Restriction de suppression : impossible de supprimer sans droit spécial
- ✅ PR obligatoire avant merge
- ✅ Vérification des statuts CI obligatoire avant merge (lint, tests, build)
- ❌ Force push interdit
- ❌ Mises à jour directes interdites

### 🏷️ Tag rules
Les tags versionnés (`v*`, ex : `v1.0.0`, `v1.1.0`) sont également protégés :
- ✅ Création restreinte
- ✅ Mise à jour restreinte
- ✅ Suppression restreinte
- ✅ Force push interdit

> ⚠️ **Accessibilité pour l’évaluation** :  
> Le repo est en **mode public** afin de faciliter la relecture et l’évaluation.  
> Les secrets de production (API keys, DSN Sentry, etc.) **ne sont pas commités** : seuls des placeholders ou des valeurs locales sont présents.

## Sécurité appliquée au code
- **Authentification JWT** (interceptor HTTP pour les requêtes sortantes)
- **Guards de rôles** (USER / PROPRIETAIRE / ADMIN)
- **Gestion centralisée des erreurs** via interceptors
- **Dépendances surveillées** et mises à jour régulières (npm audit)
- **CORS contrôlé** côté backend pour limiter les origines autorisées  

---
# 🔁 Intégration Continue & Déploiement (CI/CD)

Les workflows **GitHub Actions** sont dans `.github/workflows/` :

- `lint.yml` – **Lint (ESLint)**
- `test-frontend.yml` – **Tests unitaires (Karma/ChromeHeadless) + couverture**
- `publish-ecr-on-tag.yml` – **Build & push Docker vers AWS ECR** à la création d’un **tag SemVer** (`v*`)

---

## 1) Lint (ESLint) — `lint.yml`

**Déclencheurs**
- `push` & `pull_request` sur `develop`, `master`, `main`
- Filtré sur fichiers front : `**/*.ts`, `**/*.html`, `package.json`, `angular.json`, `.eslintrc*`

**Environnement**
- `ubuntu-latest`, **Node 22**, cache npm (`actions/setup-node@v4`)

**Étapes**
1. Checkout (`actions/checkout@v4`)
2. Install deps **ci** : `npm ci`
3. Lint : `npm run lint`

**Concurrence**
- `concurrency: lint-${{ github.ref }}` (annule les runs en cours sur la même ref)

**Objectif**
- Empêcher l’introduction d’erreurs de style/qualité avant merge PR (aligné aux règles de protection de branches).

---

## 2) Tests Frontend — `test-frontend.yml`

**Déclencheurs**
- `push` sur `develop`, `main`, `master`, et `feature/**`
- `pull_request` sur `develop`, `main`, `master`

**Environnement**
- `ubuntu-latest`, **Node 20** (cache npm), Chrome headless (via `browser-actions/setup-chrome@v1`)
> ℹ️ Remarque : Node 20 est utilisé ici pour la compatibilité out-of-the-box avec Karma/ChromeHeadless.  
> Recommandation : aligner vers Node 22 quand la stack de test est validée avec 22.

**Étapes**
1. Checkout
2. `npm ci`
3. Setup Chrome (stable)
4. **Tests unitaires** (Karma + ChromeHeadless) :
   ```bash
   npx ng test --watch=false --browsers=ChromeHeadless --progress=false --code-coverage
   ```
5. **Artefacts** : upload de `coverage/` (`actions/upload-artifact@v4`)

**Concurrence**
- `concurrency: test-frontend-${{ github.ref }}` (annule les runs redondants)

**Objectif**
- Garantir la non-régression via tests, produire un **rapport de couverture** exploitable dans les Actions.

---

## 3) Publication Docker sur AWS ECR — `publish-ecr-on-tag.yml`

**Déclencheur**
- `push` sur **tags** `v*` (ex. `v1.0.0`, `v1.0.5`)

**Sécurité / Guards**
- **Validation SemVer** du tag
- **Vérifie que le commit taggé est sur `main`** (empêche les releases depuis d’autres branches)

**Secrets requis**
- `AWS_REGION`, `AWS_ACCOUNT_ID`, `ECR_REPOSITORY`
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`

**Environnement**
- `ubuntu-latest`, `environment: prod`
- Login ECR (`aws-actions/amazon-ecr-login@v2`)
- QEMU + Buildx
- **Build & push** Docker (amd64) avec cache GHA :
  - Tags poussés :
    - `${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${{ github.ref_name }}`
    - `${...}/:latest`

**Concurrence**
- `concurrency: publish-ecr-${{ github.ref }}` (pas d’annulation en cours, pour ne pas interrompre une release)

**Objectif**
- Générer une **image Docker traçable** (taguée par version SemVer) et la publier dans **AWS ECR** pour déploiement.

---

## ✅ Politique qualité & protections (rappel)

- **Branches `main/master/develop` protégées** : PR obligatoire + **status checks requis** (lint/tests).
- **Tags `v*` protégés** : création/mise à jour/suppression restreintes + **force-push interdit**.
- La publication en **prod** ne peut se faire **que depuis `main`** via un **tag SemVer** validé.

---

## 📍 Où voir les résultats ?
- Onglet **Actions** du repo → détails des jobs, artefacts (ex. couverture), journaux.
- ECR : images `:vX.Y.Z` et `:latest` pour consommation par l’environnement de déploiement.

---
## 🔑 Gestion des secrets

Pour des raisons de sécurité, les identifiants sensibles nécessaires au déploiement (AWS, ECR) **ne sont jamais commités dans le code**.  
Ils sont stockés en tant que **Environment Secrets GitHub** (`prod`) et injectés automatiquement dans les workflows :

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_ACCOUNT_ID`
- `AWS_REGION`
- `ECR_REPOSITORY`

Cela garantit que les pipelines CI/CD fonctionnent correctement **sans exposer d’informations critiques** dans le dépôt public.

---
**PS**: Concernant l'évaluation de ce projet, il est important de noter que des modifications peuvent être apportées à ce projet après la date butoir de l'évaluation.
En conséquences, il est important de se fier au tag `v1.1.2` pour l'évaluation, les changements apportés après cette date ne doivent pas être pris en compte dans l'évaluation.
