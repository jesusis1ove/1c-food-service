import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { nomenclatureAPI } from "./services/nomenclature";

export const rootReducer = combineReducers({
  [nomenclatureAPI.reducerPath]: nomenclatureAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(nomenclatureAPI.middleware),
  ],
});
