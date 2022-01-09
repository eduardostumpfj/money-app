import React from "react";
import MinCard from "../minCard/MinCard";
import './CardList.css'

export default function CardList({data, activateCard, handleAdd, deleteCard, duplicateCard}){
    return(
        <div className="card-list">
            {data.map( e => {

                return <MinCard 
                key={e.cardId}
                cardName={e.cardName}
                cardTotal = {e.cardTotal}
                cardPeople = {e.cardPeople}
                cardId = {e.cardId}
                activateCard={activateCard}
                deleteCard={deleteCard}
                duplicateCard={duplicateCard}
            />             
            })}
            <button className="bt-add-card" onClick={handleAdd}>Novo Card</button>
        </div>
    )
}