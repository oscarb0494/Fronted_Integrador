import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

import {Table,Input,Label,Row,Col,Button,Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap"

import EspacioList from './EspacioList'
import EspacioForm from './EspacioForm'

import Widget from "../components/Widget";

const  EspacioView = ()=>{

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
                			Registrar Departamento
                		</ModalHeader>

               			<ModalBody>
                    		<EspacioForm manageState={ManageState} />
                		</ModalBody>

                		<ModalFooter>
            				<Button color="secondary" >Cancel</Button>
          				</ModalFooter>
            		</Modal>
      			</Row>

      			<Row>
      				<Col>
      					<EspacioList update={update} />
      				</Col>
      			</Row>
      		</div>
	)
}

export default EspacioView;