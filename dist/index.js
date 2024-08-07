import { findCountryFromTimezoneName, findCountryLanguages, findCountryTimezones, findCountryCallingCode, findCountryCurrencyCode } from 'locale-util';

class Regionist {
  isDomAvailable = typeof window !== "undefined";
  findings = {};
  timezone;
  country;
  locale;
  preferredLocale;
  callingCode;
  currencyCode;
  constructor() {
    this.identify();
    this.guess();
    this.guessFurther();
  }
  findClosestLocale(localeLikes = [], defaultLocale) {
    const formatted = localeLikes.map((lang) => this.convertLocaleLikeTextToObject(lang));
    if (!formatted || formatted.length === 0) {
      return defaultLocale ?? localeLikes[0] ?? "";
    }
    const format = localeLikes.some((text) => text.includes("_")) ? "iso" : localeLikes.some((text) => /[A-Z]/.test(text)) ? "ietf" : "url";
    const localeMatch = formatted.find(({ language, country }) => {
      var _a, _b;
      return ((_a = this.locale) == null ? void 0 : _a.language) === language && ((_b = this.locale) == null ? void 0 : _b.country) === country;
    });
    if (localeMatch)
      return this.convertLocaleObjectToText(localeMatch, format);
    const countryMatch = formatted.find(({ country }) => this.country === country);
    if (countryMatch)
      return this.convertLocaleObjectToText(countryMatch, format);
    const languageMatch = formatted.find(({ language }) => {
      var _a;
      return ((_a = this.locale) == null ? void 0 : _a.language) === language;
    });
    if (languageMatch)
      return this.convertLocaleObjectToText(languageMatch, format);
    const preferredLocaleMatch = formatted.find(({ language, country }) => {
      var _a, _b;
      return ((_a = this.preferredLocale) == null ? void 0 : _a.language) === language && ((_b = this.preferredLocale) == null ? void 0 : _b.country) === country;
    });
    if (preferredLocaleMatch)
      return this.convertLocaleObjectToText(preferredLocaleMatch, format);
    const preferredCountryMatch = formatted.find(({ country }) => {
      var _a;
      return ((_a = this.preferredLocale) == null ? void 0 : _a.country) === country;
    });
    if (preferredCountryMatch)
      return this.convertLocaleObjectToText(preferredCountryMatch, format);
    const preferredLanguageMatch = formatted.find(({ language }) => {
      var _a;
      return ((_a = this.preferredLocale) == null ? void 0 : _a.language) === language;
    });
    if (preferredLanguageMatch)
      return this.convertLocaleObjectToText(preferredLanguageMatch, format);
    return defaultLocale ?? "";
  }
  toObject() {
    return {
      timezone: this.timezone,
      country: this.country,
      locale: this.locale,
      preferredLocale: this.preferredLocale,
      callingCode: this.callingCode,
      currencyCode: this.currencyCode
    };
  }
  identify() {
    if (!this.isDomAvailable)
      return;
    try {
      const result = Intl.DateTimeFormat().resolvedOptions();
      this.findings.windowIntlTimezone = result.timeZone;
      this.findings.windowIntlLocale = result.locale;
    } catch (error) {
      return;
    }
    const n = window.navigator;
    if ("languages" in n && n.languages && n.languages.length > 0)
      this.findings.windowNavigatorLanguages = Array.from(n.languages);
    else if (n.language)
      this.findings.windowNavigatorLanguages = [n.language];
  }
  guess() {
    const formattedWindowNavigatoLanguages = this.findings.windowNavigatorLanguages ? this.findings.windowNavigatorLanguages.map((lang) => this.convertLocaleLikeTextToObject(lang)) : [];
    if (formattedWindowNavigatoLanguages && formattedWindowNavigatoLanguages.length > 0 && formattedWindowNavigatoLanguages[0].country) {
      this.preferredLocale = formattedWindowNavigatoLanguages[0];
    }
    if (this.findings.windowIntlTimezone) {
      this.timezone = this.findings.windowIntlTimezone;
      this.country = findCountryFromTimezoneName(this.timezone);
      const possibleLanguages = findCountryLanguages(this.country);
      if (possibleLanguages && possibleLanguages.length === 1 && this.country) {
        this.locale = { language: possibleLanguages[0], country: this.country };
        return;
      }
      if (possibleLanguages && possibleLanguages.length > 1 && this.country) {
        const bestPossibleLanguage = possibleLanguages.find((lang) => formattedWindowNavigatoLanguages.some(({ language }) => language === lang));
        if (bestPossibleLanguage) {
          this.locale = { language: bestPossibleLanguage, country: this.country };
          return;
        }
      }
    }
    if (this.preferredLocale && !this.timezone) {
      const possibleTimezones = findCountryTimezones(this.preferredLocale.country);
      if (possibleTimezones) {
        this.timezone = possibleTimezones[0].country;
      }
      this.country = this.preferredLocale.country;
      this.locale = this.preferredLocale;
      return;
    }
    return;
  }
  guessFurther() {
    if (!this.country)
      return;
    this.callingCode = findCountryCallingCode(this.country);
    this.currencyCode = findCountryCurrencyCode(this.country);
  }
  convertLocaleLikeTextToObject(text) {
    if (!text.includes("-") && !text.includes("_"))
      return { language: text.toLowerCase() };
    const _text = text.replace("-", "_");
    return {
      language: _text.slice(0, _text.lastIndexOf("_")),
      country: _text.slice(_text.lastIndexOf("_") + 1)
    };
  }
  convertLocaleObjectToText(obj, format = "iso") {
    var _a;
    return this.formatLocaleText(obj.language + "-" + ((_a = obj.country) == null ? void 0 : _a.toUpperCase()), format);
  }
  formatLocaleText(v, format = "iso") {
    const sep = format === "iso" ? "_" : "-";
    if (v.length < 3 || !v.includes("-") && !v.includes("_")) {
      return v.toLowerCase();
    }
    const parts = v.split(/(_|-)/);
    return parts[0].toLowerCase() + sep + (format === "iso" || format === "ietf" ? parts[2].toUpperCase() : parts[2].toLowerCase());
  }
}
const regionist = new Regionist();

export { Regionist, regionist };
//# sourceMappingURL=index.js.map
