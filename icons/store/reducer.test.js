import reducer from './reducer';
import { registerIconSet } from './actions';

describe( 'icon store | reducer', () => {
    test('iconSets', () => {
        const state = {
            iconSets: {
                iconSets: {}
            }
        };

        const newIconsSetData = {
            name: 'example/theme',
            label: "Example",
            icons: [
                {
                    source: 'test-string',
                    name: "search",
                    label: "Search"
                }
            ]
        };

        const registerIconAction = registerIconSet(newIconsSetData);
    
        const newState = reducer(state, registerIconAction);
        expect(newState).toMatchSnapshot();
    })
} )