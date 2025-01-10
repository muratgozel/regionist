# regionist
Guesses the user's regional parameters on-device.

This library relies on the `window` object of the user's browser. It guesses timezone, country and the preferred language. It's stateless. Only two methods: `guess` and `match`. As there is no %100 accurate way of detecting user's regional parameters, this library tries its chance by combinating the outputs of `window.Intl` and `window.navigator` objects.

## Install
```sh
npm i regionist
```
or inject with script tag:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/regionist@7/dist/regionist.iife.js"></script>

<script type="text/javascript">
    console.log(window.Regionist)
</script>
```

## Usage
```js
import { regionist } from 'regionist'
// or
// const { regionist } = require('regionist')

// guess
const guessResult = regionist.guess()

console.assert(guessResult === {
    timezone: 'America/New_York', // timezone name as returned by window.Intl object
    timezoneCountry: 'US', // mapped from the timezone
    preferredLocale: 'tr-TR', // relies on window.navigator
    preferredLanguage: 'tr' // it's just derived from preferredLocale
})

// match, useful for finding the best matching locale against a list of supported locales
const bestLocale = regionist.match(['az-AZ', 'en-US', 'tr-TR'])
console.assert(bestLocale === 'tr-TR') // because user's preferred locale is tr-TR

const bestLocale2 = regionist.match(['az_AZ', 'en_us', 'tr_tr'])
console.assert(bestLocale === 'tr-TR') // always returns formatted
```

## Contributing
If you're interested in contributing, read the [CONTRIBUTING.md](https://github.com/muratgozel/muratgozel/blob/main/CONTRIBUTING.md) first, please.

---

Thanks for the attention 💙 Any amount of support on [patreon](https://patreon.com/muratgozel?utm_medium=organic&utm_source=github_repo&utm_campaign=github&utm_content=join_link) or [github](https://github.com/sponsors/muratgozel) will return you back as bug fixes, new features and bits and bytes.
