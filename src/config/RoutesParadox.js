import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Compradores from '../pages/Comprador/Compradores'
import CompradorForm from '../pages/Comprador/CompradorForm'
import Productos from '../pages/Productos/Productos';
import ProductosForm from '../pages/Productos/ProductosForm';
import Ventas from '../pages/Ventas/Ventas';
import VentasForm from '../pages/Ventas/VentasForm';

const RoutesParadox = () => {
    return (
        <Routes>
            <Route path='/' element={<Compradores />} />
            <Route path='/createComprador' element={<CompradorForm />} />
            <Route path='/edit/comprador/:id' element={<CompradorForm />} />
            <Route path='/productos' element={<Productos />} />
            <Route path='/createProducto' element={<ProductosForm />} />
            <Route path='/edit/producto/:id' element={<ProductosForm />} />
            <Route path='/ventas/:id' element={<Ventas />} />
            <Route path='/ventas' element={<Ventas />} />
            <Route path='/createVenta' element={<VentasForm />} />
        </Routes>

    );
}

export default RoutesParadox;