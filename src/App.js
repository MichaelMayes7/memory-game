import React, { Component } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard';

 const generateDeck = () => {
  const symbols = ['∆','ß','£','§','•', '$', '+', 'ø'];
  const deck = [];
  
  for (let i = 0; i < 16; i++) {
    deck.push({
    isFlipped: false,
    symbol: symbols[i % 8]
  });
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
      if(card1Index.symbol !== card2Index.symbol) {
        const firstCard = newDeck[card1Index];
        const secondCard = newDeck[card2Index];
        this.unflipCards(firstCard, secondCard);
      }

      newPickedCards = [];
    }
  
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    });
  }

  unflipCards(card1Index, card2Index) {
    const card1 = {...this.state.deck[card1Index]};
    const card2 = {...this.state.deck[card2Index]};
    card1.isFlipped = false;
    card2.isFlipped = false;

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

