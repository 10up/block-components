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
		cy.insertBlock('Content Picker');
		cy.get('.wp-block-example-content-picker .components-input-control__input').focus();
		cy.get('.tenup-content-search-list').should('exist');
	})

	it('displays the post date in the search results', () => {
		cy.createPost({title: 'Post Picker with Post Date'});
		cy.insertBlock('Content Picker');
		cy.get('.wp-block-example-content-picker .components-input-control__input').focus();
		cy.get('.tenup-content-search-list .tenup-content-search-list-item time').invoke('attr', 'datetime').then((datetime) => {
			const date = new Date(datetime);
			expect(date.toString()).to.not.equal('Invalid Date');
		});
	})
})
