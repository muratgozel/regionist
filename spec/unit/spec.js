const {regionist} = require('../../dist/browser/cjs/index.js')

const result = regionist.guess()

describe('guess', function() {
  it('country.', () => {
    expect(result.country).toBe('TR')
  })

  it('languages.', function() {
    expect(result.nativeLanguage).toBe('tr')
    expect(result.preferredLanguage).toBe('en')
  })

  it('timezone.', () => {
    expect(result.timezone).toBe('Europe/Istanbul')
  })

  it('locale.', function() {
    expect(result.locale).toBe('tr_TR')
  })

  it('currency code.', function() {
    expect(result.currencyCode).toBe('TRY')
  })

  it('calling code.', function() {
    expect(result.callingCode).toBe('90')
  })
})

describe('validate', function () {
  it('languages', () => {
    expect(result.isLanguage(null)).toBe(false)
    expect(result.isLanguage('xx')).toBe(false)
    expect(result.isLanguage('en')).toBe(true)
  })

  it('countries', () => {
    expect(result.isCountry(null)).toBe(false)
    expect(result.isCountry('xx')).toBe(false)
    expect(result.isCountry('tr')).toBe(true)
    expect(result.isCountry('TR')).toBe(true)
  })

  it('locales', () => {
    expect(result.isLocale(null)).toBe(false)
    expect(result.isLocale('xx')).toBe(false)
    expect(result.isLocale('tr')).toBe(true)
    expect(result.isLocale('tr-tr')).toBe(true)
    expect(result.isLocale('en_US')).toBe(true)
    expect(result.isLocale('en-us')).toBe(true)
  })
})

describe('format as', function () {
  it('url', () => {
    expect(result.urlFormat('xx_XX')).toBe(null)
    expect(result.urlFormat('en_US')).toBe('en-us')
    expect(result.urlFormat('tr-TR')).toBe('tr-tr')
  })

  it('iso', () => {
    expect(result.isoFormat('xx-xx')).toBe(null)
    expect(result.isoFormat('en-us')).toBe('en_US')
    expect(result.isoFormat('tr_tr')).toBe('tr_TR')
  })
})

describe('pick locale', function() {
  it('from nicely formatted list', () => {
    const supportedLocales = ['en_US', 'tr_TR']
    const match = result.pick(supportedLocales)
    expect(match).toBe('tr_TR')
  })

  it('from badly formatted list.', () => {
    const supportedLocales = ['en', 'tr', 'en-us', 'tr-tr']
    const match = result.pick(supportedLocales)
    expect(match).toBe('tr_TR')
  })

  it('from url 1', () =>
    expect(result.pickFromUrl('xx-xx', '/')).toBe(null))
  it('from url 2', () =>
    expect(result.pickFromUrl('xx-xx', '/yy-yy')).toBe(null))
  it('from url 2', () =>
    expect(result.pickFromUrl('en-us', '/yy-yy')).toBe('en_US'))
  it('from url 3', () =>
    expect(result.pickFromUrl('en-us', '/abc')).toBe('en_US'))
  it('from url 4', () =>
    expect(result.pickFromUrl('en-us', '/abcdasd-h3jkd/asokdadlw/dgg')).toBe('en_US'))
  it('from url 5', () =>
    expect(result.pickFromUrl('xx-xx', '/en-us')).toBe('en_US'))
  it('from url 6', () =>
    expect(result.pickFromUrl('tr-tr', '/en-us')).toBe('en_US'))
})
