/// <reference types="cypress" />

context('ContentSearch', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('Adding sample post.', () => {
		cy.createPost({title: 'Sample post'});
		cy.savePost();
	})

	it('allows the user to search without seeing results on focus', () => {
		cy.createPost({title: 'Post Searcher without fetchOnFocus'});
		cy.insertBlock('Post Searcher');
        cy.get('.wp-block-example-content-search .components-text-control__input').focus();
        cy.get('.tenup-content-search-list').should('not.exist');
	})

	it('allows the user to see results on focus', () => {
		cy.createPost({title: 'Post Searcher with fetchOnFocus'});
		cy.insertBlock('Post Searcher');
        cy.get('.wp-block-example-content-search .components-checkbox-control__input').click();
        cy.get('.wp-block-example-content-search .components-text-control__input').focus();
        cy.get('.tenup-content-search-list').should('exist');
	})
})
