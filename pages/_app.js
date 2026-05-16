import "styles/app.scss";
import "styles/notes.scss";
import MainLayout from "layouts/main";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-GS66FXN45D"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', 'G-GS66FXN45D');
            `}
          </Script>
        </>
      )}

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

export default MyApp;
