import { useFormik } from "formik";
import { deptoSchema } from "../schemas";

import React,{useState,useContext} from 'react'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const ReservaForm = ({manageState}) => {

  const [data,setData] = useState([])

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

    const registrarDepartamento = (datos)=>{
      fetch("http://localhost:3000/departamento/createdepartamento",{
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

          setData(data.departamentos)
          manageState()

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
      email: "",
      password: ""
    },
    validationSchema: deptoSchema,
    onSubmit: (values,actions)  => {
      registrarDepartamento(JSON.stringify(values, null, 2))
      actions.resetForm()
    },
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <label htmlFor="nombre">Asunto:</label>
      <input
        value={values.asunto}
        onChange={handleChange}
        id="asunto"
        type="text"
        placeholder="Ingresa el asunto"
        onBlur={handleChange}
        className={errors.asunto && touched.asunto ? "input-error" : ""}
      />
      {errors.asunto && touched.asunto && <p className="error">{errors.asunto}</p>}

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
export default DepartamentoForm;