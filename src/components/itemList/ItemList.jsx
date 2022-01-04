import React from "react";
import { v4 as uuidv4} from 'uuid'
import Item from '../item/Item'

export default function ItemList({lista, updateItem, duplicateItem, deleteItem}){
    return(
        lista.map( item => {
            return <Item
                nomeItem = {item.nome}
                valorItem = {item.valor}
                key={item.id}
                id={item.id} 
                updateItem={updateItem} 
                deleteItem={deleteItem}
                duplicateItem={duplicateItem}/>
        })
    )
}