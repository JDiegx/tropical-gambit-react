import React from 'react';
import "../assets/styles/viewReserves.css";
import modelOne from "../assets/img/modelx.png";
import model from "../assets/img/model.png";

const ViewReserves = () => {
    return (
        <div className='view-reserves'>
            <div className='view-reserves__container'>
                <div className='view-reserves__content'>
                    <p className='view-reserves__text'>Get access to special discounts when you join our exclusive loyalty program.</p>
                    <button className='view-reserves__button'>Reserve</button>
                </div>
                <div className='view-reserves__image-container'>
                    <img className='view-reserves__image' src={modelOne} alt="" />
                </div>
            </div>
            <div className='view-reserves__container--two'>
                <div className='view-reserves__content'>
                    <p className='view-reserves__text'>A true paradise for cocktail lovers, every drink was amazing!</p>
                </div>
                <div className='view-reserves__image-container'>
                    <img className='view-reserves__image' src={model} alt="" />
                </div>
            </div>
        </div>
    );
}

export default ViewReserves;
