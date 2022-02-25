/// <reference types="cypress" />

context('IconPicker', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('ensure the new setting shows up and doesn\'t cause deprecation errors', () => {
		cy.createPost({title: 'Block Extension Test'});
		cy.insertBlock('Icon Picker Example');
        cy.get('.component-icon-picker-inline-button').click();
        cy.get('.component-icon-picker-inline__content [placeholder="Search"]').type('tool');
        cy.get('.component-icon-picker-inline__content').contains('Tool').click({force: true});

        cy.savePost();

		// click on the View Post snackbar item
		cy.get('.components-snackbar a').click();
	})
	
})
