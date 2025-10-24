import Banner from "@/components/shared/banner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col mx-auto min-h-screen antialiased">
      
      <main className="flex-1 max-w-full  px-4 pt-20 pb-16">
        {children}
      </main>
      
    </section>
  );
}
