import React,{useState,useEffect} from 'react'
import Swal from 'sweetalert2'
import Loader from "react-loader-spinner"
import {useHistory,Link} from 'react-router-dom'

const Inicio = ()=>{
	const history = useHistory()
	const [data, setData ] = useState(null)
	const [loading, setLoading] = useState(false)

	return(
		loading?
			<Loader
				className="centrar"
	       		type="TailSpin"
	        	color="#00BFFF"
	        	height={100}
	        	width={100}
	      	/>:

	    <div className="container mx-auto">
			<div class="card">
      			<div class="card-image"></div>
      				<div class="card-text">
        			<h2>Post One</h2>
      			</div>
    		</div>
    		<div class="card">
      			<div class="card-image card2"></div>
      				<div class="card-text card2">
        			<h2>Post Two</h2>
      			</div>
    		</div>
    		<div class="card">
        		<div class="card-image card3"></div>
        			<div class="card-text card3">
         			<h2>Post Three</h2>
        		</div>
      		</div>
		</div>
	)
}

export default Inicio;