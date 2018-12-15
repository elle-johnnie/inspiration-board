import React, { Component } from 'react';
// import axios from 'axios';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';


const EMOJI_LIST = ["heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog", ,"100","1234","grinning","grimacing","grin","joy","rofl","partying","smiley","smile","sweat_smile","laughing","innocent","wink","blush","slightly_smiling_face","upside_down_face","relaxed","yum","relieved","heart_eyes","smiling_face_with_three_hearts","kissing_heart","kissing","kissing_smiling_eyes","kissing_closed_eyes","stuck_out_tongue_winking_eye","zany","raised_eyebrow","monocle","stuck_out_tongue_closed_eyes","stuck_out_tongue","money_mouth_face","nerd_face","sunglasses","star_struck","clown_face","cowboy_hat_face","hugs","smirk","no_mouth","neutral_face","expressionless","unamused","roll_eyes","thinking","lying_face","hand_over_mouth","shushing","symbols_over_mouth","exploding_head","flushed","pensive","confused","slightly_frowning_face","frowning_face","persevere","confounded","tired_face","weary","pleading","triumph","open_mouth","scream"]
class NewCardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            emoji: '',
            board: '',
        };
    }


    resetState = () => {
        this.setState({
            text: '',
            emoji: '',
            board: { name: '' },
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
        // require at least some text or an emoji
        if (this.state.text === "" && this.state.emoji === "") return;
        console.log('submit', this.state);
        this.props.addCardCallback(this.state);
        this.resetState();
    };

    renderEmojiOptions = () => {
        const listEmojis = EMOJI_LIST.map((emojiStr, i) => {
            return (
                <option
                    key={i}
                    name="emoji"
                    value={emoji}
                >
                    {emoji.getUnicode(`${emojiStr}`)}
                </option>)

        });
        return [<option name="board" value="" key="emoji-select">Emoji Selector</option>, listEmojis];
    };


    renderBoardOptions = () => {
        const listBoards = this.props.boards.map((board) => {
            // console.log(board.board.name);
            return (
                <option
                    name="board"
                    key={board.name}
                    value={board.name}
                >
                    {board.name}
                </option>)

    });
        return [<option name="board" value="" key="board-select">Select a board</option>, listBoards];
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

                            key={this.props.value}
                            value={this.state.emojiStr}
                            className="new-card-form__form-select"
                            onChange={this.handleFormChanges}

                        >
                            { this.renderEmojiOptions() }
                        </select>
                        <label
                            className="new-card-form__form-label"
                            htmlFor="board"
                        >BOARD</label>
                        <select
                            name="board"
                            id="board"
                            key={this.state.board.id}
                            value={this.state.board.name}
                            className="new-card-form__form-select"
                            onChange={this.handleFormChanges}
                        >
                            { this.renderBoardOptions() }
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
    boards: PropTypes.array,
    addCardCallback: PropTypes.func
};

export default NewCardForm