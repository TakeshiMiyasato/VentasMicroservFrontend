import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Table, Button, Card, FormControl, FormLabel, FormGroup, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";

const CompradorForm = () => {
    const { id } = useParams()

    const navigate = useNavigate()
    const [nombre, setNombre] = useState('');
    const [ubicacion, setUbicacion] = useState('');
    const [nombreTienda, setNombreTienda] = useState('');
    const [tipoTienda, setTipoTienda] = useState('');
    const [telefono, setTelefono] = useState('');

    useEffect(() => {
        if (id !== undefined) {
            fetchComprador()
        }
    }, [id]);

    const fetchComprador = () => {
        axios.get(`https://localhost:5001/api/venta/comprador/getById?id=${id}`, {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllCompradores res', res.data)
            setNombre(res.data.nombre)
            setUbicacion(res.data.ubicacion)
            setNombreTienda(res.data.nombreTienda)
            setTipoTienda(res.data.tipoTienda)
            setTelefono(res.data.telefono)
        }).catch((err) => {
            console.log('error al llamar getAllCompradores: ', err)
        })
    }

    const putSave = () => {
        const params = {
            'compradorId': id,
            'nombre': nombre,
            'ubicacion': ubicacion,
            'nombreTienda': nombreTienda,
            'tipoTienda': tipoTienda,
            'telefono': telefono
        }
        console.log(params)
        if (id !== undefined) {
            axios.put(`https://localhost:5001/api/venta/comprador`, params, {
                headers: { 'accept': '*/*' }
            }).then((res) => {
                console.log('putComprador res', res.data)
                navigate('/')
            }).catch((err) => {
                console.log('putComprador: ', err)
            })
        } else {
            axios.post(`https://localhost:5001/api/venta/comprador`, params, {
                headers: { 'accept': '*/*' }
            }).then((res) => {
                console.log('postComprador res', res.data)
                navigate('/')
            }).catch((err) => {
                console.log('postComprador: ', err)
            })
        }

    }

    return (
        <Container>
            <h3>Comprador Form</h3>
            <Card>
                <Card.Body>
                    <FormGroup>
                        <FormLabel>Nombre Completo</FormLabel>
                        <FormControl value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder='Pedro de los palotes' />
                        <FormLabel>Ubicacion</FormLabel>
                        <FormControl value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} placeholder='3er anillo' />
                        <FormLabel>Nombre de la tienda</FormLabel>
                        <FormControl value={nombreTienda} onChange={(e) => setNombreTienda(e.target.value)} placeholder='Hipermaxi' />
                        <FormLabel>Tipo de tienda</FormLabel>
                        <FormControl value={tipoTienda} onChange={(e) => setTipoTienda(e.target.value)} placeholder='Supermercado' />
                        <FormLabel>Telefono</FormLabel>
                        <FormControl value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder='75608067' />
                    </FormGroup>
                    <Button onClick={() => { putSave() }} title='Guardar'>Guardar</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}
export default CompradorForm;