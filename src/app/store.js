import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/userSlice";

//açıklama: Redux store'unun reducer'larını birleştirmek için combineReducers kullanılır. Şu anda reducer'lar eklenmemiştir, ancak ileride eklenebilir.
const rootReducer = combineReducers({
    user: userSlice
});

// açıklama: configureStore, Redux store'unu oluşturmak için kullanılır. rootReducer, store'un hangi reducer'ları kullanacağını belirtir.
export const store = configureStore({
    reducer: rootReducer,
    devTools: true
});