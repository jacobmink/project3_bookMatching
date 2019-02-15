import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { PromiseProvider } from 'mongoose';

const Footer = (props)=>{
    return(
        <div className="header">
            <ul>
                <li>&copy; 2019 Jacob Mink</li>
                <li><Link to="/profile">Contact</Link></li>
                <li><Link to="/booksindb">About</Link></li>
                <li><button onClick={props.logout}>Logout</button></li>
            </ul>
            
        </div>
    )
}

export default withRouter(Footer);