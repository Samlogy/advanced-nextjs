import { useRouter } from "next/router";

import en from "../locales/en";
import fr from "../locales/fr";

const useLocale = () => {
  const { locale, defaultLocale } = useRouter();
  const t = locale === "en" ? en : fr;

  //console.log(locale, defaultLocale);

  return { locale, defaultLocale, t };
};

export default useLocale;
