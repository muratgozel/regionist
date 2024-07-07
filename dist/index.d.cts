declare class Regionist {
    isDomAvailable: boolean;
    findings: RegionistFindings;
    timezone?: string;
    country?: string;
    locale?: RegionistLocale;
    preferredLocale?: RegionistLocale;
    callingCode?: number;
    currencyCode?: string;
    constructor();
    findClosestLocale(localeLikes?: string[], defaultLocale?: string): string;
    toObject(): RegionistOutput;
    identify(): void;
    guess(): void;
    guessFurther(): void;
    convertLocaleLikeTextToObject(text: string): RegionistLocale;
    convertLocaleObjectToText(obj: RegionistLocale, format?: 'iso' | 'url' | 'ietf'): string;
    formatLocaleText(v: string, format?: 'iso' | 'url' | 'ietf'): string;
}
declare const regionist: Regionist;
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

export { Regionist, type RegionistFindings, type RegionistLocale, type RegionistOutput, regionist };
