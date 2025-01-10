export declare const regionist: {
    match: typeof match;
    guess: typeof guess;
};
export declare function match(list: string[], fallback?: string): string;
export declare function guess(global?: Window & typeof globalThis | undefined): RegionistGuess;
export interface RegionistGuess {
    preferredLanguage?: string;
    preferredLocale?: string;
    timezone?: string;
    timezoneCountry?: string;
}
