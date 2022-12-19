import { useFormik } from "formik";
import { deptoSchema } from "../schemas";

import React,{useState,useContext} from 'react'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm();
};

const DepartamentoEdit = ({manageState}) => {

  const [data,setData] = useState([])
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

    const actualizarDepartamento = (datos)=>{
      fetch("http://localhost:3000/departamento/editdepartamento/"+dptoid,{
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
      email: "",
      password: ""
    },
    validationSchema: deptoSchema,
    onSubmit: (values,actions)  => {
      actualizarDepartamento(JSON.stringify(values, null, 2))
      actions.resetForm()
    },
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <label htmlFor="nombre">Nombre del departamento</label>
      <input
        value={values.nombre}
        onChange={handleChange}
        id="nombre"
        type="text"
        placeholder="Ingresa el nombre del departamento"
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
        Actualizar
      </button>
    </form>
  );
};
export default DepartamentoEdit;