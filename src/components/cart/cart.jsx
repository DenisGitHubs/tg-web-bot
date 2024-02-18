export const Cart = () => {
    return (
        <div className="container">
            <img src='/img/profile.png'>3</img>
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
                <p className="price-postal">10</p>
                <p className="price-food">20</p>
                <p className="price-total">30</p>
            </div>
            <button className="accord">Соглы</button>
        </div>
    )
}