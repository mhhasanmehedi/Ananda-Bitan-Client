import { faFacebookF, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './Login.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { useHistory, useLocation } from 'react-router';
import login from '../../images/login.png';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }


    //Google sing in 
    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch(err => {
                console.log('Google SignIn Error : ', err);
            });
    }

    //facebook sign in
    const handleFacebookSignIn = () => {
        const facebookProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(facebookProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signInUser = {
                    isSignIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch(err => {
                console.log('Facebook Sign In Error:', err);
            });
    }

    //github sign in
    const handleGithubSignIn = () => {
        const githubProvider = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(githubProvider)
            .then((res) => {
                const { email, photoURL } = res.user;
                const { username } = res.additionalUserInfo;
                const signInUser = {
                    isSignIn: true,
                    name: username,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(signInUser);
                history.replace(from);
            })
            .catch((err) => {
                console.log('Facebook Sign In Error:', err);
            });
    }

    //email password sign in
    const handleBlur = (event) => {
        let isFieldValid = true;

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...loggedInUser };
            newUserInfo[event.target.name] = event.target.value;
            console.log(newUserInfo);
            setLoggedInUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.isSignIn = true;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setLoggedInUser(newUserInfo);
                    updateUserName(loggedInUser.name);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }

        if (!newUser && loggedInUser.email && loggedInUser.password) {
            firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.isSignIn = true;
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    newUserInfo.name = res.user.displayName;
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...loggedInUser };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setLoggedInUser(newUserInfo);
                });
        }

        event.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        })
            .then(() => {
                console.log("User name updated successfully");
            })
            .catch(error => {
                console.log(error);
            });

    }


    return (
        <div className="login-wrapper">
            <div className="login-inner d-flex flex-wrap">
                <div className="img-box">
                    <img src={login} height="400px" alt="" />
                </div>
                <div className="mt-3 content-box">
                    <h3>LOGIN FORM</h3>
                    <form onSubmit={handleSubmit}>
                        {newUser && <input type="text" class="form-control" onBlur={handleBlur} placeholder="Your Name" id="name" name="name" required />}
                        <input type="email" class="form-control" onBlur={handleBlur} placeholder="Your Email" name="email" id="email" required />
                        <input type="password" class="form-control" onBlur={handleBlur} placeholder="Your Password" name="password" id="pwd" required />
                        <button type="submit" class="form-control btn btn-info">{newUser ? 'Sign Up' : 'Sign In'}</button>

                        {loggedInUser.error && <small style={{ color: 'red' }}>{loggedInUser.error}</small>}
                        {loggedInUser.success && <small style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} successfully</small>}

                        {
                            newUser &&
                            <h6 className="mt-2 text-center">Already Have a Account ?
                                <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setNewUser(!newUser)}> Log in</span>
                            </h6>
                        }

                        {
                            !newUser &&
                            <h6 className="mt-2 text-center">Don't Have  Account ?
                                <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => setNewUser(!newUser)}> Create New Account</span>
                            </h6>
                        }
                    </form>
                    <div className="social-btn">
                        <p>Or</p>
                        <span onClick={handleGoogleSignIn}><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></span>
                        <span onClick={handleFacebookSignIn}><FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon></span>
                        <span onClick={handleGithubSignIn}><FontAwesomeIcon icon={faGithub}></FontAwesomeIcon></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;