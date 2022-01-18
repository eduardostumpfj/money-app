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


    
    return(
        <div className='item' onClick={enable} id={id} onBlur={handleUpdate} autoFocus>
            <div className='on'>
                <form className='item-form'>
                    <input
                        maxLength='10'
                        className='item-name'
                        type='text' 
                        value={name}
                        placeholder='Nome'
                        onChange={event => {
                            setName(event.target.value)
                        }}
                        
                    ></input>
                    <input 
                        className="item-value"
                        type='number'  
                        placeholder='Valor'
                        max='100'
                        value={value}
                        onChange={event => {
                            setValue(event.target.value)
                        }}
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