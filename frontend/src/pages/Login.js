import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.svg';

export default function Login({ history }) {
    const [username, setUsername] = useState('');
    const [userExist, setUserExist] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/devs', {
            username
        })
        
        if (response.data.error) {
            setUserExist(true);
        } else {
            setUserExist(false);
            const { _id } = response.data;
            history.push(`/dev/${_id}`);
        }



    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt="tindev"/>
                {userExist && <p className="error">Usuário não existe :C</p>}
                <input 
                    placeholder="Digite seu usuário no Github"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
           
        </div>
    );
}