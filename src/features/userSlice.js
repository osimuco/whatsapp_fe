import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

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


export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, { ...userData }); // açıklama: axios.post, belirtilen URL'ye bir POST isteği gönderir. userData, kayıt işlemi için gerekli olan kullanıcı bilgilerini içerir. API'den dönen yanıtın data kısmını alır ve döndürür. 3nokta operatörü (...), userData nesnesinin tüm özelliklerini yeni bir nesne içine kopyalar.
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.error.message);
        }
    }
);

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
        },
        changeStatus: (state, action) => { // açıklama: changeStatus reducer'ı, kullanıcının durumunu güncellemek için kullanılır. action.payload, yeni durumu içerir ve state.status bu yeni durumla güncellenir.
            state.status = action.payload;
        }
    },
    // açıklama: extraReducers, createAsyncThunk tarafından oluşturulan aksiyonların durumlarını yönetmek için kullanılır. registerUser.pending, registerUser.fulfilled ve registerUser.rejected durumlarına göre state'i günceller. pending durumunda, status "loading" olarak ayarlanır. fulfilled durumunda, status "succeeded" olarak ayarlanır ve user bilgileri güncellenir. rejected durumunda ise status "failed" olarak ayarlanır ve error mesajı güncellenir.
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.error = "";
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }

});

// açıklama: userSlice.actions, userSlice içinde tanımlanan reducer'ların otomatik olarak oluşturulan aksiyon yaratıcılarını içerir. logout, kullanıcı çıkış yaptığında durumun sıfırlanması için kullanılan bir aksiyon yaratıcıdır.
export const { logout, changeStatus } = userSlice.actions;

// açıklama: userSlice.reducer, userSlice içinde tanımlanan reducer'ları içeren bir fonksiyondur. Bu fonksiyon, Redux store'unun reducer'ı olarak kullanılmak üzere dışa aktarılır.
export default userSlice.reducer;