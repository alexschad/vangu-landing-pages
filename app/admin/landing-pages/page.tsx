import Pagination from "@/app/ui/landing-pages/pagination";
import Search from "@/app/ui/search";
import Table from "@/app/ui/landing-pages/table";
import { CreatePage } from "@/app/ui/landing-pages/buttons";
import { lusitana } from "@/app/ui/fonts";
import { LandingPagesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchPagesPages } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pages",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPagesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pages</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Pages..." />
        <CreatePage />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<LandingPagesTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
