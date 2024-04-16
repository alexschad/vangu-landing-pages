"use client";
import { FormEvent } from "react";
import { PageForm } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updatePageHtml } from "@/app/lib/actions";
// import Editor from "./lexical-editor";
import { EditorState } from "lexical";
import EditorWrapper from "./lexical-editor/EditorWrapper";

// import dynamic from "next/dynamic";
// const EditorWrapper = dynamic(
//   () => import("@/app/ui/landing-pages/lexical-editor/EditorWrapper"),
//   {
//     ssr: false,
//   }
// );

function onChange(editorState: EditorState) {
  const editorStateJSON = JSON.stringify(editorState);
  console.log(editorStateJSON);
  (document.getElementById("editorStateField") as HTMLInputElement).value =
    editorStateJSON;
}

export default function EditPageForm({ page }: { page: PageForm }) {
  const updatePageHtmlWithId = updatePageHtml.bind(null, page.id);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    updatePageHtmlWithId(formData);
  }

  console.log(page);
  return (
    <form onSubmit={onSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Page HTML */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            HTML
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="editor-shell">
                <EditorWrapper
                  onChange={onChange}
                  editorStateJSON={page.html}
                />
              </div>
              <input type="hidden" name="html" id="editorStateField" value="" />
              {/* <textarea
                id="html"
                name="html"
                defaultValue={page.html}
                placeholder="Enter html"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="html-error"
              /> */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/admin/landing-pages"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Edit HTML</Button>
        </div>
      </div>
    </form>
  );
}
