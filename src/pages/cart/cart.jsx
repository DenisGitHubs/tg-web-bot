import { useEffect, useState } from 'react';
import './cart.css'
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartItems } from '../../components/cartItems/cartItems';
export const Cart = ({addItems, setAddItems}) => {
    const [totalPriceFood, setTotalPriceFood] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(null);
    const [totalPrice, setTotalPrice] = useState(totalPriceFood + deliveryPrice);
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
            setDeliveryPrice(null)
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



    const [geolocation, setGeolocation] = useState(null);

    useEffect(() => {
      const ws = new WebSocket('ws://localhost:8000');
  
      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      ws.onmessage = (event) => {
        const geolocation = JSON.parse(event.data);
        setGeolocation(geolocation);
        console.log(geolocation);
      };
  
      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
  
      return () => {
        ws.close();
      };
    }, []);
  
    const requestGeolocation = () => {
        if (typeof Telegram !== 'undefined' && window.Telegram.WebApp) {
            window.Telegram.WebApp.getUserLocation((location) => {
            setGeolocation({
                latitude: location.latitude,
                longitude: location.longitude,
              });
          });
        } else {
          console.error('Telegram Web App API недоступен');
        }
      };
    return (
        <div className="container">
            <img className='img-title' src='/img/tarelka.png' alt="cart"></img>
            <h3 className="title">Тарелка</h3>
            {geolocation ? <p>{geolocation.latitude}</p> : null}
            {geolocation ? <p>{geolocation.longitude}</p> : null}
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
                {deliveryPrice ? null : <button className='bt_calculate_delivery' onClick={requestGeolocation}>рассчитать доставку</button>}
                </div>
                <div className='price-wrapper'>
                <p className="price-postal">Стоимость доставки: </p> 
                {deliveryPrice ? <p className='number-price'>{deliveryPrice}</p> : null}
                </div>
                <div className='price-wrapper'>
                <p className="price-food">Стоимость тарелки: </p><p className='number-price'>{totalPriceFood}</p>
                </div>
                <div className='price-wrapper'>
                <p className="price-total">Общая стоимость: </p><p className='number-price'>{totalPrice}</p>
                </div>

            </div>
            <div className='button-container'>
                <button className="accord" onClick={forward}>Подтверждаю</button>
                <button className="back" onClick={beBack}>Вернуться</button>
            </div>

        </div>
    )
}