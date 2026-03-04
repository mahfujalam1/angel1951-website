import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth.types";

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    resetEmail: string;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    resetEmail: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
        },
        setResetEmail(state, action: PayloadAction<string>) {
            state.resetEmail = action.payload;
        },
    },
});

export const { setUser, logout, setResetEmail } = authSlice.actions;
export default authSlice.reducer;