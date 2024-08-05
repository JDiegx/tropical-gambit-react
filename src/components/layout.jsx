import React, { useEffect, useRef } from 'react'
import Home from '../components/home';
import Welcome from '../components/welcome';
import Gallery from '../components/galery';
import song from '../assets/sound/BuenaVistaSocialClub&ColdplayClocks.mp3';
import ViewReserves from '../components/viewReserves';
import Login from '../components/login';
import Footer from './footer';

const Layout = () => {
    const audioRef = useRef(null);
    useEffect(() => {
        const handleUserInteraction = () => {
            if (audioRef.current) {
                audioRef.current.volume = 0.1;
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log("Audio is playing");
                    }).catch(error => {
                        console.log("Autoplay prevented:", error);
                    });
                }
            }
            document.removeEventListener('click', handleUserInteraction);
        };
        document.addEventListener('click', handleUserInteraction);
        return () => {
            document.removeEventListener('click', handleUserInteraction);
        };
    }, []);

    return (
        <div>
            <Home />
            <Welcome />
            <Gallery />
            <ViewReserves />
            <Login />
            <Footer />
            <audio ref={audioRef} src={song} loop />
        </div>
    )
}

export default Layout
