import React, { useState } from "react";
import './Total.css'

export default function Total({total,updateNumPeople, numPeople}){
    const [localPeople, setLocalPeople] = useState(1) 

    function handleNumPeople(){
        if(localPeople === ''){
            setLocalPeople(1)
            updateNumPeople(1)
            return
        }
        updateNumPeople(localPeople)        
    }

    return(
        <div className="ct-total">
            <div className="display-total">
                <h2>Total / {numPeople}:</h2>
                <h1>{total}</h1>
            </div>
            <form className="numPeople" onBlur={handleNumPeople}>
                <input
                    value={localPeople}
                    type='number'
                    placeholder='Pessoas'
                    onSubmit={e => e.preventDefault}
                    onChange={event => {
                        setLocalPeople(event.target.value)
                    }}
                ></input>
                <label> Número de Pessoas </label>
            </form>
        </div>
    )
}