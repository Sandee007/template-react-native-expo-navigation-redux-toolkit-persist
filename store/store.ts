import { combineReducers, configureStore, Action, ThunkAction } from "@reduxjs/toolkit";
import sliceExpenses from "./slices/sliceExpenses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  // whitelist // ! not need apparently idk why
};

const rootReducer = combineReducers({
  sliceExpenses,
});

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools:true,
});
const persistor = persistStore(store);

export { rootReducer, store, persistor };

export type Store = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

/**
 * NOTE required npm packages - install in given order
 *
 * npm install react-redux
 * npm install react-redux
 * npm i redux-persist
 * npm i redux-persist @react-native-async-storage/async-storage
 */
