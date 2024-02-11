import React, { useCallback, useEffect, useState } from "react"
import "./productList.css"
import { ProductItem } from "../productItem/productItem"
import { useTelegram } from "../../hooks/useTelegram"
import "./productList.css"
import { products } from "./productData"
const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return (acc += item.price)
    }, 0)
}

export const ProductList = () => {
    const [addItems, setAddItems] = useState([])
    const { tg, queryId } = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            products: addItems,
            totalPrice: getTotalPrice(addItems),
            queryId,
        }
        fetch("http://localhost:8000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    }, [addItems, queryId])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)
        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [tg, onSendData])

    const onAdd = (product) => {
        const allreadyAdded = addItems.find((item) => item.id === product.id)
        let newItems = []
        if (allreadyAdded) {
            newItems = addItems.find((item) => item.id !== product.id)
        } else {
            newItems = [...addItems, product]
        }
        setAddItems(newItems)

        if (newItems.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`,
            })
        }
    }
    return (
        <>
        <div>
            <div className="list">
                {products.map((item) => (
                    <ProductItem
                        product={item}
                        onAdd={onAdd}
                        className="item"
                    />
                ))}
            </div>
        </div>
        <footer className="footer-container">
            <div class="wrapper">
            <div className="footer-container">
                <img className="footer" src="/img/tarelka.png" alt='Корзина'></img>
                <p>Тарелка</p>
            </div>
            <div className="footer-container">
                <img className="footer" src="/img/profile.png" alt='Профиль'></img>
                <p>Профиль</p>
            </div>
            </div>
        </footer>

      </>
    )
}
