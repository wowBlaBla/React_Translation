import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  getCurrentLanguage,
  getFallbackLanguage,
  getLanguages,
  getTranslations,
  setCurrentLanguage,
  setFallbackLanguage,
  setLanguages,
  t,
} from "./Translate";

const { language, fallbackLanguage, languages } = {
  language: "en",
  fallbackLanguage: "en",
  languages: ["en", "jp"],
};

// Init

setCurrentLanguage(language);
setFallbackLanguage(fallbackLanguage);
setLanguages(languages);

interface TranslateContextType {
  getCurrentLanguage: () => void;
  setCurrentLanguage: (currentLanguage: string) => void;
  getFallbackLanguage: () => void;
  getLanguages: () => string[];
  setLanguages: (langs: string[]) => void;
  getTranslations: (translations: string[]) => void;
  t: (key: string) => ReactNode;
}

// Create Context
const TranslateContext = createContext<TranslateContextType>({
  getCurrentLanguage,
  setCurrentLanguage,
  getFallbackLanguage,
  getLanguages,
  setLanguages,
  getTranslations,
  t,
});

interface TranslateStateContextType {
  language: string;
}

const TranslateStateContext = createContext<TranslateStateContextType>({
  language: "en",
});

const TranslateDispatchContext = createContext<
  React.Dispatch<React.SetStateAction<TranslateStateContextType>> | any
>({});

// Define reducers

function translateReducer(state: any, action: any) {
  switch (action.type) {
    case "CHANGE_LANGUAGE": {
      setCurrentLanguage(action.language);
      return { ...state, language: action.language };
    }
    default: {
      throw new Error(`error occured with action type: ${action.type}`);
    }
  }
}

// Init state

const inittialState = {
  language,
};

export const TranslateProvider = (props: any) => {
  const value = {
    getCurrentLanguage: props.getCurrentLanguage || getCurrentLanguage,
    setCurrentLanguage: props.setCurrentLanguage || setCurrentLanguage,
    getFallbackLanguage: props.getFallbackLanguage || getFallbackLanguage,
    getLanguages: props.getLanguages || getLanguages,
    setLanguages: props.setLanguages || setLanguages,
    getTranslations: props.getTranslations || getTranslations,
    t: props.t || t,
  };

  const [state, dispatch] = useReducer(translateReducer, inittialState);

  return (
    <TranslateContext.Provider value={value}>
      <TranslateStateContext.Provider value={state}>
        <TranslateDispatchContext.Provider value={dispatch}>
          {props.children}
        </TranslateDispatchContext.Provider>
      </TranslateStateContext.Provider>
    </TranslateContext.Provider>
  );
};

export const useTranslate = () => {
  // use the fucntion of provider
  const context = useContext(TranslateContext);
  if (context === undefined) {
    throw new Error("useTranslate error with Translate provider");
  }
  return context;
};

export const useTranslateState = () => {
  const context = useContext(TranslateStateContext);
  if (context === undefined) {
    throw new Error("useTranslateDispatch error");
  }
  return context;
};

export const useTranslateDispatch = () => {
  const context = useContext(TranslateDispatchContext);
  if (context === undefined) {
    throw new Error("TranslateDispatchContext error");
  }
  return context;
};
