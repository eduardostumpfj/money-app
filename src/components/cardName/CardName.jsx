import React, {useState} from "react";
import './CardName.css'

export default function CardName({cardName, updateCardName}){
    const [name, setName] = useState(cardName)
    function handleName(){
        if(name === ''){
            setName('Sem Nome')
        }
        updateCardName(name)
    }
    return(
        <form className="card-name">
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