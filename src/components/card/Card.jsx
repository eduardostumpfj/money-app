import React, {useState, useEffect} from "react";
import { v4 as uuidv4} from 'uuid'
import './Card.css'
import ItemList from "../itemList/ItemList";
import Total from '../total/Total'
import CardName from "../cardName/CardName";


export default function Card({cardName, cardTotal, cardPeople, cardId, cardItemList, updateCardList, saveData}){
    const [itemList, setItemList] = useState(cardItemList)
    const [total, setTotal] = useState({
        total:cardTotal,
        numPeople:cardPeople
    })
    const [localCardName, setLocalCardName] = useState(cardName)
    const [callEffect, setCallEffetct] = useState(false)

    // Gambiarra para a página não atualizar a página com "Enter"
    let bt = document.querySelector('.card-name')
    if(bt != null){
        bt.addEventListener('keydown', (event)=> {
            if(event.key === 'Enter'){
            event.preventDefault()
            }
        })
    }

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
         updateCardList(itemList, total, localCardName, cardId)
         saveData()
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
        // forçar um delay para pegar todos os ítens da lista e colocar o foco no último
        setTimeout(focus,0) 
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
        // forçar um delay para pegar todos os ítens da lista e colocar o foco no último
        setTimeout(focus,0) 
    }

    function deleteItem(id){
        let novaList = itemList.filter( item => item.id !== id)
        setItemList(novaList)
    }

    function focus(){
        const items = document.querySelectorAll('.item')
        const lastIndex = items.length - 1
        items.forEach((e,i) =>{
            if(i !== lastIndex){
                e.firstChild.classList.remove('on')
                e.lastChild.classList.add('off')
            } else {
                e.firstChild.classList.add('on')
                e.lastChild.classList.remove('off')
            }
        })
    }

    return(
        <div className="card">
            <CardName
                cardName={cardName}
                updateCardName={updateCardName}
            />
            <ItemList 
                list={itemList} 
                updateItem={updateItem} 
                duplicateItem={duplicateItem}
                deleteItem={deleteItem}
                addItem={addItem}    
            />

            <Total
                numPeople={total.numPeople}
                total={total.total}
                updateNumPeople={updateNumPeople}
            />
        </div>
    )
}