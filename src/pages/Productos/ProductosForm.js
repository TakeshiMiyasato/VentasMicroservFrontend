import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, FormLabel, FormGroup, Card, FormControl, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const ProductosForm = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState(0.0);
    const [stock, setStock] = useState(0);

    useEffect(() => {
        if (id !== undefined) {
            fetchProducto()
        }
    }, [id]);

    const fetchProducto = () => {
        axios.get(`https://localhost:5001/api/venta/producto/getById?id=${id}`, {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getProducto res', res.data)
            setNombre(res.data.nombre)
            setPrecio(res.data.precio)
            setStock(res.data.stock)
        }).catch((err) => {
            console.log('error al llamar getProducto: ', err)
        })
    }

    const putSave = () => {
        const params = {
            'productoId': id,
            'nombreProducto': nombre,
            'precio': precio,
            'stock': stock
        }
        console.log(params)
        if (id !== undefined) {
            axios.put(`https://localhost:5001/api/venta/producto`, params, {
                headers: { 'accept': '*/*' }
            }).then((res) => {
                console.log('putProducto res', res.data)
                navigate('/productos')
            }).catch((err) => {
                console.log('putProducto: ', err)
            })
        } else {
            axios.post(`https://localhost:5001/api/venta/producto`, params, {
                headers: { 'accept': '*/*' }
            }).then((res) => {
                console.log('postProducto res', res.data)
                navigate('/productos')
            }).catch((err) => {
                console.log('postProducto: ', err)
            })
        }

    }

    return (
        <Container>
            <h3>Producto Form</h3>
            <Card>
                <Card.Body>
                    <FormGroup>
                        <FormLabel>Nombre Producto</FormLabel>
                        <FormControl value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Pedro de los palotes' />
                        <FormLabel>Precio</FormLabel>
                        <FormControl value={precio} onChange={(e) => setPrecio(e.target.value)} placeholder='0.0' />
                        <FormLabel>Stock</FormLabel>
                        <FormControl value={stock} onChange={(e) => setStock(e.target.value)} placeholder='0' />
                    </FormGroup>
                    <Button onClick={() => { putSave() }} title='Guardar'>Guardar</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
 
export default ProductosForm;