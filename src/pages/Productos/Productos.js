import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate, useParams, Link } from "react-router-dom";
import Table from '../../components/React-Table';

const Productos = () => {
    const [listaProductos, setListaProductos] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        fetchProductosList()
    }, []);

    const fetchProductosList = () => {
        axios.get('https://localhost:5001/api/venta/producto/search', {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllProductos res', res.data)
            let arr = []
            res.data.map(item =>
                arr.push(
                    {
                        "productoId": item.productoId,
                        "nombre": item.nombre,
                        "precio": item.precio,
                        "stock": item.stock,
                        'btnEdit': <Button onClick={() => navigate(`/edit/producto/${item.productoId}`)} title='Editar'>Editar</Button>,
                        'btnDel': <Button onClick={() => destroyProducto(item.productoId)} title='Delete'>Eliminar</Button>
                    }
                )
            )
            setListaProductos(arr)
        }).catch((err) => {
            console.log('error al llamar getAllProductos: ', err)
        })
    }

    const columns = [
        {
            Header: 'ID',
            accessor: 'productoId'
        },
        {
            Header: 'Nombre',
            accessor: 'nombre'
        },
        {
            Header: 'Precio',
            accessor: 'precio'
        },
        {
            Header: 'Stock',
            accessor: 'stock'
        },
        {
            Header: '',
            accessor: 'btnEdit'
        },
        {
            Header: '',
            accessor: 'btnDel'
        },
    ]

    const destroyProducto = (productoId) => {
        if (window.confirm('Esta seguro de eliminar este producto?')) {
            axios.delete(`https://localhost:5001/api/venta/producto`, { data: { 'productoId': productoId } }, { headers: { 'accept': '*/*' } }).then((res) => {
                console.log('deleteProducto res', res)
                fetchProductosList()
            }).catch((err) => {
                console.log('deleteProducto err', err)
            })
        }
    }

    return (
        <Container>
            <Button onClick={() => navigate('/createProducto')} title='create' >Crear Producto</Button>
            <Table columns={columns} data={listaProductos} />
        </Container>
    );
}
 
export default Productos;