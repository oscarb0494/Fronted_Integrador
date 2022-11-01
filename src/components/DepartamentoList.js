import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

import {Table,Input,Label} from "reactstrap"

const DepartamentoList = ()=>{

	const [loading, setLoading] = useState(true)

	const [data,setData] = useState([])

	useEffect(()=>{
		fetch("http://localhost:3000/departamento/getdepartamentos",{
				method:"get",
				headers:{
					"Content-Type":"application/json"
				}
			}).then(res=>res.json())
			.then(result=>{
				setData(result.departamentos)
				setLoading(false)
			})
		},[])

	return (
		loading?<Loader
					className="centrar"
       				type="TailSpin"
        			color="#00BFFF"
        			height={100}
        			width={100}
      			/>:

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
	                    <th className="text-right">Descripción</th>
	                    <th className="text-center">Created At</th>
	                  </tr>
                	</thead>
                	<tbody>
	                	{
		      			data.map(item=>{
		      				return(
		      					<tr>
		      						<td>
		      							<div className="abc-checkbox">
		      								<Input   				
                            					type="checkbox"
                          					/>
                        				</div>
		      						</td>
		      						<td><Link to={"/app/departamento/"+item.id}>{item.nombre}</Link></td>
		      						<td>{item.descripcion}</td>
		      						<td>{item.createdAt}</td>
		      					</tr>
		      				)
		      			})
		      			}
	      			</tbody>
      			</Table>
	
	)
}

export default DepartamentoList;