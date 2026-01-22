import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./auth/slice/auth.slice";

export const rootReducer = combineReducers({
    auth : authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;