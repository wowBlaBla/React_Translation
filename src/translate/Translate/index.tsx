let _currentLang = '';
let _fallbackLang = '';
let _languages: string[] = [];
let _translations: any = {};

export const getCurrentLanguage = () => {
    return _currentLang;
}

export const setCurrentLanguage = (currentLanguage: string) => {
    _currentLang = currentLanguage;
}

export const getFallbackLanguage = () => {
    return _fallbackLang;
}

export const setFallbackLanguage = (fallbackLanguage: string) => {
    _fallbackLang = fallbackLanguage;
}

export const getLanguages = () => {
    return _languages;
}

export const setLanguages = (langs: string[]) => {
    _languages = langs;
    _languages.forEach((language: string) => {
        const loadedLanguage = require(`../Languages/${language}.json`);
        _translations[language] = loadedLanguage;
    })
}

export const getTranslations = (translations: string[]) => {
    return _translations;
}

export const t = (label: string) => {
    return _translations[_currentLang] && _translations[_currentLang][label]
        ? _translations[_currentLang][label]
        : _translations[_fallbackLang] && _translations[_fallbackLang][label]
            ? _translations[_fallbackLang][label]
            : label
}

