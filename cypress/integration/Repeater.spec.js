/// <reference types="cypress" />

context('Repeater', () => {
	before(() => {
		cy.loginToWordPress();
	});

	function verifyRepeaterItems(items = []) {
		items.forEach( ( item, index ) => {
			cy.get( '.repeater-item' ).eq( index ).then( $repeaterItem => {
				cy.wrap( $repeaterItem.find( '.repeater-item-page-name .components-text-control__input' ) ).should('have.value', item.title)

				if (item.status) {
					cy.wrap( $repeaterItem.find( '.repeater-item-visibility .components-form-toggle' ) ).should('have.class', 'is-checked');
				} else {
					cy.wrap( $repeaterItem.find( '.repeater-item-visibility .components-form-toggle' ) ).should('not.have.class', 'is-checked');
				}
			} );
		} )
	}

	it('Adding Repeater field and saving it.', () => {
		cy.createPost({title: 'Repeater field example'});
		cy.insertBlock('Repeater component Example');

		cy.savePost();
	})

	it('Adding repeater fields', () => {
		function addItem( pageName = '', visibility = false ) {
			cy.get( '.repeater-item' ).then( $repeaterItem => {
				if ( $repeaterItem.length === 1 && $repeaterItem.find( '.repeater-item-page-name input[type="text"]' ).val().length === 0 ) {
					addItemHelper( $repeaterItem, pageName, visibility );
				} else {
					cy.get( '.repeater-item-add button' ).click();
					cy.get( '.repeater-table-example .repeater-item' ).last().then( $repeaterItem => {
						addItemHelper( $repeaterItem, pageName, visibility );
					} );
				}
			} )
		}

		function addItemHelper( $repeaterItem, pageName, visibility ) {
			cy.wrap( $repeaterItem.find( '.repeater-item-page-name input[type="text"]' ) ).type( pageName );
			cy.wrap( $repeaterItem.find( '.repeater-item-visibility .components-form-toggle' ) ).then( $toggleButton => {
				if ( visibility ) {
					if ( ! $toggleButton.hasClass( 'is-checked' ) ) {
						cy.wrap( $toggleButton ).click();
					}
				} else {
					if ( $toggleButton.hasClass( 'is-checked' ) ) {
						cy.wrap( $toggleButton ).click();
					}
				}
			} );
		}

		function removeItem( index = 0 ) {
			if ( ! index ) {
				return;
			}

			cy.get( '.repeater-item' ).eq( index ).then( $repeaterItem => {
				cy.get( $repeaterItem.find( '.repeater-item-remove button' ) ).click();
			});
		}

		addItem( 'Home', true );
		addItem( 'About Us', false );
		addItem( 'Careers', true );

		const items = [
			{ title: 'Home', status: true },
			{ title: 'About Us', status: false },
			{ title: 'Careers', status: true },
		];

		verifyRepeaterItems(items);

		removeItem( 2 );
		addItem( 'Blog', false );

		cy.updatePost();

		cy.get('.repeater-item').should('have.length', 3);
	});

	it('Verify repeater items', () => {
		const items = [
			{ title: 'Home', status: true },
			{ title: 'About Us', status: false },
			{ title: 'Blog', status: false },
		];

		verifyRepeaterItems(items);
	});
})
