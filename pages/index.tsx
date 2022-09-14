import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";

import LanguageSwitcher from "../components/LanguageSwitcher";

const Home: NextPage = () => {
  // image loader
  const myLoader = ({ src, width, quality }: any) => {
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  };

  // handle script execution
  function onLoad() {
    console.log("executed once after the script has finished loading");
  }
  function onReady() {
    console.log(
      "executed after the script has finished loading and every time the component is mounted"
    );
  }
  function onError() {
    console.log("executes if the script fails to load.");
  }

  // display all en variables
  console.log(process.env);
  // display NEXT_PUBLIC_ANALYTICS_ID variable
  console.log(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>

      <div>
        <h2>Home</h2>
        <LanguageSwitcher />

        <Image
          loader={myLoader}
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="Picture of the author"
          width={500}
          height={500}
          loading="lazy"
        />

        <Script
          strategy={"lazyOnload"}
          id="google-maps"
          src="google.fr"
          onLoad={() => onLoad()}
          onReady={() => onReady()}
          onError={() => onError()}
        />
      </div>
    </>
  );
};

export default Home;
