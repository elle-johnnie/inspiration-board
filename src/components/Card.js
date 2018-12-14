import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
        }
    };

    handleDelete = () => {
        console.log(this.props.card.id);
        this.props.removeCardCallback(this.props.card.id)
    };

    handleUpdate = () => {
        console.log(this.props.card.id);
        this.props.updateCardCallback(this.props.card.id)
    };

    render() {
        const {id, text} = this.props.card;
        let icon = this.props.card.emoji;
        if (icon !== undefined) {
            icon = emoji.getUnicode(icon);
        }
        return (
            <div className="card" key={id}>
                <section className="card__content">
                    <p className="card__content-text"> {text} </p>
                    <p className="card__content-emoji"> {icon}</p>

                    <button
                        onClick={this.handleUpdate}
                        type="button"
                        className="card__update"
                        aria-label="Update"
                    > UPDATE
                    </button>
                    <button
                        onClick={this.handleDelete}
                        type="button"
                        className="card__delete"
                        aria-label="Remove"
                    > REMOVE
                    </button>
                </section>
            </div>
        );
    }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  emoji: PropTypes.string,
  updateCardCallback: PropTypes.func,
  removeCardCallback: PropTypes.func,

};

export default Card;
