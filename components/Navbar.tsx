import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { motion } from "framer-motion";

import LanguageSwitcher from "./LanguageSwitcher";

const LINKS = ["home", "blog", "about", "posts", "shop"];
export default function Navbar() {
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.75,
      }}
      className="nav-bar"
    >
      <Flex align="center" justify="center" h="4em" boxShadow="md" px="2em">
        <Flex justify="space-between">
          <LanguageSwitcher />
          <>
            {LINKS.map((el, idx) => (
              <Link key={idx} href={el}>
                <Box
                  as="span"
                  textTransform="capitalize"
                  mx=".5em"
                  cursor="pointer"
                >
                  {el}
                </Box>
              </Link>
            ))}
          </>
        </Flex>
      </Flex>
    </motion.div>
  );
}
