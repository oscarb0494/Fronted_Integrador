import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { Link, useParams } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label,Row,Col,Button,Modal,ModalHeader,ModalBody,ModalFooter } from "reactstrap"

const EspacioList = ({ update }) => {

	const [loading, setLoading] = useState(true)

	const [data, setData] = useState([])

	const { sede_id } = useParams()


	const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [nombre,setNombre] = useState("")
    const [descripcion,setDescripcion] = useState("")
    const [capacidad,setCapacidad] = useState(0)

    const [actualizar,setActualizar] = useState(false)

	useEffect(() => {
		fetch("http://localhost:3000/sede/getespacios/" + sede_id, {
			method: "get",
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json())
			.then(result => {
				setData(result.sede)
				setLoading(false)
			})
	}, [update,actualizar])

	const deleteEspacio = (postid)=>{
		console.log(postid)
		fetch('http://localhost:3000/espacio/deleteespacio/'+postid,{
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

			<div>
				{
					data.map(item => {
						return (
							<div>
								<h2>{item.nombre} - {item.bloque}</h2>

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
											<th className="text-right">Descripción</th>
											<th className="text-right">Capacidad</th>
											<th className="text-right">Opciones</th>
										</tr>
									</thead>
									<tbody>
										{
											item.Espacios.map((y) =>
												<tr>
													<td>
														<div className="abc-checkbox">
															<Input
																type="checkbox"
															/>
														</div>
													</td>
													<td><Link to={"/app/recursos/" + y.id}>{y.nombre}</Link></td>
													<td>{y.descripcion}</td>
													<td>{y.capacidad}</td>


													<i className="bi bi-trash" style={{float:"left"}} onClick={()=>deleteEspacio(y.id)}></i>
													<Link to={"/app/editarespacio/"+y.id}><i className="bi bi-pencil" style={{float:"left"}}></i></Link>

													
												</tr>
											)
										}
									</tbody>
								</Table>
							</div>
						)
						}
					)
				}
			</div>

	)



}

export default EspacioList;