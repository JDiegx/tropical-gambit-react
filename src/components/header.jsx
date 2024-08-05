import React from 'react';
import logoTropical from '../assets/img/tropical-gambit-logo-svg.svg';
import "../assets/styles/header.css"

const Header = () => {
    return (
        <header className='header'>
            <div className='header__logo-container'>
                <img src={logoTropical} alt="Logo of Tropical Gambit" className='header__logo' />
            </div>
            <nav className='header__nav'>
                <ul className='header__nav-list'>
                    <li className='header__nav-item'><a href="" className='header__nav-link'>Home</a></li>
                    <li className='header__nav-item'><a href="" className='header__nav-link'>About us</a></li>
                    <li className='header__nav-item'><a href="" className='header__nav-link'>Gallery</a></li>
                    <li className='header__nav-item'><a href="" className='header__nav-link'>Reserves</a></li>
                    <li className='header__nav-item'><a href="" className='header__nav-link'>Experiences</a></li>
                    <li className='header__nav-item'><a href="" className='header__nav-link'>Login</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;
