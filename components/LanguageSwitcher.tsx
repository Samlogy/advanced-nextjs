import Link from "next/link";
import { useRouter } from "next/router";

import useLocale from "../lib/hooks/useLocale";

const languages = ["fr", "en"];

export default function LanguageSwitcher() {
  const router = useRouter();

  //console.log(router);

  const { locale } = useLocale();

  const changeLanguage = (e: any) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <select onChange={changeLanguage} defaultValue={locale}>
      {languages.map((lang: string, idx: number) => (
        <option key={idx} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}
