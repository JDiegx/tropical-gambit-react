// src/components/login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import "../assets/styles/login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Usa useNavigate para redireccionar

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login Successful!');
            setEmail('');
            setPassword('');
            navigate('/sales'); // Redirige a /sales después del inicio de sesión exitoso
        } catch (err) {
            if (err.code === 'auth/user-not-found') {
                setError('User does not exist. Please check your email or contact support.');
            } else if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please check your password.');
            } else {
                setError('User not found.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <div className='login__header'>
                    <h1 className='login__title'>Welcome to Tropical</h1>
                    <p className='login__description'>
                        To access this exclusive section, please enter your email and password below.
                    </p>
                </div>
                <form
                    className='login__form'
                    onSubmit={handleLogin}
                >
                    <div className='login__field'>
                        <input
                            type='email'
                            id='email'
                            className='login__input'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className='login__field'>
                        <input
                            type='password'
                            id='password'
                            className='login__input'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='login__button'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <p className='login__error'>{error}</p>}
                </form>
                <p className='login__info'>
                    To access this section, the Tropical team must have assigned you a username and password.
                </p>
            </div>
        </div>
    );
};

export default Login;
