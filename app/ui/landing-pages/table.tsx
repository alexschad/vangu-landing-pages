import Pagination from "@/app/ui/landing-pages/pagination";
import {
  UpdatePage,
  DeletePageModal,
  ViewLivePage,
} from "@/app/ui/landing-pages/buttons";
import PageState from "@/app/ui/landing-pages/state";
import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredPages, fetchPagesPages } from "@/app/lib/data";
import { auth } from "@/auth";

export default async function PagesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const totalPages = await fetchPagesPages(query);
  const pages = await fetchFilteredPages(query, currentPage);
  return (
    <>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {pages?.map((page) => (
                <div
                  key={page.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <p>{page.title}</p>
                      </div>
                    </div>
                    <PageState state={page.state} />
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{formatDateToLocal(page.created.toLocaleDateString())}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdatePage id={page.id} />
                      <DeletePageModal id={page.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Date
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Page URL
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    State
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {pages?.map((page) => (
                  <tr
                    key={page.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{page.title}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {page.created.toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">{page.url}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <PageState state={page.state} />
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {page.state === "published" ? (
                          <ViewLivePage userId={userId} url={page.url} />
                        ) : null}
                        <UpdatePage id={page.id} />
                        <DeletePageModal id={page.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}
