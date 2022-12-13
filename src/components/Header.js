import React from 'react';
import { Container, Navbar, NavDropdown, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate()

    const dropdownComponent = () => {
            return (
                <NavDropdown name='dropdown' title='Acciones'>
                    <NavDropdown.Item href='/' >Compradores</NavDropdown.Item>
                    <NavDropdown.Item href='/productos' >Productos</NavDropdown.Item>
                    <NavDropdown.Item href='/ventas' >Ventas</NavDropdown.Item>
                </NavDropdown>
            )
    }

    return (
        <div>
            <Navbar bg="light" expand='lg'>
                <Container fluid>
                    <Navbar.Brand href='/'>VentasMicroservice</Navbar.Brand>
                    {dropdownComponent()}
                </Container>
            </Navbar>
            <br />
        </div>
    );
}

export default Header;