import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';

const Signin = () => {
    const { signin } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        signin({ username, password }).catch(err => {
            setUsername('');
            setPassword('');
            setMessage(err.message);
        });
    };

    return (
        <>
            <h2>Signin form</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="submit" />
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
    );
};

export default Signin;
