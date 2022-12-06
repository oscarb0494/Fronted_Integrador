import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import MateriaForm from './MateriaForm'
import MateriaList from './MateriaList'

const MateriaView = () => {

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
                        Registrar Materia
                    </ModalHeader>

                    <ModalBody>
                        <MateriaForm manageState={ManageState} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Row>

            <Row>
                <Col>
                    <MateriaList update={update} />
                </Col>
            </Row>
        </div>
    )
}

export default MateriaView;