/// <reference types="cypress" />

context('Post Meta', () => {

	beforeEach(() => {
		cy.loginToWordPress();
        cy.createPost({title: 'Post Meta', postType: 'book' });
        cy.insertBlock('Post Meta');
	});

	it('Allows the user to pick the block and displays it', () => {
        cy.get('.wp-block-example-post-meta').should('exist');
        cy.get('.wp-block-example-post-meta').should('be.visible');

        cy.savePost();
	})

    it('Allows the user to pick a variation', () => {

        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').its('length').should('be.gt', 0);
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').first().click();
    })

    it('Allows text to be entered into the post meta field', () => {
        // Author
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').first().click();

        cy.get('.wp-block-example-post-meta .block-editor-rich-text__editable').focus().clear().type('This is a test');
        cy.get('.wp-block-example-post-meta .block-editor-rich-text__editable').should('have.text', 'This is a test');
    })

    it('Allows a number to be entered into the post meta field', () => {
        // Price
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').eq(2).click();

        cy.get('.wp-block-example-post-meta .components-input-control__input').focus().clear().type('10');
        cy.get('.wp-block-example-post-meta .components-input-control__input').should('have.value', '10');
    })

    it('Allows a boolean to change the post meta field', () => {
        // Is featured
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').eq(3).click();

        cy.get('.wp-block-example-post-meta .components-form-toggle__input').check();
        cy.get('.wp-block-example-post-meta .components-form-toggle__input').should('be.checked');
        cy.get('.wp-block-example-post-meta .components-form-toggle').should('have.class', 'is-checked');
    })
})
