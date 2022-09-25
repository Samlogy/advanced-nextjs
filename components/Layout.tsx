import { Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

import Navbar from "./Navbar";

interface ILayout {
  children: React.ReactNode;
  isHeaderVisible?: boolean;
  [restPorps: string]: any;
}

export default function Layout({
  children,
  isHeaderVisible,
  ...restProps
}: ILayout) {
  const bgColor = useColorModeValue("gray_10", "gray_3");
  const router = useRouter();
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        className="base-page-size"
      >
        <Flex flexDir="column" {...restProps} bg={bgColor}>
          {isHeaderVisible && <Navbar />}
          <Container
            maxW="80em"
            bg={bgColor}
            minHeight="calc(100vh - 100px)"
            p={["36px 16px", "", "", "36px 50px", "36px 100px"]}
          >
            {children}
          </Container>
        </Flex>
      </motion.div>
    </AnimatePresence>
  );
}
