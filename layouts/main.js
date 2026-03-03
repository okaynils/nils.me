import { Sidebar, Footer } from "components";

export default function MainLayout({ children }) {
  return (
    <section className="flex flex-col items-center min-h-screen mx-4 px-4">
      <Sidebar />
      <main>
        {children}
      </main>
      <Footer />
    </section>
  );
}
