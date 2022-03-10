/// <reference types="cypress" />

context('Image', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('allows the user to pick an image from the media library and displays it inline', () => {
		cy.createPost({title: 'Image Component'});
		cy.insertBlock('Image Example');
        
        cy.get('button').contains('Media Library').click();
        cy.get('.attachment-preview').first().click();
        cy.get('#attachment-details-alt-text').type('Test Alt Text');
        cy.get('.media-button-select').contains('Select').click();
        
        cy.get('.wp-block-example-image-example img').should('be.visible');

        cy.get('.wp-block-example-image-example img')
            .should('have.attr', 'alt');

        cy.get('.wp-block-example-image-example img')
            .should('have.attr', 'src');

        cy.savePost();

		// click on the View Post snackbar item
		cy.get('.components-snackbar a').click();

        // return to the editor
        cy.get('a').contains('Edit Page').click();

        cy.get('.wp-block-example-image-example img').should('be.visible');

	})
	
})
