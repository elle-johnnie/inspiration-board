import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';



class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: '',
      cards: [],
      errorMessage: ''
    };



}

  componentDidMount() {
    const url = this.props.url;
    let board = this.props.boardName;
    //call axios after mounted
    axios.get(url + board + '/cards')
        .then((response) => {
          console.log('get response', response);
          const cards = response.data.map((card) => {
            let newCard = {...card};
            return newCard;
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

  handleUpdate = (cardId) => {
    // console.log('update card with id:', id);
    let apiUpdate;
    const url = 'https://inspiration-board.herokuapp.com/cards/'
    // axios.put(url + cardId, apiUpdate)
  };

  handleDelete = (cardId) => {
    console.log('delete card with id:', cardId);
    let updatedList = this.state.cards ;
    console.log('before filter', updatedList);
    updatedList = updatedList.filter(cards => cards.card.id !== cardId);
    console.log('after filter', updatedList);
    this.setState({
        cards: updatedList,
     });
    const url = 'https://inspiration-board.herokuapp.com/cards/';
    axios.delete(url + cardId)
        .then(response => {
          console.log(response);
          console.log(response.data);
        })
  };

  handleAdd = (newCard) => {
    const url = this.props.url;
    let board = this.props.boardName;
    const apiPayload = {...newCard };

    axios.post(url + board + '/cards', apiPayload)
        .then((response) => {
          console.log('post', response.data);
          const newCard = response.data;

          const {cards} = this.state;
          cards.push(newCard);
          this.setState({
            cards,
            errorMessage: 'Card Added! Go forth full of inspiration.',
          })
        })
        .catch((error) => {
          console.log('errors', error.message);
          this.setState({
            errorMessage: `Fail! ${error.message}`,
          })
        });
    };

  render() {
    const cardList = this.state.cards.map((card) => {
      return <Card
                   removeCardCallback={this.handleDelete}
                   updateCardCallback={this.handleUpdate}
                   {...card}
            />
    });
    console.log('Cardlist:', cardList);
    return (
      <div className="board">
        <NewCardForm addCardCallback={this.handleAdd}/>
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
