import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Menu = () => {
    const { user, signout } = useAuth();

    const items = [
        <li>
            <Link to="/">Home</Link>
        </li>
    ];
    if (!user) {
        items.push(
            <nav>
                <ul>
                    <li>
                        <Link to="/signin">Signin</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </ul>
            </nav>
        );
    } else {
        items.push(
            <nav>
                <ul>
                    <li>Connected as {user.username}</li>
                    <li>
                        <Link to="/profil">Changement du profil</Link>
                    </li>
                    <li>
                        <Link to="/configuration">Configuration</Link>
                    </li>
                    <li>
                        <Link to="/games">Games</Link>
                    </li>
                    <li>
                        <button onClick={signout}>Signout</button>
                    </li>
                </ul>
            </nav>
        );
    }
    return <ul>{items}</ul>;
};

export default Menu;
