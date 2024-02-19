import { useEffect, useState } from 'react';
import './cart.css'
import { useNavigate } from 'react-router-dom';
export const Cart = ({addItems, setAddItems}) => {
    const [totalPriceFood, setTotalPriceFood] = useState(0);
    const [deliveryPrice, setDeliveryPrice] = useState(10);
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
            setDeliveryPrice(10) // потом удалить
            setTotalPrice(totalPriceFood + deliveryPrice)
        }
    }, [addItems, totalPriceFood, deliveryPrice])
    // useEffect(() => {
    //     if(totalPriceFood === 0) {setTotalPrice(0)}
    //     else {setTotalPrice(totalPrice + deliveryPrice)}
    // }, [totalPriceFood, totalPrice, deliveryPrice])

    const beBack = () => {
        navigate(-1)
    }
    return (
        <div className="container">
            <img className='img-title' src='/img/tarelka.png' alt="cart"></img>
            <h3 className="title">Тарелка</h3>
            <div className="list-container">
                <ul className="list-products">{!!addItems.length ? addItems.map((item) => {
                    return <li key={item.id}>Блюдо: <b>{item.title}</b> количество: <b>{item.count}</b></li>
                }) : null}</ul>
            </div>
            <div className="user-data-container">
                <input type="text" className='user-data' placeholder="Имя" />
                <input type="text" className='user-data' placeholder="Фамилия" />
                <input type="text" className='user-data' placeholder="Адрес" />
            </div>
            <div className="price-container">
                <p className="price-postal">Стоимость доставки: {deliveryPrice}</p>
                <p className="price-food">Стоимость тарелки: {totalPriceFood}</p>
                <p className="price-total">Общая стоимость: {totalPrice}</p>
            </div>
            <div className='button-conainer'>
                <button className="accord" >Соглы</button>
                <button className="back" onClick={beBack}>Вернуться</button>
            </div>

        </div>
    )
}