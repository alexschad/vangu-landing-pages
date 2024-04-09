import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

import { PagesTable, PageForm } from "./definitions";

const ITEMS_PER_PAGE = 10;

export async function fetchFilteredPages(query: string, currentPage: number) {
  noStore();
  const session = await auth();
  const userId = session?.user?.id;

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const pages = await sql<PagesTable>`
        SELECT
          pages.id,
          pages.user_id,
          pages.title,
          pages.html,
          pages.state,
          pages.date
        FROM pages
        WHERE
          pages.title::text ILIKE ${`%${query}%`}
          and user_id = ${userId}
        ORDER BY pages.date DESC
        LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;

    return pages.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch pages.");
  }
}

export async function fetchPagesPages(query: string) {
  noStore();
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const count = await sql`SELECT COUNT(*)
      FROM pages
      WHERE
        pages.title::text ILIKE ${`%${query}%`}
        and user_id = ${userId}
`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of pages.");
  }
}

export async function fetchPageById(id: string) {
  noStore();
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const data = await sql<PageForm>`
        SELECT
          pages.id,
          pages.user_id,
          pages.title,
          pages.html
        FROM pages
        WHERE pages.id = ${id}
        and user_id = ${userId};
      `;

    return data.rows[0];
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Page.");
  }
}
