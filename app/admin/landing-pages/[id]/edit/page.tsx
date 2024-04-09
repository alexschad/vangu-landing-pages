import Form from "@/app/ui/landing-pages/edit-form";
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
      <Form page={page} />
    </main>
  );
}
