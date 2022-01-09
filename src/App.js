import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4} from 'uuid'
import CardList from './components/cardList/CardList';
import Card from './components/card/Card'

function App() {
  const [cardList, setCardList] = useState([])
  const [active, setActive] = useState('home')
  const [selectedCard, setselectedCard] = useState({})
  const [monthTotal, setMonthTotal] = useState(0.00)

  function handleAdd(){
    let element = {cardName:'Sem Nome', cardTotal:0.00, cardPeople:1, cardId:uuidv4(), cardItemList:[]}
    setCardList(prev => {
      return [...prev, element]
    })
    setselectedCard(element)
    setActive('card') 
  }

  function deleteCard(id){
    let newCardList = cardList.filter((e,i) => {
      return e.cardId != id
    })
    setCardList(newCardList)
  }

  function activateCard (id) {
    cardList.forEach(e => {
      if(e.cardId === id){
        setselectedCard(e) 
      }
    })
    setActive('card')
  }

  function updateCardList(lista, obj, name, id){
    let index
    let newCardList = cardList
    cardList.forEach((e,i) => {
      if (e.cardId === id){
        index = i
      }
    })
    let element = newCardList[index]
    element.cardName=name
    element.cardTotal=obj.total
    element.cardPeople=obj.numPeople
    element.cardItemList=lista
    setCardList(newCardList)
  }
  
  function handleTotal(){
    if (cardList.length === 0){
      setMonthTotal(0.00)
      return
    }
    let novoTotal
    let valueList =  cardList.map(e => {
      return Number(e.cardTotal)
    })
    novoTotal = valueList.reduce(function(acumulador, valorAtual){
      return acumulador + valorAtual
    })
    setMonthTotal(novoTotal)
  }

  useEffect(()=>{
    if(active === 'card'){
      document.querySelector('#bt-home').classList.remove('off')
    } else if (active === 'home'){
      document.querySelector('#bt-home').classList.add('off')
    }
    handleTotal()
  },[active])

  useEffect(()=>{
    handleTotal()
  },[cardList])


  function renderContent(){
    if(active === 'home'){
      return (
        <>
          <CardList 
            data = {cardList}
            className='card-list'
            activateCard={activateCard}
            handleAdd={handleAdd}
            deleteCard={deleteCard}
          />
          <h1 className='month-total'> TOTAL : {monthTotal}</h1>
        </>
      )
    } else if (active === 'card'){
      return (
        <Card
          key={selectedCard.cardId}
          cardName={selectedCard.cardName}
          cardTotal = {selectedCard.cardTotal}
          cardPeople = {selectedCard.cardPeople}
          cardId = {selectedCard.cardId}
          cardItemList = {selectedCard.cardItemList}
          activateCard={activateCard}
          updateCardList={updateCardList}
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
