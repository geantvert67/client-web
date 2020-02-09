import React, { useState } from 'react';
import { useAuth } from '../../utils/auth';

const Profil = () => {
    const { update, updatePassword } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (username != '') {
            update({ username }).catch(err => {
                setUsername('');
                setMessage(err.message);
            });
        }

        if (password != '') {
            updatePassword({ password }).catch(err => {
                setPassword('');
                setPasswordCheck('');
                setMessage(err.message);
            });
        }
    };

    const formValid = password === passwordCheck;

    return (
        <>
            <h2>Change Profil</h2>
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
                <label>Password check</label>
                <input
                    type="password"
                    value={passwordCheck}
                    onChange={e => setPasswordCheck(e.target.value)}
                />
                <input disabled={formValid ? '' : 'disabled'} type="submit" />
            </form>
            {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
    );
};

export default Profil;
