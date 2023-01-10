import React from "react";
// Application dependencies
import {
  useTranslate,
  useTranslateDispatch,
  useTranslateState,
} from "../../translate";

function LanguageSwitcher() {
  const { language } = useTranslateState(); // we get the current language
  const i18n = useTranslate(); // we get the utils functions
  const { t, getLanguages } = i18n;
  const dispatch = useTranslateDispatch();

  const items = getLanguages().map((key: string) => {
    return key !== language ? (
      <button
        key={key}
        onClick={() => {
          dispatch({ type: "CHANGE_LANGUAGE", language: key });
        }}
      >
        {t(`LanguageSwitcher.${key}`)}
      </button>
    ) : (
      ""
    );
  });

  return (
    <section>
      <span>
        {t(`LanguageSwitcher.used`)} {t(`LanguageSwitcher.${language}`)}
      </span>
      <span>{items}</span>
    </section>
  );
}

export default LanguageSwitcher;
