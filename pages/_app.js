import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import "styles/app.scss";
import "styles/notes.scss";
import MainLayout from "layouts/main";
import { DefaultSeo } from "next-seo";
import Script from "next/script";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const canonicalUrl = (
    `https://nils.me` + (router.asPath === "/" ? "" : router.asPath)
  ).split("?")[0];

  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log(
        "Message received from the child: " + event?.data,
        event?.data?.message,
        event?.data?.blob
      ); // Message received from child
    });
  }, []);

  return (
    <ThemeProvider defaultTheme="system" attribute="class" enableSystem={true}>
      <DefaultSeo
        title="Nils Fahrni"
        description="I am a dedicated Data Science undergraduate at the University of Applied Sciences Northwestern Switzerland."
        canonical={canonicalUrl}
        openGraph={{
          site_name: "Nils Fahrni",
          title: "Nils Fahrni",
          description:
            "I am a dedicated Data Science undergraduate at University of Applied Sciences Northwestern Switzerland.",
          images: [
            {
              url: "https://nils.me/images/site/meta.jpg",
              width: 800,
              height: 600,
              alt: "Nils Fahrni",
            },
          ],
        }}
        twitter={{
          handle: "@okaynils",
          site: "@okaynils",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "apple-touch-icon",
            href: "/touch-icons/main-icon.png",
          },
        ]}
      />

      {process.env.NODE_ENV == "production" ? (<>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GS66FXN45D" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
            gtag('js', new Date());
 
            gtag('config', 'G-GS66FXN45D');
        `}
        </Script>
      </>
      ) : (
        ""
      )}

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
}

export default MyApp;
