import React, {Fragment, useState} from "react";
import { v4 as uuidv4} from 'uuid'
import ItemList from "../itemList/ItemList";
import Total from '../total/Total'


export default function Card(){
    const [itemList, setItemList] = useState([])
    const [total, setTotal] = useState(0)
    const [numPeople, setNumPeople] = useState(1)


    function getIndex(id){
        let num
        itemList.forEach((e,i) =>{
            if (e.id === id) {num = i}
        })
        return num
    }
    
    function updateNumPeople(valor){
        setNumPeople(valor)
        updateTotal(valor)
    }

    function updateTotal(valor, list){
        if(list !== undefined && list.length === 0){console.log('foi')}
        if (valor === undefined){ valor = 1}
        let novoTotal
        let valueList = itemList.map(e => {
            if(e.valor === '') {
                return 0
            } else {
                return Number(e.valor)
            }
        })
        if (valueList.length > 0) {
            novoTotal = valueList.reduce(function(acumulador, valorAtual){
                return acumulador + valorAtual
            })
            novoTotal = novoTotal/valor
            setTotal(novoTotal.toFixed(2))
        }
    }

    function addItem(){
        // desabilitar os botões dos outros itens
        let buttons = document.querySelectorAll('.buttons')
        buttons.forEach(e => e.classList.add('off'))
        // adicionar um item
        setItemList(prevItem => {
            return [...prevItem, {nome:'',valor:'', id:uuidv4()}]
        })
        updateTotal(numPeople)
    }

    function updateItem(item){
        let index = getIndex(item.id)
        let novaList = [...itemList]
        novaList[index].nome = item.nome
        novaList[index].valor = item.valor
        setItemList(novaList)
        updateTotal(numPeople)
    }

    function duplicateItem(item){
        // desabilitar os botões dos outros itens
        let buttons = document.querySelectorAll('.buttons')
        buttons.forEach(e => e.classList.add('off'))
        setItemList(prevItem => {
            return [...prevItem, {nome:item.nome, valor:item.valor, id:uuidv4()}]
        })
        updateTotal(numPeople)
    }

    function deleteItem(id){
        let novaList = itemList.filter( item => item.id !== id)
        setItemList(novaList)
        updateTotal(numPeople)
    }
    




    return(
        <Fragment>
            <ItemList 
                lista={itemList} 
                updateItem={updateItem} 
                duplicateItem={duplicateItem}
                deleteItem={deleteItem}    
            />
            <button onClick={addItem}> Adicionar </button>
            <Total
                numPeople={numPeople}
                total={total}
                updateNumPeople={updateNumPeople}
            />
        </Fragment>
    )
}