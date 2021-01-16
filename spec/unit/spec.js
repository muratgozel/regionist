const regionist = require('../../dist/regionist.cjs.js')

describe('Guess', function() {
  regionist.guess()

  const result = regionist.get()

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

describe('Choose from', function() {
  it('nicely formatted locales.', () => {
    const supportedLocales = ['en_US', 'tr_TR']
    const match = regionist.guess().chooseFrom(supportedLocales)
    expect(match).toBe('tr_TR')
  })

  it('bad formatted locales.', () => {
    const supportedLocales = ['en', 'tr', 'en-us', 'tr-tr']
    const match = regionist.guess().chooseFrom(supportedLocales)
    expect(match).toBe('tr-tr')
  })
})
