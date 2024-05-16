"use client";
import { FormEvent, useState } from "react";
import { useFormState } from "react-dom";
import { PageForm } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updatePageHtml, HTMLState } from "@/app/lib/actions";
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
  const initialState = { message: null, errors: {} };
  const [fullPage, setFullPage] = useState(false);
  const updatePageHtmlWithId = updatePageHtml.bind(null, page.id);
  const [state, dispatch] = useFormState<HTMLState, FormData>(
    updatePageHtmlWithId,
    initialState
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    updatePageHtmlWithId(formData);
  }

  return (
    <form onSubmit={onSubmit}>
      <div
        className={`rounded-md bg-grey-50 z-[100] ${fullPage ? "absolute top-2 left-2 size-full p-6 md:p-6 pt-8 md:pt-8" : "relative p-4 md:p-4 pt-8 md:pt-8"}`}
      >
        <div className="sticky top-0 z-[300] h-10 m-2 w-full5">
          <Button type="submit">Save</Button>
          <div className="absolute right-0 top-2">
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
        </div>
        <div>
          {/* Page HTML */}
          <div className="relative rounded-md">
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
      </div>
    </form>
  );
}
