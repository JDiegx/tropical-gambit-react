import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';

const PrivateRoute = ({ element, ...rest }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>; // O algún componente de carga
    }

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/" replace />}
        />
    );
};

export default PrivateRoute;
