import { execSync } from "node:child_process";

const PLACEHOLDER =
  "postgresql://placeholder:placeholder@127.0.0.1:5432/placeholder?schema=public";

function resolveDatabaseUrl() {
  const value = process.env.DATABASE_URL?.trim();
  return value && value.length > 0 ? value : PLACEHOLDER;
}

function isPlaceholder(url) {
  return !url || url.includes("placeholder:placeholder@127.0.0.1");
}

const mode = process.argv[2] || "generate";
const databaseUrl = resolveDatabaseUrl();
process.env.DATABASE_URL = databaseUrl;

if (mode === "generate") {
  execSync("npx prisma generate", { stdio: "inherit", env: process.env });
  process.exit(0);
}

if (mode === "build") {
  execSync("npx prisma generate", { stdio: "inherit", env: process.env });

  if (!isPlaceholder(databaseUrl)) {
    execSync("npx prisma migrate deploy", { stdio: "inherit", env: process.env });
  } else {
    console.warn(
      "[build] DATABASE_URL vazia ou inválida — pulando migrate deploy. Configure a URL do Postgres na Vercel.",
    );
  }

  execSync("npx next build", { stdio: "inherit", env: process.env });
  process.exit(0);
}

console.error(`Modo desconhecido: ${mode}`);
process.exit(1);
