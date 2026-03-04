export interface LoginFormData {
    email: string;
    password: string;
    remember: boolean;
}

export interface RegisterFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
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