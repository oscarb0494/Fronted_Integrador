import React,{useContext,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Loader from "react-loader-spinner"

const Logout = () => {

  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()

  useEffect(() => {

    localStorage.clear();
    dispatch({type:"CLEAR"})
    history.push('/loginform')
    
  }, [])
  
  return (
    <h1>saliendo del sitio...</h1>
  );
};

export default Logout;