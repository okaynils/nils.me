import { Sidebar, Footer } from "components";

export default function MainLayout({ children }) {
  return (
    <section className="flex flex-col items-center justify-start min-h-screen mx-4 px-4">
      <Sidebar />
      <main className="w-full flex justify-center">
        {children}
      </main>
      <Footer />
    </section>
  );
}
