import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function PageState({ state }: { state: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": state === "draft",
          "bg-green-500 text-white": state === "published",
        }
      )}
    >
      {state === "draft" ? (
        <>
          Draft
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {state === "published" ? (
        <>
          Published
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
