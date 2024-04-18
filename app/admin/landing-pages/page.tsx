import Search from "@/app/ui/search";
import Table from "@/app/ui/landing-pages/table";
import { CreatePageModal } from "@/app/ui/landing-pages/buttons";
import { lusitana } from "@/app/ui/fonts";
import { LandingPagesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Pages</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Pages..." />
        <CreatePageModal />
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<LandingPagesTableSkeleton />}
      >
        <Table query={query} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
