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

describe('pick', function() {
  it('from nicely formatted locales.', () => {
    const supportedLocales = ['en_US', 'tr_TR']
    const match = result.pick(supportedLocales)
    expect(match).toBe('tr_TR')
  })

  it('from badly formatted locales.', () => {
    const supportedLocales = ['en', 'tr', 'en-us', 'tr-tr']
    const match = result.pick(supportedLocales)
    expect(match).toBe('tr_TR')
  })
})
