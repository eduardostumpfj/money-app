import React, { useState } from "react";

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
            <h2>Total / {numPeople}:</h2>
            <h1>{total}</h1>
            <form className="numPeople" onBlur={handleNumPeople}>
                <input
                    value={localPeople}
                    type='number'
                    placeholder='Pessoas'
                    onChange={event => {
                        setLocalPeople(event.target.value)
                    }}
                ></input>
                <label> Número de Pessoas </label>
            </form>
        </div>
    )
}