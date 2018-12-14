import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

// class Card extends Component {
const Card = (props) => {
  const { id, text, emoji } = props.card;
  // render() {
    console.log(props);
    return (
      <div className="card" key={id}>
          <section className="card__content">
              <p className="card__content-text"> {text} </p>
              <p className="card__content-emoji"> {emoji} </p>
          </section>
        <button
            onClick={props.updateCardCallback(props.id)}
            type="button"
            className="card__update"
            aria-label="Update"
        > UPDATE
        </button>
        <button
            onClick={props.removeCardCallback(props.id)}
            type="button"
            className="card__delete"
            aria-label="Remove"
        > REMOVE
        </button>
      </div>
    );
  // }
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emoji: PropTypes.object,
  updateCardCallback: PropTypes.func,
  deleteCardCallback: PropTypes.func,

};

export default Card;
