import reducer from './reducer';
import { registerIconSet, removeIconSet } from './actions';

describe( 'icon store | reducer', () => {
    test('adding iconSets to existing store', () => {
        const state = {
            iconSets: {
                dashicons: {
                    name: 'dashicons',
                    label: 'Dashicons',
                    icons: [
                        {
                            name: 'dashicons-menu',
                            label: 'Menu',
                        }
                    ]
                },
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

    test('adding iconSets to empty store', () => {
        const state = {
            iconSets: {}
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

    test('removing iconSets', () => {
        const state = {
            iconSets: {
                dashicons: {
                    name: 'dashicons',
                    label: 'Dashicons',
                    icons: [
                        {
                            name: 'dashicons-menu',
                            label: 'Menu',
                        }
                    ]
                },
                theme: {
                    name: 'theme',
                    label: 'Theme',
                    icons: [
                        {
                            name: 'theme-menu',
                            label: 'Menu',
                        }
                    ]
                }
            }
        };

        const removeIconAction = removeIconSet('dashicons');
    
        const newState = reducer(state, removeIconAction);
        expect(newState).toMatchSnapshot();
    })
} )