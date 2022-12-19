import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { Link, useParams, useHistory } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label } from "reactstrap"
import Swal from 'sweetalert2' 

const GrupoList = ({ update }) => {

	const [loading, setLoading] = useState(true)

	const [data, setData] = useState([])


	const [dia, setDia] = useState("MO")
	const [inicio,setInicio] = useState(7)
	const [final,setFinal] = useState(22)
	const [espacio,setEspacio] = useState(0)

	const { materiaid } = useParams()

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

	useEffect(() => {
		console.log(materiaid)

		fetch("http://127.0.0.1:3000/materia/getmaterias/" + materiaid, {
			method: "get",
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json())
			.then(result => {
				console.log(result)
				setData(result.grupos)
				setLoading(false)
			}).catch(err => {
				console.log(err)
			})
	}, [update])

	const addHorario = (id) => {
		console.log(dia,inicio,final,espacio)

		fetch("http://127.0.0.1:3000/horariomateria/createhorario",{
			method: "post",
			headers: {
				"Content-Type": "application/json"
			},
			body:JSON.stringify({
				dia,
				inicio,
				final,
				espacio,
				grupo: id
			})
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
  					title: 'horario agregado correctamente'
				})
			}
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
						<th>Grupo</th>
						<th>Horario</th>
					</tr>
				</thead>
				{
					data.map(item => {
						return (
							<tbody>


								{item.Grupos.map((y) => <tr>
									<td>
										<div className="abc-checkbox">
											<Input type="checkbox" />
										</div>
									</td>
									<td>{y.grupo}</td>

									<td>

										{
											y.horarioMateria.map((y) =>

											<div>
											<label>dia: </label>	{y.dia}<br/>
											<label>hora inicial: </label> {y.hora_inicial}<br/>
											<label>hora final:</label>	{y.hora_final}<br/>
											</div>

											)
										}


									</td>

									<td> 

									<div className="form-group">
										<label>Dia:</label>
										<select 
											className="form-control"
											value={dia}
											onChange={(e)=>setDia(e.target.value)}
										>
											<option value="MO">Lunes</option>
											<option value="TU">Martes</option>
											<option value="WE">Miercoles</option>
											<option value="TH">Jueves</option>
											<option value="FR">Viernes</option>
											<option value="SA">Sabado</option>
										</select>


										<label>Hora Inicio</label>
										<
										input type="number" 
										className="form-control"
										value={inicio}
										onChange={(e)=>setInicio(e.target.value)}
										/>

										<label>Hora Final </label>
										<
										input type="number" 
										className="form-control"
										value={final}
										onChange={(e)=>setFinal(e.target.value)}
										/>

										<label>Espacio</label>
										<select
											className="form-control"
											value={espacio}
											onChange={(e)=>setEspacio(e.target.value)}
										>
											<option value="0">Seleccione una sala </option>
											<option value="1">SALA D</option>
										</select>

										<button 
											className="btn btn-primary"
											onClick={()=>addHorario(y.id)}>
											Registrar Horario
										</button>
									</div>


									</td>
								</tr>)}

							</tbody>
						)
					}
					)
				}
			</Table>
	)
}

export default GrupoList;