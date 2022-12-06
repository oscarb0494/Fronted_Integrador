import { useFormik } from "formik";
import { materiaSchema } from "../schemas";

import React,{useState,useContext} from 'react'
import Swal from 'sweetalert2'
import {Link,useParams,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Loader from "react-loader-spinner"

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const MateriaForm = ({manageState}) => {

  const {dptoid} = useParams()

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

    const registrarMateria = (datos)=>{
      fetch("http://localhost:3000/materia/createmateria",{
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
      codigo: "",
      nombre:"",
      cupos_maximos: "",
      departamento_id: dptoid
    },
    validationSchema: materiaSchema,
    onSubmit: values => {
      registrarMateria(JSON.stringify(values, null, 2));
    },
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <label htmlFor="codigo">Codigo</label>
      <input
        value={values.codigo}
        onChange={handleChange}
        id="codigo"
        type="text"
        placeholder="Ingresa el nombre del departamento"
        onBlur={handleChange}
        className={errors.codigo && touched.codigo ? "input-error" : ""}
      />
      {errors.codigo && touched.codigo && <p className="error">{errors.codigo}</p>}

      <label htmlFor="nombre">Nombre</label>
      <input
        id="nombre"
        type="text"
        placeholder="Ingresa nombre de la materia"
        value={values.nombre}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.nombre && touched.nombre ? "input-error" : ""}
      />
      {errors.nombre && touched.nombre && (
        <p className="error">{errors.nombre}</p>
      )}

      <label htmlFor="nombre">Capacidad</label>
      <input
        id="cupos_maximos"
        type="number"
        placeholder="Ingresa la capacidad de la clase"
        value={values.cupos_maximos}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.cupos_maximos && touched.cupos_maximos ? "input-error" : ""}
      />
      {errors.cupos_maximos && touched.cupos_maximos && (
        <p className="error">{errors.cupos_maximos}</p>
      )}

      <button disabled={isSubmitting} type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default MateriaForm;