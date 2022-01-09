import React from "react";
import './MinCard.css'

export default function MinCard({activateCard, cardId, cardPeople, cardTotal, cardName, deleteCard}){
    function handleDelete(){
        deleteCard(cardId)
    }
    return (
        <div className="card">
            <div className="bts-option">
                <button className="del" onClick={handleDelete}>Deletar</button>      
            </div>

            <div onClick ={() => {
                activateCard(cardId)
            }}>
                <h1 className="card-name"> {cardName}</h1>
                <div className="display-total">
                    <h2>Total / {cardPeople}:</h2>
                    <h1>{cardTotal}</h1>
                </div>
            </div>
        </div>    
    )
}