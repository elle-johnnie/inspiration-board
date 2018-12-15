import Board from './Board';
import React from "react";
import {shallow} from "enzyme/build";

describe('Board', () => {
    test('that it matches an existing snapshot', () => {
        // First Mount the Component in the testing DOM
        // Arrange
        // use proptypes to determine list of req'd props
        const wrapper = shallow(<Board
            url="https://inspiration-board.herokuapp.com/elle-johnnie/cards"/>);

        // Assert that it looks like the last snapshot
        expect(wrapper).toMatchSnapshot();
    });
});