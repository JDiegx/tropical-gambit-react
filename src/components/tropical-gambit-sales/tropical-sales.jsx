import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

const TropicalSales = () => {
    const navigate = useNavigate();

    // Estado para gestionar los datos de los cócteles y las respuestas
    const [cocktails, setCocktails] = useState([]);
    const [cocktailDetail, setCocktailDetail] = useState(null);
    const [createResponse, setCreateResponse] = useState('');
    const [updateResponse, setUpdateResponse] = useState('');
    const [deleteResponse, setDeleteResponse] = useState('');
    const [costResponse, setCostResponse] = useState('');

    // URL base para la API
    const baseUrl = 'http://localhost:8080/api/cocktails';

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Función para obtener todos los cócteles
    const fetchCocktails = async () => {
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            setCocktails(data);
        } catch (error) {
            console.error('Error fetching cocktails:', error);
        }
    };

    // Efecto para cargar los cócteles automáticamente cuando el componente se monta
    useEffect(() => {
        fetchCocktails();
    }, []);

    // Funciones para manejar las solicitudes a la API
    const getCocktailById = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`);
            const data = await response.json();
            setCocktailDetail(data);
        } catch (error) {
            console.error('Error fetching cocktail:', error);
        }
    };

    const createCocktail = async (name, description) => {
        try {
            const response = await fetch(baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: name, descrip: description }),
            });
            const data = await response.json();
            setCreateResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error creating cocktail:', error);
        }
    };

    const updateCocktail = async (id, name, description) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre: name, descrip: description }),
            });
            const data = await response.json();
            setUpdateResponse(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error updating cocktail:', error);
        }
    };

    const deleteCocktail = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setDeleteResponse('Cocktail deleted successfully');
                // Actualiza la lista de cócteles después de eliminar uno
                fetchCocktails();
            } else {
                setDeleteResponse('Error deleting cocktail');
            }
        } catch (error) {
            console.error('Error deleting cocktail:', error);
        }
    };

    const calculateCost = async (id, quantity) => {
        try {
            const response = await fetch(`${baseUrl}/${id}/costo-venta?cantidad=${quantity}`);
            const data = await response.json();
            setCostResponse(`Cost of sale: ${data}`);
        } catch (error) {
            console.error('Error calculating cost:', error);
        }
    };

    return (
        <div>
            <h1>Welcome Tropical</h1>
            <button onClick={handleLogout}>Cerrar sesión</button>

            <h2>Available Cocktails</h2>
            <div>
                {cocktails.length > 0 ? (
                    cocktails.map(cocktail => (
                        <div key={cocktail.id}>
                            <h3>{cocktail.nombre}</h3>
                            <p><strong>Type:</strong> {cocktail.tipo}</p>
                            <p><strong>Price:</strong> {cocktail.precio} USD</p>
                            <p><strong>Description:</strong> {cocktail.descrip}</p>
                            <p><strong>Size:</strong> {cocktail.tamaño} ml</p>
                            <p><strong>Alcohol Content:</strong> {cocktail.gradodealcohol}%</p>
                            <p><strong>Country of Origin:</strong> {cocktail.paisorigen}</p>
                            <p><strong>Expiration Date:</strong> {cocktail.fechavencimiento}</p>
                            <p><strong>Preparation Time:</strong> {cocktail.tiempopreparacion} min</p>
                        </div>
                    ))
                ) : (
                    <p>No cocktails available.</p>
                )}
            </div>

            <h2>Get Cocktail by ID</h2>
            <input type="number" placeholder="Enter cocktail ID" onBlur={(e) => getCocktailById(e.target.value)} />
            <div>
                {cocktailDetail && (
                    <div>
                        <h3>{cocktailDetail.nombre}</h3>
                        <p><strong>Type:</strong> {cocktailDetail.tipo}</p>
                        <p><strong>Price:</strong> {cocktailDetail.precio} USD</p>
                        <p><strong>Description:</strong> {cocktailDetail.descrip}</p>
                        <p><strong>Size:</strong> {cocktailDetail.tamaño} ml</p>
                        <p><strong>Alcohol Content:</strong> {cocktailDetail.gradodealcohol}%</p>
                        <p><strong>Country of Origin:</strong> {cocktailDetail.paisorigen}</p>
                        <p><strong>Expiration Date:</strong> {cocktailDetail.fechavencimiento}</p>
                        <p><strong>Preparation Time:</strong> {cocktailDetail.tiempopreparacion} min</p>
                    </div>
                )}
            </div>

            <h2>Create Cocktail</h2>
            <input type="text" placeholder="Cocktail Name" id="create-name" />
            <input type="text" placeholder="Cocktail Description" id="create-description" />
            <button onClick={() => createCocktail(document.getElementById('create-name').value, document.getElementById('create-description').value)}>Create</button>
            <div>{createResponse}</div>

            <h2>Update Cocktail</h2>
            <input type="number" placeholder="Enter cocktail ID" id="update-id" />
            <input type="text" placeholder="New Name" id="update-name" />
            <input type="text" placeholder="New Description" id="update-description" />
            <button onClick={() => updateCocktail(document.getElementById('update-id').value, document.getElementById('update-name').value, document.getElementById('update-description').value)}>Update</button>
            <div>{updateResponse}</div>

            <h2>Delete Cocktail</h2>
            <input type="number" placeholder="Enter cocktail ID" id="delete-id" />
            <button onClick={() => deleteCocktail(document.getElementById('delete-id').value)}>Delete</button>
            <div>{deleteResponse}</div>

            <h2>Calculate Cost</h2>
            <input type="number" placeholder="Enter cocktail ID" id="cost-id" />
            <input type="number" placeholder="Enter quantity" id="cost-quantity" />
            <button onClick={() => calculateCost(document.getElementById('cost-id').value, document.getElementById('cost-quantity').value)}>Calculate Cost</button>
            <div>{costResponse}</div>
        </div>
    );
};

export default TropicalSales;
