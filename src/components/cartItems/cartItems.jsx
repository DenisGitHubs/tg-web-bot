import './cartItems.css'

export const CartItems = ({addItems, setAddItems}) => {

    const removeOne = (item) => {
        if(item.count === 1) {
            console.log(item);
            setAddItems(prevState => {
                let newData = prevState;
                newData = newData.filter(itemMass => itemMass.id !== item.id);
                return newData
            })
            return
        }
        if(item.count > 1) {
            setAddItems(prevState => {
                const newData = prevState;
                let index = newData.findIndex(itemMass => itemMass.id === item.id);
                newData[index].count = --newData[index].count
                const returnData = [...newData]
                return returnData
            })
        }
    }
const AddOne  = (item) => {
    if(item.count < 30) {
        setAddItems(prevState => {
            const newData = prevState;
            let index = newData.findIndex(itemMass => itemMass.id === item.id);
            newData[index].count = ++newData[index].count
            const returnData = [...newData]
            return returnData
        })
    }
}

    return (
        addItems.map((item) => {
            return (
                <li className='item-li' key={item.id}>
                    <div className="item-info">
                        <b>{item.title}</b> количество:       
                    </div>
                     
                    <div className="quantity_inner_cart">        
                        <button className="bt_minus_cart" onClick={() => removeOne(item)}>
                            <svg viewBox="0 0 27 27"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <input type="text" readOnly value={item.count} className={"quantity_cart item"} data-max-count="20" />
                        <button className="bt_plus_cart" onClick={() => AddOne(item)}>
                            <svg viewBox="0 0 27 27"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                </li>
            );
        })
    )

}