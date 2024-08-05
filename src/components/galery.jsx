import React, { useEffect } from 'react';
import onePhoto from '../assets/img/Carta.png';
import twoPhoto from '../assets/img/Dine1.png';
import threePhoto from '../assets/img/drink.png';
import "../assets/styles/galery.css"

const Gallery = () => {
    return (
        <div className="gallery">
            <div className="gallery__item">
                <img className="gallery__image" src={onePhoto} alt="Descripción de la primera foto" />
            </div>
            <div className="gallery__item">
                <img className="gallery__image" src={twoPhoto} alt="Descripción de la segunda foto" />
            </div>
            <div className="gallery__item">
                <img className="gallery__image" src={threePhoto} alt="Descripción de la tercera foto" />
            </div>
        </div>
    );
}

export default Gallery;
