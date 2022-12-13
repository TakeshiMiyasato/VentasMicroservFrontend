import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import Detalles from '../../components/Detalles';
import Table from '../../components/React-Table';

const Ventas = () => {

    const { id } = useParams()

    const [listaVentas, setListaVentas] = useState([]);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if (id !== undefined) {
            fetchVentasByCompradorId()
        } else {
            fetchVentas()
        }
    }, []);

    const fetchVentasByCompradorId = () => {
        axios.get(`https://localhost:5001/api/venta?compradorId=${id}`, {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllCompradores res', res.data)
            let arr = []
            res.data.map(item =>
                arr.push(
                    {
                        "id": item.id,
                        "nroPedido": item.nroPedido,
                        "total": item.total,
                        "detalle": item.detalle,
                        'btnVerDetalle': <Button onClick={() => navigate(`/ventas/${item.compradorId}`)} title='Ver Ventas'>Ventas Comprador</Button>
                    }
                )
            )
            setListaVentas(arr)
        }).catch((err) => {
            console.log('error al llamar getAllCompradores: ', err)
        })
    }

    const fetchVentas = () => {
        axios.get(`https://localhost:5001/api/venta/getAll`, {
            headers: { 'accept': '*/*' }
        }).then((res) => {
            console.log('getAllVentas res', res.data)
            let arr = []
            res.data.map(item => {
                let deta = []
                item.detalle.map(item2 => {
                    deta.push({
                        'productoNombre': item2.productoNombre,
                        'cantidad': item2.cantidad,
                        'precio': item2.precio,
                        'subtotal': item2.precio * item2.cantidad
                    })
                })
                console.log(deta)
                arr.push(
                    {
                        "id": item.id,
                        "nroPedido": item.nroPedido,
                        "total": item.total,
                        'btnVerDetalle': <Detalles detallesParam={deta} />
                    }
                )
            })
            setListaVentas(arr)
        }).catch((err) => {
            console.log('error al llamar getAllVentas: ', err)
        })
    }

    const columns = [
        {
            Header: 'ID',
            accessor: 'id'
        },
        {
            Header: 'Nro Pedido',
            accessor: 'nroPedido'
        },
        {
            Header: 'Total',
            accessor: 'total'
        },
        {
            Header: '',
            accessor: 'btnVerDetalle'
        },
    ]

    const columnDetalle = [
        {
            Header: 'Producto',
            accessor: 'productoNombre'
        },
        {
            Header: 'Cantidad',
            accessor: 'cantidad'
        },
        {
            Header: 'Precio unitario',
            accessor: 'precio'
        },
        {
            Header: 'Subtotal',
            accessor: 'subtotal'
        }
    ]

    const detalles = (detalles) => {
        let arr = []
        if (detalles !== undefined) {
            detalles.map(item => {
                arr.push({
                    'productoNombre': item.productoNombre,
                    'cantidad': item.cantidad,
                    'precio': item.precio,
                    'subtotal': item.precio * item.cantidad
                })
            })
        }

        return (
            <Table columns={columnDetalle} data={arr} />
        )
    }

    return (
        <Container>
            <Button onClick={() => navigate('/createVenta')} title='create' >Crear Venta</Button>
            <Table columns={columns} data={listaVentas} />
        </Container>
    );
}

export default Ventas;