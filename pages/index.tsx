import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import LanguageSwitcher from "../components/LanguageSwitcher";

const Home: NextPage = () => {
  return (
    <div>
      <h2>Home</h2>
      <LanguageSwitcher />
    </div>
  );
};

export default Home;
