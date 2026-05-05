/// <reference types="cypress" />

context('ContentPicker', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('Adding sample post.', () => {
		cy.createPost({title: 'Sample post'});
		cy.savePost();
	})

	it('allows the user to see results when on focus', () => {
		cy.createPost({title: 'Post Picker'});
		cy.insertBlock('Hello World');
		cy.get('.wp-block-example-hello-world .components-text-control__input').focus();
		cy.get('.tenup-content-search-list').should('exist');
	})
})
