import { getInitialTheme } from "../../utils/theme.util";
import { type Theme, type ThemeState } from "../../types/redux/theme.redux.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState : ThemeState = {
    theme : getInitialTheme() as Theme,
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers:{
        toggleTheme(state){
            state.theme = state.theme==="dark"? "light" : "dark";
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;