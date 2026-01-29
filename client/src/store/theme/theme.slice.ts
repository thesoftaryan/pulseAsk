import { getInitialTheme } from "../../utils/theme.util";
import { type Theme, type ThemeState } from "../../types/redux/theme.redux.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState : ThemeState = {
    theme : getInitialTheme() as Theme,
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload;
        },
        toggleTheme(state){
            state.theme = state.theme==="dark"? "light" : "dark";
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;