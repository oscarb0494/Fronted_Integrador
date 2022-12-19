import React, { useState, useEffect, useContext, createContext } from 'react'
import { UserContext } from '../App'
import { Link, useParams } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label, Row, Col } from "reactstrap"

import s from "./Tables.modules.scss";
import Widget from '../components/Widget'

const RecursosList = ({ update }) => {

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState([])

    const { espacioid } = useParams()

    const checkboxes1 = [false, true, false, false]

    const[actualizar,setActualizar] = useState(true)

    useEffect(() => {
        fetch("http://localhost:3000/recursos/getrecursos/" + espacioid, {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.recursos)
                setLoading(false)
            })
    }, [update,actualizar])


    const deleteRecurso = (recursoid)=>{
        fetch('http://localhost:3000/recurso/deleterecurso/'+recursoid,{
            method:"delete",
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
            .then(result=>{

               
                console.log("eliminado")
                
                if(actualizar==true){
                    setActualizar(false)
                }else{
                    setActualizar(true)
                }

                setLoading(true)
              
            }).catch(err=>{
                console.log(err)
            })

            
    }

     
    return (
        loading ? <Loader
            className="centrar"
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
        /> :
            <Row>
                <Col>
                    <Widget
                        title={<p style={{ fontWeight: 700 }}>Departamentos</p>}
                        customDropDown
                    >
                        <div className={s.root}>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="abc-checkbox">
                                                <Input
                                                    id="checkbox10"
                                                    type="checkbox"
                                                    onChange={event =>
                                                        console.log("funciona")
                                                    }
                                                />
                                                <Label for="checkbox10" />
                                            </div>
                                        </th>
                                        <th>Nombre</th>
                                        <th className="text-right">Descripción</th>
                                        <th className="text-right">Estado</th>
                                        <th className="text-right">Prestable</th>
                                        <th className="text-center">Created At</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(item => {
                                            return (
                                                <tr>
                                                    <td>
                                                        <div className="abc-checkbox">
                                                            <Input
                                                                type="checkbox"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{item.nombre}</td>
                                                    <td>{item.descripcion}</td>
                                                    <td>{item.estado}</td>
                                                    <td>{item.prestable}</td>
                                                    <td>{item.createdAt}</td>
                                                    <td>
                                                          <i className="bi bi-trash" style={{float:"left"}} onClick={()=>deleteRecurso(item.id)}></i>
                                                      </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </Widget>
                </Col>
            </Row>

    )
}

export default RecursosList;