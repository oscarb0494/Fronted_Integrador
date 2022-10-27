import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

const SedeList = ()=>{

	const [loading, setLoading] = useState(true)

	const [data,setData] = useState([])

	useEffect(()=>{
		fetch("http://localhost:3000/sede/getsedes",{
				method:"get",
				headers:{
					"Content-Type":"application/json"
				}
			}).then(res=>res.json())
			.then(result=>{
				setData(result.sedes)
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
      					<Link to={"/espacios/"+item.id}><p>{item.bloque} - {item.nombre}</p></Link>
      				)
      			})
	
	)
}

export default SedeList;