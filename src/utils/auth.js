import React, { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { checkStatus } from './utils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        fetch('/whoami', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(checkStatus)
            .then(res => res.json())
            .then(user => {
                setUser(user);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h4>Loading...</h4>;
    }

    const signup = credentials => {
        return fetch('/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
            .then(() => {
                history.push('/signin');
            });
    };

    const signin = credentials => {
        return fetch('/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        })
            .then(checkStatus)
            .then(res => res.json())
            .then(data => {
                window.localStorage.setItem('token', data.token);
                setUser(data.user);
                history.push('/');
            });
    };

    const signout = () => {
        window.localStorage.removeItem('token');
        setUser(null);
        history.push('/');
    };

    return (
        <AuthContext.Provider value={{ user, signup, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
