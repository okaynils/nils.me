import { Sidebar, Footer } from "components";

export default function MainLayout({ children }) {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-[900px] flex-col px-3 py-3 md:px-4">
      <Sidebar />
      <main className="w-full flex-1">
        {children}
      </main>
      <Footer />
    </section>
  );
}
