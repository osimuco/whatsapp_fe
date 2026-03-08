import { createSlice } from "@reduxjs/toolkit";

// açıklama: initialState, userSlice'in başlangıç durumunu tanımlar. Bu durumda, kullanıcıyla ilgili bilgileri ve durumları içerir.
const initialState = {
    status: "",
    error: "",
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    }
};

// açıklama: createSlice, Redux Toolkit'in bir özelliğidir ve bir dilim (slice) oluşturmak için kullanılır. userSlice, kullanıcıyla ilgili durumları yönetmek için oluşturulmuştur. name, dilimin adını belirtir ve initialState, dilimin başlangıç durumunu tanımlar. Şu anda reducer'lar eklenmemiştir, ancak ileride eklenebilir.
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            };
        }
    }
});

// açıklama: userSlice.actions, userSlice içinde tanımlanan reducer'ların otomatik olarak oluşturulan aksiyon yaratıcılarını içerir. logout, kullanıcı çıkış yaptığında durumun sıfırlanması için kullanılan bir aksiyon yaratıcıdır.
export const { logout } = userSlice.actions;

// açıklama: userSlice.reducer, userSlice içinde tanımlanan reducer'ları içeren bir fonksiyondur. Bu fonksiyon, Redux store'unun reducer'ı olarak kullanılmak üzere dışa aktarılır.
export default userSlice.reducer;