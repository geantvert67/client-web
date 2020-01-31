import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './auth';

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
                    <li>
                        <Link to="/maps">Maps</Link>
                    </li>
                </ul>
            </nav>
        );
    } else {
        items.push(
            <li>Connected as {user.username}</li>,
            <li>
                <button onClick={signout}>Signout</button>
            </li>
        );
    }
    return <ul>{items}</ul>;
};

export default Menu;
