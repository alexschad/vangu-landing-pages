"use client";
import { FormEvent, useState } from "react";
import { PageForm } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updatePageHtml } from "@/app/lib/actions";
import { EditorState } from "lexical";

import dynamic from "next/dynamic";

const EditorWrapper = dynamic(
  () => import("@/app/ui/landing-pages/lexical-editor/EditorWrapper"),
  {
    ssr: false,
  }
);

function onChange(editorState: EditorState) {
  const editorStateJSON = JSON.stringify(editorState);
  (document.getElementById("editorStateField") as HTMLInputElement).value =
    editorStateJSON;
}

export default function EditPageForm({ page }: { page: PageForm }) {
  const [fullPage, setFullPage] = useState(false);
  const updatePageHtmlWithId = updatePageHtml.bind(null, page.id);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    updatePageHtmlWithId(formData);
  }

  return (
    <form onSubmit={onSubmit}>
      <div
        className={`rounded-md bg-gray-50 z-[100] ${fullPage ? "absolute top-2 left-2 size-full p-6 md:p-6 pt-8 md:pt-8" : "relative p-4 md:p-4 pt-8 md:pt-8"}`}
      >
        <div className="absolute top-5 right-5">
          {fullPage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => {
                setFullPage(false);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => {
                setFullPage(true);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
              />
            </svg>
          )}
        </div>
        <div className="mb-4">
          {/* Page HTML */}
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <div className="editor-shell">
                <EditorWrapper
                  onChange={onChange}
                  editorStateJSON={page.html}
                />
              </div>
              <input type="hidden" name="html" id="editorStateField" value="" />
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
