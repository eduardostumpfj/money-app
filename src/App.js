import { Fragment, useState } from 'react';
import './App.css';
import { v4 as uuidv4} from 'uuid'
import CardList from './components/cardList/CardList';

function App() {
  const [cardList, setCardList] = useState([])
  const [active, setActive] = useState()

  function handleAdd(){
    setCardList(prev => {
      return [...prev, {cardName:'Sem Nome', cardTotal:0.00, cardPeople:1, cardId:uuidv4()}]

    })
  }
  return (
    <Fragment>
      <div>
        <button></button>
      </div>
      <div className='conteiner'>
        <CardList data = {cardList} className='card-list' /> 
        <button onClick={handleAdd}>Novo card</button>
      </div>
    </Fragment>
  );
}

export default App;
