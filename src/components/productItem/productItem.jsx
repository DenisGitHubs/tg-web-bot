import React, { useState } from "react";
import './productItem.css'
import Button from "../button/button";
export const ProductItem = ({ product, className, onAdd }) => {
    const [counter, setCounter] = useState(1)
    const onAddHandler = () => {
        onAdd(product)
    }
    const onHandlerPlus = () => {
        if (counter < 10) {
            setCounter(counter + 1)
        } else return

    }
    const onHandlerMinus = () => {
        if(counter > 1) {
            setCounter(counter - 1)
        } else return

    }
    return <div className={"product " + className}>
        <img className="img" src={product.url} alt="foto_food" />
        <div className="title"><b>{product.title}</b></div>
        <div className="description">{product.description}</div>
        <div className="price">
        <div class="quantity_inner">        
            <button class="bt_minus" onClick={onHandlerMinus}>
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <input type="text" value={counter} class="quantity" data-max-count="20" />
            <button onClick={onHandlerPlus} class="bt_plus">
                <svg viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
        </div>
            <span>Стоимость: <b>{product.price}</b></span>
        </div>
        <Button className="add-btn" onClick={onAddHandler}>Добавить на тарелку</Button>
    </div>;
};
