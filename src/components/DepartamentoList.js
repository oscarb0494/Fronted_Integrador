import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

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
      			data.map(item=>{
      				return(
      					<p>{item.id} - {item.nombre}</p>
      				)
      			})
	
	)
}

export default DepartamentoList;