import React from "react";
import Total from '../total/Total'

export default function MinCard({activateCard, cardId, cardPeople, cardTotal, cardName}){
    return (
        <div className="card" onClick ={() => {
            activateCard(cardId)
        }}>
            <h1 className="card-name"> {cardName}</h1>
             <div className="display-total">
                <h2>Total / {cardPeople}:</h2>
                <h1>{cardTotal}</h1>
            </div>
        </div>
    )
}