// import type { Metadata } from "next";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/globals.css";
import "@/styles/typography.css";

// Font Awesome core SVG library will not try and insert <style> elements into
// the <head> of the page.
config.autoAddCss = false;

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={roboto.className} {...pageProps} />;
}
