import { db } from "./index.ts";
import { users, documents, resources } from "./schema.ts";
import { randomUUID } from "node:crypto";

async function seed() {
  await db.delete(resources);
  await db.delete(documents);
  await db.delete(users);

  const userId = randomUUID();
  await db.insert(users).values({
    id: userId,
    email: "demo@example.com",
    name: "Demo User",
  });

  const docs = [
    {
      id: randomUUID(),
      name: "Welcome Doc",
      content: "Welcome to Drizzle!",
      userId,
    },
    {
      id: randomUUID(),
      name: "Project Plan",
      content: "Project plan details...",
      userId,
    },
  ];
  await db.insert(documents).values(docs);

  const res = [
    {
      id: randomUUID(),
      name: "Drizzle Docs",
      url: "https://orm.drizzle.team",
      userId,
    },
    { id: randomUUID(), name: "SQLite", url: "https://sqlite.org", userId },
  ];
  await db.insert(resources).values(res);
}

function main() {
  seed()
    .then(() => {
      console.log("Seed complete!");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

main();
