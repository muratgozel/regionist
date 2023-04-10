declare module 'regionist' {
    import type {
        CountryCode,
        LanguageCode,
        CurrencyCode,
        CountryCallingCodes,
        CountryCurrencies,
        CountryLanguages,
        Timezone
    } from 'locale-util'

    export interface GuessResult {
        timezone: string | null
        country: CountryCode | null
        nativeLanguage: LanguageCode | null
        preferredLanguage: LanguageCode | null
        locale: string | null
        callingCode: number | null
        currencyCode: CurrencyCode | null
    }

    export interface Regionist {
        timezone: string | null
        country: CountryCode | null
        nativeLanguage: LanguageCode | null
        preferredLanguage: LanguageCode | null
        locale: string | null
        callingCode: number | null
        currencyCode: CurrencyCode | null
        languages: LanguageCode[]
        countries: CountryCode[]
        timezones: Timezone[]
        countryLanguages: CountryLanguages
        countryCallingCodes: CountryCallingCodes
        countryCurrencies: CountryCurrencies
        guess(opts = {remember: false}): Regionist
        toObject(): GuessResult
        findBestMatch(localeLikes: string[] = []): string
        matchUrlPath(path: string, fallback = ''): string
        isArray(v: unknown): v is any[]
        hasCountryChanged(): boolean
        hasTimezoneChanged(): boolean
        remember(): Regionist
        getPreviousGuess(): Regionist | null
        constructLocale(): string
        findCurrencyCode(country: CountryCode | undefined = undefined): CurrencyCode | null
        findCallingCode(country: CountryCode | undefined = undefined): number | null
        findPreferredLanguage(): LanguageCode | null
        findNativeLanguage(): LanguageCode | null
        guessCountry(): CountryCode | null
        guessTimezone(): string | null
        generateLocaleLikesFromNavigator(): string[]
        localeToIso(v: unknown): string
        localeToUrlSafe(v: unknown): string
        parseLocaleLike(v: unknown): {lang: LanguageCode | null, country: CountryCode | null}
        isCountry(v: unknown): v is CountryCode
        isLanguage(v: unknown): v is LanguageCode
        isLocale(v: unknown): v is string
    }

    export const regionist: Regionist

    export type {
        CountryCode,
        LanguageCode,
        CurrencyCode,
        CountryLanguages,
        Timezone,
        CountryCallingCodes,
        CountryCurrencies
    } from 'locale-util'
}