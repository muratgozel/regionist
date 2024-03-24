import {expect, test, jest} from '@jest/globals'

const languagesGetter = jest.spyOn(window.navigator, 'languages', 'get')
const timezoneGetter = jest.spyOn(window.Intl.DateTimeFormat.prototype, 'resolvedOptions')

test('guesses user country, timezone and languages', async () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    const { regionist } = await import('../dist/index.js')

    expect(regionist.timezone).toBe('Europe/Istanbul')
    expect(regionist.country).toBe('TR')
    expect(regionist.locale).toEqual({ language: 'tr', country: 'TR' })
    expect(regionist.preferredLocale).toEqual({ language: 'en', country: 'US' })
    expect(regionist.callingCode).toBe(90)
    expect(regionist.currencyCode).toBe('TRY')
})

test('formats locale strings', async () => {
    const { regionist } = await import('../dist/index.js')

    expect(regionist.formatLocaleText('tr-tr', 'iso')).toBe('tr_TR')
    expect(regionist.formatLocaleText('en-us', 'iso')).toBe('en_US')
    expect(regionist.formatLocaleText('en_us', 'iso')).toBe('en_US')
    expect(regionist.formatLocaleText('en_US', 'iso')).toBe('en_US')
    expect(regionist.formatLocaleText('abcd', 'iso')).toBe('abcd')
    expect(regionist.formatLocaleText('en_US', 'url')).toBe('en-us')
    expect(regionist.formatLocaleText('en-US', 'url')).toBe('en-us')
    expect(regionist.formatLocaleText('abc', 'url')).toBe('abc')
})

test('finds best match to users locale from a given list', async () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    const { regionist } = await import('../dist/index.js')

    expect(regionist.findClosestLocale(['en-us', 'tr-tr'])).toBe('tr-tr')
    expect(regionist.findClosestLocale(['en_US', 'tr_TR'])).toBe('tr_TR')
})

test('remembers the user', async () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    const { regionist } = await import('../dist/index.js')

    regionist.remember()
    regionist.remember()

    expect(regionist.memory).toMatchObject({
        timezone: 'Europe/Istanbul',
        country: 'TR',
        locale: { language: 'tr', country: 'TR' },
        preferredLocale: { language: 'en', country: 'US' },
        callingCode: 90,
        currencyCode: 'TRY'
    })
})

test('output of the toObject method', async () => {
    languagesGetter.mockReturnValue(['en-US', 'tr-TR'])
    timezoneGetter.mockReturnValue({timeZone: 'Europe/Istanbul'})

    const { regionist } = await import('../dist/index.js')

    expect(regionist.toObject()).toMatchObject({
        timezone: 'Europe/Istanbul',
        country: 'TR',
        locale: { language: 'tr', country: 'TR' },
        preferredLocale: { language: 'en', country: 'US' },
        callingCode: 90,
        currencyCode: 'TRY'
    })
})
