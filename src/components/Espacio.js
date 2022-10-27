import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link,useParams} from 'react-router-dom'
import Loader from "react-loader-spinner"

const Espacio= ()=>{

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
				{ 			
      			data.map(item=>{
      				return (
      					<div>
	      					<h1>{item.nombre} - {item.bloque}</h1>

	      					<ul>
	                      		{item.Espacios.map((y) => <li>{y.nombre} - {y.capacidad}</li>)}
	                  		</ul>
                  		</div>
      				)
      			}
      		)
      	}
      			</div>


      			
	)

	
	
}

export default 	Espacio;