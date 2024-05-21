"use server";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";

export default async function UserInfo() {
  const session = await auth();

  return (
    <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium bg-blue-500 text-white md:flex-none md:justify-start md:p-2 md:px-3 mb-2">
      <UserCircleIcon className="w-6" />
      {session?.user?.name}
    </div>
  );
}
