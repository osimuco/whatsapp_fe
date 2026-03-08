import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/userSlice";
import createFilter from "redux-persist-transform-filter";


// açıklama: createFilter, redux-persist kütüphanesi tarafından sağlanan bir fonksiyondur ve belirli bir dilim (slice) içindeki belirli alanları saklamak veya hariç tutmak için kullanılır. saveUserOnlyFilter, user dilimindeki sadece user.user alanını saklamak için oluşturulan bir filtredir. Bu, kullanıcı durumunun sadece belirli bir bölümünün saklanmasını sağlar.
const saveUserOnlyFilter = createFilter("user", ["user"]);

// açıklama: persistConfig, redux-persist kütüphanesi tarafından kullanılan bir yapılandırma nesnesidir. key, depolanacak verinin anahtarını belirtir ve storage, verinin nerede saklanacağını tanımlar. Bu durumda, localStorage kullanılarak kullanıcı durumunun saklanması sağlanır. tarayıcı kapatıldığında veya sayfa yenilendiğinde kullanıcı durumunun korunmasını sağlar.
const persistConfig = {
    key: "user",
    storage,
    whitelist: ["user"], // sadece user durumunu saklamak istediğimizi belirtir
    transforms: [saveUserOnlyFilter]
};

// açıklama: combineReducers, Redux'un bir fonksiyonudur ve birden fazla reducer'ı tek bir root reducer altında birleştirmek için kullanılır. rootReducer, userReducer'ı user anahtarı altında birleştirir, böylece store'da user durumunu yönetir.
const rootReducer = combineReducers({
    user: userReducer,
});

// açıklama: persistReducer, redux-persist kütüphanesi tarafından sağlanan bir fonksiyondur ve bir reducer'ı persistConfig ile sarmalayarak verinin saklanmasını sağlar. persistedReducer, rootReducer'ı persistConfig ile sarmalayarak kullanıcı durumunun saklanmasını sağlar.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// açıklama: configureStore, Redux Toolkit'in bir fonksiyonudur ve Redux store'unu oluşturmak için kullanılır. store, rootReducer'ı reducer olarak kullanır
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    devTools: true,
});

// açıklama: persistStore, redux-persist kütüphanesi tarafından sağlanan bir fonksiyondur ve store'u alarak verinin saklanmasını sağlar. persistor, store'un persist işlemlerini yönetir ve uygulamanın başlatılması sırasında verinin geri yüklenmesini sağlar.
export const persistor = persistStore(store);