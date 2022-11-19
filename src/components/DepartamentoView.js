import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Loader from "react-loader-spinner"

import {Table,Input,Label,Row,Col,Button,Modal,ModalHeader,ModalBody,ModalFooter} from "reactstrap"

import DepartamentoList from './DepartamentoList'
import DepartamentoForm from './DepartamentoForm'

import Widget from "../components/Widget";

const DepartamentoView = ()=>{

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
                    		<DepartamentoForm manageState={ManageState} />
                		</ModalBody>

                		<ModalFooter>
            				<Button color="secondary" >Cancel</Button>
          				</ModalFooter>
            		</Modal>
      			</Row>

      			<Row>
      				<Col>
      					<DepartamentoList update={update} />
      				</Col>
      			</Row>
      		</div>
	)
}

export default DepartamentoView;