import { useFormik } from "formik";
import { loginSchema } from "../schemas";

import React,{useState,useContext} from 'react'
import Swal from 'sweetalert2'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Loader from "react-loader-spinner"

const LoginForm = () => {

  const {state,dispatch} = useContext(UserContext)
  const history = useHistory();

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

    const login = (datos)=>{
      fetch("http://localhost:3000/users/signin",{
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
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})

          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          
          history.push('/')
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
    validationSchema: loginSchema,
    onSubmit: values => {
      login(JSON.stringify(values, null, 2));
    },
  });

  console.log(errors);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <label htmlFor="email">Email</label>
      <input
        value={values.email}
        onChange={handleChange}
        id="email"
        type="email"
        placeholder="Enter your email"
        onBlur={handleChange}
        className={errors.email && touched.email ? "input-error" : ""}
      />
      {errors.email && touched.email && <p className="error">{errors.email}</p>}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.password && touched.password ? "input-error" : ""}
      />
      {errors.password && touched.password && (
        <p className="error">{errors.password}</p>
      )}

      <button disabled={isSubmitting} type="submit"
      >
        Submit
      </button>
    </form>
  );
};
export default LoginForm;