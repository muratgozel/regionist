# regionist
Guesses the user's regional parameters on-device, in a reliable way.

This library relies on the `window` object of the user's browser. It guesses timezone, country, 
native and preferred languages of the user and also stores currency code and calling code 
related to its guess. As there is no %100 accurate way of detecting user's regional parameters, 
this library tries its chance by combinating the outputs of `window.Intl` and `window.navigator` objects.

## Install
```sh
npm i regionist
```
or inject with script tag:
```html
<script type="module" src="https://cdn.jsdelivr.net/npm/regionist@6/dist/index.js"></script>
```

## Usage
The guess result is available as you import it.
```js
import { regionist } from 'regionist'
// or const { regionist } = require('regionist') for cjs

// guess result:
regionist.toObject() === {
    timezone: string | undefined,
    country: string | undefined,
    locale: RegionistLocale | undefined,
    preferredLocale: RegionistLocale | undefined,
    callingCode: number | undefined,
    currencyCode: string | undefined
}
```

### Find The Closest Locale To The User From Given List Of Locales
```js
// assuming user's locale detected as tr_TR
regionist.findClosestLocale(['en-us', 'tr-tr']) === 'tr-tr'
regionist.findClosestLocale(['en_US', 'tr_TR']) === 'tr_TR'
```

### Helpers
```js
regionist.formatLocaleText('en-us', 'iso') === 'en_US'
regionist.formatLocaleText('en_US', 'url') === 'en-us'
```

## Contributing
If you're interested in contributing, read the [CONTRIBUTING.md](https://github.com/muratgozel/muratgozel/blob/main/CONTRIBUTING.md) first, please.

---

Version management of this repository done by [releaser](https://github.com/muratgozel/node-releaser) 🚀

---

Thanks for watching 🐬

[![Support me on Patreon](https://cdn.muratgozel.com.tr/support-me-on-patreon.v1.png)](https://patreon.com/muratgozel?utm_medium=organic&utm_source=github_repo&utm_campaign=github&utm_content=join_link)
