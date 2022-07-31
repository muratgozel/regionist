# regionist
Guess regional parameters of your users in a most reliable way.

![NPM](https://img.shields.io/npm/l/regionist)
[![npm version](https://badge.fury.io/js/regionist.svg)](https://badge.fury.io/js/regionist)
![npm bundle size](https://img.shields.io/bundlephobia/min/regionist)
![npm](https://img.shields.io/npm/dy/regionist)

In browsers, there is no bullet-proof way to find user's region, language or other local parameters without asking. This module built for to make best guess about these local parameters. It relies on:
1. `window.Intl` object with fallback to the good old timezone detection library [jstz](https://github.com/iansinnott/jstz).
2. The browser's `navigator` object.

Here is what you get after a successful guess:
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
There are exports for **es6**, **cjs** and **umd** environments:
```js
// cjs
const {regionist} = require('regionist')

// or es
import {regionist} from 'regionist'
```
or inject via script tag:
```html
<script src="https://cdn.jsdelivr.net/npm/regionist@3/dist/browser/iife/index.js" type="text/javascript"></script>
```
You can access it via global `window.regionist` when import it via script tag.

## Usage
Just do:
```js
const result = regionist.guess()

// result
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
Note that `result` is an instance of `Regionist`. So you can call another methods.

### Check If User Timezone Have Changed
Store user parameters in local storage:
```js
const result = regionist.guess({remember: true/*false by default*/})
```
When user revisited the page some time later, execute compare function:
```js
const result = regionist.guess({remember: true})
result.isTimezoneChanged() // returns boolean
```

### Pick Language or Locale From A List
Regionist can pick the most suitable language/locale for the user from a given list:
```js
const result = regionist.guess()

const appSupportedLocales = ['en_US', 'tr_TR']
const userAppLocale = result.pick(appSupportedLocales)
```
It returns the first item of the input list at the worst case.

### Pick Locale From Url Path
It can look for the locale in the `window.location.pathname` with the following pattern: /[locale]/path/to
```js
const userAppLocale = result.pickFromUrl(fallback, path?)
// path is optional because it is window.location.pathname by default
```
fallback param is what function returns if it can't find any locale in the url path.

### Format Locale Input
```js
result.urlFormat('en_US') == 'en-us'
result.isoFormat('en-us') == 'en_US'
```

## Locale Data
Country - language - phone number - currency mappings provided by [locale-util][5ed25735] package. You can actually use them by importing:
```js
import {currencyCodes, callingCodes, countryLanguages, timezones} from 'regionist'
```

### Timezone Detection
For timezone detection an excellent [jstz](https://github.com/iansinnott/jstz) library have been used.

  [5ed25735]: https://github.com/muratgozel/locale-util "locale-util"


---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
