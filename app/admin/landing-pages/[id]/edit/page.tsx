import EditPageForm from "@/app/ui/landing-pages/edit-form";
import TitleForm from "@/app/ui/landing-pages/title-form";
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
        <div className="flex-grow p-2 md:overflow-y-auto md:p-2">
          <EditPageForm page={page} />
        </div>
        <div className="w-full flex-none md:w-64 md:p-2">
          <TitleForm page={page} />
        </div>
      </div>
    </main>
  );
}
