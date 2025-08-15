import { Sidebar } from "components";
import { ContentWrapper } from "ui";

export default function MainLayout({ children }) {
  return (
    <section className="flex items-start pt-[50px] mx-4 px-4 flex-col min-h-screen">
      <Sidebar />
      <main>
        {children}
      </main>
      <footer className="w-full mt-auto">
        <ContentWrapper
          width="440px"
          className="border-t border-gray-500/10 py-3 "
        >
          <div className="">
            <img
              src="/touch-icons/main-icon.png"
              alt="Icon"
              className="w-4 h-4"
            />
          </div>
        </ContentWrapper>
      </footer>

    </section>
  );
}
