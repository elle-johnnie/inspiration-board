import React from 'react';
import NewCardForm from './NewCardForm';
// destructure enzyme to grab only shallow
import { shallow } from 'enzyme';

describe('NewCardForm', () => {
    test('that it matches an existing snapshot', () => {
        // First Mount the Component in the testing DOM
        // Arrange
        // use proptypes to determine list of req'd props
        const wrapper = shallow(<NewCardForm
            boards={["elle-johnnie", "ada-lovelace"]}
            addCardCallback={() => { }}
        />
        );

        // Assert that it looks like the last snapshot
        expect(wrapper).toMatchSnapshot();
    });
});