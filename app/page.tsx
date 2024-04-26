import Logo from "@/app/ui/logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-32">
        <Logo />
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-col">
        <div className="flex flex-row justify-center gap-3 rounded-lg bg-gray-50 px-6 py-2 md:w-100 md:px-10">
          <div className="flex flex-col justify-center gap-3">
            <p
              className={`${lusitana.className} text-xl text-gray-800 md:text-2xl md:leading-normal`}
            >
              <strong>
                Welcome to PageForge: Your Ultimate Landing Page Solution!
              </strong>
            </p>
            <p>
              This is the example for the Revolutionize your online presence
              with our cutting-edge Landing Page Builder! Say goodbye to
              complicated design tools and hello to effortless, stunning landing
              pages in minutes. Whether you&apos;re a seasoned marketer or just
              starting out, our intuitive platform empowers you to create
              eye-catching, conversion-optimized landing pages that drive
              results.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:py-12">
            <Image
              src="/promo1.jpg"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the admin project showing desktop version"
            />
            <Image
              src="/promo1.jpg"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshots of the admin project showing mobile version"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-3rounded-lg bg-gray-50 px-6 py-2 md:w-100 md:px-10">
          <div className="flex items-center justify-center p-6 md:py-12">
            <Image
              src="/promo2.jpg"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the admin project showing desktop version"
            />
            <Image
              src="/promo2.jpg"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshots of the admin project showing mobile version"
            />
          </div>
          <div className="flex flex-col justify-center gap-3">
            <p
              className={`${lusitana.className} text-xl text-gray-800 md:text-2xl md:leading-normal`}
            >
              <strong>Drag and Drop Editor</strong>
            </p>
            <p>
              With our drag-and-drop editor, crafting your perfect landing page
              is as simple as point, click, and customize. No coding skills
              required! But we don&apos;t stop at aesthetics. Our platform is
              packed with powerful features to supercharge your conversions.
              Plus, our responsive design ensures your landing pages look
              flawless on any device, so you can reach your audience wherever
              they are.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-6 rounded-lg bg-gray-50 px-6 py-2 md:w-100 md:px-10">
          <div className="flex flex-col justify-center gap-3">
            <p
              className={`${lusitana.className} text-xl text-gray-800 md:text-2xl md:leading-normal`}
            >
              <strong>Drive Traffic from social Media</strong>
            </p>
            <p>
              Whether you&apos;re driving traffic from social media, email
              marketing, or PPC campaigns, rest assured your message will shine
              through beautifully. Join the ranks of successful businesses and
              marketers who trust our Landing Page Builder to elevate their
              online presence and drive growth. Ready to take your marketing to
              new heights? Sign up today for your free trial and start building
              the landing pages of your dreams!
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:py-12">
            <Image
              src="/promo3.jpg"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the admin project showing desktop version"
            />
            <Image
              src="/promo3.jpg"
              width={560}
              height={620}
              className="block md:hidden"
              alt="Screenshots of the admin project showing mobile version"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
