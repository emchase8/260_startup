import React from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
    const [username, set_username] = React.useState(props.username);
    const [password, set_password] = React.useState('');
    const [display_error, set_display_error] = React.useState(null);

    async function login_user() {
        login_or_create('/api/auth/login');
        // localStorage.setItem('username', username);
        // props.onLogin(username);
    }

    async function create_user() {
        login_or_create('/api/auth/create');
        // localStorage.setItem('username', username);
        // props.onLogin(username);
    }

    async function login_or_create(endpoint) {
        const response = await fetch(endpoint, {
            method: 'post',
            body: JSON.stringify({email: username, password: password}),
            headers: {'Content-type': 'application/json; charset=UTF-8',},
        });
        if (response?.status === 200) {
            localStorage.setItem('username', username);
            props.onLogin(username);
        } else {
            const body = await response.json();
            set_display_error(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <>
            <div>
                <div className="input-group mb-3">
                    {/* <span className="input-group-text">Email:</span> */}
                    <span className="input-group-text"><img src="email_icon.png" alt="Email"/></span>
                    <input className="form-control" type="text" value={username} onChange={(e) => set_username(e.target.value)} placeholder="your@email.com"/>
                </div>
                <div className="input-group mb-3">
                    {/* <span className="input-group-text">Password:</span> */}
                    <span className="input-group-text"><img src="password_icon.png" alt="Email"/></span>
                    <input className="form-control" type="password" onChange={(e) => set_password(e.target.value)} placeholder="password"/>
                </div>
                <Button className="btn btn-warning" onClick={() => login_user()} disabled={!username || !password} style={{marginRight: '0.5em'}}>
                    Login
                </Button>
                <Button className="btn btn-secondary" onClick={() => create_user()} disabled={!username || !password} style={{marginLeft: '0.5em'}}>
                    Create
                </Button>
            </div>

            <MessageDialog message={display_error} onHide={() => set_display_error(null)} />
        </>
    )
}