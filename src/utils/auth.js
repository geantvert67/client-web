import React, { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import request from './request';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        request
            .get('/user')
            .then(res => {
                setUser(res.data);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <h4>Loading...</h4>;
    }

    const signup = credentials => {
        return request.post('/signup', credentials).then(res => {
            Cookies.set('token', res.data.token);
            setUser(res.data.user);
            history.push('/configs');
        });
    };

    const signin = (credentials, setError) => {
        return request
            .post('/signin', credentials)
            .then(res => {
                setError('');
                Cookies.set('token', res.data.token);
                setUser(res.data.user);
                history.push('/configs');
            })
            .catch(err => {
                if (err.response.status === 401)
                    setError('Mauvais identifiants');
                else setError('Une erreur est survenue');
            });
    };

    const changeUsername = (username, setError) => {
        return request
            .put('/user', { username })
            .then(res => {
                toast.success("Nom d'utilisateur modifié");
                setError('');
                setUser(res.data);
            })
            .catch(err => {
                if (err.response.status === 409)
                    setError("Ce nom d'utilisateur est déjà utilisé");
                else setError('Une erreur est survenue');
            });
    };

    const changePassword = (currentPassword, newPassword, setError) => {
        return request
            .put('/user/password', { currentPassword, newPassword })
            .then(() => {
                toast.success('Mot de passe modifié');
                setError('');
            })
            .catch(err => {
                if (err.response.status === 401)
                    setError('Mauvais mot de passe');
                else setError('Une erreur est survenue');
            });
    };

    const signout = () => {
        Cookies.remove('token');
        setUser(null);
        history.push('/');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                signin,
                changeUsername,
                changePassword,
                signout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
