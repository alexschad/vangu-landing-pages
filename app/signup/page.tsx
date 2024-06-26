import Logo from "@/app/ui/logo";
import SignUpForm from "@/app/ui/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new Account",
};

export default function SignUp() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
            <Logo />
          </div>
        </div>
        <SignUpForm />
      </div>
    </main>
  );
}
