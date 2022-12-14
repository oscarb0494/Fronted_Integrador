import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label } from "reactstrap"

const SemestreList = ({ update }) => {

    const [loading, setLoading] = useState(true)

    const [data, setData] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/semestre/getsemestres", {
            method: "get",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                setData(result.semestres)
                setLoading(false)
            })
    }, [update])

    return (
        loading ? <Loader
            className="centrar"
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
        /> :

            <Table className="table-bordered table-lg mt-lg mb-0">
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
                        <th className="text-right">Nombre</th>
                        <th className="text-right">Fecha Inicio</th>
                        <th className="text-right">Fecha Final</th>
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
                                    <td>{item.fechaInicio}</td>
                                    <td>{item.fechaFinal}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>

    )
}

export default SemestreList;