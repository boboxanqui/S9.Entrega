// Rest Country (filtered by translation, flags and capital)

export interface Country {
    capital:      string;
    flags:        Flags;
    translations: Translations;
    independent:  boolean;
}

export interface Flags {
    svg: string;
    png: string;
}

export interface Translations {
    br: string;
    pt: string;
    nl: string;
    hr: string;
    fa: string;
    de: string;
    es: string;
    fr: string;
    ja: string;
    it: string;
    hu: string;
}