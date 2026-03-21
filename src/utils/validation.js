import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
    name: Yup.string().required('İsim zorunludur')
        .matches(/^[a-zA-Z_ ]+$/, 'İsim sadece harf ve boşluk içerebilir')
        .min(3, 'İsim en az 3 karakter olmalıdır')
        .max(16, 'İsim en fazla 16 karakter olabilir'),
    email: Yup.string().required('E-posta zorunludur')
        .email('Geçerli bir e-posta adresi giriniz'),
    status: Yup.string()
        .max(64, 'Durum en fazla 64 karakter olabilir'),
    password: Yup.string().required('Şifre zorunludur')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, 'Şifre en az 6 karakter olmalı, en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir'),
});