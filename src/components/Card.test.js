import {shallow} from "enzyme/build";
import React from "react";
import Card from './Card';

describe('Card', () => {
    test('that it matches an existing snapshot', () => {
        // First Mount the Component in the testing DOM
        // Arrange
        // use proptypes to determine list of req'd props
        const wrapper = shallow(<Card
            text='you are amazing'
            id={1}
            emoji="heart"
            removeCardCallback={() => { }}
        />);

        // Assert that it looks like the last snapshot
        expect(wrapper).toMatchSnapshot();
    });

    test('card renders when no emoji', () => {
        const wrapper = shallow( <Card
            text='you are better than amazing'
            id={2}
            emoji=""
            removeCardCallback={() => { }}
        />);
        expect(wrapper).toMatchSnapshot();
    });

    test('card renders when no text', () => {
        const wrapper = shallow( <Card
            text='you are better than everything amazing'
            id={3}
            emoji="heart"
            removeCardCallback={() => { }}
        />);
        expect(wrapper).toMatchSnapshot();
    });
});