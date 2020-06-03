# regionist
Regional parameters guesser.

![NPM](https://img.shields.io/npm/l/regionist)
[![npm version](https://badge.fury.io/js/regionist.svg)](https://badge.fury.io/js/regionist)
![npm bundle size](https://img.shields.io/bundlephobia/min/regionist)
![npm](https://img.shields.io/npm/dy/regionist)

Guesses timezone, country, native language, preferred language, currency, calling code and locale of the visitor.

## Install
```sh
npm i regionist
```

## Import
There are different types of distributions depending on your use case. Essentially, the package can be imported via require:

```js
const regionist = require('regionist')
```

## Use
Guess:
```js
regionist.guess()
```
Get results:
```js
const results = regionist.get()
{
  timezone: 'Europe/Istanbul',
  country: 'TR',
  nativeLanguage: 'tr',
  preferredLanguage: 'en',
  currency: 'TRY',
  callingCode: '90',
  locale: 'tr_TR',
  locales: ['en_US', 'tr_TR'],
  languages: ['en', 'tr']
}
```
The user uses its browser in english but the timezone get from the browser has been set to Istanbul, therefore the module set the country of the user to the TR.
### Remember Previous Guess
If you would like to track user's region across visits in different timeframes use remember option:
```js
regionist.guess({remember: true})
```
And to compare if something changed:
```js
regionist.isTimezoneChanged() // returns boolean
regionist.isLocaleChanged() // returns boolean
```
This feature provided by a dependency [local-storage-pro][76e81095].
### Locale Data
It uses the data from [locale-util][5ed25735] module.
### Timezone Detection
For timezone detection good old [jstz](https://bitbucket.org/pellepim/jstimezonedetect) library be used.

  [76e81095]: https://github.com/muratgozel/local-storage-pro "Local Storage Pro"
  [5ed25735]: https://github.com/muratgozel/locale-util "locale-util"

---

## Distributions Report
This is an auto-generated report that shows the type, name and size of the bundles available to use individually.

[comment]: # (DISTRIBUTIONS_REPORT_START)
```js
[
  "regionist.amd.js (289.35 KB)",
  "regionist.amd.polyfilled.js (303.00 KB)",
  "regionist.cjs.js (289.35 KB)",
  "regionist.cjs.polyfilled.js (303.01 KB)",
  "regionist.es.js (289.29 KB)",
  "regionist.es.polyfilled.js (302.94 KB)",
  "regionist.iife.js (289.34 KB)",
  "regionist.iife.polyfilled.js (303.00 KB)",
  "regionist.umd.js (289.59 KB)",
  "regionist.umd.polyfilled.js (303.25 KB)"
]
```
[comment]: # (DISTRIBUTIONS_REPORT_END)

## Babel Polyfills Report
This is an auto-generated report that shows the pollyfils added by core-js to the **pollyfilled** distributions based on the targets configuration described below.

[comment]: # (BABEL_POLYFILLS_REPORT_START)
```js
// polyfills:
[
  "es.symbol",
  "es.symbol.description",
  "es.symbol.iterator",
  "es.array.iterator",
  "es.object.get-prototype-of",
  "es.object.set-prototype-of",
  "es.object.to-string",
  "es.reflect.construct",
  "es.regexp.to-string",
  "es.string.iterator",
  "web.dom-collections.iterator",
  "es.array.filter",
  "es.array.index-of",
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
  "firefox": "52",
  "ie": "10",
  "ios": "9.3",
  "opera": "67",
  "safari": "11.1",
  "samsung": "4"
}
```
[comment]: # (BABEL_POLYFILLS_REPORT_END)

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
