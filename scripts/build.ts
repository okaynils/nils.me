// Client build, server build, then prerender, all stamped with one deploy time.
import { $ } from "bun";

process.env.DEPLOYED_AT ??= new Date().toISOString();

await $`vite build`;
await $`vite build --ssr src/entry-server.tsx --outDir dist-server`;
await $`bun scripts/prerender.ts`;
