import React from 'react';
import { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { Container, Image, Nav, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { UserContext } from '../../App';
import './Header.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { id, name, email, photo, isSignIn, displayName } = loggedInUser;


    const handleSignOut = () => {
        firebase.auth()
            .signOut()
            .then(res => {
                const signInUser = {

                    isSignIn: false,
                    name: '',
                    email: '',
                    photo: ''
                }
                setLoggedInUser(signInUser)
            })
            .catch(err => {
                console.log(err);
            });
    }


    return (
        <Navbar bg="info" expand="lg">
            <Container>
                <Navbar.Brand href="/">
                    <div className="logo">
                        <img src={logo} alt="" /><span>Ananda Bitan</span>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/home" className="ml-4">Home</Nav.Link>
                        <Nav.Link as={Link} to="/admin" className="ml-4">Admin</Nav.Link>
                        <Nav.Link as={Link} to="/orders" className="ml-4"><FontAwesomeIcon icon={faShoppingCart} /> Orders</Nav.Link>
                        {
                            isSignIn ?
                                <OverlayTrigger
                                    trigger="click"
                                    key="bottom"
                                    placement="bottom"
                                    overlay={
                                        <Popover id="popover-positioned-bottom">
                                            <div className="d-flex justify-content-center mt-1">
                                                <Image style={{ maxWidth: "60px" }} src={photo || "https://i.ibb.co/5GzXkwq/user.png"} roundedCircle />
                                            </div>
                                            <Popover.Content>
                                                <h5 className="text-center m-2 mb-2" style={{ lineHeight: '0px', padding: '7px' }}>{name}</h5>
                                                <strong className="text-center">{email}</strong>
                                                <div className="d-flex justify-content-center mt-1">
                                                    <Link to="/home" style={{ width: '100%' }}>
                                                        <button onClick={handleSignOut} className="btn btn-info w-100 mt-4">Logout</button>
                                                    </Link>
                                                </div>
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >
                                    <Nav.Link style={{ fontWeight: "700", color: "black" }} className="ml-4">
                                        <img height="40px" style={{ borderRadius: "50%" }} src={photo || "https://i.ibb.co/5GzXkwq/user.png"} alt="" />
                                    </Nav.Link>
                                </OverlayTrigger>
                                :
                                <Nav.Link as={Link} to="/login" className="btn btn-info ml-4 text-white pl-3 pr-3 border">Login</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;