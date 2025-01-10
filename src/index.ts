import { BROWSER } from "esm-env";
import timezoneCountryMappingJson from "./timezoneCountryMapping.json";

export const regionist = {
    match,
    guess,
};

export function match(list: string[], fallback: string = "xx-XX") {
    const _list = list.map((item) => formatListItem(item)).filter((item) => item) as string[];
    const result = guess();

    // full locale match
    if (result.preferredLocale && _list.some((_locale) => _locale === result.preferredLocale)) {
        return result.preferredLocale;
    }

    // country match
    if (result.preferredLocale && result.preferredLocale.includes("-")) {
        const preferredCountry = result.preferredLocale.split("-")[1];
        const i = _list.findIndex((_locale) =>
            _locale.includes("-") ? _locale.split("-")[1] === preferredCountry : false,
        );

        if (i !== -1) {
            return _list[i];
        }
    }

    if (result.timezoneCountry) {
        const i = _list.findIndex((_locale) =>
            _locale.includes("-") ? _locale.split("-")[1] === result.timezoneCountry : false,
        );

        if (i !== -1) {
            return _list[i];
        }
    }

    // language match
    if (result.preferredLanguage) {
        const i = _list.findIndex((_locale) =>
            _locale.includes("-")
                ? _locale.split("-")[0] === result.preferredLanguage
                : _locale === result.preferredLanguage,
        );

        if (i !== -1) {
            return _list[i];
        }
    }

    return fallback;

    function formatListItem(text: string) {
        const arr = text.replace("_", "-").split("-");

        if (arr.length === 1) {
            return text.toLowerCase();
        }

        if (arr.length === 2) {
            return arr[0]!.toLowerCase() + "-" + arr[1]!.toUpperCase();
        }

        return undefined;
    }
}

export function guess(global: (Window & typeof globalThis) | undefined = BROWSER ? window : undefined): RegionistGuess {
    const findings: RegionistFindings = {};
    const result: RegionistGuess = {};

    if (!global) {
        return result;
    }

    readGlobalIntlObject();
    readGlobalNavigator();

    if ((findings.windowNavigatorLanguages ?? []).length > 0) {
        const first = findings.windowNavigatorLanguages![0]!;
        result[first.includes("-") ? "preferredLocale" : "preferredLanguage"] = first;

        if ("preferredLocale" in result) {
            result.preferredLanguage = result.preferredLocale.split("-")[0]!;
        }
    }

    // trust timezone finding, if there is
    if (findings.windowIntlTimezone) {
        result.timezone = findings.windowIntlTimezone;

        const possibleCountries =
            result.timezone in timezoneCountryMappingJson
                ? timezoneCountryMappingJson[result.timezone as keyof typeof timezoneCountryMappingJson]
                : [];
        if (possibleCountries.length === 1) {
            result.timezoneCountry = possibleCountries[0]!;
        }

        if (possibleCountries.length > 1 && findings.windowNavigatorLanguages) {
            const foundCountry = getCountriesFromNavigatorLanguages(findings.windowNavigatorLanguages).find((code) =>
                possibleCountries.includes(code),
            );
            if (foundCountry) {
                result.timezoneCountry = foundCountry;
            }
        }
    }

    return result;

    function readGlobalIntlObject() {
        try {
            const obj = global!.Intl.DateTimeFormat().resolvedOptions();
            findings.windowIntlTimezone = obj.timeZone;
            findings.windowIntlLocale = obj.locale;
        } catch (e: unknown) {
            console.warn(new Error("[regionist]: no global.Intl support", { cause: e }));
            return;
        }
    }

    function readGlobalNavigator() {
        const n = global!.navigator;

        if ("languages" in n && n.languages && n.languages.length > 0) {
            findings.windowNavigatorLanguages = Array.from(n.languages);
        } else if (n.language) {
            findings.windowNavigatorLanguages = [n.language];
        }
    }

    function getCountriesFromNavigatorLanguages(list: string[]) {
        return list.filter((text) => text.includes("-")).map((text) => text.split("-")[1]!);
    }
}

export interface RegionistGuess {
    preferredLanguage?: string;
    preferredLocale?: string;
    timezone?: string;
    timezoneCountry?: string;
}

interface RegionistFindings {
    windowIntlTimezone?: string;
    windowIntlLocale?: string;
    windowNavigatorLanguages?: string[];
}
