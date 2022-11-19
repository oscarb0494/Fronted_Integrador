import { useFormik } from "formik";
import { sedeSchema } from "../schemas";

import React from 'react'
import Swal from 'sweetalert2'
import {UserContext} from '../App'

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const SedeForm = ({manageState}) => {
  const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
     timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })

    const registrarSede = (datos)=>{
      fetch("http://localhost:3000/sede/createsede",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body: datos
      }).then(res=>res.json()).then(data=>{
        if(data.error){
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href="">Why do I have this issue?</a>'
          })
        } else{
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })

          manageState()

        }
      })
  }

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      bloque: "",
      nombre: "",
      descripcion: ""
    },
    validationSchema: sedeSchema,
    onSubmit: values => {
      registrarSede(JSON.stringify(values, null, 2));
    },
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

     <label htmlFor="bloque">Nombre del departamento</label>
      <input
        value={values.bloque}
        onChange={handleChange}
        id="bloque"
        type="text"
        placeholder="Ingresa el codigo del bloque"
        onBlur={handleChange}
        className={errors.bloque && touched.bloque ? "input-error" : ""}
      />
      {errors.bloque && touched.bloque && <p className="error">{errors.bloque}</p>}

      <label htmlFor="nombre">Nombre del departamento</label>
      <input
        value={values.nombre}
        onChange={handleChange}
        id="nombre"
        type="text"
        placeholder="Ingresa el nombre de la sede"
        onBlur={handleChange}
        className={errors.nombre && touched.nombre ? "input-error" : ""}
      />
      {errors.nombre && touched.nombre && <p className="error">{errors.nombre}</p>}

      <label htmlFor="password">Descripción</label>
      <input
        id="descripcion"
        type="text"
        placeholder="Ingresa una descripción"
        value={values.descripcion}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.descripcion && touched.descripcion ? "input-error" : ""}
      />
      {errors.descripcion && touched.descripcion && (
        <p className="error">{errors.descripcion}</p>
      )}

      <button disabled={isSubmitting} type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default SedeForm;