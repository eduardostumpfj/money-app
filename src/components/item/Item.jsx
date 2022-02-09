import React, {useState} from "react";
import { v4 as uuidv4} from 'uuid'
import './Item.css'

function Item({nameItem, valueItem, id, updateItem, duplicateItem, deleteItem}){
    const[name, setName] = useState(nameItem)
    const[value, setValue] = useState(valueItem)

    function handleUpdate(){
        // excluir item caso não tenha nenhum registro
        if(name === '' && value ===''){
            handleDelete()
            return
        }
        
        let item = {name,value,id}
        updateItem(item)
    }

    function handleDuplicate(){
        let item = {name, value, id:uuidv4()}
        duplicateItem(item)
    }

    function handleDelete(){
        deleteItem(id)
    }

    function enable(e){
        let buttons = document.querySelectorAll('.buttons')
        buttons.forEach(e => {
            let parent = e.parentNode
            if(parent.id === id){
                e.classList.remove('off')
            } else {
                e.classList.add('off')
            }
        })
        // desabilitar os botões caso clique no botão Duplicar
        if (e.target.classList.contains('duplicar')){
            e.target.parentNode.classList.add('off')
        }
        
    }

    function handleFocus(e){
        let cts = document.querySelectorAll('.ct-form')
        // remover todos os ativos 
        cts.forEach(element => {
            element.classList.remove('on')            
        })
        e.target.parentNode.parentNode.classList.add('on')
    }
    
    function handleValue (e){
        if(isNaN(e.target.value)){
            return
        }
        setValue(e.target.value)
    }


    return(
        <div className='item' onClick={enable} id={id} onBlur={handleUpdate}>
            <div className='ct-form'>
                <form className='item-form' onFocus={handleFocus}>
                    <input
                        maxLength='10'
                        className='item-name'
                        type='text' 
                        value={name}
                        placeholder='nome'
                        onChange={event => {
                            setName(event.target.value)
                        }}
                        
                    ></input>
                    <input
                        maxLength='6'
                        className="item-value"
                        type='text'  
                        placeholder='valor'
                        value={value}
                        onChange={handleValue}
                        ></input>
                </form>
            </div>
            <div className="buttons off">
                <button className='button duplicate' onClick={handleDuplicate}></button>
                <button className='button delete' onClick={handleDelete}></button>
            </div>
        </div>
    )
}


export default Item;