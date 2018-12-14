import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"];

class NewCardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            text: '',
            emoji: '',
            board: ''
        };
    }


    resetState = () => {
        this.setState({
            id: '',
            text: '',
            emoji: '',
            board: ''
        });
    };

    handleFormChanges = (e) => {
        console.log('changes', e.target);
        console.log('state', this.state);
        const updatedState = {};
        const field = e.target.name;

        updatedState[field] = e.target.value;
        this.setState(updatedState);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addCardCallback(this.state);
        this.resetState();
    };

    renderEmojiOptions = () => {
        const listEmojis = EMOJI_LIST.map((emojiStr) => {
            return (
                <option
                    name="emoji"
                    value={emoji}
                >
                    {emoji.getUnicode(`${emojiStr}`)}
                </option>)

        });
        return listEmojis;
    };

    render() {

        return(

                <div className="new-card-form">
                    <form
                        className="new-card-form__form"
                        onSubmit={this.handleSubmit}
                    >
                        <p className="new-card-form__header">Add a Card</p>
                        <label
                            className="new-card-form__form-label"
                            htmlFor="Text"
                        >TEXT</label>
                        <input
                            type="text"
                            name="text"
                            value={this.state.text}
                            className="new-card-form__form-textarea"
                            onChange={this.handleFormChanges}
                            placeholder="Textual Inspiration"

                        />

                        <label
                            className="new-card-form__form-label"
                            htmlFor="Emoji"
                        >EMOJI</label>
                        <select
                            name="emoji"
                            id="emoji"
                            value={this.state.emojiStr}
                            className="new-card-form__form-select"
                            onChange={this.handleFormChanges}

                        >
                            { this.renderEmojiOptions() }
                        </select>

                        <input type="submit"
                               value="Create Card"
                               className="new-card-form__form-button"
                               onSubmit={this.handleSubmit}
                        />
                    </form>
                </div>
         
        )
    }
}

NewCardForm.propTypes = {
    addCardCallback: PropTypes.func
};

export default NewCardForm