import React, { useState, useEffect } from "react";
import './Total.css'

export default function Total({total,updateNumPeople, numPeople}){
    const [localPeople, setLocalPeople] = useState(numPeople) 

    function txtPessoas(){
        if(localPeople > 1){
            return 'Pessoas'
        } else return 'Pessoa'
    }

    function handleSub(){
        let newPeople = localPeople
        newPeople = newPeople -1

        setLocalPeople(newPeople)
    }

    function handleSum(){
        let newPeople = localPeople
        newPeople += 1
        setLocalPeople(newPeople)

    }
    // LCOAL PEOPLE = checar a quantidade para remover o botão sub e atualizar o número no card
    useEffect(()=>{
        if(localPeople <= 1){
            document.querySelector('.sub').classList.add('off')
        } else {
            document.querySelector('.sub').classList.remove('off')
        }    
        updateNumPeople(localPeople) 
    }, [localPeople])

    return(
        <div className="ct-total">
            <div className="display-total">
                <h2>Total / {numPeople}:</h2>
                <h1>{total}</h1>
            </div>
            <div className="num-people">
                <p>Dividir em:</p>
                <div className="bt-area">
                    <button className="button sub" onClick={handleSub}></button>
                    <h1> {localPeople} {txtPessoas()}</h1>
                    <button className="button sum" onClick={handleSum}></button>
                </div>
            </div>
        </div>
    )
}