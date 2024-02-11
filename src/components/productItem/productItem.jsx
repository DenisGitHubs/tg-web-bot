import React from "react";
import './productItem.css'
import Button from "../button/button";
export const ProductItem = ({ product, className, onAdd }) => {
    const onAddHandler = () => {
        onAdd(product)
    }
    return <div className={"product " + className}>
        <img className="img" src={product.url} alt="foto_food" />
        <div className="title">{product.title}</div>
        <div className="description">{product.description}</div>
        <div className="price">
            <span>Стоимость: <b>{product.price}</b></span>
        </div>
        <Button className="add-btn" onClick={onAddHandler}>Добавить в корзину</Button>
    </div>;
};
