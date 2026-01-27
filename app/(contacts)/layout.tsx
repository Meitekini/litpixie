import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-col min-h-screen antialiased">
      <Banner />
      <main className="flex-1 max-w-full  px-4 pt-20 pb-16">
        {children}
      </main>
      <Footer />
    </section>
  );
}
