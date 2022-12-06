import { useFormik } from "formik";
import { recursoSchema } from "../schemas";

import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../App'

const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
};

const RecursoForm = ({ manageState }) => {

    const [data, setData] = useState([])
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

    const registrarRecurso = (datos) => {
        fetch("http://localhost:3000/recursos/createrecurso", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: datos
        }).then(res => res.json()).then(data => {
            if (data.error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            } else {

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
            nombre: "",
            descripcion: "",
            estado: "bueno",
            prestable: false,
            tipo_recurso: 1,
            id_espacio: espacioid
        },
        validationSchema: recursoSchema,
        onSubmit: (values, actions) => {
            registrarRecurso(JSON.stringify(values, null, 2))
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
                placeholder="Ingresa el nombre del recurso"
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

            <label htmlFor="estado">Estado</label>
            <select
                id="estado"
                label="estado"
                value={values.estado}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="selecciona el estado del elemento"
            >
                <option value="">Por favor selecciona el estado</option>

                <option value="optimo">Optimo</option>
                <option value="malo">Malo</option>
                <option value="mantenimiento">Mantenimiento</option>

            </select>

            <label htmlFor="estado">Tipo de recurso</label>
            <select
                id="tipo_recurso"
                label="tipo_recurso"
                value={values.tipo_recurso}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="selecciona el tipo de recurso"
            >
                <option value="">Por favor selecciona el tipo</option>

                <option value="1">Computadores</option>
                <option value="2">Equipos tecnologicos</option>
                <option value="3">Otros</option>

            </select>

            <label htmlFor="prestable">Prestable</label>
            <input
                id="prestable"
                type="checkbox"
                value={values.prestable}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.prestable && touched.prestable ? "input-error" : ""}
            />
            {errors.prestable && touched.prestable && (
                <p className="error">{errors.prestable}</p>
            )}




            <button disabled={isSubmitting} type="submit"
            >
                Submit
            </button>
        </form>
    );
};
export default RecursoForm;