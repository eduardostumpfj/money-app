import React, {useState} from "react";
import { v4 as uuidv4} from 'uuid'
import './Item.css'

function Item({nomeItem, valorItem, id, updateItem, duplicateItem, deleteItem}){
    const[nome, setNome] = useState(nomeItem)
    const[valor, setValor] = useState(valorItem)

    function handleUpdate(){
        // excluir item caso não tenha nenhum registro
        if(nome === '' && valor ===''){
            handleDelete()
            return
        }
        let item = {nome,valor,id}
        updateItem(item)
    }

    function handleDuplicate(){
        let unicId = uuidv4()
        let item = {nome, valor, id:unicId}
        duplicateItem(item)
    }

    function handleDelete(){
        deleteItem(id)
    }

    function habilitar(e){
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
        <div className='item' onClick={habilitar} id={id} onBlur={handleUpdate} autoFocus>
            <form>
                <input
                    type='text' 
                    value={nome}
                    placeholder='Nome'
                    onChange={event => {
                        setNome(event.target.value)
                    }}
                    
                ></input>
                <input 
                    type='number'  
                    placeholder='Valor'
                    value={valor}
                    onChange={event => {
                        setValor(event.target.value)
                    }}
                    ></input>
            </form>
            <div className="buttons">
                <button className='salvar' onClick={handleUpdate}>Salvar</button>
                <button className='duplicar' onClick={handleDuplicate}> Duplicar </button>
                <button className='deletar' onClick={handleDelete}> Deletar </button>
            </div>
        </div>
    )
}


export default Item;