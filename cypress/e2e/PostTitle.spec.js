/// <reference types="cypress" />

context('PostTitle', () => {

    beforeEach(() => {
		cy.loginToWordPress();
        cy.createPost({title: 'Custom Post Title'});
        cy.insertBlock('Custom Post Title');
	});

	it('Allows the user to pick the block and displays it', () => {
        cy.get('.wp-block-example-custom-post-title').should('exist');
        cy.get('.wp-block-example-custom-post-title').should('be.visible');

        cy.savePost();
	})

    it('Allows text to be entered', () => {
        cy.get('.wp-block-example-custom-post-title .block-editor-rich-text__editable').focus().clear().type('This is a test');
        cy.get('.wp-block-example-custom-post-title .block-editor-rich-text__editable').should('have.text', 'This is a test');
    })

    it('Should sync the text entered in the block with the post title', () => {
        cy.get('.wp-block-example-custom-post-title .block-editor-rich-text__editable').focus().clear().type('This is a test');
        cy.get('.wp-block-example-custom-post-title .block-editor-rich-text__editable').should('have.text', 'This is a test');

        cy.get('.wp-block-post-title').should('have.text', 'This is a test');
    })
})
