import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        alert('No has iniciado sesión. Por favor, inicia sesión para acceder a esta página.');
        navigate('/');
    }, [navigate]);

    return null;
};

export default ErrorPage;
