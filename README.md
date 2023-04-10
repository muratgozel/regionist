# regionist
Guesses the user's regional parameters on-device, in a reliable way.

This library relies on the `window` object of the user's browser. It guesses timezone, country, 
native and preferred languages of the user and also stores currency code and calling code 
related to its guess. As there is no %100 accurate way of detecting user's regional parameters, 
this library tries its chance by combinating the outputs of `window.Intl` and `window.navigator` objects.

There are three main functions of this library:
1. The guess feature guesses the user's regional parameters.
2. The remember feature uses local storage to store and compare previous guess with the current one.
3. The matching feature is a simple way to find the best locale for the user either based on a given list or url path.

## Install
```sh
npm i regionist
```

## Import
There are **es6**, **cjs** and **iife** kind of distributions:
```js
// cjs
const {regionist} = require('regionist')

// es
import {regionist} from 'regionist'

// iife, accessible through window.regionist
<script src="https://cdn.jsdelivr.net/npm/regionist@4/dist/browser/iife/index.js" type="text/javascript"></script>
```

## Usage
```js
const result = regionist.guess()

// result is an instance of Regionist and has the following props:
{
  timezone: 'Europe/Istanbul',
  country: 'TR',
  nativeLanguage: 'tr',
  preferredLanguage: 'en',
  locale: 'tr_TR',
  currencyCode: 'TRY',
  callingCode: 90
}
// you can access the only-props object by
result.toObject()

```
Note that `result` is an instance of `Regionist`. So you can call other methods of the class.

Second main feature of the library is to remember previous result by using local storage of the user's browser:
```js
const result = regionist.guess({remember: true})

result.hasCountryChanged() // returns boolean
result.hasTimezoneChanged() // returns boolean

// the previous guess can also be accessed by
result.getPreviousGuess()

```

You can find the most appropriate locale for the user by using one of `findBestMatch` and `matchUrlPath` methods:
```js
const result = regionist.guess()

// finds best match from a given list of locale-like strings
// will return 'tr-tr' because user's country is TR and native language is tr
regionist.findBestMatch(['en-us', 'tr-tr'])

// extracts the first portion of the url path and validates it
// will return 'en-us'
regionist.matchUrlPath('/en-us/abc')

```

Apart from these features there are some helper methods:
```js
regionist.isLanguage('en') // returns boolean
regionist.isCountry('us') // returns boolean
regionist.isLocale('en-us') // returns boolean

regionist.localeToIso('en-us') // returns 'en_US'
regionist.localeToUrlSafe('en_US') // returns 'en-us'

```

These helpers was possible thanks to [locale-util](https://github.com/muratgozel/locale-util) package.

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

[![ko-fi](https://www.ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F1RFO7)
