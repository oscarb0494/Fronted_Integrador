import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

import {Table,Input,Label,Row,Col,Button,Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap"

import GrupoList from './GrupoList'
import GrupoForm from './GrupoForm'

import Widget from "../components/Widget";

const  GrupoView = ()=>{

		const [update, setUpdate] = useState(false)
		
		const ManageState = () => {
			setUpdate(!update)
		}

    	const [modal, setModal] = useState(false);
    	const toggle = () => setModal(!modal);
		
		return (
      		<div>
      			<Row>
      				<Button onClick={toggle}>+</Button>

      				<Modal isOpen={modal}
      					
                		toggle={toggle}
                		modalTransition={{ timeout: 2000 }}>

                		<ModalHeader>
                			Añadir Grupo
                		</ModalHeader>

               			<ModalBody>
                    		<GrupoForm manageState={ManageState} />
                		</ModalBody>

                		<ModalFooter>
            				<Button color="secondary" >Cancel</Button>
          				</ModalFooter>
            		</Modal>
      			</Row>

      			<Row>
      				<Col>
      					<GrupoList update={update} />
      				</Col>
      			</Row>
      		</div>
	)
}

export default GrupoView;