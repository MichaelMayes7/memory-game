import React, { Component } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';

 const generateDeck = () => {
  const symbols = ['∆','ß','£','§','•', '$', '+', 'ø'];
  const deck = [];
  
  
  for (let i = 0; i < 16; i++) {
    const card = {
    isFlipped : false,
    symbol: symbols[i % 8]
    }
    
    deck.push(card);
  }

  shuffle(deck);
  return deck;
}

const shuffle = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: generateDeck(),
      pickedCards: []
    }
  }

  pickCard(cardIndex) {
    console.log('picked a card')
    if(this.state.deck[cardIndex].isFlipped) {
      return;
    }
  
    const cardToFlip = {...this.state.deck[cardIndex]}
    cardToFlip.isFlipped = true;
    let newPickedCards = this.state.pickedCards.concat(cardIndex)
    const newDeck = this.state.deck.map((card, index) => {
      if(cardIndex === index) {
        return cardToFlip;
      }
      return card;
    });

    if(newPickedCards.length === 2) {
      const card1Index = newPickedCards[0];
      const card2Index = newPickedCards[1];
      if(this.state.deck[card1Index].symbol !== this.state.deck[card2Index].symbol) {
        setTimeout(this.unflipCards.bind(this, card1Index, card2Index), 1000);
        console.log('no match')
      } else { console.log('match') }
      newPickedCards = [];
    }
  
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });
  }

  unflipCards(card1Index, card2Index) {
    let newDeck = this.state.deck.map((card, index) => {
      if(index === card1Index || index === card2Index){
        card.isFlipped = false;
      }
      return card;
    });
    this.setState({ deck: newDeck });
    console.log('should be unflipped');
  }

  render () {
  const cardsJSX = this.state.deck.map((card, index) => {
    return <MemoryCard
    symbol={card.symbol}
    isFlipped={card.isFlipped}
    key={index}
    pickCard = {this.pickCard.bind(this, index)}
    />
  });

  return (
    <div className="App">
      <header className="App-header">
        <h3>Memory Game</h3>
        <span className="headerSpan">Match Cards To Win</span>
      </header>
      <div className='rowWrapper'>
        {cardsJSX.slice(0,4)}
      </div>
      <div className='rowWrapper'>
        {cardsJSX.slice(4,8)}
      </div>
      <div className='rowWrapper'>
        {cardsJSX.slice(8,12)}
      </div>
      <div className='rowWrapper'>
        {cardsJSX.slice(12,16)}
      </div>
    </div>
  );
}
}

