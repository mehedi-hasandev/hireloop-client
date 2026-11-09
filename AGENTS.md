<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# hireloop-client

Single Next.js 16 app (App Router, Turbopack, React 19) — not a monorepo, no `src/`. Layout: `app/` routes, `components/` UI, `lib/` auth/helpers, `hooks/` (empty, for new hooks). Path alias `@/*` → repo root.

## Commands

- `npm run dev` — dev server; loads `.env` automatically.
- `npm run lint` — ESLint 9 flat config (`eslint.config.mjs`).
- `npm run typecheck` — `tsc --noEmit`.
- `npm run build` — production build; also typechecks and warns (doesn't fail) on missing auth env vars.
- `npm run format` — Prettier, **only** `**/*.{ts,tsx}` (CSS/JSON/MD are not covered).

No test runner and no CI — verify with `npm run lint && npm run typecheck`; use `build` when touching routing or config.

## Auth (better-auth + MongoDB)

- Server config `lib/auth.ts`, client `lib/auth-client.ts`, and one HTTP catch-all `app/api/auth/[...all]/route.ts` (`toNextJsHandler(auth)`). Auth endpoints are served by that catch-all — don't add route files under `app/api/auth/`.
- MongoDB URI is hardcoded to `mongodb://localhost:27017` (db `hireloopdb`) in `lib/auth.ts`; a local MongoDB must be running for auth to work. It is not env-configured.
- `lib/auth-client.ts` has two client instances: `authClient` gets `baseURL`, but `signIn`/`signUp`/`useSession` are re-exported from a second `createAuthClient()` with no options — config added to `authClient` won't affect those three.
- `.env` is gitignored (`.env*`): needs `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`. Fresh clones have none; missing Google vars only produce a build warning.

## UI stack

- shadcn/ui with style `base-nova` (`components.json`) → primitives come from `@base-ui/react`, **not Radix**. Add components with `npx shadcn@latest add <name>`.
- Tailwind v4, CSS-first: no `tailwind.config`; theme lives in `app/globals.css` (`@theme inline`), which also does `@import "shadcn/tailwind.css"` — that's why `shadcn` sits in `dependencies`; don't move or remove it.
- `cn` is re-exported from the `cn` npm package in `lib/utils.ts` (not clsx + tailwind-merge).
- Prettier: no semicolons, double quotes, LF, class sorting via `prettier-plugin-tailwindcss`. Run `npm run format` instead of hand-formatting.

## Notes

- `CLAUDE.md` is only `@AGENTS.md` — keep all guidance here.
