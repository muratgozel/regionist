import { expect, test, vi } from "vitest";
import { regionist } from "./index";

const DateTimeFormatMock = vi.fn(() => ({
    resolvedOptions: vi.fn(() => ({
        timeZone: "America/New_York",
        locale: "en-US",
    })),
}));

vi.stubGlobal("Intl", { DateTimeFormat: DateTimeFormatMock });
vi.stubGlobal("navigator", { languages: ["tr-TR", "en-US"], language: "tr-TR" });

test("guess", () => {
    const result1 = regionist.guess();
    expect(result1.preferredLocale).toStrictEqual("tr-TR");
    expect(result1.preferredLanguage).toStrictEqual("tr");
    expect(result1.timezone).toBe("America/New_York");
    expect(result1.timezoneCountry).toBe("US");
});

test("match", () => {
    const result1 = regionist.match(["en-US", "tr-TR"], "xx-XX");
    expect(result1).toBe("tr-TR");

    const result2 = regionist.match(["en_us", "tr-tr"], "xx-XX");
    expect(result2).toBe("tr-TR");

    const result3 = regionist.match(["az-AZ", "sw-SW"], "xx-XX");
    expect(result3).toBe("xx-XX");

    const result4 = regionist.match(["az-AZ", "en-UK"], "xx-XX");
    expect(result4).toBe("xx-XX");
});
