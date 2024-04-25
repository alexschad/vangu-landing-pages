import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { getPublicPageData } from "@/app/lib/data";
import ReadonlyEditorWrapper from "@/app/ui/landing-pages/lexical-editor/ReadOnlyEditorWrapper";

type propType = {
  params: {
    userid: string;
    urlname: string;
  };
};

export async function generateMetadata(
  { params: { userid, urlname } }: propType,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const page = await getPublicPageData(userid, urlname);

  if (!page) {
    notFound();
  }
  return {
    title: page.metatitle || "Public Page Title",
    description: page.metadescription || "Public Page Description",
    keywords: page.metakeywords || "",
  };
}

export default async function Page({ params: { userid, urlname } }: propType) {
  const page = await getPublicPageData(userid, urlname);
  if (!page) {
    notFound();
  }

  console.log(userid, urlname, page);
  return (
    <main>
      <ReadonlyEditorWrapper stateJSON={page.html} />
    </main>
  );
}
