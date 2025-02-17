import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('username');
        props.onLogout();
    }

    return (
        <div>
            <div style={{color: 'rgb(252, 186, 3)', fontSize: '25px', paddingBottom: '1em'}}>{props.username}</div>
            <Button className="btn btn-warning" onClick={() => navigate('/game')} style={{marginRight: '0.5em'}}>
                Play
            </Button>
            <Button className="btn btn-secondary" onClick={() => logout()} style={{marginLeft: '0.5em'}}>
                Logout
            </Button>
        </div>
    );
}