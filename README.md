# regionist
Finds and remembers regional parameters of web users in a most reliable way.

![NPM](https://img.shields.io/npm/l/regionist)
[![npm version](https://badge.fury.io/js/regionist.svg)](https://badge.fury.io/js/regionist)
![npm bundle size](https://img.shields.io/bundlephobia/min/regionist)
![npm](https://img.shields.io/npm/dy/regionist)

This package relies on two trust source:
1. The excellent timezone library jstz.
2. The browser's navigator object.

After a successfully guess, you will get:
```js
{
  timezone: 'Europe/Istanbul',
  country: 'TR',
  nativeLanguage: 'tr',
  preferredLanguage: 'en',
  locale: 'tr_TR',
  currencyCode: 'TRY',
  callingCode: '90'
}
```

## Install
```sh
npm i regionist
```

## Import
There are different types of distributions depending on your use case. Essentially, the package can be imported via require:
```js
const regionist = require('regionist')
```
See `dist` folder for other distributions.

## Usage
Just:
```js
regionist.guess()
```
and get the results:
```js
const params = regionist.get()
{
  timezone: 'Europe/Istanbul',
  country: 'TR',
  nativeLanguage: 'tr',
  preferredLanguage: 'en',
  locale: 'tr_TR',
  currencyCode: 'TRY',
  callingCode: '90'
}
```
### Remember The Previous Guess
If you would like to track user's regional params across visits in different timeframes use remember option:
```js
regionist.guess({remember: true/*false by default*/})
```
To compare if something has changed:
```js
regionist.isTimezoneChanged() // returns boolean
regionist.isCountryChanged() // returns boolean
```
Comparison methods return:
1. `true` if the parameter persisted before and changed.
2. `null` if the parameter doesn't persisted before.
3. `false` if the parameter persisted before and not changed.

Remembering feature uses `window.localStorage` api.
### Sample Use Case - Setting Application Locale
Say your application supports the following locales: en_US, tr_TR and you would like load translation files according to the locale of the user:
```js
const supportedLocales = ['en_US', 'tr_TR']
regionist.guess()
const chosenLocale = regionist.chooseFrom(supportedLocales)
```
The result will be one of supported locales or `undefined`. So it's better if you do:
```js
const chosenLocale = regionist.chooseFrom(supportedLocales) || 'en_US'
```
### Locale Data
Country - language - phone number - currency mappings provided by [locale-util][5ed25735] package.
### Timezone Detection
For timezone detection an excellent [jstz](https://bitbucket.org/pellepim/jstimezonedetect) library be used.

  [76e81095]: https://github.com/muratgozel/local-storage-pro "Local Storage Pro"
  [5ed25735]: https://github.com/muratgozel/locale-util "locale-util"

---

## Distributions Report
This is an auto-generated report that shows the type, name and size of the bundles available to use individually.

[comment]: # (DISTRIBUTIONS_REPORT_START)
```js
[
  "regionist.amd.js (35.02 KB)",
  "regionist.amd.polyfilled.js (49.07 KB)",
  "regionist.cjs.js (35.03 KB)",
  "regionist.cjs.polyfilled.js (49.07 KB)",
  "regionist.es.js (34.99 KB)",
  "regionist.es.polyfilled.js (49.06 KB)",
  "regionist.iife.js (35.03 KB)",
  "regionist.iife.polyfilled.js (49.07 KB)",
  "regionist.umd.js (35.25 KB)",
  "regionist.umd.polyfilled.js (49.27 KB)"
]
```
[comment]: # (DISTRIBUTIONS_REPORT_END)

## Babel Polyfills Report
This is an auto-generated report that shows the pollyfils added by core-js to the **pollyfilled** distributions based on the targets configuration described below.

[comment]: # (BABEL_POLYFILLS_REPORT_START)
```js
// polyfills:
[
  "es.object.get-prototype-of",
  "es.object.set-prototype-of",
  "es.array.filter",
  "es.array.index-of",
  "es.array.map",
  "es.array.sort",
  "es.function.name",
  "es.object.keys",
  "es.regexp.exec",
  "es.string.split"
]
// based on the targets:
{
  "android": "4.4.3",
  "chrome": "49",
  "edge": "18",
  "firefox": "78",
  "ie": "10",
  "ios": "9.3",
  "opera": "71",
  "safari": "5.1",
  "samsung": "4"
}
```
[comment]: # (BABEL_POLYFILLS_REPORT_END)

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
