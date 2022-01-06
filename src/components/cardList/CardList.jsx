import React from "react";
import Card from "../card/Card";
import MinCard from "../minCard/MinCard";

export default function CardList({data, activateCard}){
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
        /> 
           
        })}
        </div>
    )
}