import * as yup from 'yup';


export const loginValidationSchema = yup.object().shape({
    cpf: yup.string()
        .required("Insira números separados por pontos e traço - Ex. 000.000.000-00")
        .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Insira um CPF válido, no formato 000.000.000-00"),
    password: yup.string()
        .min(8, ({min}) => `A senha deve ter pelo menos ${min} caracteres`)
        .required('Insira uma senha')
})


export const signupValidationSchema = yup.object().shape({
    name: yup.string().required("Informe seu nome completo")
    .required("Insira seu nome completo"),
    email: yup.string()
        .email('Insira um email válido')
        .required("Insira um email"),
    cpf: yup.string()
        .required("Insira números separados por pontos e traço - Ex. 000.000.000-00")
        .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "Insira um CPF válido, no formato 000.000.000-00"),
    address: yup.object().shape({
        city: yup.string().required("Informe a cidade"),
        state: yup.string().required("Informe o estado"),
        street: yup.string().required("Informe a rua"),
        cep: yup.string().required("Informe um CEP"),
        location: yup.string().required("Informe um CEP"),
    }).required("Preencha os campos obrigatórios"),

    password: yup.string()
        .min(8, ({min}) => `Crie uma senha de no mínimo ${min} caracteres`)
        .required('Insira uma senha'),
    confirmPassword: yup.string()
        .min(8, `Senhas não conferem`)
        .required('Insira uma senha')
})

export const passRecoverValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Insira um email válido')
        .required("Por favor insira um email")
})