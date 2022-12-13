import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Modal, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const Detalles = ({ detallesParam }) => {
    const [visible, setVisible] = useState(false);
    const [detalles, setDetalles] = useState([]);

    useEffect(() => {
        setDetalles(detallesParam !== undefined ? detallesParam : [])
        console.log(detallesParam)
    }, [detallesParam]);

    return (
        <Container>
            <Button onClick={() => { setVisible(true) }} title='Ver Ventas'>Detalles</Button>
            <Modal show={visible}>
                <Modal.Header>Detalles</Modal.Header>
                <Modal.Body>
                    <Table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalles.map((item, k) =>
                                <tr key={k}>
                                    <td>{item.productoNombre}</td>
                                    <td>{item.cantidad}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.subtotal}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <Button onClick={() => setVisible(false)} >Cerrar</Button>
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default Detalles;