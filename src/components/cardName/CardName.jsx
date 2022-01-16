import React from "react";
import { useState } from "react/cjs/react.development";

export default function CardName({cardName, updateCardName}){
    const [name, setName] = useState(cardName)
    function handleName(){
        updateCardName(name)
    }
    return(
        <form>
            <input 
                className="card-name"
                type="text"
                value={name}
                onChange={event => {
                    setName(event.target.value)                        
                }}
                onBlur={handleName}
            />
        </form>
    )
}