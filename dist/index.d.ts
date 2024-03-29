declare class Index {
    isDomAvailable: boolean;
    localStorageKeyPrefix: string;
    findings: RegionistFindings;
    memory: RegionistOutput;
    timezone?: string;
    country?: string;
    locale?: RegionistLocale;
    preferredLocale?: RegionistLocale;
    callingCode?: number;
    currencyCode?: string;
    constructor();
    remember(): void;
    clearMemory(): void;
    hasCountryBeenChanged(): boolean;
    hasTimezoneBeenChanged(): boolean;
    findClosestLocale(localeLikes?: string[], defaultLocale?: string): string;
    toObject(): RegionistOutput;
    identify(): void;
    guess(): void;
    guessFurther(): void;
    convertLocaleLikeTextToObject(text: string): RegionistLocale;
    convertLocaleObjectToText(obj: RegionistLocale, format?: 'iso' | 'url'): string;
    formatLocaleText(v: string, format?: 'iso' | 'url'): string;
}
declare const regionist: Index;
interface RegionistLocale {
    language: string;
    country?: string;
}
interface RegionistFindings {
    windowIntlTimezone?: string;
    windowIntlLocale?: string;
    windowNavigatorLanguages?: string[];
}
interface RegionistOutput {
    timezone: string | undefined;
    country: string | undefined;
    locale: RegionistLocale | undefined;
    preferredLocale: RegionistLocale | undefined;
    callingCode: number | undefined;
    currencyCode: string | undefined;
}

export { Index, type RegionistFindings, type RegionistLocale, type RegionistOutput, regionist };
