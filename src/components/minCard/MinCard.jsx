import React from "react";
import './MinCard.css'

export default function MinCard({activateCard, cardId, cardPeople, cardTotal, cardName, deleteCard, duplicateCard}){
    function handleDelete(){
        deleteCard(cardId)
    }

    function handleDuplicate(){
        duplicateCard(cardId)
    }

    function handleMore(element){
        let bts = document.querySelectorAll('.bts-option')
        let btsMore = document.querySelectorAll('.bt-more')
        // Habilitar os outros botões
        btsMore.forEach( i => {
            if(i.classList.contains('off')){
                i.classList.remove('off')
            }
        })

        bts.forEach(e => {
            if(e.parentNode.id !== cardId){
                e.classList.add('off')
            } else {
                element.target.classList.add('off')
                e.classList.remove('off')
            }
        })

    }

    return (
        <div className='full-mini-card' id={cardId}>      
            <div className="mini-card">
                <div className="bt-more" onClick={handleMore}></div>
                <div className="mini-body" onClick ={() => {activateCard(cardId)}}>                    
                    <h1 className="mini-card-name"> {cardName} </h1>
                    <div className="mini-total">
                        <h2 className="mini-total-txt">total / {cardPeople}:</h2>
                        <h1 className="num-total mini"><span>R$</span> {cardTotal}</h1>
                    </div>
                </div>
            </div>

            <div className="bts-option off">
                <button className=" button delete" onClick={handleDelete}></button>      
                <button className="button duplicate" onClick={handleDuplicate}></button>      
            </div>
        </div>    
    )
}