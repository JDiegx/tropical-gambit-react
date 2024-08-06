import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import "../../assets/styles/tropicalGambitSales.css";
import logoTropical from '../../assets/img/tropical-gambit-logo-svg.svg';

const TropicalSales = () => {
    const navigate = useNavigate();

    const [cocktails, setCocktails] = useState([]);
    const [cocktailDetail, setCocktailDetail] = useState(null);
    const [createResponse, setCreateResponse] = useState('');
    const [updateResponse, setUpdateResponse] = useState('');
    const [costs, setCosts] = useState({});

    const baseUrl = 'http://localhost:8080/api/cocktails';

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const fetchCocktails = async () => {
        try {
            const response = await fetch(baseUrl);
            const data = await response.json();
            setCocktails(data);
        } catch (error) {
            console.error('Error fetching cocktails:', error);
        }
    };

    useEffect(() => {
        fetchCocktails();
        const storedCosts = JSON.parse(localStorage.getItem('cocktailCosts')) || {};
        setCosts(storedCosts);
    }, []);

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
            fetchCocktails(); // Actualizar la lista de cócteles
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
            fetchCocktails(); // Actualizar la lista de cócteles
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
                fetchCocktails(); // Actualizar la lista de cócteles
            } else {
                console.error('Error deleting cocktail');
            }
        } catch (error) {
            console.error('Error deleting cocktail:', error);
        }
    };

    const updateCostsInLocalStorage = (newCosts) => {
        localStorage.setItem('cocktailCosts', JSON.stringify(newCosts));
        setCosts(newCosts);
    };

    const addCocktailQuantity = (id) => {
        const quantity = parseInt(prompt("Enter quantity to add"), 10);
        if (quantity > 0) {
            setCosts(prevCosts => {
                const newCosts = { ...prevCosts };
                newCosts[id] = (newCosts[id] || 0) + quantity;
                updateCostsInLocalStorage(newCosts);
                return newCosts;
            });
        }
    };

    const subtractCocktailQuantity = (id) => {
        const quantity = parseInt(prompt("Enter quantity to subtract"), 10);
        if (quantity > 0) {
            setCosts(prevCosts => {
                const newCosts = { ...prevCosts };
                newCosts[id] = Math.max((newCosts[id] || 0) - quantity, 0);
                updateCostsInLocalStorage(newCosts);
                return newCosts;
            });
        }
    };

    const calculateTotalCost = () => {
        return Object.entries(costs).reduce((total, [id, quantity]) => {
            const cocktail = cocktails.find(cocktail => cocktail.id === parseInt(id));
            if (cocktail) {
                return total + (cocktail.precio * quantity);
            }
            return total;
        }, 0);
    };

    return (
        <div className="tropical-sales">
            <header className='tropical-sales__header'>
                <div className='tropical-sales__logo-container'>
                    <img src={logoTropical} alt="Logo of Tropical Gambit" className='tropical-sales__logo' />
                </div>
                <nav className='tropical-sales__nav'>
                    <ul className='tropical-sales__nav-list'>
                        <li className='tropical-sales__nav-item'><a href="#" className='tropical-sales__nav-link'>Home</a></li>
                        <li className='tropical-sales__nav-item'><a href="#" className='tropical-sales__nav-link'>About us</a></li>
                        <li className='tropical-sales__nav-item'><a href="#" className='tropical-sales__nav-link'>Gallery</a></li>
                        <li className='tropical-sales__nav-item'><a href="#" className='tropical-sales__nav-link'>Reserves</a></li>
                        <li className='tropical-sales__nav-item'><a href="#" className='tropical-sales__nav-link'>Experiences</a></li>
                        <li className='tropical-sales__nav-item tropical-sales__nav-item--logout'>
                            <button onClick={handleLogout} className='tropical-sales__button'>Sign off</button>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="tropical-sales__main-content">
                <aside className="tropical-sales__options-aside">
                    <h2 className='tropical-sales__section-title'>Get Cocktail by ID</h2>
                    <input type="number" placeholder="Enter cocktail ID" className='tropical-sales__input' id="search-id" />
                    <button onClick={() => getCocktailById(document.getElementById('search-id').value)} className='tropical-sales__button'>Search</button>
                    <div id="cocktail-details" className="tropical-sales__cocktail-detail">
                        {cocktailDetail && (
                            <div>
                                <h3>{`${cocktailDetail.nombre} 
                                ID: ${cocktailDetail.id} `}</h3>
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

                    <h2 className='tropical-sales__section-title'>Create Cocktail</h2>
                    <input type="text" placeholder="Cocktail Name" className='tropical-sales__input' id="create-name" />
                    <input type="text" placeholder="Cocktail Description" className='tropical-sales__input' id="create-description" />
                    <button onClick={() => createCocktail(document.getElementById('create-name').value, document.getElementById('create-description').value)} className='tropical-sales__button'>Create</button>
                    <div id="create-response" className="tropical-sales__response">{createResponse}</div>

                    <h2 className='tropical-sales__section-title'>Update Cocktail</h2>
                    <input type="number" placeholder="Enter cocktail ID" className='tropical-sales__input' id="update-id" />
                    <input type="text" placeholder="New Name" className='tropical-sales__input' id="update-name" />
                    <input type="text" placeholder="New Description" className='tropical-sales__input' id="update-description" />
                    <button onClick={() => updateCocktail(document.getElementById('update-id').value, document.getElementById('update-name').value, document.getElementById('update-description').value)} className='tropical-sales__button'>Update</button>
                    <div id="update-response" className="tropical-sales__response">{updateResponse}</div>

                    <h2 className='tropical-sales__section-title'>Total Cost</h2>
                    <div id="cost-summary" className="tropical-sales__cost-summary">
                        {cocktails.length > 0 && (
                            <ul>
                                {cocktails.map(cocktail => (
                                    costs[cocktail.id] > 0 && (
                                        <li key={cocktail.id}>
                                            {cocktail.nombre}: {costs[cocktail.id]} x {cocktail.precio} USD = {costs[cocktail.id] * cocktail.precio} USD
                                            <button onClick={() => subtractCocktailQuantity(cocktail.id)} className='tropical-sales__button tropical-sales__button--subtract'>-</button>
                                        </li>
                                    )
                                ))}
                            </ul>
                        )}
                        <h3>Total: {calculateTotalCost()} USD</h3>
                    </div>
                </aside>

                <section className="tropical-sales__cocktail-section">
                    <div id="cocktail-list" className="tropical-sales__cocktail-list">
                        {cocktails.length > 0 ? (
                            cocktails.map(cocktail => (
                                <div key={cocktail.id} className="tropical-sales__cocktail-item tropical-sales__card">
                                    <h3 className='tropical-sales__cocktail-name'>{cocktail.nombre}</h3>
                                    <p><strong>Type:</strong> {cocktail.tipo}</p>
                                    <p><strong>Price:</strong> {cocktail.precio} USD</p>
                                    <p><strong>Description:</strong> {cocktail.descrip}</p>
                                    <p><strong>Size:</strong> {cocktail.tamaño} ml</p>
                                    <p><strong>Alcohol Content:</strong> {cocktail.gradodealcohol}%</p>
                                    <p><strong>Country of Origin:</strong> {cocktail.paisorigen}</p>
                                    <p><strong>Expiration Date:</strong> {cocktail.fechavencimiento}</p>
                                    <p><strong>Preparation Time:</strong> {cocktail.tiempopreparacion} min</p>
                                    <button onClick={() => addCocktailQuantity(cocktail.id)} className='tropical-sales__button tropical-sales__button--add'>Add Quantity</button>
                                    <button onClick={() => deleteCocktail(cocktail.id)} className='tropical-sales__button tropical-sales__button--delete'>Delete</button>
                                </div>
                            ))
                        ) : (
                            <p className='tropical-sales__no-cocktails'>No cocktails available.</p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TropicalSales;
