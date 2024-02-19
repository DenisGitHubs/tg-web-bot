import React, { useState } from "react"
import "./productList.css"
import { ProductItem } from "../productItem/productItem"
// import { useTelegram } from "../../hooks/useTelegram"
import { products } from "./productData"
import { useNavigate } from "react-router-dom"
// const getTotalPrice = (items) => {
//     return items.reduce((acc, item) => {
//         return (acc += item.price)
//     }, 0)
// }

export const ProductList = () => {
    const navigate = useNavigate()
    const [addItems, setAddItems] = useState([])
    // const { tg, queryId } = useTelegram()
    // const onSendData = useCallback(() => {
    //     const data = {
    //         products: addItems,
    //         totalPrice: getTotalPrice(addItems),
    //         queryId,
    //     }
    //     fetch("http://localhost:8000", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //     })
    // }, [addItems, queryId])

    // useEffect(() => {
    //     tg.onEvent("mainButtonClicked", onSendData)
    //     return () => {
    //         tg.offEvent("mainButtonClicked", onSendData)
    //     }
    // }, [tg, onSendData])
    const onAdd = (product, counter) => {
        // const allReadyAdded = addItems.find((item) => item.id === product.id)
        // let newItems = [];
        if (addItems.length === 0) {
            if(product.count === counter){
                setAddItems([product]);
                return
            } else {
                let editItem = product;
                editItem.count = counter;
                setAddItems([editItem])
                return
            }
        } else {
            const allReadyAdded = addItems.indexOf(product);
            if(allReadyAdded === - 1) {
                product.count = counter;
                const AddNewProduct = [...addItems, product];
                setAddItems(AddNewProduct);
                return
            }
            
            if (allReadyAdded >= 0 ) {
                // let newListItems = addItems;
                // let editItem = addItems[allReadyAdded];
                // editItem.count = editItem.count + counter;
                // newListItems.splice(allReadyAdded, 1, editItem)

                // setAddItems(newListItems)
                setAddItems(prevState => {
                    const newState = [...prevState]
                    newState[allReadyAdded].count = newState[allReadyAdded].count + counter
                    return newState
                })
                return
                // setAddItems((prevState) => {
                //     prevState[allReadyAdded].count = prevState[allReadyAdded].count + counter
                //     console.log(prevState[allReadyAdded].count);
                // })
            } 
            // else if (allReadyAdded >= 0 && addItems[allReadyAdded].count !== counter) {
            //     addItems[allReadyAdded].count = counter
            //     console.log(addItems[allReadyAdded].count);
            // }
        }

        // for (let i = 0; i < addItems.length; i++) {
        //     console.log(addItems);
        //     if(addItems[i].id === product.id && addItems[i].count !== counter) {
        //         addItems[i].count = counter;
        //     } else if(addItems[i].id !== product.id) {
        //         const AddNewProduct = [...addItems, product]
        //         setAddItems(AddNewProduct)
        //     } else if(addItems[i].id === product.id && addItems[i].count === counter) {
        //         const asd = addItems[i].count++
        //         console.log(asd);
        //     }
            
        // }
        // if (allReadyAdded) {
        //     console.log(addItems);
        //     newItems = addItems.find((item) => item.id !== product.id)
        // } else {
        //     newItems = [...addItems, product]
        // }
        // setAddItems(newItems)

        // if (newItems.length === 0) {
        //     tg.MainButton.hide()
        // } else {
        //     tg.MainButton.show()
        //     tg.MainButton.setParams({
        //         text: `Быстрая покупка ${getTotalPrice(newItems)}`,
        //     })
        // }
    }
    const goToCart = () => {
        navigate('/cart')
    }
    return (
        <>
        <div>
            <div className="list">
                {products.map((item) => (
                    <ProductItem key={item.id}
                        product={item}
                        onAdd={onAdd}
                        className="item"
                    />
                ))}
            </div>
        </div>
        <footer className="footer-container">
            <div className="wrapper">
            <div className="footer-container">
                <div className="platter-container">
                    <img className="footer" src="/img/tarelka.png" alt='Корзина' onClick={goToCart}></img>
                    <p className="totalProduct">{!!addItems.length ? addItems.length : null}</p>
                </div>
                <p onClick={goToCart}>Тарелка</p>
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
