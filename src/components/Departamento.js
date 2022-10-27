import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link,useParams,useHistory} from 'react-router-dom'
import Loader from "react-loader-spinner"

import MateriaForm from './MateriaForm'

const Departamento = ()=>{

	const [loading, setLoading] = useState(true)

	const [data,setData] = useState([])

	const {dptoid} = useParams()


	useEffect(()=>{
		console.log(dptoid)

		fetch("http://127.0.0.1:3000/departamento/getmaterias/"+dptoid,{
				method:"get",
				headers:{
					"Content-Type":"application/json"
				}
			}).then(res=>res.json())
			.then(result=>{
				console.log(result)
				setData(result.departamento)
				setLoading(false)
			}).catch(err =>{
				console.log(err)
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

				<div>
				<MateriaForm />
				{ 			
      			data.map(item=>{
      				return (
      					<div>
	      					<h1>{item.nombre} - {item.descripcion}</h1>

	      					<ul>
	                      		{item.Materia.map((y) => <li>{y.codigo} - {y.nombre}</li>)}
	                  		</ul>
                  		</div>
      				)
      			}
      		)
      	}
      			</div>


      			
	)
}

export default Departamento;