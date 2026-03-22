import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpValidationSchema } from '../../utils/validation'
import AuthInput from './AuthInput'
import { useDispatch, useSelector } from 'react-redux'
import PulseLoader from 'react-spinners/PulseLoader'
import { Link, useNavigate } from 'react-router-dom'
import { changeStatus, registerUser } from '../../features/userSlice'
import Picture from './Picture'
const cloud_secret = process.env.REACT_APP_CLOUD_SECRET_NAME;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;
function RegisterForm() {
    const dispatch = useDispatch(); // açıklama: Redux dispatch fonksiyonunu kullanmak için useDispatch hook'unu kullanıyoruz Redux store'a action göndermek için dispatch fonksiyonunu kullanırız
    const navigate = useNavigate(); // açıklama: React Router'ın useNavigate hook'u, bileşenler arasında programatik olarak gezinmek için kullanılır. navigate fonksiyonunu kullanarak kullanıcıyı farklı bir sayfaya yönlendirebiliriz.
    const { status, error } = useSelector((state) => state.user); // açıklama: kullanıcı durumunu Redux store'dan alıyoruz
    const [picture, setPicture] = useState(); // açıklama: kullanıcı profil resmi için bir state oluşturuyoruz
    const [readablePicture, setReadablePicture] = useState(""); // açıklama: kullanıcı profil resmini okunabilir hale getirmek için bir state oluşturuyoruz
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpValidationSchema) // açıklama: useForm hook'unu kullanarak form durumunu yönetiyoruz. resolver olarak yupResolver'ı kullanarak Yup ile tanımladığımız doğrulama şemasını form doğrulaması için kullanıyoruz. Bu, form verilerinin doğrulanmasını sağlar ve hataları errors nesnesine ekler.
    })
    const onSubmit = async (data) => {
        dispatch(changeStatus("loading"));
        let res = await dispatch(registerUser({ ...data, picture: readablePicture })); // açıklama: form verilerini alır ve registerUser action'ını dispatch eder. Bu, kullanıcı kayıt işlemini başlatır ve Redux store'daki durumu günceller.

        if (res?.payload?.user) {
            navigate('/');
        }

    };

    return (
        <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
            <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
                <div className="text-center dark:text-dark_text_1">
                    <h2 className="mt-6 text-3xl font-bold">Merhaba</h2>
                    <p className="mt-2 text-sm">Kayıt Ol</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <AuthInput
                        name='name'
                        type='text'
                        placeholder='İsim'
                        register={register} // açıklama: register fonksiyonunu AuthInput bileşenine geçiriyoruz
                        error={errors.name?.message} // açıklama: validation hatalarını AuthInput bileşenine geçiriyoruz
                    />
                    <AuthInput
                        name='email'
                        type='text'
                        placeholder='E-posta'
                        register={register} // açıklama: register fonksiyonunu AuthInput bileşenine geçiriyoruz
                        error={errors.email?.message} // açıklama: validation hatalarını AuthInput bileşenine geçiriyoruz
                    />
                    <AuthInput
                        name='status'
                        type='text'
                        placeholder='Durum'
                        register={register} // açıklama: register fonksiyonunu AuthInput bileşenine geçiriyoruz
                        error={errors.status?.message} // açıklama: validation hatalarını AuthInput bileşenine geçiriyoruz
                    />
                    <AuthInput
                        name='password'
                        type='password'
                        placeholder='Şifre'
                        register={register} // açıklama: register fonksiyonunu AuthInput bileşenine geçiriyoruz
                        error={errors.password?.message} // açıklama: validation hatalarını AuthInput bileşenine geçiriyoruz
                    />
                    <Picture readablePicture={readablePicture} setReadablePicture={setReadablePicture} setPicture={setPicture} />
                    {error ? (
                        <div>
                            <p className="text-red-400">{error}</p>
                        </div>
                    ) : null}
                    <button
                        className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide
                        font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
                        type="submit"
                    >
                        {status === "loading" ? (
                            <PulseLoader color="#fff" size={10} />
                        ) : (
                            "Kayıt Ol"
                        )}
                    </button>
                    <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
                        <span>Hesabın var mı?</span>
                        <Link
                            to="/login"
                            className=" hover:underline cursor-pointer transition ease-in duration-300"
                        >
                            Giriş Yap
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm
