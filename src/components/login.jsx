import React from 'react';
import "../assets/styles/login.css"

const Login = () => {
    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__header'>
                    <h1 className='login__title'>Welcome to Tropical</h1>
                    <p className='login__description'>To access this exclusive section, please enter your username and password below.</p>
                </div>
                <div className='login__form'>
                    <div className='login__field'>
                        <input type='text' id='username' className='login__input' placeholder='Username' />
                    </div>
                    <div className='login__field'>
                        <input type='password' id='password' className='login__input' placeholder='Password' />
                    </div>
                    <button className='login__button'>Login</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
