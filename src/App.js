import { Fragment, useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4} from 'uuid'
import CardList from './components/cardList/CardList';
import Card from './components/card/Card'
import Menu from './components/menu/Menu'

function App() {
  // VERIFICAR SE EXITE DADO SALVO, CASO NÃO EXISTA, COMEÇAR DO ZERO
  let lc_data = JSON.parse(localStorage.getItem('ls_cardList'))
  if(lc_data === null){
    lc_data = []
  }

  const [cardList, setCardList] = useState(lc_data)
  const [active, setActive] = useState('home')
  const [selectedCard, setselectedCard] = useState({})
  const [monthTotal, setMonthTotal] = useState(0.00)
  
  //LOCAL STORAGE ------------------------------------------------------------------------------------------------

  function saveData(){
    localStorage.setItem('ls_cardList', JSON.stringify(cardList))
  }

  // FUNÇÕES RELACIONADAS AOS MINI CARDS----------------------------------------------------------------
  function handleAdd(){
    let element = {cardName:'Sem Nome', cardTotal:0.00, cardPeople:1, cardId:uuidv4(), cardItemList:[]}
    setCardList(prev => {
      return [...prev, element]
    })
    setselectedCard(element)
    setActive('card') 
  }

  function deleteCard(id){
    let newCardList = cardList.filter((e) => {
      return e.cardId != id
    })
    setCardList(newCardList)
  }

  function duplicateCard(id){
    let card
    cardList.forEach(e=> {
      if (e.cardId === id){ card = e}
    }) 
    let elemento = {
      cardName:`Copia do ${card.cardName}`,
      cardTotal:card.cardTotal,
      cardPeople:card.cardPeople,
      cardId:uuidv4(),
      cardItemList:card.cardItemList
    }
    setCardList(prev => {
      return [...prev, elemento]
    })
    setselectedCard(elemento)
    setActive('card') 
  }

  function activateCard (id) {
    cardList.forEach(e => {
      if(e.cardId === id){
        setselectedCard(e) 
      }
    })
    setActive('card')
  }

// ATUALIZAR A LISTA DOS CARDS --------------------------------------------------------------------------
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
//  EFEITOS ----------------------------------------------------------------------------------------------
  //  Mudar a interface quando atualizar o active
  useEffect(()=>{
    // if(active === 'card'){
    //   document.querySelector('#bt-home').classList.remove('off')
    // } else if (active === 'home'){
    //   document.querySelector('#bt-home').classList.add('off')
    // }
    handleTotal()
  },[active])

  //  Atualizar o total quando mudar a lista de cards
  useEffect(()=>{
    saveData()
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
            duplicateCard={duplicateCard}
          />
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
          saveData={saveData}
        ></Card>
      )
    }
  }



  return (
    <div className='ct-all'>
      <Menu
        active={active}
        setActive={setActive}
        monthTotal={monthTotal}
      ></Menu>
      <div className='conteiner'>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
