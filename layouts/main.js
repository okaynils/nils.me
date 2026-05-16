import { Sidebar, Footer } from "components";

export default function MainLayout({ children }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col px-4 py-3 md:px-6 md:py-5">
      <Sidebar />
      <main className="w-full flex-1">
        {children}
      </main>
      <Footer />
    </section>
  );
}
