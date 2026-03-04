import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "info";
}

interface UIState {
    toasts: Toast[];
    isNavOpen: boolean;
}

const initialState: UIState = {
    toasts: [],
    isNavOpen: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        addToast(state, action: PayloadAction<Omit<Toast, "id">>) {
            state.toasts.push({
                ...action.payload,
                id: Date.now().toString(),
            });
        },
        removeToast(state, action: PayloadAction<string>) {
            state.toasts = state.toasts.filter((t) => t.id !== action.payload);
        },
        setNavOpen(state, action: PayloadAction<boolean>) {
            state.isNavOpen = action.payload;
        },
    },
});

export const { addToast, removeToast, setNavOpen } = uiSlice.actions;
export default uiSlice.reducer;