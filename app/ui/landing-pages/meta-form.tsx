"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { Button } from "@/app/ui/button";
import { updateMetaData, MetaDataState } from "@/app/lib/actions";
import { PagesTable } from "@/app/lib/definitions";
import LoadingBlock from "../loadin-block";

export default function MetaDataForm({ page }: { page: PagesTable }) {
  const initialState = { message: null, errors: {} };
  const updateMetaDataWithId = updateMetaData.bind(null, page.id);
  const [state, dispatch] = useFormState<MetaDataState, FormData>(
    updateMetaDataWithId,
    initialState
  );
  const [metaTitle, setMetaTitle] = useState(page.metatitle);
  const [metaDescription, setMetaDescription] = useState(page.metadescription);
  const [metaKeywords, setMetaKeywords] = useState(page.metakeywords);

  return (
    <form action={dispatch}>
      <div className="rounded-md min-h-96 bg-gray-50 flex justify-center p-4 md:p-4">
        <LoadingBlock>
          <div>
            {/* Meta Title */}
            <div className="mb-4">
              <label
                htmlFor="metatitle"
                className="mb-2 block text-sm font-medium"
              >
                Meta title
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <textarea
                    onChange={(e) => {
                      setMetaTitle(e.currentTarget.value);
                    }}
                    id="metatitle"
                    name="metatitle"
                    value={metaTitle}
                    placeholder="Enter Meta Title"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="metatitle-error"
                  />
                </div>
              </div>
              <div id="metatitle-error" aria-live="polite" aria-atomic="true">
                {state?.errors?.metatitle &&
                  state?.errors.metatitle.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* Meta Description */}
            <div className="mb-4">
              <label
                htmlFor="metadescription"
                className="mb-2 block text-sm font-medium"
              >
                Meta Description
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <textarea
                    onChange={(e) => {
                      setMetaDescription(e.currentTarget.value);
                    }}
                    id="metadescription"
                    name="metadescription"
                    value={metaDescription}
                    placeholder="Enter Meta Description"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="metadescription-error"
                  />
                </div>
              </div>
              <div
                id="metadescription-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state?.errors?.metadescription &&
                  state?.errors.metadescription.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
            </div>

            {/* Meta Keywords */}
            <div className="mb-4">
              <label
                htmlFor="metakeywords"
                className="mb-2 block text-sm font-medium"
              >
                Meta Keywords
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <textarea
                    onChange={(e) => {
                      setMetaKeywords(e.currentTarget.value);
                    }}
                    id="metakeywords"
                    name="metakeywords"
                    value={metaKeywords}
                    placeholder="Enter Meta Keywords"
                    className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                    aria-describedby="metakeywords-error"
                  />
                </div>
              </div>
              <div
                id="metakeywords-error"
                aria-live="polite"
                aria-atomic="true"
              >
                {state?.errors?.metakeywords &&
                  state?.errors.metakeywords.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>
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
