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
    const board = this.props.boardName;
    //call axios after mounted
    axios.get(url + '/' + board + '/cards')
        .then((response) => {
          console.log('response', response);
          const cards = response.data.map((card) => {
            const newCard = {...card};
            return newCard;
          });

          this.setState({
            cards,
          })
        })
        .catch((error) => {
          console.log('errors:', error.message);
          this.setState ({
            errorMessage: error.message
          });
        });
  }

  handleUpdate = (id) => {
    console.log('update card with id:', id);
  };

  handleDelete = (id) => {
    console.log('delete card with id:', id);
  };

  render() {
    const cardList = this.state.cards.map((card) => {
      return <Card key={card.id}
                   id={card.id}
                   removeCardCallback={this.handleDelete}
                   updateCardCallback={this.handleUpdate}
                   {...card} />
    });
    console.log('Cardlist:', cardList);
    return (
      <div>
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
