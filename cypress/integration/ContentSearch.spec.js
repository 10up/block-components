/// <reference types="cypress" />

context('ContentSearch', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('Adding sample post.', () => {
		cy.createPost({title: 'Sample post'});
		cy.savePost();
	})

	it('allows the user to see initial results on focus', () => {
		cy.createPost({title: 'Post Searcher with fetchOnFocus'});
		cy.insertBlock('Post Searcher');
		cy.get('.wp-block-example-content-search .components-input-control__input').focus();
		cy.get('.tenup-content-search-list').should('exist');
	})

	it('displays the post date in the search results', () => {
		cy.createPost({title: 'Post Searcher with Post Date'});
		cy.insertBlock('Post Searcher');
		cy.get('.wp-block-example-content-search .components-input-control__input').focus();
		cy.get('.tenup-content-search-list .tenup-content-search-list-item time').invoke('attr', 'datetime').then((datetime) => {
			const date = new Date(datetime);
			expect(date.toString()).to.not.equal('Invalid Date');
		});
	})
})
