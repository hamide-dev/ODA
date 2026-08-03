# ODC Manager — Frontend

Interface React (Vite + TypeScript + Tailwind) pour l'API ODC (auth JWT, RBAC
APPRENANT/ADMIN, formations, cohortes).

## Démarrage

```bash
npm install
cp .env.example .env   # ajuster VITE_API_URL si besoin
npm run dev
```

## Identité visuelle

Palette strictement **orange / blanc / noir**, avec le **blanc dominant** :
grandes surfaces (sidebar, topbar, cartes, fond) en blanc, orange `#FF7900`
réservé aux accents et actions principales, noir `#000000` utilisé avec
parcimonie (texte, badge ADMIN, bordures de survol). Voir `tailwind.config.js`
(`brand.*` et `ink.*`).

## Authentification (2 flux distincts, conformes à l'API)

- `POST /auth/login` → connexion **apprenant**, rejette les comptes ADMIN
- `POST /auth/admin/login` → connexion **admin**, rejette les comptes APPRENANT
- `POST /auth/register` → inscription publique, crée toujours un APPRENANT

La page `/login` propose un bascule Apprenant / Admin qui appelle le bon
endpoint. `AuthContext` normalise les deux réponses (`user` / `admin`) sous un
seul objet `AppUser`.

## Structure

```
src/
├── api/
│   ├── apiClient.ts        # axios général : baseURL, JWT, gestion 401
│   ├── errorMessage.ts     # extraction des messages d'erreur NestJS
│   ├── auth.service.ts     # register, loginApprenant, loginAdmin
│   ├── users.service.ts    # profil perso + gestion admin des apprenants
│   ├── formations.service.ts  # /formation
│   └── cohortes.service.ts    # /cohorte
├── context/
│   ├── AuthContext.tsx     # session unifiée admin/apprenant
│   └── ToastContext.tsx    # notifications succès/erreur
├── types/                  # miroir TS de l'API
├── routes/ProtectedRoute.tsx
├── hooks/useConfirm.tsx    # confirmation avant suppression
├── components/
│   ├── layout/              # Sidebar (menu adapté au rôle), Topbar, Layout
│   └── ui/                   # Button, Input, Select, Table, Modal, Badge, ConfirmDialog
├── pages/
│   ├── LoginPage, RegisterPage
│   ├── DashboardPage        # vue admin (stats) ou apprenant (formation en cours)
│   ├── ProfilePage           # apprenant : édition profil + choix de formation
│   ├── ApprenantsPage        # admin : liste + recherche + inscription + assignation
│   ├── FormationsPage        # admin : CRUD complet
│   └── CohortesPage          # admin : create/list/delete (pas d'update côté API)
├── App.tsx                   # routes, séparées par rôle
└── main.tsx
```

## Rôles

- `APPRENANT` : accède à `/dashboard` et `/profil` (édite son profil, choisit sa formation).
- `ADMIN` : accède en plus à `/apprenants`, `/formations`, `/cohortes`.
