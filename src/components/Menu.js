import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Menu = () => {
    const { user, signout } = useAuth();

    const items = [
        <li key="home">
            <Link to="/">Home</Link>
        </li>
    ];
    if (!user) {
        items.push(
            <nav>
                <ul>
                    <li key="signin">
                        <Link to="/signin">Signin</Link>
                    </li>
                    <li key="signup">
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
                    <li key="config">
                        <Link to="/configuration">Configuration</Link>
                    </li>
                    <li key="publicgames">
                        <Link to="/publicgames">Partie Publique</Link>
                    </li>
                    <li key="games">
                        <Link to="/games">Games</Link>
                    </li>
                    <li key="signout">
                        <button onClick={signout}>Signout</button>
                    </li>
                </ul>
            </nav>
        );
    }
    return <ul>{items}</ul>;
};

export default Menu;
