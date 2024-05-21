import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Forge",
  description: "Your Ultimate Landing Page Solution!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
