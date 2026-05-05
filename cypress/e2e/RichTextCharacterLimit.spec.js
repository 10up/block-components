/// <reference types="cypress" />

context('RichTextCharacterLimit', () => {

	beforeEach(() => {
		cy.loginToWordPress();
        cy.createPost({title: 'Rich Text Character Limit'});
        cy.insertBlock('Rich Text Character Limit');
	});

	it('Allows the user to pick the block and displays it', () => {
        cy.get('.wp-block-example-rich-text-character-limit').should('exist');
        cy.get('.wp-block-example-rich-text-character-limit').should('be.visible');

        cy.savePost();
	})

    it('Allows text to be entered', () => {
        cy.get('.wp-block-example-rich-text-character-limit .block-editor-rich-text__editable').focus().clear().type('This is a test');
        cy.get('.wp-block-example-rich-text-character-limit .block-editor-rich-text__editable').should('have.text', 'This is a test');
    })

    it('Has the correct starting value', () => {
        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__count').should('exist');
        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__count').should('have.text', '0');

        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__limit').should('exist');
        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__limit').should('have.text', '30');
    })

    it('Updates the count appropriately', () => {
        cy.get('.wp-block-example-rich-text-character-limit .block-editor-rich-text__editable').focus().clear().type('This is a test');
        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__count').should('have.text', '14');

        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__limit').should('exist');
        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__character-count__limit').should('have.text', '30');
    })

    it('Updates to the approaching limit state appropriately', () => {

        cy.get('.wp-block-example-rich-text-character-limit .block-editor-rich-text__editable').focus().clear().type('0123456789012345678901234');

        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__circular-progress').should('have.class', 'is-approaching-limit');
    })

    it('Updates to the is over limit state appropriately', () => {

        cy.get('.wp-block-example-rich-text-character-limit .block-editor-rich-text__editable').focus().clear().type('012345678901234567890123456789');

        cy.get('.wp-block-example-rich-text-character-limit .tenup--block-components__circular-progress').should('have.class', 'is-over-limit');
    })

    it('Shows the toolbar controls appropriately', () => {

        cy.get('.wp-block-example-rich-text-character-limit .block-editor-rich-text__editable').focus()

        cy.get('.components-toolbar-button[aria-label="Bold"]').should('exist');
        cy.get('.components-toolbar-button[aria-label="Bold"]').should('be.visible');

        cy.get('.components-toolbar-button[aria-label="Link"]').should('exist');
        cy.get('.components-toolbar-button[aria-label="Link"]').should('be.visible');
    });
})
