import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.css';
import error from '../../images/error.jpg';

const NoMatch = () => {
    return (
        <div className="container noMatch-wrapper">
            <div className="noMatch-inner d-flex align-items-center flex-wrap">
                <div className="imgBox">
                    <img src={error} height="300px" width="400px" alt="" />
                </div>
                <div className="content-box">
                    <h1>Oops!</h1>
                    <h2>404 - PAGE NOT FOUND</h2>
                    <p>The page you are looking for might have been removed <br />
                        had its name changed of is temporary unavailable</p>
                    <Link to="/home">
                        <button className="btn btn-info rounded-pill pt-2 pb-2 pl-5 pr-5">GO TO HOMEPAGE</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoMatch;