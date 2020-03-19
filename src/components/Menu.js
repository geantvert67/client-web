import React from 'react';
import { useAuth } from '../utils/auth';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const Menu = () => {
    const { user, signout } = useAuth();

    return (
        <>
            <Navbar expand="md">
                <Navbar.Brand className="mb-1">
                    <Link to="/">
                        Crystal<span style={{ color: '#68b684' }}>Z</span>
                    </Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user ? (
                        <>
                            <Nav className="mr-auto">
                                <NavLink
                                    className="nav-link"
                                    activeClassName="nav-link-active"
                                    to="/configs"
                                >
                                    Configurations
                                </NavLink>
                            </Nav>
                            <Nav className="align-items-center">
                                <DropdownButton
                                    alignRight
                                    title={user.username}
                                >
                                    <Dropdown.Item href="/profil">
                                        Mon compte
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={e => signout()}>
                                        Se déconnecter
                                    </Dropdown.Item>
                                </DropdownButton>
                            </Nav>
                        </>
                    ) : (
                        <>
                            <Nav className="mr-auto"></Nav>
                            <Nav className="align-items-center">
                                <NavLink className="nav-link" to="/signup">
                                    S'inscrire{' '}
                                </NavLink>
                                <NavLink className="nav-link" to="/signin">
                                    <Button
                                        variant="success"
                                        className="btn-primary"
                                    >
                                        Se connecter
                                    </Button>
                                </NavLink>
                            </Nav>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Menu;
