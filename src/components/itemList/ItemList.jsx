import React from "react";
import { v4 as uuidv4} from 'uuid'
import Item from '../item/Item'

export default function ItemList({list, updateItem, duplicateItem, deleteItem}){
    return(
        list.map( item => {
            return <Item
                nameItem = {item.name}
                valueItem = {item.value}
                key={item.id}
                id={item.id} 
                updateItem={updateItem} 
                deleteItem={deleteItem}
                duplicateItem={duplicateItem}/>
        })
    )
}