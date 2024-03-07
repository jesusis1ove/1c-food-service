import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { nomenclatureAPI } from "./services/nomenclature";
import { menuAPI } from "./services/menu";
import { ordersAPI } from "./services/orders";
import { accountsAPI } from "./services/user";

//import reducers
import authReducer from "./slices/authorizationSlice";

export const rootReducer = combineReducers({
  auth: authReducer,

  [nomenclatureAPI.reducerPath]: nomenclatureAPI.reducer,
  [menuAPI.reducerPath]: menuAPI.reducer,
  [ordersAPI.reducerPath]: ordersAPI.reducer,
  [accountsAPI.reducerPath]: accountsAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware().concat(nomenclatureAPI.middleware),
    ...getDefaultMiddleware().concat(menuAPI.middleware),
    ...getDefaultMiddleware().concat(ordersAPI.middleware),
    ...getDefaultMiddleware().concat(accountsAPI.middleware),
  ],
});
