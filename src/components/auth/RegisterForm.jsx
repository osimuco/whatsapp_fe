import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signUpValidationSchema } from '../../utils/validation'
import AuthInput from './AuthInput'
function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(signUpValidationSchema)
    })
    const onSubmit = (data) => console.log(data);
    return (
        <div className='h-screen w-full flex items-center justify-center overflow-hidden'>
            <div className='max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
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
                    <button type="submit">Kayıt Ol</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterForm
