export interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    referralCode?: string;
    agreeTerms: boolean;
}

export interface ForgotFormData {
    email: string;
}

export interface NewPasswordFormData {
    password: string;
    confirmPassword: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}