import React from "react";
import { useTranslate } from "../../translate";
import { LanguageSwitcher } from "../../components";

function Home() {
  const i18n = useTranslate();
  const { t } = i18n;

  return (
    <span className="HelloWorld">
      <header>
        <h1>{t("Application.title")}</h1>
        <h2>{t("Application.subTitle")}</h2>
      </header>
      <main>
        <LanguageSwitcher></LanguageSwitcher>
      </main>

      <footer>{t("Application.footer")}</footer>
    </span>
  );
}

export default Home;
