export const colors = {
    primary: "#1A3BDB",
    primaryDark: "#1230B3",
    primaryLight: "#3A5BFF",
    secondary: "#F5A623",
    secondaryDark: "#D4891A",
    dark: "#0D1117",
    darkNav: "#0A0E1A",
    white: "#FFFFFF",
    text: "#1F2937",
    textLight: "#6B7280",
    border: "#E5E7EB",
    lightGray: "#F3F6FF",
    success: "#10B981",
} as const;

export type Colors = typeof colors;