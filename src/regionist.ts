import type {
    CountryCode,
    LanguageCode,
    CurrencyCode,
    CountryLanguages,
    Timezone,
    CountryCallingCodes,
    CountryCurrencies
} from 'locale-util'

import store from 'store/dist/store.modern'
import {
    languageCodes,
    countryCodes,
    timezones,
    countryLanguages,
    countryCallingCodes,
    countryCurrencies
} from 'locale-util'

export class Regionist {
    timezone: string | null = null
    country: CountryCode | null = null
    nativeLanguage: LanguageCode | null = null
    preferredLanguage: LanguageCode | null = null
    locale: string | null = null
    callingCode: number | null = null
    currencyCode: CurrencyCode | null = null
    languages: LanguageCode[] = languageCodes
    countries: CountryCode[] = countryCodes
    timezones: Timezone[] = timezones
    countryLanguages: CountryLanguages = countryLanguages
    countryCallingCodes: CountryCallingCodes = countryCallingCodes
    countryCurrencies: CountryCurrencies = countryCurrencies
    #localStorageIdentifier = '_regionist'
    #prev: Regionist | null = null
    #browserLocaleLikes: string[] = []

    guess(opts = {remember: false}): Regionist {
        this.#browserLocaleLikes = this.generateLocaleLikesFromNavigator()

        this.timezone = this.guessTimezone()
        this.country = this.guessCountry()
        this.nativeLanguage = this.findNativeLanguage()
        this.preferredLanguage = this.findPreferredLanguage()
        this.callingCode = this.findCallingCode()
        this.currencyCode = this.findCurrencyCode()
        this.locale = this.constructLocale()

        if (opts.remember) {
            this.remember()

            store.set(
                this.#localStorageIdentifier,
                {
                    timezone: this.timezone,
                    country: this.country,
                    nativeLanguage: this.nativeLanguage,
                    preferredLanguage: this.preferredLanguage,
                    locale: this.locale,
                    callingCode: this.callingCode,
                    currencyCode: this.currencyCode
                }
            )
        }

        return this
    }

    toObject(): object {
        return {
            timezone: this.timezone,
            country: this.country,
            nativeLanguage: this.nativeLanguage,
            preferredLanguage: this.preferredLanguage,
            locale: this.locale,
            callingCode: this.callingCode,
            currencyCode: this.currencyCode
        }
    }

    findBestMatch(localeLikes: string[] = []): string {
        if (!this.isArray(localeLikes)) return ''
        if (localeLikes.length === 0) return ''

        const filtered = localeLikes.filter((str) => this.isLocale(str))

        const localeMatch = filtered.find((lo) => this.localeToIso(lo) === this.locale)
        if (localeMatch) return localeMatch

        const countryMatch = filtered.find((lo) => lo.includes('_') ? lo.split('_')[1] === this.country : false)
        if (countryMatch) return countryMatch

        const languageMatch = filtered.find((lo) => lo.slice(0, 2) === this.nativeLanguage || lo.slice(0, 2) === this.preferredLanguage)
        if (languageMatch) return languageMatch

        return localeLikes[0] as string
    }

    matchUrlPath(path: string, fallback = ''): string {
        const matches = path.split('/').filter((str) => typeof str === 'string' && str.length > 0)
        if (matches && matches.length > 0) {
            if (this.isLocale(matches[0])) {
                return matches[0]
            }
        }

        return fallback || ''
    }

    isArray(v: unknown): v is any[] {
        return (!!v) && (v.constructor === Array)
    }

    hasCountryChanged(): boolean {
        return typeof (this.#prev as Regionist).country === 'string' && (this.#prev as Regionist).country !== this.country
    }

    hasTimezoneChanged(): boolean {
        return typeof (this.#prev as Regionist).timezone === 'string' && (this.#prev as Regionist).timezone !== this.timezone
    }

    remember(): Regionist {
        this.#prev = new Regionist()

        const obj = store.get(this.#localStorageIdentifier)
        if (!obj) {
            return this
        }

        this.#prev.timezone = obj.timezone
        this.#prev.country = obj.country
        this.#prev.nativeLanguage = obj.nativeLanguage
        this.#prev.preferredLanguage = obj.preferredLanguage
        this.#prev.locale = obj.locale
        this.#prev.callingCode = obj.callingCode
        this.#prev.currencyCode = obj.currencyCode

        return this
    }

    getPreviousGuess(): Regionist | null {
        return this.#prev
    }

    constructLocale(): string {
        if (this.nativeLanguage !== null && this.country !== null) {
            return this.nativeLanguage + '_' + this.country
        }
        else if (this.nativeLanguage === null && this.country === null) {
            return ''
        }
        else {
            return (this.nativeLanguage || this.country) as string
        }
    }

    /**
     * Returns the currency code for either the given country or the user's country.
     *
     * @param country {CountryCode | undefined}
     * @returns {CurrencyCode | null}
     */
    findCurrencyCode(country: CountryCode | undefined = undefined): CurrencyCode | null {
        if (country !== undefined) {
            return this.countryCurrencies[country] || null
        }
        else if (this.country !== null) {
            return this.countryCurrencies[this.country] || null
        }
        else {
            return null
        }
    }

    /**
     * Returns the calling code for either the given country or the user's country.
     *
     * @param country {CountryCode | undefined}
     * @returns {number | null}
     */
    findCallingCode(country: CountryCode | undefined = undefined): number | null {
        if (country !== undefined) {
            return this.countryCallingCodes[country] || null
        }
        else if (this.country !== null) {
            return this.countryCallingCodes[this.country] || null
        }
        else {
            return null
        }
    }

    /**
     * Finds the first language in the user's browser language preferences.
     *
     * @returns {LanguageCode | null}
     */
    findPreferredLanguage(): LanguageCode | null {
        const results = this.#browserLocaleLikes
            .map((l) => this.isLanguage(l) ? l : this.parseLocaleLike(l).lang)
            .filter((l) => this.isLanguage(l))
        return results.length === 0 ? null : results[0] as LanguageCode
    }

    /**
     * Guesses the user's native language based on timezone and browser language preferences.
     * It prioritizes the language found based on the country which is based on the timezone.
     * It looks for browser language preferences otherwise.
     *
     * @returns {LanguageCode | null}
     */
    findNativeLanguage(): LanguageCode | null {
        const possibles = this.#browserLocaleLikes
            .map((l) => this.isLanguage(l) ? l : this.parseLocaleLike(l).lang)
            .filter((l) => this.isLanguage(l))
        if (this.country === null) {
            return possibles.length > 0 ? possibles[0] as LanguageCode : null
        }

        const more = this.countryLanguages[this.country]
        const result = more.find((l) => possibles.includes(l))
        if (result) {
            return result
        }

        return more[0] as LanguageCode
    }

    /**
     * Guesses the user's country based on timezone and browser language preferences.
     *
     * @returns {CountryCode | null}
     */
    guessCountry(): CountryCode | null {
        if (this.timezone) {
            const result = this.timezones.find(({name}) => name === this.timezone)
            if (result) {
                return result.country
            }
        }

        if (this.#browserLocaleLikes.length > 0) {
            const results = this.#browserLocaleLikes.filter((l) => l.length > 2)
            if (results && results.length > 0) {
                return this.parseLocaleLike(results[0]).country
            }
        }

        return null
    }

    /**
     * Guesses the user's timezone based on window.Intl global object.
     *
     * @returns {string | null}
     */
    guessTimezone(): string | null {
        try {
            return Intl.DateTimeFormat().resolvedOptions().timeZone
        } catch (error) {
            return null
        }
    }

    generateLocaleLikesFromNavigator(): string[] {
        let result: string[] = []

        if (!('navigator' in window)) return result

        const n = window.navigator
        if (('languages' in n) && n.languages && n.languages.length > 0) result = Array.from(n.languages)
        else if (n.language) result = [n.language]
        else return result

        return result.map(r => this.localeToIso(r))
    }

    /**
     * Converts a locale-like string to ISO format. For example, 'en-us' (or 'en_us') becomes 'en_US'.
     *
     * @param v - locale-like string
     * @returns {string}
     */
    localeToIso(v: unknown): string {
        if (typeof v !== 'string') return ''

        const obj = this.parseLocaleLike(v)
        if (typeof obj.lang === 'string' && typeof obj.country === 'string') {
            return `${obj.lang}_${obj.country}`
        }
        else if (typeof obj.lang === 'string') {
            return obj.lang
        }
        else if (typeof obj.country === 'string') {
            return obj.country
        }
        else {
            return ''
        }
    }

    /**
     * Converts a locale-like string to url-safe format. For example, 'en_US' (or 'en-US') becomes 'en-us'.
     *
     * @param v - locale-like string
     * @returns {string}
     */
    localeToUrlSafe(v: unknown): string {
        if (typeof v !== 'string') return ''

        const obj = this.parseLocaleLike(v)
        if (typeof obj.lang === 'string' && typeof obj.country === 'string') {
            return `${obj.lang}-${obj.country.toLowerCase()}`
        }
        else if (typeof obj.lang === 'string') {
            return obj.lang
        }
        else if (typeof obj.country === 'string') {
            return obj.country.toLowerCase()
        }
        else {
            return ''
        }
    }

    parseLocaleLike(v: unknown): {lang: LanguageCode | null, country: CountryCode | null} {
        const result: {lang: LanguageCode | null, country: CountryCode | null} = {lang: null, country: null}
        if (typeof v !== 'string') return result

        const arr = v.split(/(_|-)/)

        if (arr.length === 1) {
            arr[0] = (arr[0] as string).toLowerCase()
            if (this.isLanguage(arr[0])) {
                result.lang = arr[0] as LanguageCode
            }
            return result
        }

        if (arr.length === 3) {
            arr[0] = (arr[0] as string).toLowerCase()
            arr[2] = (arr[2] as string).toUpperCase()
            if (this.isLanguage(arr[0]) && this.isCountry(arr[2])) {
                result.lang = arr[0] as LanguageCode
                result.country = arr[2] as CountryCode
            }
            return result
        }

        return result
    }

    isLocale(v: unknown): v is string {
        if (typeof v !== 'string') return false
        if (v.length < 2) return false

        const arr = v.split(/(_|-)/)

        if (arr.length === 1) {
            return this.isLanguage(arr[0])
        }

        if (arr.length === 3) {
            return this.isLanguage(arr[0]) && this.isCountry(arr[2])
        }

        return false
    }

    isLanguage(v: unknown): v is LanguageCode {
        return typeof v === 'string' && this.languages.find((lang) => lang === v.toLowerCase()) !== undefined
    }

    isCountry(v: unknown): v is CountryCode {
        return typeof v === 'string' && this.countries.find((c) => c === v.toUpperCase()) !== undefined
    }
}

const regionist = new Regionist()

export {
    regionist,
    languageCodes,
    countryCodes,
    timezones,
    countryLanguages,
    countryCallingCodes,
    countryCurrencies
}

export type {
    CountryCode,
    LanguageCode,
    CurrencyCode,
    CountryLanguages,
    Timezone,
    CountryCallingCodes,
    CountryCurrencies
} from 'locale-util'