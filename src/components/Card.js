// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

// class Card extends Component {
const Card = (props) => {
    // const emoji = require("emoji-dictionary");
    const { id, text, emojiStr } = props.card;
  // render() {

    return (
      <div className="card" key={id}>
          <section className="card__content">
              <p className="card__content-text"> {text} </p>
              <p className="card__content-emoji"> { emoji.getUnicode(`${emojiStr}`) }</p>
          </section>
        <button
            onClick={props.updateCardCallback(id)}
            type="button"
            className="card__update"
            aria-label="Update"
        > UPDATE
        </button>
        <button
            onClick={props.removeCardCallback(id)}
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
  emoji: PropTypes.string,
  updateCardCallback: PropTypes.func,
  removeCardCallback: PropTypes.func,

};

export default Card;
