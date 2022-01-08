import React, {Fragment, useState, useEffect} from "react";
import { v4 as uuidv4} from 'uuid'
import './Card.css'
import ItemList from "../itemList/ItemList";
import Total from '../total/Total'


export default function Card({cardName, cardTotal, cardPeople, cardId, cardItemList, activateCard, updateCardList}){
    const [itemList, setItemList] = useState(cardItemList)
    const [total, setTotal] = useState({
        total:cardTotal,
        numPeople:cardPeople
    })
    const [localCardName, setLocalCardName] = useState(cardName)
    const [callEffect, setCallEffetct] = useState(false)

    function getIndex(id){
        let num
        itemList.forEach((e,i) =>{
            if (e.id === id) {num = i}
        })
        return num
    }
    

    // atualizar com o número de pessoas
    useEffect(() => {
        updateTotal(total.numPeople)
    },[total.numPeople])
    
    // atualizar com o valor
    useEffect(() => {
        updateTotal()    
    }, [itemList])
    
    // atualizar o CardList
    useEffect(() =>{
         updateCardList(itemList, total, localCardName)
    },[callEffect])

    function updateCardName(e){
        setLocalCardName(e)
        setCallEffetct(prev => { return !prev})  
    }

    function updateNumPeople(value){
        setTotal(prevstate => ({
            ...prevstate,
            numPeople: value
        })) 
        setCallEffetct(prev => { return !prev})        
    }

    function updateTotal(){
        // checar se existe itens
        if(itemList.length === 0){
            setTotal(prevstate => ({
                ...prevstate,
                total:0.00
            }))
            return
        }
        // criar uma lista só com os valores
        let valueList = itemList.map(e => {
            if(e.valor === '') {
                return 0
            } else {
                return Number(e.value)
            }
        })
        // fazer a soma dos valores e passar para o Total
        let novoTotal
        if (valueList.length > 0) {
            novoTotal = valueList.reduce(function(acumulador, valorAtual){
                return acumulador + valorAtual
            })
            novoTotal = novoTotal/total.numPeople
            setTotal(prevstate => ({
                ...prevstate,
                total:novoTotal.toFixed(2)
            }))
        }
        setCallEffetct(prev => { return !prev})  
    }

    function addItem(){
        // desabilitar os botões dos outros itens
        let buttons = document.querySelectorAll('.buttons')
        buttons.forEach(e => e.classList.add('off'))
        // adicionar um item
        setItemList(prevItem => {
            return [...prevItem, {name:'',value:'', id:uuidv4()}]
        })
        setCallEffetct(prev => { return !prev})  
    }

    function updateItem(item){
        let index = getIndex(item.id)
        let novaList = [...itemList]
        novaList[index].name = item.name
        novaList[index].value = item.value
        setItemList(novaList)
    }

    function duplicateItem(item){
        // desabilitar os botões dos outros itens
        let buttons = document.querySelectorAll('.buttons')
        buttons.forEach(e => e.classList.add('off'))
        setItemList(prevItem => {
            return [...prevItem, {name:item.name, value:item.value, id:uuidv4()}]
        })
    }

    function deleteItem(id){
        let novaList = itemList.filter( item => item.id !== id)
        setItemList(novaList)
    }
    return(
        <div
            className="card"
            onClick ={() => {
                activateCard(cardId)
            }}
        >
            <form>
                <input 
                    className="card-name"
                    type="text"
                    value={localCardName}
                    onChange={event => {
                        updateCardName(event.target.value)                        
                    }}
                />
            </form>
            <ItemList 
                list={itemList} 
                updateItem={updateItem} 
                duplicateItem={duplicateItem}
                deleteItem={deleteItem}    
            />
            <button onClick={addItem}> Adicionar Item </button>
            <Total
                numPeople={total.numPeople}
                total={total.total}
                updateNumPeople={updateNumPeople}
            />
        </div>
    )
}