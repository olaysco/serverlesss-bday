export interface User {
     name?: string;
    given_name?: string;
    family_name?: string;
    middle_name?: string;
    nickname?: string;
    preferred_username?: string;
    profile?: string;
    picture?: string;
    website?: string;
    email?: string;
    email_verified?: boolean;
    gender?: string;
    birthdate?: string;
    zoneinfo?: string;
    locale?: string;
    phone_number?: string;
    phone_number_verified?: boolean;
    address?: string;
    updated_at?: string;
    sub?: string;
    messages?: Array<any>;
    cardUrl?: string;
    [key: string]: any;
}

export interface Contact {
    id?: string,
    userId?: string,
    name: string,
    email: string,
    title: string,
    monthOfBirth: number,
    dayOfBirth: number,
    createdAt?: string,
    phoneNumber: string,
    dateOfBirth: string
    [key: string]: any
}