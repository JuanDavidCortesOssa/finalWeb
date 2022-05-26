import React from 'react';
import { useState, useEffect, useRef } from "react";
import Modal from "../../components/Modal";
import axios from 'axios';
import './style.css';
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseconfig';
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { setFalse } from '../../userSlice';

export default function MainMenu() {
    let navigate = useNavigate();

    const isLogged = useSelector((state) => state.isLogged.value);
    const dispatch = useDispatch();

    const cityRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [cityCode, setCityCode] = useState("297475");
    const [show, setShow] = useState(false);
    const [restaurants, setRestaurants] = useState([
        {
            name: "Piazza Italia By Storia D'amore Calle 93",
            urlImg: "https://media-cdn.tripadvisor.com/media/photo-l/21/a2/be/db/giardino.jpg",
            address: "na",
            description: "na",
        }, {
            name: "Parrlla Pizza",
            urlImg: "https://media-cdn.tripadvisor.com/media/photo-l/21/a2/be/db/giardino.jpg",
            address: "na",
            description: "na",
        }
    ]);

    const [restauranteName, setRestauranteName] = useState("Res");
    const [restauranteImg, setRestauranteImg] = useState("https://media-cdn.tripadvisor.com/media/photo-l/21/a2/be/db/giardino.jpg");
    const [restauranteDescription, setRestauranteDescription] = useState("Text");
    const [restauranteAddress, setRestauranteAddress] = useState("Text");

    const logout = async () => {
        await signOut(auth);
    }

    function returnToLogin() {
        logout();
        dispatch(setFalse());
        window.localStorage.clear();
        navigate(-1);
    }

    useEffect(() => {

    }, [restaurants])

    const submitHandler = (e) => {
        // prevent the form from submitting
        e.preventDefault();
        setLoading(true);
        // obtiene con el hook the useRef el valor del input
        const city = cityRef.current.value;

        //searchRestaurant();
        // se hace uso del endpoint del typehead
        const encodedParams = new URLSearchParams();
        encodedParams.append("language", "en_US");
        encodedParams.append("q", city);

        const options = {
            method: 'POST',
            url: 'https://worldwide-restaurants.p.rapidapi.com/typeahead',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
                'X-RapidAPI-Key': '705aa44662msh6309ea9d7644912p18ca40jsn498c9c8ac5c9'
            },
            data: encodedParams
        };

        axios.request(options).then(function (response) {
            console.log(response.data.results.data[0].result_object.location_id);
            //setCityCode(response.data.results.data[0].result_object.location_id);
            setLoading(false);
            // llamo al restaurantes de la zona con el id unico
            searchRestaurant(response.data.results.data[0].result_object.location_id)

        }).catch(function (err) {
            console.log('Error signing: ', err);
            setLoading(false);
        });

    };

    const searchRestaurant = (locationId) => {
        setLoading(true);
        // realiza el endpoint the serach con el id location de la ciudad
        const encodedParams = new URLSearchParams();
        encodedParams.append("currency", "USD");
        encodedParams.append("location_id", locationId);
        encodedParams.append("limit", "30");
        encodedParams.append("language", "en_US");

        const options = {
            method: 'POST',
            url: 'https://worldwide-restaurants.p.rapidapi.com/search',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com',
                'X-RapidAPI-Key': '705aa44662msh6309ea9d7644912p18ca40jsn498c9c8ac5c9'
            },
            data: encodedParams
        };

        axios.request(options).then(function (response) {
            console.log(response.data.results.data);
            // el array de información
            let infoArr = response.data.results.data;
            let restaurantsInfo = [];
            infoArr.map((restaurant) => {
                restaurantsInfo.push({
                    name: restaurant.name,
                    urlImg: restaurant.photo.images.small.url,
                    address: restaurant.address,
                    description: restaurant.description,
                });
            })
            // se modifica el estado de los restuarantes
            setRestaurants(restaurantsInfo)
            setLoading(false);
        }).catch(function (error) {
            console.error(error);
        });
    }

    const showModal = (value) => {
        setShow(true);
        setRestauranteName(restaurants[value].name);
        setRestauranteImg(restaurants[value].urlImg);
        setRestauranteDescription(restaurants[value].description);
        setRestauranteAddress(restaurants[value].address);
    }


    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="explorer-inner">
                    <div id='main-page-header'>
                        <h2 id='buscador-restaurantes'>Buscador de restaurantes</h2>
                        <div id='main-page-user'>
                            <p id='user-email'>{auth.currentUser.email}</p>
                            <button id='logout-button' type='button' onClick={returnToLogin}>Log Out</button>
                        </div>
                    </div>
                    <div id='explorer'>
                        <div >
                            <input
                                className="explorere-input"
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Ciudad"
                                ref={cityRef}
                                required></input>
                        </div>
                        <div>
                            {
                                window.localStorage.getItem("Logged")
                                    ?
                                    <button className="search-button" type="submit">Search</button>
                                    :
                                    <h1>Inicia sesión  para hacer búsquedas</h1>

                            }
                        </div>
                    </div>
                </div>
                {
                    loading && <h1>Buscando...</h1>
                }

            </form>
            <main>
                <section id='restaurantes'>
                    {/* <h1 id='text-restaurantes'>Restaurantes</h1> */}
                    {
                        restaurants.map((restaurant, index) => (
                            < >
                                <div className='restaurante'>
                                    <h3 id={index}>{restaurant.name}</h3>
                                    <img src={restaurant.urlImg} alt="restaurantImg" />
                                    <button className='restaurant-button' onClick={() => showModal(index)}>Ver restaurante</button>
                                </div>
                            </>
                        ))

                    }
                </section>
            </main>

            <Modal title="My Modal" onClose={() => setShow(false)} show={show}>
                <h3>{restauranteName}</h3>
                <img src={restauranteImg} alt="restaurantImg" />
                <h3>Descripción</h3>
                <p>{restauranteDescription === "" ? "No tiene descripción" : restauranteDescription}</p>
                <h3>Dirreción</h3>
                <p>{restauranteAddress}</p>
            </Modal>
        </>
    )
}

