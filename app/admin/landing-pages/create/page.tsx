import Form from "@/app/ui/landing-pages/create-form";
import Breadcrumbs from "@/app/ui/landing-pages/breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Invoice",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Landing Pages", href: "/admin/landing-pages" },
          {
            label: "Create Landing Page",
            href: "/admin/landing-pages/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
