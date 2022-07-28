import jstz from 'locale-util/data/jstz/index.js'
import timezones from 'locale-util/data/extra/timezonesByCountry.json'
import countryLanguages from 'locale-util/data/extra/countryOfficialLanguages.json'
import callingCodes from 'locale-util/data/core/phoneNumberMetadata.json'
import currencyCodes from 'locale-util/data/extra/currencyCodesByCountry.json'
import store from 'store/dist/store.modern.js'

class Regionist {
  #browserLocaleLikes = []
  #localStorageIdentifier = '_regionist'
  #reLocale = /[a-z]{2,3}((-|_)[a-zA-Z]{2})?/
  #prev = null

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

    return this.formatLocaleLike(result)
  }

  formatLocaleLike(value) {
    value = Array.isArray(value) ? value : [value]

    return value
      .filter(v => {
        return typeof v == 'string' && this.#reLocale.test(v)
      })
      .map(v => {
        const arr = v.split(/(_|-)/)

        if (arr.length === 1) {
          return arr[0].toLowerCase()
        }

        if (arr.length === 3) {
          return arr[0].toLowerCase() + '_' + arr[2].toUpperCase()
        }

        return arr[0].toLowerCase()
      })
  }

  // picks the best language/locale from a given list
  pick(localeLikes=[]) {
    localeLikes = this.formatLocaleLike(localeLikes)
    
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

  pickFromUrl(fallback=null) {
    try {
      const firstPath = window.location.pathname.split('/').filter(v => v)[0]
      if (firstPath && this.#reLocale.test(firstPath)) {
        return this.formatLocaleLike(firstPath)[0]
      }
    } catch (e) {}

    return this.formatLocaleLike(fallback)[0]
  }
}

const regionist = new Regionist()

export {regionist, currencyCodes, callingCodes, countryLanguages, timezones} 