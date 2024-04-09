const { db } = require("@vercel/postgres");

async function createPagesTable(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    const createTable = await client.sql`
          DROP TABLE pages;

          CREATE TABLE IF NOT EXISTS pages (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID NOT NULL,
            title VARCHAR(255) NOT NULL,
            html TEXT NOT NULL,
            state VARCHAR(255) NOT NULL DEFAULT 'draft',
            date DATE NOT NULL
            );
        `;
    console.log(`Created "pages" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error("Error seeding pages:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await createPagesTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
