import jstz from 'locale-util/data/jstz/index.js'
import timezones from 'locale-util/data/extra/timezonesByCountry.json'
import countryLanguages from 'locale-util/data/extra/countryOfficialLanguages.json'
import callingCodes from 'locale-util/data/core/phoneNumberMetadata.json'
import currencyCodes from 'locale-util/data/extra/currencyCodesByCountry.json'
import store from 'store/dist/store.modern.js'

class Regionist {
  #browserLocaleLikes = []
  #localStorageIdentifier = '_regionist'
  #prev = null

  languages = Object.keys(countryLanguages).reduce(function (memo, c) {
    countryLanguages[c].map(l => memo.indexOf(l) === -1 ? memo.push(l) : null)
    return memo
  }, [])

  countries = Object.keys(countryLanguages)

  constructor(params={}) {
    this.timezone = params.timezone || null
    this.country = params.country || null
    this.nativeLanguage = params.nativeLanguage || null
    this.preferredLanguage = params.preferredLanguage || null
    this.locale = params.locale || null
    this.callingCode = params.callingCode || null
    this.currencyCode = params.currencyCode || null
  }

  guess(opts={remember: false}) {
    this.#browserLocaleLikes = this.generateLocaleLikesFromNavigator()
    this.timezone = this.guessTimezone()
    this.country = this.guessCountry()
    this.nativeLanguage = this.findNativeLanguage()
    this.preferredLanguage = this.findPreferredLanguage()
    this.locale = this.constructLocale()
    this.callingCode = this.findCallingCode()
    this.currencyCode = this.findCurrencyCode()

    if (opts.remember) {
      this.#prev = new Regionist( store.get(this.#localStorageIdentifier) )
      store.set(this.#localStorageIdentifier, Object.keys(this).reduce((m, k) => m[k]=this[k], {}))
    }

    return this
  }

  isCountryChanged() {
    return this.#prev.country != this.country && typeof this.country == 'string'
  }

  isTimezoneChanged() {
    return this.#prev.timezone != this.timezone && typeof this.timezone == 'string'
  }

  findCurrencyCode() {
    if (!this.country) return null;
    if (!currencyCodes.hasOwnProperty(this.country)) return null;

    return currencyCodes[this.country]
  }

  findCallingCode() {
    if (!this.country) return null;
    if (!callingCodes.hasOwnProperty(this.country)) return null;

    return callingCodes[this.country]
  }

  constructLocale() {
    return this.nativeLanguage + '_' + this.country
  }

  findPreferredLanguage() {
    const languagesWithinhNavigator = this.#browserLocaleLikes.map(l => l.slice(0, 2))

    if (languagesWithinhNavigator.length === 0) return null;

    return languagesWithinhNavigator[0]
  }

  findNativeLanguage() {
    const languagesWithinhNavigator = this.#browserLocaleLikes.map(l => l.slice(0, 2))

    if (languagesWithinhNavigator.length === 0) return null;
    if (!this.country) languagesWithinhNavigator[0]

    const languagesWithinCountry = countryLanguages[this.country]

    // the most suitable candidate for the native language is
    // the language from navigator found in languagesWithinCountry
    const possibleNativeLanguages = languagesWithinhNavigator
      .filter(l => languagesWithinCountry.indexOf(l) !== -1)
    if (possibleNativeLanguages && possibleNativeLanguages.length > 0) {
      return possibleNativeLanguages[0]
    }

    // just return primary official language
    return languagesWithinCountry[0]
  }

  guessCountry() {
    // guess based on timezone first
    let countriesWithinSameTimezone = []
    if (this.timezone) {
      const tz = this.timezone.toLowerCase()
      countriesWithinSameTimezone = Object.keys(timezones).filter(country => {
        const m = timezones[country].filter(_tz => _tz.toLowerCase() == tz)
        return m && m.length > 0
      })
      // if there is only one just return it, we trust timezone
      if (countriesWithinSameTimezone.length === 1) {
        return countriesWithinSameTimezone[0]
      }
    }

    // guess based on navigator
    const countriesWithinNavigator = this.#browserLocaleLikes
      .filter(l => l.indexOf('_') !== -1)
      .map(l => l.split('_')[1])
    
    if (countriesWithinSameTimezone.length === 0 && countriesWithinNavigator.length > 0) {
      return countriesWithinNavigator[0]
    }

    if (countriesWithinSameTimezone.length > 0 && countriesWithinNavigator.length === 0) {
      // just throw first country
      return countriesWithinSameTimezone[0]
    }

    if (countriesWithinSameTimezone.length === 0 && countriesWithinNavigator.length === 0) {
      // impossible to guess
      return null
    }

    const countryMatches = countriesWithinSameTimezone
      .filter(country => countriesWithinNavigator.indexOf(country) !== -1)
    if (countryMatches && countryMatches.length > 0) {
      return countryMatches[0]
    }

    return countriesWithinSameTimezone[0]
  }

  guessTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    } catch (error) {
      // Intl not supported, try jstz
      return jstz.determine().name()
    }
  }

  generateLocaleLikesFromNavigator() {
    let result = []

    if (!('navigator' in window)) return result

    const n = window.navigator
    if (('languages' in n) && n.languages && n.languages.length > 0) result = n.languages
    else if (n.language) result = [n.language]
    else if (n.userLanguage) result = [n.userLanguage]
    else return result

    return result.map(r => this.isoFormat(r))
  }

  isLanguage(v) {
    return this.languages.indexOf(v) > -1
  }

  isCountry(v) {
    if (typeof v != 'string') return false
    return this.countries.indexOf(v.toUpperCase()) > -1
  }

  isLocale(v) {
    if (!v) return false
    if (typeof v != 'string') return false
    if (v.length < 2) return false

    const arr = v.split(/(_|-)/)

    if (arr.length === 1) {
      if (!this.isLanguage(arr[0])) return false

      return true
    }

    if (arr.length === 3) {
      if (!this.isLanguage(arr[0])) return false
      if (!this.isCountry(arr[2])) return false

      return true
    }

    return false
  }

  format(v) {
    const arr = v.split(/(_|-)/)

    if (arr.length === 1) {
      return {lang: arr[0], country: null}
    }

    if (arr.length === 3) {
      return {lang: arr[0], country: arr[2].toUpperCase()}
    }

    return {lang: null, country: null}
  }

  urlFormat(v) {
    if (!this.isLocale(v)) return null;

    const formatted = this.format(v)

    return formatted.lang + (formatted.country ? '-' + formatted.country.toLowerCase() : '')
  }

  isoFormat(v) {
    if (!this.isLocale(v)) return null;

    const formatted = this.format(v)

    return formatted.lang + (formatted.country ? '_' + formatted.country : '')
  }

  // picks the best language/locale from a given list
  pick(localeLikes=[]) {
    localeLikes = Array.isArray(localeLikes) ? localeLikes : [localeLikes]
    localeLikes = localeLikes.filter(l => this.isLocale(l)).map(l => this.isoFormat(l))
    
    // match by order: locale + country + language

    // locale match
    const matches1 = localeLikes.filter(l => this.locale == l)
    if (matches1 && matches1.length > 0) return matches1[0]

    // country match
    const matches2 = localeLikes.filter(l => {
      const arr = l.split('_')
      const country = arr.length === 2 ? arr[1] : null
      if (country && country == this.country) return true;
      return false
    })
    if (matches2 && matches2.length > 0) return matches2[0]

    // language
    const matches3 = localeLikes.filter(l => {
      const arr = l.split('_')
      const lang = arr[0]
      const langMatch = lang == this.nativeLanguage || lang == this.preferredLanguage
      if (langMatch) return true;
      return false
    })
    if (matches3 && matches3.length > 0) return matches3[0]

    return localeLikes[0]
  }

  pickFromUrl(fallback=null, path=null) {
    const p = path || window.location.pathname
    try {
      const firstPath = p.split('/').filter(v => v)[0]
      if (firstPath && this.isLocale(firstPath)) {
        return this.isoFormat(firstPath)
      }
    } catch (e) {}

    return this.isoFormat(fallback)
  }
}

const regionist = new Regionist()

export {regionist, currencyCodes, callingCodes, countryLanguages, timezones} 