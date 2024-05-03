"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/app/ui/button";
import { updatePageTitle, PageTitleState } from "@/app/lib/actions";
import { PagesTable } from "@/app/lib/definitions";
import LoadingBlock from "../loadin-block";

export default function TitleForm({ page }: { page: PagesTable }) {
  const initialState = { message: null, errors: {} };
  const updatePageTitleWithId = updatePageTitle.bind(null, page.id);
  const [state, dispatch] = useFormState<PageTitleState, FormData>(
    updatePageTitleWithId,
    initialState
  );
  const [title, setTitle] = useState(page.title);
  const [url, setURL] = useState(page.url);
  const [pageState, setPageState] = useState(page.state);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 mb-2 min-h-80 flex justify-center md:p-4">
        <LoadingBlock>
          <div>
            {/* Page Title */}
            <div className="mb-4">
              <label htmlFor="title" className="mb-2 block text-sm font-medium">
                Page title
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    onChange={(e) => {
                      setTitle(e.currentTarget.value);
                    }}
                    id="title"
                    name="title"
                    type="string"
                    value={title}
                    placeholder="Enter Page Title"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="title-error"
                  />
                </div>
              </div>
              <div id="title-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.title &&
                  state.errors.title.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="url" className="mb-2 block text-sm font-medium">
                Page URL
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    onChange={(e) => {
                      setURL(e.currentTarget.value);
                    }}
                    id="url"
                    name="url"
                    type="string"
                    value={url}
                    placeholder="Enter Page URL"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="url-error"
                  />
                </div>
              </div>
              <div id="url-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.url &&
                  state.errors.url.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
              {/* Page State */}
              <fieldset>
                <legend className="mb-2 block text-sm font-medium">
                  State
                </legend>
                <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      <input
                        id="draft"
                        name="state"
                        type="radio"
                        value="draft"
                        defaultChecked={pageState === "draft"}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        aria-describedby="state-error"
                      />
                      <label
                        htmlFor="draft"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                      >
                        Draft
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="published"
                        name="state"
                        type="radio"
                        value="published"
                        defaultChecked={pageState === "published"}
                        className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        aria-describedby="state-error"
                      />
                      <label
                        htmlFor="published"
                        className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                      >
                        Published
                      </label>
                    </div>
                  </div>
                  <div id="state-error" aria-live="polite" aria-atomic="true">
                    {state?.errors?.state &&
                      state.errors.state.map((error: string) => (
                        <p className="mt-2 text-sm text-red-500" key={error}>
                          {error}
                        </p>
                      ))}
                  </div>
                </div>
                <div id="error-message" aria-live="polite" aria-atomic="true">
                  {state?.message && (
                    <p className="mt-2 text-sm text-red-500">{state.message}</p>
                  )}
                </div>
              </fieldset>
            </div>
            <div className="mt-4 flex">
              <Button type="submit">Save</Button>
            </div>
          </div>
        </LoadingBlock>
      </div>
    </form>
  );
}
