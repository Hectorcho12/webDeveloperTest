import React from 'react'
import { Navbar , Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function MainLayout(props) {
    const { children } = props
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand style={{marginRight:"20px"}}><Link to='/'>WebDeveloperTest</Link></Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                    <Nav.Item style={{marginRight:"20px"}}><Link to='/StudentForm/'>Student Form</Link></Nav.Item>
                    <Nav.Item style={{marginRight:"20px"}}><Link to='/DisplayStudent'>Display Students</Link></Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {children}
        </div>
    )
}
