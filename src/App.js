import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4} from 'uuid'
import CardList from './components/cardList/CardList';
import Card from './components/card/Card'

function App() {
  const [cardList, setCardList] = useState([])
  const [active, setActive] = useState('home')
  const [selectedCard, setselectedCard] = useState({})

  function handleAdd(){
    setCardList(prev => {
      return [...prev, {cardName:'Sem Nome', cardTotal:0.00, cardPeople:1, cardId:uuidv4()}]
    })
    activateCard()
  }

  function activateCard (id) {
    cardList.forEach(e => {
      if(e.cardId === id){
        setselectedCard(e) 
      }
    })  
    setActive('card')
  }

  useEffect(()=>{
    if(active === 'card'){
      document.querySelector('#bt-home').classList.remove('off')
    } else if (active === 'home'){
      document.querySelector('#bt-home').classList.add('off')
    }
  },[active])

  function renderContent(){
    if(active === 'home'){
      return (
        <>
        <CardList 
          data = {cardList}
          className='card-list'
          activateCard={activateCard}
        /> 
        <button onClick={handleAdd}>Novo card</button>
        </>
      )
    } else if (active === 'card'){
      console.log(selectedCard)
      return (
        <Card
          key={selectedCard.cardId}
          cardName={selectedCard.cardName}
          cardTotal = {selectedCard.cardTotal}
          cardPeople = {selectedCard.cardPeople}
          cardId = {selectedCard.cardId}
          activateCard={activateCard}
        ></Card>
      )
    }
  }
  return (
    <Fragment>
      <div>
        <button id='bt-home'onClick={() => {setActive('home')}}> Home </button>
      </div>
      <div className='conteiner'>
        {renderContent()}
      </div>
    </Fragment>
  );
}

export default App;
