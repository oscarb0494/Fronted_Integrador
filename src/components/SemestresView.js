import React, { useState } from 'react'
import { UserContext } from '../App'
import { Link } from 'react-router-dom'
import Loader from "react-loader-spinner"

import { Table, Input, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import Widget from "../components/Widget";
import SemestreList from './SemestreList'

const SemestresView = () => {

    const [update, setUpdate] = useState(false)

    const ManageState = () => {
        setUpdate(!update)
    }

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Row>
                <Col>
                    <SemestreList update={update} />
                </Col>
            </Row>
        </div>
    )
}

export default SemestresView;