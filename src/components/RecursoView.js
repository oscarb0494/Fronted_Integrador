import React, { useState, useEffect, useContext } from 'react'

import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import Cronograma from './Cronograma';
import RecursoForm from './RecursoForm'
import RecursosList from './RecursoList'

const RecursoView = () => {

    const [update, setUpdate] = useState(false)
    const [view, setView] = useState("recursos");

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
                        Registrar Recurso
                    </ModalHeader>

                    <ModalBody>
                        <RecursoForm manageState={ManageState} />
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" >Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Row>

            <Row>
                <Col>
                    <nav>
                        <h3
                            onClick={() => setView("recursos")}
                            style={{ color: view === "recursos" ? "#FF0000" : "" }}
                        >
                            Recursos
                        </h3>
                        <h3
                            onClick={() => setView("horario")}
                            style={{ color: view === "horario" ? "#FF0000" : "" }}
                        >
                            Horario
                        </h3>
                    </nav>
                    {view === "recursos" ? <RecursosList update={update} /> : <Cronograma />}

                </Col>
            </Row>
        </div>
    )
}

export default RecursoView;