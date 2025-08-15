import { useEffect } from "react";
// ThemeProvider removed - app is light mode only
import "styles/app.scss";
import "styles/notes.scss";
import MainLayout from "layouts/main";
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
    <>
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
    </>
  );
}

export default MyApp;
