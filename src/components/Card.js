// import React, { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

// class Card extends Component {
const Card = (props) => {
    const { id, text } = props.card;
    let icon = props.card.emoji;
    if (icon !== null) {
        icon = emoji.getUnicode(icon)
    }
    const handleDelete = () => {
        console.log(props.card.id);
        props.removeCardCallback(props.card.id)
    };

    const handleUpdate = () => {
        console.log(props.id);
        props.updateCardCallback(props.id)
    };
  // render() {
    return (
      <div className="card" key={id}>
          <section className="card__content">
            <p className="card__content-text"> {text} </p>
            <p className="card__content-emoji"> { icon }</p>

            <button
                 onClick={handleUpdate}
                 type="button"
                className="card__update"
                aria-label="Update"
             > UPDATE
            </button>
            <button
                onClick={handleDelete}
                type="button"
                className="card__delete"
                aria-label="Remove"
            > REMOVE
           </button>
          </section>
      </div>
    );
  // }
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  emoji: PropTypes.string,
  updateCardCallback: PropTypes.func,
  removeCardCallback: PropTypes.func,

};

export default Card;
