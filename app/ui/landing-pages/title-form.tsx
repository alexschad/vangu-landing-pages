"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updatePageTitle, State } from "@/app/lib/actions";
import { PagesTable } from "@/app/lib/definitions";

export default function TitleForm({ page }: { page: PagesTable }) {
  const initialState = { message: null, errors: {} };
  const updatePageTitlelWithId = updatePageTitle.bind(null, page.id);
  const [state, dispatch] = useFormState<State, FormData>(
    updatePageTitlelWithId,
    initialState
  );

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Page Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Page title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                // value={page.title}
                placeholder="Enter Page Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
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
        <Button type="submit">Create Page</Button>
      </div>
    </form>
  );
}
