import React,{useState,useEffect,useContext,createContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

import {Table,Input,Label,Row,Col} from "reactstrap"

import s from "./Tables.modules.scss";
import Widget from '../components/Widget'

const DepartamentoList = ({update})=>{

	const [loading, setLoading] = useState(true)

	const [data,setData] = useState([])
	const [actualizar, setActualizar] = useState(true)

	const checkboxes1 = [false, true, false, false]

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
		},[update,actualizar])

	const deleteDepartamento = (deptoid)=>{
		fetch('http://localhost:3000/departamento/deletedepartamento/'+deptoid,{
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
		loading?<Loader
					className="centrar"
       				type="TailSpin"
        			color="#00BFFF"
        			height={100}
        			width={100}
      			/>:
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
					                    <th className="text-right">Descripci??n</th>
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
						      						<td><Link to={"/app/materias/"+item.id}>{item.nombre}</Link></td>
						      						<td>{item.descripcion}</td>
						      						<td>{item.createdAt}</td>
						      						<td>
						      							<i className="bi bi-trash" style={{float:"left"}} onClick={()=>deleteDepartamento(item.id)}></i>
						      							<Link to={"/app/editardepartamento/"+item.id}><i className="bi bi-pencil" style={{float:"left"}}></i></Link>
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

export default DepartamentoList;