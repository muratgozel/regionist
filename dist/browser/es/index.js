import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _classPrivateFieldGet from '@babel/runtime-corejs3/helpers/classPrivateFieldGet';
import _classPrivateFieldSet from '@babel/runtime-corejs3/helpers/classPrivateFieldSet';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js/instance/filter';
import _findInstanceProperty from '@babel/runtime-corejs3/core-js/instance/find';
import _includesInstanceProperty from '@babel/runtime-corejs3/core-js/instance/includes';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js/instance/slice';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js/instance/map';
import _Array$from from '@babel/runtime-corejs3/core-js/array/from';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js/instance/concat';
import _WeakMap from '@babel/runtime-corejs3/core-js/weak-map';
import store from 'store/dist/store.modern.js';
import { languageCodes, countryCodes, timezones, countryLanguages, countryCallingCodes, countryCurrencies } from 'locale-util';
export { countryCallingCodes, countryCodes, countryCurrencies, countryLanguages, languageCodes, timezones } from 'locale-util';

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
var _localStorageIdentifier = /*#__PURE__*/new _WeakMap();
var _prev = /*#__PURE__*/new _WeakMap();
var _browserLocaleLikes = /*#__PURE__*/new _WeakMap();
var Regionist = /*#__PURE__*/function () {
  function Regionist() {
    _classCallCheck(this, Regionist);
    _defineProperty(this, "timezone", null);
    _defineProperty(this, "country", null);
    _defineProperty(this, "nativeLanguage", null);
    _defineProperty(this, "preferredLanguage", null);
    _defineProperty(this, "locale", null);
    _defineProperty(this, "callingCode", null);
    _defineProperty(this, "currencyCode", null);
    _defineProperty(this, "languages", languageCodes);
    _defineProperty(this, "countries", countryCodes);
    _defineProperty(this, "timezones", timezones);
    _defineProperty(this, "countryLanguages", countryLanguages);
    _defineProperty(this, "countryCallingCodes", countryCallingCodes);
    _defineProperty(this, "countryCurrencies", countryCurrencies);
    _classPrivateFieldInitSpec(this, _localStorageIdentifier, {
      writable: true,
      value: '_regionist'
    });
    _classPrivateFieldInitSpec(this, _prev, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _browserLocaleLikes, {
      writable: true,
      value: []
    });
  }
  _createClass(Regionist, [{
    key: "guess",
    value: function guess() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        remember: false
      };
      _classPrivateFieldSet(this, _browserLocaleLikes, this.generateLocaleLikesFromNavigator());
      this.timezone = this.guessTimezone();
      this.country = this.guessCountry();
      this.nativeLanguage = this.findNativeLanguage();
      this.preferredLanguage = this.findPreferredLanguage();
      this.callingCode = this.findCallingCode();
      this.currencyCode = this.findCurrencyCode();
      this.locale = this.constructLocale();
      if (opts.remember) {
        this.remember();
        store.set(_classPrivateFieldGet(this, _localStorageIdentifier), {
          timezone: this.timezone,
          country: this.country,
          nativeLanguage: this.nativeLanguage,
          preferredLanguage: this.preferredLanguage,
          locale: this.locale,
          callingCode: this.callingCode,
          currencyCode: this.currencyCode
        });
      }
      return this;
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        timezone: this.timezone,
        country: this.country,
        nativeLanguage: this.nativeLanguage,
        preferredLanguage: this.preferredLanguage,
        locale: this.locale,
        callingCode: this.callingCode,
        currencyCode: this.currencyCode
      };
    }
  }, {
    key: "findBestMatch",
    value: function findBestMatch() {
      var _this = this;
      var localeLikes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!this.isArray(localeLikes)) return '';
      if (localeLikes.length === 0) return '';
      var filtered = _filterInstanceProperty(localeLikes).call(localeLikes, function (str) {
        return _this.isLocale(str);
      });
      var localeMatch = _findInstanceProperty(filtered).call(filtered, function (lo) {
        return _this.localeToIso(lo) === _this.locale;
      });
      if (localeMatch) return localeMatch;
      var countryMatch = _findInstanceProperty(filtered).call(filtered, function (lo) {
        return _includesInstanceProperty(lo).call(lo, '_') ? lo.split('_')[1] === _this.country : false;
      });
      if (countryMatch) return countryMatch;
      var languageMatch = _findInstanceProperty(filtered).call(filtered, function (lo) {
        return _sliceInstanceProperty(lo).call(lo, 0, 2) === _this.nativeLanguage || _sliceInstanceProperty(lo).call(lo, 0, 2) === _this.preferredLanguage;
      });
      if (languageMatch) return languageMatch;
      return localeLikes[0];
    }
  }, {
    key: "matchUrlPath",
    value: function matchUrlPath(path) {
      var _context;
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var matches = _filterInstanceProperty(_context = path.split('/')).call(_context, function (str) {
        return typeof str === 'string' && str.length > 0;
      });
      if (matches && matches.length > 0) {
        if (this.isLocale(matches[0])) {
          return matches[0];
        }
      }
      return fallback || '';
    }
  }, {
    key: "isArray",
    value: function isArray(v) {
      return !!v && v.constructor === Array;
    }
  }, {
    key: "hasCountryChanged",
    value: function hasCountryChanged() {
      return typeof _classPrivateFieldGet(this, _prev).country === 'string' && _classPrivateFieldGet(this, _prev).country !== this.country;
    }
  }, {
    key: "hasTimezoneChanged",
    value: function hasTimezoneChanged() {
      return typeof _classPrivateFieldGet(this, _prev).timezone === 'string' && _classPrivateFieldGet(this, _prev).timezone !== this.timezone;
    }
  }, {
    key: "remember",
    value: function remember() {
      _classPrivateFieldSet(this, _prev, new Regionist());
      var obj = store.get(_classPrivateFieldGet(this, _localStorageIdentifier));
      if (!obj) {
        return this;
      }
      _classPrivateFieldGet(this, _prev).timezone = obj.timezone;
      _classPrivateFieldGet(this, _prev).country = obj.country;
      _classPrivateFieldGet(this, _prev).nativeLanguage = obj.nativeLanguage;
      _classPrivateFieldGet(this, _prev).preferredLanguage = obj.preferredLanguage;
      _classPrivateFieldGet(this, _prev).locale = obj.locale;
      _classPrivateFieldGet(this, _prev).callingCode = obj.callingCode;
      _classPrivateFieldGet(this, _prev).currencyCode = obj.currencyCode;
      return this;
    }
  }, {
    key: "getPreviousGuess",
    value: function getPreviousGuess() {
      return _classPrivateFieldGet(this, _prev);
    }
  }, {
    key: "constructLocale",
    value: function constructLocale() {
      if (this.nativeLanguage !== null && this.country !== null) {
        return this.nativeLanguage + '_' + this.country;
      } else if (this.nativeLanguage === null && this.country === null) {
        return '';
      } else {
        return this.nativeLanguage || this.country;
      }
    }
    /**
     * Returns the currency code for either the given country or the user's country.
     *
     * @param country {CountryCode | undefined}
     * @returns {CurrencyCode | null}
     */
  }, {
    key: "findCurrencyCode",
    value: function findCurrencyCode() {
      var country = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      if (country !== undefined) {
        return this.countryCurrencies[country] || null;
      } else if (this.country !== null) {
        return this.countryCurrencies[this.country] || null;
      } else {
        return null;
      }
    }
    /**
     * Returns the calling code for either the given country or the user's country.
     *
     * @param country {CountryCode | undefined}
     * @returns {number | null}
     */
  }, {
    key: "findCallingCode",
    value: function findCallingCode() {
      var country = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      if (country !== undefined) {
        return this.countryCallingCodes[country] || null;
      } else if (this.country !== null) {
        return this.countryCallingCodes[this.country] || null;
      } else {
        return null;
      }
    }
    /**
     * Finds the first language in the user's browser language preferences.
     *
     * @returns {LanguageCode | null}
     */
  }, {
    key: "findPreferredLanguage",
    value: function findPreferredLanguage() {
      var _context2,
        _context3,
        _this2 = this;
      var results = _filterInstanceProperty(_context2 = _mapInstanceProperty(_context3 = _classPrivateFieldGet(this, _browserLocaleLikes)).call(_context3, function (l) {
        return _this2.isLanguage(l) ? l : _this2.parseLocaleLike(l).lang;
      })).call(_context2, function (l) {
        return _this2.isLanguage(l);
      });
      return results.length === 0 ? null : results[0];
    }
    /**
     * Guesses the user's native language based on timezone and browser language preferences.
     * It prioritizes the language found based on the country which is based on the timezone.
     * It looks for browser language preferences otherwise.
     *
     * @returns {LanguageCode | null}
     */
  }, {
    key: "findNativeLanguage",
    value: function findNativeLanguage() {
      var _context4,
        _context5,
        _this3 = this;
      var possibles = _filterInstanceProperty(_context4 = _mapInstanceProperty(_context5 = _classPrivateFieldGet(this, _browserLocaleLikes)).call(_context5, function (l) {
        return _this3.isLanguage(l) ? l : _this3.parseLocaleLike(l).lang;
      })).call(_context4, function (l) {
        return _this3.isLanguage(l);
      });
      if (this.country === null) {
        return possibles.length > 0 ? possibles[0] : null;
      }
      var more = this.countryLanguages[this.country];
      var result = _findInstanceProperty(more).call(more, function (l) {
        return _includesInstanceProperty(possibles).call(possibles, l);
      });
      if (result) {
        return result;
      }
      return more[0];
    }
    /**
     * Guesses the user's country based on timezone and browser language preferences.
     *
     * @returns {CountryCode | null}
     */
  }, {
    key: "guessCountry",
    value: function guessCountry() {
      var _this4 = this;
      if (this.timezone) {
        var _context6;
        var result = _findInstanceProperty(_context6 = this.timezones).call(_context6, function (_ref) {
          var name = _ref.name;
          return name === _this4.timezone;
        });
        if (result) {
          return result.country;
        }
      }
      if (_classPrivateFieldGet(this, _browserLocaleLikes).length > 0) {
        var _context7;
        var results = _filterInstanceProperty(_context7 = _classPrivateFieldGet(this, _browserLocaleLikes)).call(_context7, function (l) {
          return l.length > 2;
        });
        if (results && results.length > 0) {
          return this.parseLocaleLike(results[0]).country;
        }
      }
      return null;
    }
    /**
     * Guesses the user's timezone based on window.Intl global object.
     *
     * @returns {string | null}
     */
  }, {
    key: "guessTimezone",
    value: function guessTimezone() {
      try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (error) {
        return null;
      }
    }
  }, {
    key: "generateLocaleLikesFromNavigator",
    value: function generateLocaleLikesFromNavigator() {
      var _this5 = this;
      var result = [];
      if (!('navigator' in window)) return result;
      var n = window.navigator;
      if ('languages' in n && n.languages && n.languages.length > 0) result = _Array$from(n.languages);else if (n.language) result = [n.language];else return result;
      return _mapInstanceProperty(result).call(result, function (r) {
        return _this5.localeToIso(r);
      });
    }
    /**
     * Converts a locale-like string to ISO format. For example, 'en-us' (or 'en_us') becomes 'en_US'.
     *
     * @param v - locale-like string
     * @returns {string}
     */
  }, {
    key: "localeToIso",
    value: function localeToIso(v) {
      if (typeof v !== 'string') return '';
      var obj = this.parseLocaleLike(v);
      if (typeof obj.lang === 'string' && typeof obj.country === 'string') {
        var _context8;
        return _concatInstanceProperty(_context8 = "".concat(obj.lang, "_")).call(_context8, obj.country);
      } else if (typeof obj.lang === 'string') {
        return obj.lang;
      } else if (typeof obj.country === 'string') {
        return obj.country;
      } else {
        return '';
      }
    }
    /**
     * Converts a locale-like string to url-safe format. For example, 'en_US' (or 'en-US') becomes 'en-us'.
     *
     * @param v - locale-like string
     * @returns {string}
     */
  }, {
    key: "localeToUrlSafe",
    value: function localeToUrlSafe(v) {
      if (typeof v !== 'string') return '';
      var obj = this.parseLocaleLike(v);
      if (typeof obj.lang === 'string' && typeof obj.country === 'string') {
        var _context9;
        return _concatInstanceProperty(_context9 = "".concat(obj.lang, "-")).call(_context9, obj.country.toLowerCase());
      } else if (typeof obj.lang === 'string') {
        return obj.lang;
      } else if (typeof obj.country === 'string') {
        return obj.country.toLowerCase();
      } else {
        return '';
      }
    }
  }, {
    key: "parseLocaleLike",
    value: function parseLocaleLike(v) {
      var result = {
        lang: null,
        country: null
      };
      if (typeof v !== 'string') return result;
      var arr = v.split(/(_|-)/);
      if (arr.length === 1) {
        arr[0] = arr[0].toLowerCase();
        if (this.isLanguage(arr[0])) {
          result.lang = arr[0];
        }
        return result;
      }
      if (arr.length === 3) {
        arr[0] = arr[0].toLowerCase();
        arr[2] = arr[2].toUpperCase();
        if (this.isLanguage(arr[0]) && this.isCountry(arr[2])) {
          result.lang = arr[0];
          result.country = arr[2];
        }
        return result;
      }
      return result;
    }
  }, {
    key: "isLocale",
    value: function isLocale(v) {
      if (typeof v !== 'string') return false;
      if (v.length < 2) return false;
      var arr = v.split(/(_|-)/);
      if (arr.length === 1) {
        return this.isLanguage(arr[0]);
      }
      if (arr.length === 3) {
        return this.isLanguage(arr[0]) && this.isCountry(arr[2]);
      }
      return false;
    }
  }, {
    key: "isLanguage",
    value: function isLanguage(v) {
      var _context10;
      return typeof v === 'string' && _findInstanceProperty(_context10 = this.languages).call(_context10, function (lang) {
        return lang === v.toLowerCase();
      }) !== undefined;
    }
  }, {
    key: "isCountry",
    value: function isCountry(v) {
      var _context11;
      return typeof v === 'string' && _findInstanceProperty(_context11 = this.countries).call(_context11, function (c) {
        return c === v.toUpperCase();
      }) !== undefined;
    }
  }]);
  return Regionist;
}();
var regionist = new Regionist();

export { Regionist, regionist };
//# sourceMappingURL=index.js.map
