import React from "react";
import './Menu.css'


export default function Menu({active, setActive, monthTotal}){
    function handleActive(){
        setActive('home')
    }

    function renderMenu(){
        let localMonth = Number(monthTotal).toFixed(2)
        if(active === 'card'){
            return (
                <button id='bt-home' onClick={handleActive}>
                    <div className='bt-home-icon'></div>
                    <p> voltar </p>  
                </button>
            )                
        } else if (active === 'home'){
            return (
                    <div className="menu-total">
                        <h1 className='menu-total-txt'> total </h1>
                        <h1 className="mini menu"><span>R$</span> {localMonth}</h1>
                    </div>
            )
        }
    }

    return (
        <div className='side-menu'>
            {renderMenu()}
        </div>
    )
} 