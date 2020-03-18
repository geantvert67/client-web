import React from 'react';
import { useAuth } from '../utils/auth';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Button, Badge } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';

const Menu = () => {
    const { user, signout } = useAuth();

    return (
        <>
            <Navbar expand="md">
                <Navbar.Brand className="mb-1">
                    <Link to="/">CrystalZ</Link>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user ? (
                        <>
                            <Nav className="mr-auto">
                                <NavLink className="nav-link" to="/publicgames">
                                    Configurations
                                </NavLink>
                            </Nav>
                            <Nav className="align-items-center">
                                <NavLink
                                    className="nav-link"
                                    to="/"
                                    onClick={e => signout()}
                                >
                                    Se déconnecter
                                </NavLink>
                                <NavLink className="nav-link" to="/profil">
                                    <Button
                                        variant="success"
                                        className="btn-primary"
                                    >
                                        Mon profil
                                    </Button>
                                </NavLink>
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
