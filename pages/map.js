import Head from "next/head";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Travel Map – Nils Fahrni"
        description="I've created this page to visualize all the locations I've been so far."
        openGraph={{
          site_name: "Travel Map – Nils Fahrni",
          title: "Travel Map – Nils Fahrni",
          description:
            "I've created this page to visualize all the locations I've been so far.",
        }}
        twitter={{
          handle: "@okaynils",
          site: "@okaynils",
          cardType: "summary_large_image",
        }}
      />

      <div className="flex items-start justify-center w-full mb-10 overflow-hidden max-h-[60vh] md:max-h-[50vh]">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1_yNkyfqV1g9kKRz0el2r46viCfw7RBXj"
          width="100%"
          height="600"
        ></iframe>
      </div>
    </>
  );
}
