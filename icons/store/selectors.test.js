import { getIcons } from './selectors';

describe('icon store | selectors', () => {
    test('getIcons', () => {
        const state = {
            iconSets: {
                'dashicons': {
                    icons: [
                        {
                            name: 'dashicons-menu',
                            label: 'Menu',
                        }
                    ]
                }
            }
        };

        const icons = getIcons(state, 'dashicons');
        expect(icons).toEqual(state.iconSets['dashicons'].icons);
    })
})