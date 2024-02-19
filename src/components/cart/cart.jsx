import { addProduct } from '../dataCart/dataCart'
import './cart.css'
export const Cart = () => {
    const addOrder = () => {
        addProduct()
    }
    return (
        <div className="container">
            <img className='img-title' src='/img/tarelka.png' alt="cart"></img>
            <h3 className="title">Тарелка</h3>
            <div className="list-container">
                <ul className="list"></ul>
            </div>
            <div className="user-data">
                <input type="text" placeholder="Имя" />
                <input type="text" placeholder="Фамилия" />
                <input type="text" placeholder="Адрес" />
            </div>
            <div className="price-container">
                <p className="price-postal">Стоимость доставки: 10</p>
                <p className="price-food">Стоимость тарелки: 20</p>
                <p className="price-total">Общая стоимость: 30</p>
            </div>
            <button className="accord" onClick={addOrder}>Соглы</button>
        </div>
    )
}