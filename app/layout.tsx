import "@/styles/globals.css";
export const metadata = {
  title: "Share Bill",
  description: "nadesh52",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grid bg-base">{children}</body>
    </html>
  );
}
