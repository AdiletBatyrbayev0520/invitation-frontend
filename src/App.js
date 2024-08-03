import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import './App.css';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';
import img60 from './images/60.jpg';
import backgroundMusic from './audio/background.mp3'; // Import the audio file
import Confetti from 'react-confetti';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvitationCard from './InvitationCard';
import Map from './Map';
import BottomAppBar from './BottomAppBar';

axios.defaults.baseURL = 'https://invitation-backend-production.up.railway.app';

function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useEffect(() => {
        const handleResize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return size;
}

function App() {
    const [invitation, setInvitation] = useState({});
    const [guest, setGuest] = useState({ fullname: '', mobile_number: '', willAttend: false, numberOfPeople: '' });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fadeProp, setFadeProp] = useState({ fade: 'fade-in' });
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(true);
    const audioRef = useRef(null); // Use a ref to access the audio element

    const [width, height] = useWindowSize();
    const images = [img1, img2, img3, img4, img5, img6];

    useEffect(() => {
        if (isMusicPlaying) {
            axios.get('/invitation')
                .then(response => {
                    setInvitation(response.data);
                    animateText(response.data.content);
                })
                .catch(error => {
                    console.error('There was an error fetching the invitation!', error);
                });

            const imageInterval = setInterval(() => {
                setFadeProp({ fade: 'fade-out' });
                setTimeout(() => {
                    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                    setFadeProp({ fade: 'fade-in' });
                }, 500); // Fade out duration
            }, 3500); // Total duration including fade out

            return () => clearInterval(imageInterval);
        }
    }, [isMusicPlaying]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGuest({
            ...guest,
            [name]: value
        });
    };

    const handlePhoneChange = (value) => {
        setGuest({
            ...guest,
            mobile_number: value
        });
    };

    const handleCheckboxChange = (e) => {
        setGuest({
            ...guest,
            willAttend: e.target.checked
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/rsvp', guest)
            .then(response => {})
            .catch(error => {
                console.error('There was an error submitting the RSVP!', error);
            });
        console.log(guest);
        setGuest({ fullname: '', mobile_number: '+7', willAttend: false, numberOfPeople: '' });
    };

    const animateText = (text) => {
        const textContainer = document.getElementById('animated-text');
        if (textContainer) {
            let animationDelay = 0;
            const paragraphs = text.split('\n').map(paragraph => {
                const words = paragraph.split(' ').map(word => {
                    const wordHTML = word.split('').map(letter => {
                        const delay = animationDelay;
                        animationDelay += 0.1;
                        return `<span class="letter" style="animation: fadeIn 0.5s ${delay}s forwards;">${letter}</span>`;
                    }).join('');
                    animationDelay += 0.2; // Add delay between words
                    return `<span>${wordHTML}&nbsp;</span>`;
                }).join('');
                return `<p>${words}</p>`;
            }).join('');
            textContainer.innerHTML = paragraphs;
        }
    };

    const handlePlayMusic = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsMusicPlaying(true);
            setIsOverlayVisible(false);
        }
    };

    return (
        <Router>
            {isOverlayVisible && (
                <div className="overlay">
                    <button onClick={handlePlayMusic} className="play-music-button">Нажмите</button>
                </div>
            )}
            <div className={`App ${isOverlayVisible ? 'blurred' : ''}`}>

                {isMusicPlaying && (
                    <Confetti
                        width={width}
                        height={height}
                        numberOfPieces={200}
                        recycle={true}
                        gravity={0.2}
                    />
                )}
                <header className="App-header">
                    <img src={img60} className='logo_60' alt="Logo"/>
                    <div className="slideshow-container">
                        <img src={images[currentImageIndex]} alt="Slideshow" className={`slideshow-image ${fadeProp.fade}`} />
                    </div>
                    <div id="animated-text"></div>
                    <p>{`Той салтанаты: ${invitation.date}`}</p>
                    <p>{`сағ ${invitation.time}`}</p>
                    <p>{`Мекен-жайымыз: ${invitation.location}`}</p>
                    <p>{`Той иелері: ${invitation.hosts}`}</p>
                </header>
                <audio src={backgroundMusic} ref={audioRef} loop />
                <Routes>
                    <Route path="/" element={
                        <div>
                            <form onSubmit={handleSubmit}>
                                <h2>Сауалнама(анкета)</h2>
                                <label>
                                    Аты-жөні:
                                    <input type="text" name="fullname" value={guest.fullname} onChange={handleInputChange} required />
                                </label>
                                <label>
                                    Телефон нөмірі:
                                    <PhoneInput
                                        country={'kz'}
                                        value={guest.mobile_number}
                                        onChange={handlePhoneChange}
                                        inputProps={{
                                            name: 'mobile_number',
                                            required: true,
                                            autoFocus: true
                                        }}
                                        onlyCountries={['kz']}
                                        countryCodeEditable={false}
                                    />
                                </label>
                                <label>
                                    Қатысуы(буду присутствовать):
                                    <input type="checkbox" name="willAttend" checked={guest.willAttend} onChange={handleCheckboxChange} />
                                </label>
                                <label>
                                    Адам саны(количество персон):
                                    <input type="number" name="numberOfPeople" value={guest.numberOfPeople} onChange={handleInputChange} required />
                                </label>
                                <button className='submit' type="submit">Отправить</button>
                            </form>
                            <div className="map-info">
                                <p>Мекен-жайымыз: <a href="https://2gis.kz/almaty/geo/70000001041557578" target="_blank" rel="noopener noreferrer">с. Бесағаш, ул. Райымбек 145 А 'Ханшайым' мейрамханасы</a></p>
                            </div>
                            <Map />
                        </div>
                    } />
                    <Route path="/invitation-card" element={<InvitationCard />} />
                </Routes>
            </div>
            <BottomAppBar />
        </Router>
    );
}

export default App;
