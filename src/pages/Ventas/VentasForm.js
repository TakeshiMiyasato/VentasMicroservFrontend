import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, FormLabel, FormGroup, Card, FormControl, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const VentasForm = () => {

    const [compradorId, setCompradorId] = useState('');
    const [detalle, setDetalle] = useState([]);

    const [compradores, setCompradores] = useState([]);
    const [productos, setProductos] = useState([]);

    const [productoId, setProductoId] = useState('');
    const [producto, setProducto] = useState([]);
    const [productoNombre, setProductoNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [precio, setPrecio] = useState(0.0);

    const navigate = useNavigate()

    useEffect(() => {
        fetchProductos()
        fetchCompradores()
    }, []);

    const fetchCompradores = () => {
        axios.get('https://localhost:5001/api/venta/comprador/search', {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllCompradores res', res.data)
            setCompradores(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllCompradores: ', err)
        })
    }

    const fetchProductos = () => {
        axios.get('https://localhost:5001/api/venta/producto/search', {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllProductos res', res.data)
            setProductos(res.data)
        }).catch((err) => {
            console.log('error al llamar getAllProductos: ', err)
        })
    }

    const postSave = () => {
        const params = {
            'compradorId': compradorId,
            'detalle': detalle
        }
        axios.post('https://localhost:5001/api/venta', params, {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('postVenta', res.data)
            navigate('/ventas')
        }).catch((err) => {
            console.log('postVenta: ', err)
        })
    }

    const agregarProducto = () => {
        let arr = [...detalle]
        arr.push({
            'productoNombre': productoNombre,
            'productoId': productoId,
            'cantidad': cantidad,
            'precio': precio
        })
        if (productoNombre !== '' || cantidad === 0) {
            setDetalle(arr)
            setPrecio(0.0)
            setCantidad(0.0)
            setProductoNombre('')
        }


        console.log(detalle)
    }

    return (
        <Container>
            <h3>Venta Form</h3>
            <Card>
                <Card.Body>
                    <FormLabel>Comprador</FormLabel>
                    <Form.Select value={compradorId} onChange={(e) => setCompradorId(e.target.value)}>
                        {compradores.map(item =>
                            <option key={item.compradorId} value={item.compradorId}>{item.nombre}</option>
                        )}
                    </Form.Select>
                    <FormLabel>Producto</FormLabel>
                    <Form.Select value={producto} onChange={(e) => {
                        setProducto(e.target.value);
                        setProductoId(JSON.parse(e.target.value).productoId);
                        setPrecio(JSON.parse(e.target.value).precio);
                        setProductoNombre(JSON.parse(e.target.value).nombre);
                    }}>
                        {productos.map(item =>
                            <option key={item.productoId} value={JSON.stringify(item)}>{item.nombre}</option>
                        )}
                    </Form.Select>
                    <FormLabel>Precio</FormLabel>
                    <FormControl disabled value={precio} onChange={(e) => setPrecio(e.target.value)} />
                    <FormLabel>Cantidad</FormLabel>
                    <FormControl value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
                    <Button onClick={() => agregarProducto()}>Agregar Producto</Button>
                    <Button variant='success' onClick={() => postSave()}>Crear Venta</Button>
                </Card.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalle.map((item, k) =>
                            <tr key={k}>
                                <td>{item.productoNombre}</td>
                                <td>{item.precio}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.cantidad * item.precio}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
}

export default VentasForm;