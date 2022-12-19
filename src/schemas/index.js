import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const basicSchema = yup.object().shape({
  nombre: yup.string().required("Este es un campo obligatorio."),
  email: yup.string().email("Ingresa un correo electronico valido.").required("Obligatorio"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export const grupoSchema = yup.object().shape({
  grupo: yup.number().min(1).required("Este dato es requerido")
});

export const loginSchema = yup.object().shape({
  email: yup.string().email("Por favor ingresa un email valido")
  .required("Required"),
  password: yup.string().required("Required")
})

export const deptoSchema = yup.object().shape({
  nombre: yup.string().required("Required"),
  descripcion: yup.string().required("Required")
})

export const recursoSchema = yup.object().shape({
  nombre: yup.string().required("Required"),
  descripcion: yup.string(),
  estado: yup.string(),
  tipo_recurso: yup.number().required(),
})

export const materiaSchema = yup.object().shape({
  codigo: yup.string().required("Required"),
  nombre: yup.string().required("Required"),
  cupos_maximos: yup.number().min(1).required("Required")
})

export const sedeSchema = yup.object().shape({
  bloque: yup.string().required("Required"),
  nombre: yup.string().required("Required"),
  descripcion: yup.string()
})

export const espacioSchema = yup.object().shape({
  nombre: yup.string().required("Required"),
  descripcion: yup.string(),
  capacidad: yup.number().required("Required")
})

export const advancedSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .required("Required"),
  jobType: yup
    .string()
    .oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type")
    .required("Required"),
  acceptedTos: yup
    .boolean()
    .oneOf([true], "Please accept the terms of service"),
});