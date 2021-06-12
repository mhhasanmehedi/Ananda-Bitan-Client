import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib, faPlus, faThLarge } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    return (
        <>
            <div className="sidebar-style text-center">
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    <div className="border-bottom ml-2 mr-2 ">
                        <img src={logo} height="80px" alt="" />
                        <h2>Ananda Bitan</h2>
                    </div>
                </Link>
                <Link to="/manageBooks" style={{ color: "white", textDecoration: "none" }}>
                    <div className="link">
                        <FontAwesomeIcon icon={faThLarge} />
                        <h5>Manage Books</h5>
                    </div>
                </Link>
                <Link to="/addBook" style={{ color: "white", textDecoration: "none" }}>
                    <div className="link">
                        <FontAwesomeIcon icon={faPlus} />
                        <h5>Add Books</h5>
                    </div>
                </Link>
                <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
                    <button className="d-block w-100 p-2 btn" style={{background:"#2F226A",color:"white"}}>Home</button>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;