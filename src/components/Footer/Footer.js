import React from 'react';
import './Footer.css'
import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bottom-fixed">
            <p>Copyright 2021. 
                <Link to="/" style={{textDecoration:"none",fontSize:"20px"}}>
                    <strong>Ananda Bitan.</strong>
                </Link>
             All Rights Reserved</p>
        </footer>
    );
};

export default Footer;