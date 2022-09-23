import * as yup from 'yup';


export const loginValidationSchema = yup.object().shape({
    cpf: yup.string()
        .required("Por favor insira números separados por pontos e traço - Ex. 000.000.000-00")
        .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Por favor insira um CPF válido, no formato 000.000.000-00"),
    password: yup.string()
        .min(8, ({min}) => `A senha deve ter pelo menos ${min} caracteres`)
        .required('Por favor insira uma senha')
})


export const signupValidationSchema = yup.object().shape({
    name: yup.string().required("Informe seu nome completo")
    .required("Por favor insira seu nome completo"),
    email: yup.string()
        .email('Insira um email válido')
        .required("Por favor insira um email"),
    cpf: yup.string()
        .required("Por favor insira números separados por pontos e traço - Ex. 000.000.000-00")
        .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Por favor insira um CPF válido, no formato 000.000.000-00"),
    address: yup.string()
        .required("Por favor insira um endereço"),
    // account: yup.string()
    //     .required("Por favor selecione um tipo de conta"),
    password: yup.string()
        .min(8, ({min}) => `Crie uma senha de no mínimo ${min} caracteres`)
        .required('Por favor insira uma senha'),
    confirmPassword: yup.string()
        .min(8, `Senhas não conferem`)
        .required('Por favor insira uma senha')
})

export const passRecoverValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Insira um email válido')
        .required("Por favor insira um email")
})