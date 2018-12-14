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
          // const cards = response.data.map((card) => {
          //   let newCard = {...card};
          //   return newCard;
          // });

          this.setState({
            cards: response.data,
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

  handleUpdate = (id) => {
    // console.log('update card with id:', id);
  };

  handleDelete = (id) => {
    // console.log('delete card with id:', id);
  };

  handleAdd = (newCard) => {
    const url = this.props.url;
    let board = this.props.boardName;
    const apiPayload = {...newCard };

    axios.post(url + board + '/cards', apiPayload)
        .then((response) => {
          console.log('post', response);
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
                   key={card.id}
                   id={card.id}
            />
    });
    console.log('Cardlist:', cardList);
    return (
      <div>
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
