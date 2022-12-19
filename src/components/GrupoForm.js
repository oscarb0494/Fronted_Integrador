import { useFormik } from "formik";
import { grupoSchema } from "../schemas";

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

const GrupoForm = ({manageState}) => {

  const {materiaid} = useParams()

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

    const registrarGrupo = (datos)=>{
      fetch("http://localhost:3000/grupo/creategrupo",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer "+localStorage.getItem("jwt"),
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
      grupo: "",
      materia: materiaid
    },
    validationSchema: grupoSchema,
    onSubmit: values => {
      registrarGrupo(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <label htmlFor="grupo">grupo</label>
      <input
        value={values.grupo}
        onChange={handleChange}
        id="grupo"
        type="text"
        placeholder="Ingresa el nombre del departamento"
        onBlur={handleChange}
        className={errors.grupo && touched.grupo ? "input-error" : ""}
      />
      {errors.grupo && touched.grupo && <p className="error">{errors.grupo}</p>}

      <button disabled={isSubmitting} type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default GrupoForm;