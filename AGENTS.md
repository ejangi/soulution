# Working on Soulution

Soulution is a React app for structured problem solving, using Firebase Authentication and Firestore. The frontend package lives in `src/`; application code is in `src/src/`, with UI components in `components/` and persistence models in `state/`.

## Use Docker Compose

**Use the `docker compose` environment for development, dependency management, builds, and tests.** Run commands from the repository root. The `app` service supplies Node 22, Yarn 4.9.1, and the Firebase environment variables; prefer it over host-installed Node or Yarn.

```sh
docker compose up --build -d                        # Vite at http://localhost:3000
docker compose exec app yarn install               # Install into the bind-mounted src/
docker compose exec app yarn test                  # Vitest + React Testing Library
docker compose exec app yarn build                 # Production build
docker compose logs --tail=100 app                 # Diagnose startup/runtime failures
```

If the service is stopped, use `docker compose run --rm app <command>` for one-off commands. The `./src:/app` bind mount hides image-installed dependencies, so run `yarn install` through Compose if dependencies are missing. Keep `src/yarn.lock` in sync with dependency changes. If Docker is unavailable, report that limitation before using a host runtime.

## Change and verify

- Preserve existing Firestore field names and Timestamp values when changing models. Consult `README.md` for authentication, security rules, and index requirements when changing Firebase integration.
- Keep the `REACT_APP_*` configuration convention used by `src/vite.config.mjs` and `src/src/firebase.config.js`.
- For application changes, run relevant tests and the production build through Compose; report any checks that could not run. Build output in `src/build/` is generated.
