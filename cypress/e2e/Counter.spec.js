/// <reference types="cypress" />

context('Counter', () => {

	beforeEach(() => {
		cy.loginToWordPress();
        cy.createPost({title: 'Counter Example'});
        cy.insertBlock('Counter Example');
	});

	it('Allows the user to pick the block and displays it', () => {
        cy.get('.wp-block-example-counter').should('exist');
        cy.get('.wp-block-example-counter').should('be.visible');

        cy.savePost();
	})

    it('Has the counter component in the block', () => {
        cy.get('.wp-block-example-counter').should('exist');
        cy.get('.wp-block-example-counter').should('be.visible');

        cy.get('.wp-block-example-counter .tenup--block-components__character-count').should('exist');
    })

    it('Has the correct starting value', () => {
        cy.get('.wp-block-example-counter .tenup--block-components__character-count__count').should('exist');
        cy.get('.wp-block-example-counter .tenup--block-components__character-count__count').should('have.text', '0');

        cy.get('.wp-block-example-counter .tenup--block-components__character-count__limit').should('exist');
        cy.get('.wp-block-example-counter .tenup--block-components__character-count__limit').should('have.text', '20');
    })

    it('Updates the count appropriately', () => {
        cy.get('.wp-block-example-counter .components-text-control__input').focus().clear().type('0123456789');

        cy.get('.wp-block-example-counter .tenup--block-components__character-count__count').should('exist');
        cy.get('.wp-block-example-counter .tenup--block-components__character-count__count').should('have.text', '10');

        cy.get('.wp-block-example-counter .tenup--block-components__character-count__limit').should('exist');
        cy.get('.wp-block-example-counter .tenup--block-components__character-count__limit').should('have.text', '20');
    })

    it('Updates to the approaching limit state appropriately', () => {

        cy.get('.wp-block-example-counter .components-text-control__input').focus().clear().type('01234567891234567');

        cy.get('.wp-block-example-counter .tenup--block-components__circular-progress').should('have.class', 'is-approaching-limit');
    })

    it('Updates to the is over limit state appropriately', () => {

        cy.get('.wp-block-example-counter .components-text-control__input').focus().clear().type('01234567891234567890');

        cy.get('.wp-block-example-counter .tenup--block-components__circular-progress').should('have.class', 'is-over-limit');
    })
})