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
        console.log(this.props.id);
        this.props.removeCardCallback(this.props.id)
    };

    handleUpdate = () => {
        console.log(this.props.id);
        this.props.updateCardCallback(this.props.id)
    };


    render() {
        const {id, text} = this.props;
        let icon = this.props.emoji;
        if (icon !== undefined) {
            icon = emoji.getUnicode(icon);
        }
        return (
            <div className="card hvr-curl-bottom-right" key={id}>
                <section className="card__content">
                    <p className="card__content-text"> {text} </p>
                    <p className="card__content-emoji"> {icon} </p>
                    <section className="buttons">
                    {/*<button*/}
                        {/*onClick={this.handleUpdate}*/}
                        {/*type="button"*/}
                        {/*className="card__update btn hvr-grow-shadow"*/}
                        {/*aria-label="Update"*/}
                    {/*> UPDATE*/}
                    {/*</button>*/}
                    <button
                        onClick={this.handleDelete}
                        type="button"
                        className="card__delete btn hvr-grow-shadow"
                        aria-label="Remove"
                    > REMOVE
                    </button>
                    </section>
                </section>
            </div>
        );
    }
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string,
  emoji: PropTypes.string,
  // updateCardCallback: PropTypes.func,
  removeCardCallback: PropTypes.func,

};

export default Card;
