import localStoragePro from 'local-storage-pro'
import {jstz} from 'locale-util'
import {phoneNumberMetadata} from 'locale-util/data/core'
import {timezonesByCountry, countryOfficialLanguages, currencyCodesByCountry} from 'locale-util/data/extra'

function Region() {
  this.storeKeyName = 'region'
  this.prevParams = null

  // the parameters below will be set by guessing
  this.timezone = null
  this.country = null
  this.nativeLanguage = null
  this.preferredLanguage = null
  this.currency = null
  this.callingCode = null
  this.locale = null
  this.locales = []
  this.languages = []
}

Region.prototype.guess = function guess(opts = {remember: true}) {
  this.parse()

  const prevParams = opts.remember ? localStoragePro.getItem(this.storeKeyName) : null
  if (prevParams) {
    this.prevParams = JSON.parse(prevParams)
  }

  if (opts.remember) localStoragePro.setItem(this.storeKeyName, JSON.stringify( this.get() ))
}

Region.prototype.get = function get() {
  return {
    timezone: this.timezone,
    country: this.country,
    nativeLanguage: this.nativeLanguage,
    preferredLanguage: this.preferredLanguage,
    currency: this.currency,
    callingCode: this.callingCode,
    locale: this.locale,
    locales: this.locales,
    languages: this.languages
  }
}

Region.prototype.isTimezoneChanged = function isTimezoneChanged() {
  if (!this.prevParams) return false;
  if (!this.prevParams.timezone) return false;
  if (
    typeof this.prevParams.timezone == 'string' &&
    typeof this.timezone == 'string' &&
    this.prevParams.timezone != this.timezone
  ) return true;
  return false;
}

Region.prototype.isLocaleChanged = function isLocaleChanged() {
  if (!this.prevParams) return false;
  if (!this.prevParams.locale) return false;
  if (
    typeof this.prevParams.locale == 'string' &&
    typeof this.locale == 'string' &&
    this.prevParams.locale != this.locale
  ) return true;
  return false;
}

Region.prototype.parse = function parse() {
  // guess timezone
  const timezone = jstz.determine().name()
  if (typeof timezone == 'string' && timezone.length > 0) {
    this.timezone = timezone
  }

  // parse user agent languages
  let languagesList = []
  if ('languages' in window.navigator) {
    if (window.navigator.languages.length > 0) {
      languagesList = window.navigator.languages
    }
  }
  else if (window.navigator.language) {
    languagesList.push(window.navigator.language)
  }
  else if (window.navigator.userLanguage) {
    languagesList.push(window.navigator.userLanguage)
  }
  else return;
  if (languagesList.length < 1) return;

  const languages = []
  const locales = []
  for (var i = 0; i < languagesList.length; i++) {
    const parts = languagesList[i].split('-')
    const l = parts[0].toLowerCase()
    const c = parts.length > 1 ? parts[1].toUpperCase() : undefined
    const lc = parts.length > 1 ? l + '_' + c : undefined
    if (languages.indexOf(l) === -1) languages.push(l)
    if (lc && locales.indexOf(lc) === -1) locales.push(lc)
    if (lc && !this.country) this.country = c
  }

  if (languages.length > 0) {
    this.preferredLanguage = languages[0]
    this.nativeLanguage = languages[0]
    this.languages = languages
  }
  this.locales = locales

  // find country from timezone
  if (this.timezone) {
    const tz = this.timezone
    const tzl = tz.toLowerCase()
    const timezoneCountries = Object
      .keys(timezonesByCountry)
      .filter(function(countryCode) {
        const matches = timezonesByCountry[countryCode]
          .filter(name => name.toLowerCase() == tzl)
        return matches && matches.length > 0
      })
    if (timezoneCountries && timezoneCountries.length > 0) {
      // the country found from timezone is prior the one from user agent
      // so replace the value if exist
      this.country = timezoneCountries[0].toUpperCase()
      // trust country and find user nativeLanguage
      this.nativeLanguage = countryOfficialLanguages[this.country][0]
      const newLocale = this.nativeLanguage + '_' + this.country
      if (this.locales.indexOf(newLocale) === -1) this.locales.unshift(newLocale)
    }
  }

  this.locale = this.locales[0]

  // calling code
  if (
    this.country &&
    phoneNumberMetadata.hasOwnProperty(this.country)
  ) {
    this.callingCode = phoneNumberMetadata[this.country]
  }

  // currency code
  if (
    this.country &&
    currencyCodesByCountry.hasOwnProperty(this.country)
  ) {
    this.currency = currencyCodesByCountry[this.country]
  }

  return;
}

export default new Region()
