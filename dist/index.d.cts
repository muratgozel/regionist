declare const regionist: {
    match: typeof match;
    guess: typeof guess;
};
declare function match(list: string[], fallback?: string): string;
declare function guess(global?: Window & typeof globalThis | undefined): RegionistGuess;
interface RegionistGuess {
    preferredLanguage?: string;
    preferredLocale?: string;
    timezone?: string;
    timezoneCountry?: string;
}

export { type RegionistGuess, guess, match, regionist };
