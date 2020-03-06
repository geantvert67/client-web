import React, { useState, useEffect, createContext, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
            history.push('/');
        });
    };

    const signin = credentials => {
        return request.post('/signin', credentials).then(res => {
            Cookies.set('token', res.data.token);
            setUser(res.data.user);
            history.push('/');
        });
    };

    const update = credentials => {
        return request.put('/user', credentials).then(res => {
            setUser(res.data.user);
        });
    };

    const updatePassword = credentials => {
        return request.put('/user/password', credentials);
    };

    const signout = () => {
        Cookies.remove('token');
        setUser(null);
        history.push('/');
    };

    return (
        <AuthContext.Provider
            value={{ user, signup, signin, update, updatePassword, signout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
