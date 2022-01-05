import React from "react";
import Card from "../card/Card";

export default function CardList({data}){
    return(
        <div className="card-list">
        {data.map( e => {
            return <Card 
                key={e.cardId}
                cardNome={e.cardNome}
                cardTotal = {e.cardTotal}
                cardPeople = {e.cardPeople}
                cardId = {e.cardId} />            
        })}
        </div>
    )
}