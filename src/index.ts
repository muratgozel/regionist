import { findCountryLanguages, findCountryFromTimezoneName, findCountryTimezones, findCountryCallingCode, findCountryCurrencyCode } from 'locale-util'

export class Regionist {
    isDomAvailable = typeof window !== 'undefined'

    findings: RegionistFindings = {}
    timezone?: string
    country?: string
    locale?: RegionistLocale
    preferredLocale?: RegionistLocale
    callingCode?: number
    currencyCode?: string

    constructor () {
        this.identify()
        this.guess()
        this.guessFurther()
    }

    findClosestLocale(localeLikes: string[] = [], defaultLocale?: string): string {
        const formatted = localeLikes.map((lang) => this.convertLocaleLikeTextToObject(lang))
        if (!formatted || formatted.length === 0) {
            return defaultLocale ?? localeLikes[0] ?? ''
        }

        const format = localeLikes.some((text) => text.includes('_')) ? 'iso' : 'url'

        const localeMatch = formatted.find(({ language, country }) => this.locale?.language === language && this.locale?.country === country)
        if (localeMatch) return this.convertLocaleObjectToText(localeMatch, format)

        const countryMatch = formatted.find(({ country }) => this.country === country)
        if (countryMatch) return this.convertLocaleObjectToText(countryMatch, format)

        const languageMatch = formatted.find(({ language }) => this.locale?.language === language)
        if (languageMatch) return this.convertLocaleObjectToText(languageMatch, format)

        const preferredLocaleMatch = formatted.find(({ language, country }) => this.preferredLocale?.language === language && this.preferredLocale?.country === country)
        if (preferredLocaleMatch) return this.convertLocaleObjectToText(preferredLocaleMatch, format)

        const preferredCountryMatch = formatted.find(({ country }) => this.preferredLocale?.country === country)
        if (preferredCountryMatch) return this.convertLocaleObjectToText(preferredCountryMatch, format)

        const preferredLanguageMatch = formatted.find(({ language }) => this.preferredLocale?.language === language)
        if (preferredLanguageMatch) return this.convertLocaleObjectToText(preferredLanguageMatch, format)

        return defaultLocale ?? ''
    }

    toObject(): RegionistOutput {
        return {
            timezone: this.timezone,
            country: this.country,
            locale: this.locale,
            preferredLocale: this.preferredLocale,
            callingCode: this.callingCode,
            currencyCode: this.currencyCode
        }
    }

    identify () {
        if (!this.isDomAvailable) return

        // read window.Intrl object
        try {
            const result = Intl.DateTimeFormat().resolvedOptions()
            this.findings.windowIntlTimezone = result.timeZone
            this.findings.windowIntlLocale = result.locale
        } catch (error) {
            return
        }

        // read window.navigator
        const n = window.navigator
        if (('languages' in n) && n.languages && n.languages.length > 0) this.findings.windowNavigatorLanguages = Array.from(n.languages)
        else if (n.language) this.findings.windowNavigatorLanguages = [n.language]
    }

    guess () {
        const formattedWindowNavigatoLanguages = this.findings.windowNavigatorLanguages
            ? this.findings.windowNavigatorLanguages.map((lang) => this.convertLocaleLikeTextToObject(lang))
            : []
        if (formattedWindowNavigatoLanguages && formattedWindowNavigatoLanguages.length > 0 && formattedWindowNavigatoLanguages[0].country) {
            this.preferredLocale = formattedWindowNavigatoLanguages[0]!
        }

        if (this.findings.windowIntlTimezone) {
            this.timezone = this.findings.windowIntlTimezone
            this.country = findCountryFromTimezoneName(this.timezone)!

            const possibleLanguages = findCountryLanguages(this.country)
            if (possibleLanguages && possibleLanguages.length === 1 && this.country) {
                this.locale = { language: possibleLanguages[0], country: this.country }
                return
            }

            if (possibleLanguages && possibleLanguages.length > 1 && this.country) {
                const bestPossibleLanguage = possibleLanguages.find((lang) => formattedWindowNavigatoLanguages.some(({ language }) => language === lang))
                if (bestPossibleLanguage) {
                    this.locale = { language: bestPossibleLanguage, country: this.country }
                    return
                }
            }
        }

        if (this.preferredLocale && !this.timezone) {
            const possibleTimezones = findCountryTimezones(this.preferredLocale.country!)
            if (possibleTimezones) {
                this.timezone = possibleTimezones[0].country
            }
            this.country = this.preferredLocale.country!
            this.locale = this.preferredLocale
            return
        }

        return
    }

    guessFurther () {
        if (!this.country) return
        this.callingCode = findCountryCallingCode(this.country)!
        this.currencyCode = findCountryCurrencyCode(this.country)!
    }

    convertLocaleLikeTextToObject (text: string): RegionistLocale {
        if (!text.includes('-') && !text.includes('_')) return { language: text.toLowerCase() }

        const _text = text.replace('-', '_')
        return {
            language: _text.slice(0, _text.lastIndexOf('_')),
            country: _text.slice(_text.lastIndexOf('_') + 1)
        }
    }

    convertLocaleObjectToText (obj: RegionistLocale, format: 'iso' | 'url' = 'iso') {
        return this.formatLocaleText(obj.language + '-' + obj.country?.toUpperCase(), format)
    }

    formatLocaleText (v: string, format: 'iso' | 'url' = 'iso'): string {
        const sep = format === 'iso' ? '_' : '-'

        if (v.length < 3 || (!v.includes('-') && !v.includes('_'))) {
            return v.toLowerCase()
        }

        const parts = v.split(/(_|-)/)
        return parts[0].toLowerCase() + sep + (format === 'iso' ? parts[2].toUpperCase() : parts[2].toLowerCase())
    }
}

export const regionist = new Regionist()

export interface RegionistLocale {
    language: string
    country?: string
}

export interface RegionistFindings {
    windowIntlTimezone?: string
    windowIntlLocale?: string
    windowNavigatorLanguages?: string[]
}

export interface RegionistOutput {
    timezone: string | undefined
    country: string | undefined
    locale: RegionistLocale | undefined
    preferredLocale: RegionistLocale | undefined
    callingCode: number | undefined
    currencyCode: string | undefined
}
