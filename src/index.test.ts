import { expect, test, vi } from 'vitest'
import { Regionist } from './index'

const DateTimeFormatMock = vi.fn(() => ({
    resolvedOptions: vi.fn(() => ({
        timeZone: 'America/New_York',
        locale: 'en-US',
    }))
}))

vi.stubGlobal('Intl', { DateTimeFormat: DateTimeFormatMock })
vi.stubGlobal('navigator', { languages: ['tr-TR', 'en-US'], language: 'tr-TR' })

test('identify', () => {
    const r = new Regionist()
    expect(r.findings.windowIntlTimezone).toBe('America/New_York')
    expect(r.findings.windowIntlLocale).toBe('en-US')
    expect(r.findings.windowNavigatorLanguages).toContain('tr-TR')
    expect(r.findings.windowNavigatorLanguages).toContain('en-US')
})

test('guess', () => {
    const r = new Regionist()
    expect(r.preferredLocale).toStrictEqual({ language: 'tr', country: 'TR' })
    expect(r.timezone).toBe('America/New_York')
    expect(r.country).toBe('US')
    expect(r.locale).toStrictEqual({ language: 'en', country: 'US' })
})

test('guess further', () => {
    const r = new Regionist()
    expect(r.callingCode).toBe(1)
    expect(r.currencyCode).toBe('USD')
})

test('to object', () => {
    const r = new Regionist()
    expect(r.toObject()).toStrictEqual({
        timezone: 'America/New_York',
        country: 'US',
        locale: { language: 'en', country: 'US' },
        preferredLocale: { language: 'tr', country: 'TR' },
        callingCode: 1,
        currencyCode: 'USD'
    })
})

test('find closest locale', () => {
    const r = new Regionist()
    expect(r.findClosestLocale(['en-us', 'tr-tr'])).toBe('en-us')
    expect(r.findClosestLocale(['en_US', 'tr_TR'])).toBe('en_US')
    expect(r.findClosestLocale(['en-CA', 'en-AU', 'de-DE'])).toBe('en-CA')
    expect(r.findClosestLocale(['de-DE', 'fr-FR', 'en-US'])).toBe('en-US')
})

test('format locale text', () => {
    const r = new Regionist()
    expect(r.formatLocaleText('abcd', 'iso')).toBe('abcd')
    expect(r.formatLocaleText('a', 'iso')).toBe('a')
    expect(r.formatLocaleText('en-US', 'iso')).toBe('en_US')
    expect(r.formatLocaleText('en_US', 'iso')).toBe('en_US')
    expect(r.formatLocaleText('en-us', 'iso')).toBe('en_US')
    expect(r.formatLocaleText('en', 'iso')).toBe('en')
    expect(r.formatLocaleText('en-US', 'url')).toBe('en-us')
    expect(r.formatLocaleText('en_US', 'url')).toBe('en-us')
    expect(r.formatLocaleText('en-us', 'url')).toBe('en-us')
    expect(r.formatLocaleText('en', 'url')).toBe('en')
    expect(r.formatLocaleText('en-US', 'ietf')).toBe('en-US')
    expect(r.formatLocaleText('en_US', 'ietf')).toBe('en-US')
    expect(r.formatLocaleText('en-us', 'ietf')).toBe('en-US')
    expect(r.formatLocaleText('en', 'ietf')).toBe('en')
})
