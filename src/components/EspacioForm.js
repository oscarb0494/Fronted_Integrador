import { useFormik } from "formik";
import { espacioSchema } from "../schemas";

import React,{useState,useContext} from 'react'
import Swal from 'sweetalert2'
import {Link,useParams,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Loader from "react-loader-spinner"

import CustomSelect from "./CustomSelect";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const EspacioForm = () => {

  const {espacioid} = useParams()

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

    const registrarEspacio = (datos)=>{
      fetch("http://localhost:3000/espacio/createespacio",{
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
      nombre:"",
      descripcion:"",
      capacidad: "",
      tipo_espacio:"",
      sede: espacioid
    },
    validationSchema: espacioSchema,
    onSubmit: (values,actions) => {
      actions.resetForm()
      registrarEspacio(JSON.stringify(values, null, 2));
    },
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <label htmlFor="nombre">Nombre del espacio</label>
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

      <label htmlFor="descripcion">descripcion</label>
      <input
        value={values.descripcion}
        onChange={handleChange}
        id="descripcion"
        type="text"
        placeholder="Ingresa una descripcion"
        onBlur={handleChange}
        className={errors.descripcion && touched.descripcion ? "input-error" : ""}
      />
      {errors.descripcion && touched.descripcion && <p className="error">{errors.descripcion}</p>}

      <label htmlFor="nombre">Capacidad</label>
      <input
        id="capacidad"
        type="number"
        placeholder="Ingresa la capacidad del espacio"
        value={values.capacidad}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.capacidad && touched.capacidad ? "input-error" : ""}
      />
      {errors.capacidad && touched.capacidad && (
        <p className="error">{errors.capacidad}</p>
      )}

      <label htmlFor="tipo_espacio">Tipo de espacio</label>
      <select
            id = "tipo_espacio"
            label="Tipo de espacio"
            value={values.tipo_espacio}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Selecciona el tipo de sala"
          >
            <option value="">Por favor selecciona un tipo de sala</option>
            <option value="2">Sala de informatica</option>
            <option value="designer">Designer</option>
            <option value="manager">Product Manager</option>
            <option value="other">Other</option>
        </select>

      <button disabled={isSubmitting} type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default EspacioForm;