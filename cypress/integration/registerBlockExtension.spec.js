/// <reference types="cypress" />

context('registerBlockExtension', () => {

	before(() => {
		cy.loginToWordPress();
	});

	it('ensure the new setting shows up and doesn\'t cause deprecation errors', () => {
		cy.createPost({title: 'Block Extension Test'});
		cy.insertBlock('Group');
        cy.contains('Show Background Pattern').click();

        // ensure the new class names get applied in the editor
        cy.get('.wp-block-group').should('have.class', 'has-background-pattern');
		
		cy.savePost();

		// click on the View Post snackbar item
		cy.get('.components-snackbar a').click();

        // ensure the new class names get applied in the frontend
		cy.get('.wp-block-group').should('have.class', 'has-background-pattern');

        cy.contains('Edit Page').click();

        // ensure the editor loads without eny deprecation errors
        cy.get('.wp-block-group').contains('This block contains unexpected or invalid content.').should('not.exist');
	})
})
