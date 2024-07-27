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
import Confetti from 'react-confetti';
import { load } from '@2gis/mapgl';

axios.defaults.baseURL='https://invitation-backend-production.up.railway.app';
// axios.defaults.baseURL='http://localhost:4000'
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
    const [fadeProp, setFadeProp] = useState({
        fade: 'fade-in'
    });

    const [width, height] = useWindowSize();
    const mapContainer = useRef(null);
    const images = [img1, img2, img3, img4, img5, img6];

    useEffect(() => {
        axios.get('/invitation')
            .then(response => {
                setInvitation(response.data);
                animateText(response.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the invitation!', error);
            });

        const imageInterval = setInterval(() => {
            setFadeProp({
                fade: 'fade-out'
            });
            setTimeout(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFadeProp({
                    fade: 'fade-in'
                });
            }, 500); // Fade out duration
        }, 3500); // Total duration including fade out

        return () => clearInterval(imageInterval);
    }, []);

    useEffect(() => {
        if (mapContainer.current) {
            load().then((mapglAPI) => {
                const map = new mapglAPI.Map(mapContainer.current, {
                    center: [77.02221, 43.292448],
                    zoom: 15,
                    key: '63c4c395-c8e2-4581-b08f-3f33abb7e2cc',
                }); 

                new mapglAPI.Marker(map, {
                    coordinates: [77.02221, 43.292448],
                });
            }).catch(error => {
                console.error('Error loading 2GIS MapGL:', error);
            });
        }
    }, [mapContainer]);

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
            .then(response => {
                alert('RSVP submitted successfully!');
            })
            .catch(error => {
                console.error('There was an error submitting the RSVP!', error);
            });
            console.log(guest)
            setGuest({ fullname: '', mobile_number: '+7', willAttend: false, numberOfPeople: '' })
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

    return (
        <div className="App">
            <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
                recycle={true}
                gravity={0.2} // Slower effect
            />
            <header className="App-header">
                <h1>{invitation.title}</h1>
                <div className="slideshow-container">
                    <img src={images[currentImageIndex]} alt="Slideshow" className={`slideshow-image ${fadeProp.fade}`} />
                </div>
                <div id="animated-text"></div>
                <p>{`Той салтанаты: ${invitation.date}`}</p>
                <p>{`сағ ${invitation.time}`}</p>
                <p>{`Мекен-жайымыз: ${invitation.location}`}</p>
                <p>{`Той иелері: ${invitation.hosts}`}</p>
            </header>
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
                <button type="submit">Отправить</button>
            </form>
            <div className="map-info">
                <p>Location: <a href="https://2gis.kz/almaty/geo/70000001041557578" target="_blank" rel="noopener noreferrer">https://2gis.kz/almaty/geo/70000001041557578</a></p>
            </div>
            <div ref={mapContainer} className="map-container"></div>
        </div>
    );
}

export default App;
