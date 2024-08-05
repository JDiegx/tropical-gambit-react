import React from 'react'
import Header from '../components/header.jsx'
import timeStopsHere from "../assets/img/Stay.png"
import Welcome from "../components/welcome.jsx"
import "../assets/styles/home.css"

const Home = () => {
    return (
        <div className='home'>
            <Header />
            <div className='home__content'>
                <div className='home__image-container'>
                    <img src={timeStopsHere} alt="Time stops here" className='home__image' />
                </div>
                <p className='home__description'>
                    Built in the 70s, our walls have witnessed countless stories and achievements. <br className='home__br-on' />
                    We bring this legacy into the present with distinguished dining experiences,  <br className='home__br-on' />
                    personalized services and panoramic views.
                </p>
                <button className='home__button'>Reserve</button>
            </div>
        </div>
    )
}

export default Home
