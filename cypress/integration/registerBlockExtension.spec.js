/// <reference types="cypress" />

context('registerBlockExtension', () => {

	beforeEach(() => {
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
	
    it('ensure the new settings still respect custom classnames', () => {
		cy.createPost({title: 'Block Extension Test'});
		cy.insertBlock('Group');
        cy.contains('Show Background Pattern').click();

        // ensure the new class names get applied in the editor
        cy.get('.wp-block-group').should('have.class', 'has-background-pattern');
        
        cy.get('.components-panel__body-title').contains('Advanced').click();
        
        cy.contains('Additional CSS class(es)').next().type('test-class');
        
        cy.get('.wp-block-group').should('have.class', 'test-class');
		
		cy.savePost();

		// click on the View Post snackbar item
		cy.get('.components-snackbar a').click();

        // ensure the new class names get applied in the frontend
		cy.get('.wp-block-group').should('have.class', 'has-background-pattern');
		cy.get('.wp-block-group').should('have.class', 'test-class');

        cy.contains('Edit Page').click();

        // ensure the editor loads without eny deprecation errors
        cy.get('.wp-block-group').contains('This block contains unexpected or invalid content.').should('not.exist');
	})
})
