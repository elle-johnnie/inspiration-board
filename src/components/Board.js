import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: '',
      cards: [],
      errorMessage: '',
      boards: [],
    };
}

  componentDidMount() {
    const url = this.props.url;
    let board = this.props.boardName;
    // get all the available boards for add a card options
      let boardsUrl = "https://inspiration-board.herokuapp.com/boards";
      axios.get(boardsUrl)
          .then((response) => {
              console.log('boards', response.data);
              const boards = response.data.map((boardData) => {
                  return boardData["board"];
              });
              this.setState ({
                  boards,
              })
          });


    //call axios after mounted
    axios.get(url + board + '/cards')
        .then((response) => {
          console.log('get response', response);
          const cards = response.data.map((cardData) => {
            return cardData['card'];
          });

          this.setState({
            cards: cards,
          });
          console.log('this state', this.state.cards);
        })
        .catch((error) => {
          console.log('errors:', error.message);
          this.setState ({
            errorMessage: error.message
          });
        });
  }

  // handleUpdate = (cardId) => {
  //   // console.log('update card with id:', id);
  //   let apiUpdate;
  //   const url = 'https://inspiration-board.herokuapp.com/cards/'
  //   // axios.put(url + cardId, apiUpdate)
  // };

  handleDelete = (cardId) => {
    console.log('delete card with id:', cardId);
    let updatedList = this.state.cards ;
    updatedList = updatedList.filter(cards => cards.id !== cardId);

    this.setState({
        cards: updatedList,
     });
    const url = 'https://inspiration-board.herokuapp.com/cards/';
    axios.delete(url + cardId)
        .then(response => {
          console.log(response.data);
        })
  };

  handleAdd = (newCard) => {
    console.log('handle adding to', newCard);
    const url = this.props.url;
    let board = newCard.board;
    console.log('board:', board);
    const apiPayload = {...newCard };

    axios.post(url + board + '/cards', apiPayload)
        .then((response) => {
          console.log('post', response.data.card);
          const newCard = response.data.card;
          const {cards} = this.state;
          cards.push(newCard);
          // instead of pushing could use spread operator
          //  to push new card data to array of cards
          //  const cards = [newCard, ...this.state.cards];
          this.setState({
            cards,
            errorMessage: 'Card Added! Go forth full of inspiration.',
          })
        })
        .catch((error) => {
          console.log('errors', error.message);
          this.setState({
            errorMessage: `Failure! ${error.message}`,
          })
        });
    };

  render() {
    const cardList = this.state.cards.map((card) => {
        console.log('card info', card.id);
      return <Card
               {...card}
               key={card.id}
               removeCardCallback={this.handleDelete}
               // updateCardCallback={this.handleUpdate}
            />
    });
    // console.log('Cardlist:', cardList);
    return (
      <div className="board">
        <NewCardForm
            boards={this.state.boards}
            addCardCallback={this.handleAdd}/>
        { cardList }
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string,
};

export default Board;
