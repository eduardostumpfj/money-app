import React from "react";
import Item from '../item/Item'
import './ItemList.css'

export default function ItemList({list, updateItem, duplicateItem, deleteItem, addItem}){
    return(
        <div className="item-list">
            <div className="items">
                {list.map( item => {
                    return <Item
                    nameItem = {item.name}
                    valueItem = {item.value}
                    key={item.id}
                    id={item.id} 
                    updateItem={updateItem} 
                    deleteItem={deleteItem}
                    duplicateItem={duplicateItem}/>
                })}
            </div>
            <button className='bt-add-item' onClick={addItem}> + item </button>
        </div>
    )
}