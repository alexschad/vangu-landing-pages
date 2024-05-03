import EditPageForm from "@/app/ui/landing-pages/edit-form";
import TitleForm from "@/app/ui/landing-pages/title-form";
import MetaDataForm from "@/app/ui/landing-pages/meta-form";
import Breadcrumbs from "@/app/ui/landing-pages/breadcrumbs";
import { fetchPageById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Invoice",
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [page] = await Promise.all([fetchPageById(id)]);

  if (!page) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Landing Pages", href: "/admin/landing-pages" },
          {
            label: "Edit Landing Page",
            href: `/admin/landing-pages/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div className="flex h-screen flex-col md:flex-row">
        <div className="flex-grow md:overflow-y-auto">
          <EditPageForm page={page} />
        </div>
        <div className="w-full flex-none p-2 pt-0 md:w-64 md:p-2 md:pt-0">
          <TitleForm page={page} />
          <MetaDataForm page={page} />
        </div>
      </div>
    </main>
  );
}
