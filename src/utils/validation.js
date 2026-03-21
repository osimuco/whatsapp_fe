import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object({
    name: Yup.string().required('İsim zorunludur'),
});