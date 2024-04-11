import { PrismaClient } from "@prisma/client";

import { unstable_noStore as noStore } from "next/cache";
import { auth } from "@/auth";

import { PagesTable, PageForm } from "./definitions";

const ITEMS_PER_PAGE = 10;
const prisma = new PrismaClient();

export async function fetchFilteredPages(query: string, currentPage: number) {
  noStore();
  const session = await auth();
  const userId = session?.user?.id;

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const pages = await prisma.pages.findMany({
      where: {
        title: {
          contains: query,
        },
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    return pages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch pages.");
  }
}

export async function fetchPagesPages(query: string) {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const pagesCount = await prisma.pages.count({
      where: {
        title: {
          contains: query,
        },
        userId: userId,
      },
    });
    const totalPages = Math.ceil(pagesCount / ITEMS_PER_PAGE);
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
    const page = prisma.pages.findUnique({
      where: {
        id: id,
        userId: userId,
      },
    });
    return page;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch Page.");
  }
}
