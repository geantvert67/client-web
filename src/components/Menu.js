import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/auth';

const Menu = () => {
    const { user, signout } = useAuth();
    console.log(user);
    const items = [
        <li key="home">
            <Link to="/">Menu</Link>
        </li>
    ];
    if (!user) {
        items.push(
            <nav>
                <ul>
                    <li key="signin">
                        <Link to="/signin">Connexion</Link>
                    </li>
                    <li key="signup">
                        <Link to="/signup">Inscription</Link>
                    </li>
                </ul>
            </nav>
        );
    } else {
        items.push(
            <nav>
                <ul>
                    <li>Bonjour {user.username} !</li>
                    <li>
                        <Link to="/profil">Modifier le profil</Link>
                    </li>
                    <li key="config">
                        <Link to="/configuration">
                            Créer une nouvelle configuration
                        </Link>
                    </li>
                    <li key="publicgames">
                        <Link to="/publicgames">Configurations publiques</Link>
                    </li>
                    <li key="games">
                        <Link to="/games">Configurations personnelles</Link>
                    </li>
                    <li key="signout">
                        <button onClick={signout}>Déconnexion</button>
                    </li>
                </ul>
            </nav>
        );
    }
    return <ul>{items}</ul>;
};

export default Menu;
