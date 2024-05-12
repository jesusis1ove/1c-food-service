import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { nomenclatureAPI } from "./services/nomenclature";
import { menuAPI } from "./services/menu";
import { ordersAPI } from "./services/orders";
import { accountsAPI } from "./services/user";
import storage from "redux-persist/lib/storage";

//import reducers
import authReducer from "./slices/authorizationSlice";
import { apiSlice } from "./slices/apiSlice";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    nomenclatureAPI.reducerPath,
    menuAPI.reducerPath,
    ordersAPI.reducerPath,
    accountsAPI.reducerPath,
    apiSlice.reducerPath,
  ],
};

export const rootReducer = combineReducers({
  auth: authReducer,

  [nomenclatureAPI.reducerPath]: nomenclatureAPI.reducer,
  [menuAPI.reducerPath]: menuAPI.reducer,
  [ordersAPI.reducerPath]: ordersAPI.reducer,
  [accountsAPI.reducerPath]: accountsAPI.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => [
  //   ...getDefaultMiddleware().concat(nomenclatureAPI.middleware),
  //   ...getDefaultMiddleware().concat(menuAPI.middleware),
  //   ...getDefaultMiddleware().concat(ordersAPI.middleware),
  //   ...getDefaultMiddleware().concat(accountsAPI.middleware),
  //   ...getDefaultMiddleware().concat(apiSlice.middleware),
  // ],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      nomenclatureAPI.middleware,
      menuAPI.middleware,
      ordersAPI.middleware,
      accountsAPI.middleware,
      apiSlice.middleware,
    ]),
});

export const persistor = persistStore(store);
