// src/routers/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import Layout from '../components/layout';
import TropicalSales from '../components/tropical-gambit-sales/tropical-sales';
import ErrorPage from '../components/errorPages';

const AppRouter = () => {
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return null;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route
                    path="/sales"
                    element={user ? <TropicalSales /> : <ErrorPage />}
                />
                <Route path="*" element={<Navigate to="/" replace />} /> {/* Redirige cualquier ruta desconocida */}
            </Routes>
        </Router>
    );
};

export default AppRouter;
