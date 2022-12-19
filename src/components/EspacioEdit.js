import { useFormik } from "formik";
import { espacioSchema } from "../schemas";

import React,{useState,useContext,useEffect} from 'react'
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

const EspacioEdit = ({manageState}) => {

  const history = useHistory();
  const [loading, setLoading] = useState(true)
  const {espacio_id} = useParams()
  const [espacio,setEspacio] = useState({})

  useEffect(()=>{
    fetch("http://localhost:3000/espacio/getespacio/"+espacio_id,{
        method:"get",
        headers:{
          "Content-Type":"application/json"
        }
      }).then(res=>res.json())
      .then(result=>{
        setEspacio(result.espacio)
        console.log(espacio)
        setLoading(false)
      })
    },[])

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

    const actualizarEspacio = (datos)=>{
      fetch("http://localhost:3000/espacio/editarespacio/"+espacio_id,{
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
            title: 'editado exitosamente'
          })


          history.push('/app/typography')

          
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
      nombre:espacio["nombre"],
      descripcion:espacio["descripcion"],
      capacidad: espacio["capacidad"],
    },
    validationSchema: espacioSchema,
    onSubmit: (values,actions) => {
      actions.resetForm()
      actualizarEspacio(JSON.stringify(values, null, 2));
    },
  });

  return (
    loading ?

    <Loader
      className="centrar"
      type="TailSpin"
      color="#00BFFF"
      height={100}
      width={100}
    />

    :
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

      <button disabled={isSubmitting} type="submit"
      >
        Actualizar
      </button>
    </form>
  );
};

export default EspacioEdit;