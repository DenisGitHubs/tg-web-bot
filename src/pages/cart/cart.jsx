import { useEffect, useState } from 'react';
import './cart.css'
import axios from 'axios';
// import jsonp from 'axios-jsonp';
import { useNavigate } from 'react-router-dom';
import { CartItems } from '../../components/cartItems/cartItems';
export const Cart = ({addItems, setAddItems}) => {
    const [totalPriceFood, setTotalPriceFood] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(null);
    const [distance, setDistance] = useState(null);
    const [totalPrice, setTotalPrice] = useState(totalPriceFood + deliveryPrice);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    // const API_KEY = '5b3ce3597851110001cf6248e68a623380e04461ae2f0d146dde5cb5';
    const navigate = useNavigate();
    useEffect(() => {  
        if (addItems.length > 0) {
            let totalPriceAllFood = 0;
            for (let i = 0; i < addItems.length; i++) {
                totalPriceAllFood = totalPriceAllFood + addItems[i].price * addItems[i].count
            }

            setTotalPriceFood(totalPriceAllFood)
            setTotalPrice(totalPriceFood + deliveryPrice)
        } else {
            setTotalPriceFood(0)
            setTotalPrice(totalPriceFood + deliveryPrice)
        }
    }, [addItems, totalPriceFood, deliveryPrice])
    const forward = () => {
        if (deliveryPrice && totalPrice > 0) {
            alert('заказано')
        } else if (deliveryPrice === null) {
            alert('укажите место доставки')
        } else { alert('выбери блюда, дорогой')}

    }

    const beBack = () => {
        navigate(-1)
    }


    const handleRequestLocation = async () => {
        if (navigator.geolocation) {
            await navigator.geolocation.getCurrentPosition(
            (position) => {
               setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              setError(null);
            },
            (error) => {
              setError(error.message);
            },
          );
        } else {
          setError('Geolocation is not supported by this browser.');
        }
      }
    //   useEffect(() => {
    //     if(location)  {
    //           const apiUrl = 'https://api.openrouteservice.org/v2/directions/driving-car';
    //           const proxyUrl = 'http://localhost:8000';
    //           const requestUrl = `${apiUrl}?api_key=${API_KEY}&start=12.288443,109.203316&end=12.289897,109.206439`;
              
    //           axios.get(requestUrl, {
    //             proxy: {
    //               host: proxyUrl, // адрес прокси-сервера
    //               port: 80 // порт прокси-сервера
    //             }
    //           })
    //           .then(response => {
    //             console.log(response.data);
    //             const newDistance = response.data.features[0].properties.summary.distance / 1000
    //             const fixedNumber = parseFloat(newDistance.toFixed(2));
    //             setDistance(fixedNumber)
    //             setDeliveryPrice(Math.round(distance * 5))
    //           })
    //           .catch(error => {
    //             console.error(error);
    //           });
    //     }
    //   },[location, distance ])
    useEffect(() => {
        if(location)  {
            const BASE_URL = 'https://api.openrouteservice.org/v2/directions/driving-car';
              const proxyUrl = 'http://localhost:8000';
              const start = '12.310756, 109.187023';
            //   const end = '12.289897, 109.206439';

              const body = {
                "coordinates": [
                  [
                    parseFloat(start.split(',')[1]),
                    parseFloat(start.split(',')[0])
                  ],
                  [
                    parseFloat(location.longitude),
                    parseFloat(location.latitude)
                  ]
                ]
              };
            //   const requestUrl = `${apiUrl}?api_key=${API_KEY}&start=12.288443,109.203316&end=12.289897,109.206439`;
              const config = {
                headers: {
                  'Authorization': `5b3ce3597851110001cf6248e68a623380e04461ae2f0d146dde5cb5`,
                  'Content-Type': 'application/json'
                },
                proxy: {
                  host: proxyUrl.split(':')[0],
                  port: proxyUrl.split(':')[1]
                }
              };

              axios.post(BASE_URL, body, config)
                .then(response => {
                    console.log(response.data);
                    const newDistance = response.data.routes[0].summary.distance / 1000
                    const fixedNumber = parseFloat(newDistance.toFixed(2));
                    setDistance(fixedNumber)
                    setDeliveryPrice(Math.round(distance * 5))
                })
                .catch(error => {
                console.error(error);
                    });
        }
      },[location, distance ])

    return (
        <div className="container">
            <img className='img-title' src='/img/tarelka.png' alt="cart"></img>
            <h3 className="title">Тарелка</h3>
            {error ? {error} : null}
            {location ? <p>{location.latitude}</p> : null}
            {location ? <p>{location.longitude}</p> : null}
            <div className="list-container">
                <ul className="list-products">{!!addItems.length ? <CartItems addItems={addItems} setAddItems={setAddItems}/> : null}</ul>
            </div>
            <div className="user-data-container">
                <input type="text" className='user-data' placeholder="Имя" />
                <input type="text" className='user-data' placeholder="Фамилия" />
                {/* <input type="text" className='user-data' placeholder="Адрес" /> */}
            </div>
            <div className="price-container">
                <div className='delivery-wrapper'>
                {deliveryPrice ? null : <button className='bt_calculate_delivery' onClick={handleRequestLocation} >рассчитать доставку</button>}
                </div>
                <div className='price-wrapper'>
                <p className="price-postal">Стоимость доставки: </p> 
                {deliveryPrice ? <p className='number-price'>{deliveryPrice} руб</p> : null}
                </div>
                <div className='price-wrapper'>
                <p className="price-postal">Дистанция: </p> 
                {distance ? <p className='number-price'>{distance} км</p> : null}
                </div>
                <div className='price-wrapper'>
                <p className="price-food">Стоимость тарелки: </p><p className='number-price'>{totalPriceFood} руб</p>
                </div>
                <div className='price-wrapper'>
                <p className="price-total">Общая стоимость: </p><p className='number-price'>{totalPrice} руб</p>
                </div>

            </div>
            <div className='button-container'>
                <button className="accord" onClick={forward}>Подтверждаю</button>
                <button className="back" onClick={beBack}>Вернуться</button>
            </div>

        </div>
    )
}