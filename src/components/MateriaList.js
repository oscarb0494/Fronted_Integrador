import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { Link, useParams, useHistory } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label } from "reactstrap"

const MateriaList = ({ update }) => {

	const [loading, setLoading] = useState(true)

	const [data, setData] = useState([])

	const { dptoid } = useParams()

	useEffect(() => {
		console.log(dptoid)

		fetch("http://127.0.0.1:3000/departamento/getmaterias/" + dptoid, {
			method: "get",
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json())
			.then(result => {
				console.log(result)
				setData(result.departamento)
				setLoading(false)
			}).catch(err => {
				console.log(err)
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
						<th>Nombre</th>
						<th className="text-right">Codigo</th>
						<th className='text-right'>Cupos Maximos</th>
					</tr>
				</thead>
				{
					data.map(item => {
						return (
							<tbody>


								{item.Materia.map((y) => <tr>
									<td>
										<div className="abc-checkbox">
											<Input type="checkbox" />
										</div>
									</td>
									<td><Link to={"/app/grupos/"+y.id}>{y.codigo}</Link></td>
									<td>{y.nombre}</td>
									<td>{y.cupos_maximos}</td>
								</tr>)}

							</tbody>
						)
					}
					)
				}
			</Table>
	)
}

export default MateriaList;