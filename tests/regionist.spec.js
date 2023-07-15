import {expect, test, jest} from '@jest/globals'
import {regionist, Regionist} from '../build/regionist.js'

const languagesGetter = jest.spyOn(window.navigator, 'languages', 'get')
const timezoneGetter = jest.spyOn(window.Intl.DateTimeFormat.prototype, 'resolvedOptions')

test('guesses user country, timezone and languages', () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    regionist.guess()

    expect(regionist.timezone).toBe('Europe/Istanbul')
    expect(regionist.country).toBe('TR')
    expect(regionist.nativeLanguage).toBe('tr')
    expect(regionist.preferredLanguage).toBe('en')
    expect(regionist.locale).toBe('tr_TR')
    expect(regionist.callingCode).toBe(90)
    expect(regionist.currencyCode).toBe('TRY')
})

test('validates locale strings', () => {
    expect(regionist.isLanguage('tr')).toBe(true)
    expect(regionist.isLanguage('xx')).toBe(false)
    expect(regionist.isCountry('TR')).toBe(true)
    expect(regionist.isCountry('us')).toBe(true)
    expect(regionist.isLocale('tr_TR')).toBe(true)
    expect(regionist.isLocale('en-us')).toBe(true)
    expect(regionist.isLocale('xx')).toBe(false)
    expect(regionist.isLocale('xx_US')).toBe(false)
})

test('formats locale strings', () => {
    expect(regionist.localeToIso('tr-tr')).toBe('tr_TR')
    expect(regionist.localeToIso('en-us')).toBe('en_US')
    expect(regionist.localeToIso('en_us')).toBe('en_US')
    expect(regionist.localeToIso('en_US')).toBe('en_US')
    expect(regionist.localeToIso('abcd')).toBe('')
    expect(regionist.localeToUrlSafe('en_US')).toBe('en-us')
    expect(regionist.localeToUrlSafe('en-US')).toBe('en-us')
    expect(regionist.localeToUrlSafe('abc')).toBe('')
})

test('finds best match to users locale from a given list', () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    regionist.guess()

    expect(regionist.findBestMatch(['en-us', 'tr-tr'])).toBe('tr-tr')
})

test('match url path with locale', () => {
    expect(regionist.matchUrlPath('/en-us')).toBe('en-us')
    expect(regionist.matchUrlPath('/en-us/abc')).toBe('en-us')
    expect(regionist.matchUrlPath('/qwe/en-us/abc')).toBe('')
    expect(regionist.matchUrlPath('/tr/abc')).toBe('tr')
    expect(regionist.matchUrlPath('/abc')).toBe('')
    expect(regionist.matchUrlPath('/us')).toBe('')
    expect(regionist.matchUrlPath('/', 'tr_TR')).toBe('tr_TR')
    expect(regionist.matchUrlPath('/en-us/about', 'tr_TR')).toBe('en-us')
})

test('remembers the user', () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    regionist.guess({remember: true})
    regionist.guess({remember: true})

    expect(regionist.getPreviousGuess()).toBeInstanceOf(Regionist)
    expect(regionist.getPreviousGuess()).toMatchObject({
        timezone: 'Europe/Istanbul',
        country: 'TR',
        nativeLanguage: 'tr',
        preferredLanguage: 'en',
        locale: 'tr_TR',
        callingCode: 90,
        currencyCode: 'TRY'
    })
})

test('output of the toObject method', () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    regionist.guess({remember: false})

    expect(regionist.toObject()).toMatchObject({
        timezone: 'Europe/Istanbul',
        country: 'TR',
        nativeLanguage: 'tr',
        preferredLanguage: 'en',
        locale: 'tr_TR',
        callingCode: 90,
        currencyCode: 'TRY'
    })
})