import jstz from 'locale-util/data/jstz'
import phoneNumberMetadata from 'locale-util/data/core/phoneNumberMetadata.json'
import timezonesByCountry from 'locale-util/data/extra/timezonesByCountry.json'
import countryOfficialLanguages from 'locale-util/data/extra/countryOfficialLanguages.json'
import currencyCodesByCountry from 'locale-util/data/extra/currencyCodesByCountry.json'

function Regionist() {
  // remembering and getting previously found params benefit us to find out
  // if the user's timezone and other params have changed.
  this.prevParams = null

  // here are the list of params that will be set after guessing.
  this.timezone = null
  this.country = null
  this.languages = []
  this.currencyCode = null
  this.callingCode = null
}

Regionist.prototype.localStorageIdentifier = '_regionist'
Regionist.prototype.reBrowserLocale = /[a-z]+(-|_)[a-zA-Z]{2}/

Regionist.prototype.formatLocaleLike = function formatLocaleLike(localeLike) {
  const parts = localeLike.split(/(_|-)/)
  const l = parts[0].toLowerCase()
  const c = parts.length > 2 ? parts[2].toUpperCase() : undefined
  return l + (c ? '_' + c : '')
}

Regionist.prototype.chooseFrom = function chooseFrom(localeLikes=[]) {
  const {locale, country, nativeLanguage, preferredLanguage} = this.get()

  // giving priority to locales over languages
  const sorted = localeLikes.sort(function(a, b) {
    if (a.length > b.length) return -1;
    else if (a.length < b.length) return 1;
    else return 0;
  })

  for (var i = 0; i < localeLikes.length; i++) {
    const input = localeLikes[i]
    const lo = this.formatLocaleLike(input)
    if (lo == locale) {
      return input;
    }

    const parts = lo.split(/(_|-)/)
    const l = parts[0]
    const c = parts.length > 2 ? parts[2] : undefined
    const lmatch = l == nativeLanguage || l == preferredLanguage
    if ((!c && lmatch) || (c == country && lmatch)) {
      return input;
    }
  }

  return undefined;
}

Regionist.prototype.guess = function guess(opts = {remember: false}) {
  this.run()

  if (opts.remember) {
    // get previous params if localStorage api supported
    try {
      const str = window.localStorage.getItem(this.localStorageIdentifier)
      this.prevParams = JSON.parse(str)
    } catch (e) {
      // not supported, in private mode or something else...
    }

    // persist current params
    try {
      window.localStorage.setItem(this.localStorageIdentifier, JSON.stringify(this.get()))
    } catch (e) {}
  }

  return this
}

Regionist.prototype.get = function get() {
  return {
    timezone: this.timezone,
    country: this.country,
    nativeLanguage: this.languages[0],
    preferredLanguage: this.languages[1],
    locale: this.languages[0] + '_' + this.country,
    currencyCode: this.currencyCode,
    callingCode: this.callingCode
  }
}

Regionist.prototype.isTimezoneChanged = function isTimezoneChanged() {
  if (!this.prevParams) return null;
  if (typeof this.params.timezone != 'string') return null;
  if (typeof this.timezone == 'string' && this.prevParams.timezone != this.timezone) {
    return true;
  }
  return false;
}

Regionist.prototype.isCountryChanged = function isCountryChanged() {
  if (!this.prevParams) return null;
  if (typeof this.prevParams.country != 'string') return null;
  if (typeof this.country == 'string' && this.prevParams.country != this.country) {
    return true;
  }
  return false;
}

Regionist.prototype.findTimezone = function findTimezone() {
  this.timezone = jstz.determine().name()
}

Regionist.prototype.guessCountriesFromTimezone = function guessCountriesFromTimezone() {
  this.countriesFromTimezone = []

  if (!this.timezone) return;

  const tz = this.timezone.toLowerCase()
  this.countriesFromTimezone = Object
    .keys(timezonesByCountry)
    .filter(function(countryCode) {
      const matches = timezonesByCountry[countryCode].filter(
        tzname => tzname.toLowerCase() == tz)

      return matches && matches.length > 0
    })
}

Regionist.prototype.findBrowserLocaleLikes = function findBrowserLocaleLikes() {
  this.browserLocaleLikes = []

  if (!('navigator' in window))
    return;

  const nav = window.navigator

  if (('languages' in nav) && nav.languages && nav.languages.length > 0)
    this.browserLocaleLikes = nav.languages
  else if (nav.language)
    this.browserLocaleLikes.push(nav.language)
  else if (nav.userLanguage)
    this.browserLocaleLikes.push(nav.userLanguage)
  else {}

  if (!Array.isArray(this.browserLocaleLikes))
    this.browserLocaleLikes = []

  return;
}

Regionist.prototype.guessCountriesFromLocaleLikes = function guessCountriesFromLocaleLikes() {
  const self = this

  self.countriesFromLocaleLikes = []

  if (self.browserLocaleLikes.length === 0) return;

  const matches = self.browserLocaleLikes
    .map(function(localeLike) {
      return self.reBrowserLocale.test(localeLike)
        ? localeLike.split(/(_|-)/)[2].toUpperCase()
        : undefined
    })
    .filter(function(match) {
      return typeof match == 'string' && match.length > 0
    })

  if (matches && matches.length > 0) {
    self.countriesFromLocaleLikes = matches
  }

  return;
}

Regionist.prototype.findCountry = function findCountry() {
  // guess timezone, timezone is the primary trust source
  this.findTimezone()
  this.guessCountriesFromTimezone()
  this.findBrowserLocaleLikes()

  if (this.countriesFromTimezone.length === 1) {
    this.country = this.countriesFromTimezone[0]
    return;
  }

  // hmm... lets look at the browser
  this.guessCountriesFromLocaleLikes()

  // hard decision time! match timezone countries with browser countries
  if (this.countriesFromTimezone.length === 0 && this.countriesFromLocaleLikes.length === 0) {
    // are you from mars?
    return;
  }

  if (this.countriesFromTimezone.length === 0 && this.countriesFromLocaleLikes.length > 0) {
    this.country = this.countriesFromLocaleLikes[0]
    return;
  }

  if (this.countriesFromLocaleLikes === 0) {
    this.country = this.countriesFromTimezone[0]
    return;
  }

  for (let i = 0; i < this.countriesFromTimezone.length; i++) {
    const tcountry = this.countriesFromTimezone[i]
    if (this.countriesFromLocaleLikes.indexOf(tcountry) !== -1) {
      this.country = tcountry
      return;
    }
  }

  this.country = this.countriesFromTimezone[0]
  return;
}

Regionist.prototype.findLanguages = function findLanguages() {
  if (!this.country) return;

  const olangs = countryOfficialLanguages[this.country]
  const browserlangs = this.browserLocaleLikes.map(function(localeLike) {
    return localeLike.split(/(_|-)/)[0]
  })

  // native language is very likely to be one of country official languages but
  // if the primary member of the browser lang is an official lang we prefer that
  this.languages = [undefined, undefined]
  for (let i = 0; i < browserlangs.length; i++) {
    const blang = browserlangs[i]
    if (olangs.indexOf(blang) !== -1) {
      this.languages[0] = blang
      break;
    }
  }
  if (!this.languages[0]) {
    this.languages[0] = olangs[0]
  }

  // preferred language can only be appear in browser languages
  for (let j = 0; j < browserlangs.length; j++) {
    if (browserlangs[j] != this.languages[0]) {
      this.languages[1] = browserlangs[j]
      break;
    }
  }
  if (!this.languages[1]) {
    this.languages[1] = this.languages[0]
  }
}

Regionist.prototype.findCallingCode = function findCallingCode() {
  if (!this.country) return;

  if (phoneNumberMetadata.hasOwnProperty(this.country)) {
    this.callingCode = phoneNumberMetadata[this.country]
  }
}

Regionist.prototype.findCurrencyCode = function findCurrencyCode() {
  if (!this.country) return;

  if (currencyCodesByCountry.hasOwnProperty(this.country)) {
    this.currencyCode = currencyCodesByCountry[this.country]
  }
}

Regionist.prototype.run = function run() {
  // our priority is country, find that first
  this.findCountry()

  // get native and preferred languages
  this.findLanguages()

  this.findCallingCode()
  this.findCurrencyCode()
}

export default new Regionist()
