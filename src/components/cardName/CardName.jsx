import React from "react";
import { useState } from "react/cjs/react.development";

export default function CardName({cardName, updateCardName}){
    const [name, setName] = useState(cardName)
    function handleName(){
        if(name === ''){
            setName('Sem Nome')
        }
        updateCardName(name)
    }
    return(
        <form>
            <input 
                maxLength='20'
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