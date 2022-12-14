import { Box, Flex } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";

import Layout from "../components/Layout";

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

  // Switch case replacement (with dictionary) keys (condition) --> value matched condition
  // we can also use Map data structure
  const extentions = {
    ".css": "text/css",
    ".js": "text/jsavascript",
    ".json": "appilcation/json",
  };
  console.log(extentions[".css"]);

  // checking empty arrays
  const arr: any = [];
  console.log(Array.isArray(arr) && arr.length > 0 ? true : false);

  /* AVOID state mistakes:  */
  // use callback to set / update the state
  // setCount(prevState => prevState + 1)

  // do not complexify the state, if its not necessary

  // useCallback --> prevent function re-execution: (trigger it only when states function inside callback is updated)
  // memoiazing the fct and triggers the fct only when state of callBAck dependency array changes
  const [state1, setState1] = useState(1);
  const [state2, setState2] = useState(1);
  const [state3, setState3] = useState(1);

  // returns a number (summed states)
  const sumMemo: number = useMemo(
    () => state1 + state2 + state3,
    [state1, state2, state3]
  );
  // fct return a number (sum)
  const sumCallback: () => number = useCallback(
    () => state1 + state2 + state3,
    [state1, state2, state3]
  );

  useEffect(() => {
    console.log("sum memo: ", sumMemo);
    console.log("sum callback: ", sumCallback());
  });

  // scroll in view --> animation
  const { ref, inView } = useInView();
  const control = useAnimation();

  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 },
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
      console.log("inView = ", inView);
    } else {
      control.start("hidden");
    }
  }, [inView, control]);

  return (
    <>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <Head>
        <meta property="og:title" content="My new title" key="title" />
      </Head>

      <Layout isHeaderVisible>
        <h2>Home</h2>
        <Image
          loader={myLoader}
          src="https://www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
          alt="Picture of the author"
          width={150}
          height={150}
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

        <motion.div
          ref={ref}
          animate={control}
          initial={{ x: "-100vw" }}
          //animate={{ x: 0 }}
          variants={boxVariant}
          transition={{ type: "spring", duration: 1, bounce: 0.3 }}
        >
          <Flex flexDir="column" justify="center" align="center">
            <Box h="20em" w="20em" borderRadius="1em" bg="#555" my="1em"></Box>
            <Box h="20em" w="20em" borderRadius="1em" bg="#555" my="1em"></Box>
            <Box h="20em" w="20em" borderRadius="1em" bg="#555" my="1em"></Box>
            <Box h="20em" w="20em" borderRadius="1em" bg="#555" my="1em"></Box>
            <Box h="20em" w="20em" borderRadius="1em" bg="#555" my="1em"></Box>
            <Box h="20em" w="20em" borderRadius="1em" bg="#555" my="1em"></Box>
          </Flex>
        </motion.div>
      </Layout>
    </>
  );
};

export default Home;
