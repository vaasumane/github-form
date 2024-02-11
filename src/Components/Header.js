import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import logo from '../logo.svg';



export default function Header() {
    return (
        <>
            <nav className="navbar bg-transperent container">
                <div className="container-fluid">
                    <a href="https://github.com/" aria-label="Homepage">
                        <img src={logo} height="32"/>
                    </a>
                    <div>
                        <span className='text-gray-light-mktg'>Already have an account? </span>
                        <a href='#' className='text-white text-decoration-none'>Sign In  <FontAwesomeIcon icon={faArrowRight} size="1x" /></a>
                    </div>
                </div>
            </nav>
        </>
    )
}
