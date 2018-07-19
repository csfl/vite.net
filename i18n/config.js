const defaultLocale = "en";

module.exports = {
  defaultLocale,
  locales: [
    { code: "en", iso: "en-US", file: "en.js" , name: "English"},
    { code: "zh", iso: "zh-ZH", file: "zh.js" , name: "ZH"}
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected"
  },
  vueI18n: {
    fallbackLocale: defaultLocale,
    messages: {
      en: require("./en"),
      zh: require("./zh")
    }
  }
};