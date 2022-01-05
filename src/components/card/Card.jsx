import React, {Fragment, useState, useEffect} from "react";
import { v4 as uuidv4} from 'uuid'
import './Card.css'
import ItemList from "../itemList/ItemList";
import Total from '../total/Total'


export default function Card({cardNome, cardTotal, cardPeople, cardId}){
    const [itemList, setItemList] = useState([])
    const [total, setTotal] = useState({
        valorTotal:cardTotal,
        numPeople:cardPeople
    })
    const [cardName, setCardName] = useState(cardNome)

    function getIndex(id){
        let num
        itemList.forEach((e,i) =>{
            if (e.id === id) {num = i}
        })
        return num
    }
    
    function updateNumPeople(valor){
        setTotal(prevstate => ({
            ...prevstate,
            numPeople: valor
        }))       
    }
    // atualizar com o número de pessoas
    useEffect(() => {
        updateTotal(total.numPeople)
    },[total.numPeople])
    
    // atualizar com o valor
    useEffect(() => {
        updateTotal()        
    }, [itemList])

    function updateTotal(){
        // checar se existe itens
        if(itemList.length === 0){
            setTotal(prevstate => ({
                ...prevstate,
                valorTotal:0.00
            }))
            return
        }
        // criar uma lista só com os valores
        let valueList = itemList.map(e => {
            if(e.valor === '') {
                return 0
            } else {
                return Number(e.valor)
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
                valorTotal:novoTotal.toFixed(2)
            }))
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
    }

    function updateItem(item){
        let index = getIndex(item.id)
        let novaList = [...itemList]
        novaList[index].nome = item.nome
        novaList[index].valor = item.valor
        setItemList(novaList)
    }

    function duplicateItem(item){
        // desabilitar os botões dos outros itens
        let buttons = document.querySelectorAll('.buttons')
        buttons.forEach(e => e.classList.add('off'))
        setItemList(prevItem => {
            return [...prevItem, {nome:item.nome, valor:item.valor, id:uuidv4()}]
        })
        // updateTotal(total.numPeople)
    }

    function deleteItem(id){
        let novaList = itemList.filter( item => item.id !== id)
        setItemList(novaList)
    }
    
    return(
        <div className="card">
            <form>
                <input 
                    className="card-name"
                    type="text"
                    value={cardName}
                    onChange={event => {
                        setCardName(event.target.value)
                    }}
                />
            </form>
            <ItemList 
                lista={itemList} 
                updateItem={updateItem} 
                duplicateItem={duplicateItem}
                deleteItem={deleteItem}    
            />
            <button onClick={addItem}> Adicionar Item </button>
            <Total
                numPeople={total.numPeople}
                total={total.valorTotal}
                updateNumPeople={updateNumPeople}
            />
        </div>
    )
}