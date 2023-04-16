/// <reference types="cypress" />

context('IconPicker', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('allows the user to use the post picker to change an icon and displays it', () => {
		cy.createPost({title: 'Icon Picker Example'});
		cy.insertBlock('Icon Picker Example');
        cy.get('.component-icon-picker-inline-button').click();
        cy.get('.component-icon-picker-inline__content [placeholder="Search"]').type('tool');
        cy.get('.component-icon-picker-inline__content').contains('Tool').click({force: true});

        cy.savePost();

		// click on the View Post snackbar item
		cy.get('.components-snackbar a').click();
	})
	
})
