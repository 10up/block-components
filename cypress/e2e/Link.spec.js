/// <reference types="cypress" />

context('Link', () => {

	beforeEach(() => {
		cy.loginToWordPress();
	});

	it('allows the editor to pick a link directly inline', () => {
		cy.createPost({title: 'Link Component'});
		cy.insertBlock('Link Example');

        // create the first link
        cy.get('.tenup-block-components-link__label').first().click();
        cy.wait(1500);
        cy.get('.tenup-block-components-link__label').first().type('First Link Label', { delay: 50, waitForAnimations: true });
        cy.get('.block-editor-url-input__input').first().type('https://10up.com/', { delay: 50, waitForAnimations: true });
        cy.get('button.block-editor-link-control__search-submit').first().click();

        // create the second link
        cy.get('.tenup-block-components-link__label').eq(1).click();
        cy.wait(1500);
        cy.get('.tenup-block-components-link__label').eq(1).type('Second Link Label', { delay: 50, waitForAnimations: true });
        cy.get('.block-editor-url-input__input').first().type('https://10up.com/our-work/', { delay: 50, waitForAnimations: true });
        cy.get('button.block-editor-link-control__search-submit').first().click();
        
        cy.savePost();

		// click on the View Post snackbar item
		cy.get('.components-snackbar a').click();

        // check that all the links have rendered correctly
        cy.get('.wp-block-example-link-example a').first().should('contain', 'First Link Label');
        cy.get('.wp-block-example-link-example a').first().should('have.attr', 'href', 'https://10up.com/');
        cy.get('.wp-block-example-link-example a').eq(1).should('contain', 'Second Link Label');
        cy.get('.wp-block-example-link-example a').eq(1).should('have.attr', 'href', 'https://10up.com/our-work/');

        // go back to the editor
        cy.get('a').contains('Edit Page').click();

        // ensure both links populated correctly
        cy.get('.tenup-block-components-link__label').first().should('contain', 'First Link Label');
        cy.get('.tenup-block-components-link__label').eq(1).should('contain', 'Second Link Label');
	})
	
})
