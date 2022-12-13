import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";
import Table from '../../components/React-Table';

const Compradores = () => {

    const [listaCompradores, setListaCompradores] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetchCompradoresList()
    }, []);

    const fetchCompradoresList = () => {
        axios.get('https://localhost:5001/api/venta/comprador/search', {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllCompradores res', res.data)
            let arr = []
            res.data.map(item =>
                arr.push(
                    {
                        "compradorId": item.compradorId,
                        "nombre": item.nombre,
                        "ubicacion": item.ubicacion,
                        "nombreTienda": item.nombreTienda,
                        "tipoTienda": item.tipoTienda,
                        "telefono": item.telefono,
                        'btnEdit': <Button onClick={() => navigate(`/edit/comprador/${item.compradorId}`)} title='Editar'>Editar</Button>,
                        'btnDel': <Button onClick={() => destroyComprador(item.compradorId)} title='Delete'>Eliminar</Button>,
                        'btnVerCompras' : <Button onClick={() => navigate(`/ventas/${item.compradorId}`)} title='Ver Ventas'>Ventas Comprador</Button>
                    }
                )
            )
            setListaCompradores(arr)
        }).catch((err) => {
            console.log('error al llamar getAllCompradores: ', err)
        })
    }

    const columns = [
        {
            Header: 'ID',
            accessor: 'compradorId'
        },
        {
            Header: 'Nombre',
            accessor: 'nombre'
        },
        {
            Header: 'Ubicacion',
            accessor: 'ubicacion'
        },
        {
            Header: 'Tienda',
            accessor: 'nombreTienda'
        },
        {
            Header: 'Telefono',
            accessor: 'telefono'
        },
        {
            Header: '',
            accessor: 'btnEdit'
        },
        {
            Header: '',
            accessor: 'btnDel'
        },
        {
            Header: '',
            accessor: 'btnVerCompras'
        },
    ]

    const destroyComprador = (compradorId) => {
        if (window.confirm('Esta seguro de eliminar este comprador?')) {
            axios.delete(`https://localhost:5001/api/venta/comprador`, { data: { 'compradorId': compradorId } }, { headers: { 'accept': '*/*' } }).then((res) => {
                console.log('deleteComprador res', res)
                fetchCompradoresList()
            }).catch((err) => {
                console.log('deleteComprador err', err)
            })
        }
    }

    return (
        <Container>
            <Button onClick={() => navigate('/createComprador')} title='create' >Crear Comprador</Button>
            <Table columns={columns} data={listaCompradores} />
        </Container>
    );
}

export default Compradores;