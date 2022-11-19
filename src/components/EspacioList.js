import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link,useParams} from 'react-router-dom'
import Loader from "react-loader-spinner"

import {Table,Input,Label} from "reactstrap"

const EspacioList = ({update})=>{

	const [loading, setLoading] = useState(true)

	const [data,setData] = useState([])

	const {sede_id} = useParams()

	useEffect(()=>{
		fetch("http://localhost:3000/sede/getespacios/"+sede_id,{
				method:"get",
				headers:{
					"Content-Type":"application/json"
				}
			}).then(res=>res.json())
			.then(result=>{
				setData(result.sede)
				setLoading(false)
			})
		},[update])

	return (
		loading?<Loader
					className="centrar"
       				type="TailSpin"
        			color="#00BFFF"
        			height={100}
        			width={100}
      			/>:

				<div>
				{ 			
      			data.map(item=>{
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
						      					<td>{y.nombre}</td>
						      					<td>{y.descripcion}</td>
						      					<td>{y.capacidad}</td>
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

export default 	EspacioList;