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

    it('Saves the data into post meta', () => {
        // Author
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').first().click();
        cy.get('.wp-block-example-post-meta .block-editor-rich-text__editable').focus().clear().type('This is a test');

        // Reset
        cy.get('.block-editor-block-breadcrumb__button').contains('Book').click();

        // Price
        cy.insertBlock('Post Meta');
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').eq(2).click();
        cy.get('.wp-block-example-post-meta .components-input-control__input').focus().clear().type('10');

        // Reset
        cy.get('.block-editor-block-breadcrumb__button').contains('Book').click();

        // Is featured
        cy.insertBlock('Post Meta');
        cy.get('.wp-block-example-post-meta .block-editor-block-variation-picker__variation').eq(3).click();
        cy.get('.wp-block-example-post-meta .components-form-toggle__input').check();

        // Reset
        cy.get('.block-editor-block-breadcrumb__button').contains('Book').click();

        // Intercept the network request related to publishing the post
        cy.intercept({
            method: 'POST',
            url: '/index.php?rest_route=%2Fwp%2Fv2%2Fbooks%2F*',
        }).as('publishPost');

        cy.savePost();

        // Wait for the intercepted request to complete
        cy.wait('@publishPost');

        cy.reload();

        cy.get('.components-dropdown-menu__toggle[aria-label="Options"]').click();
        cy.get('.components-menu-item__button').contains('Preferences').click();
        cy.get('.components-toggle-control__label').contains('Custom fields').then(($label) => {
            const attrFor = $label.attr('for');

            cy.get(`#${attrFor}`).then($input => {
                if (!$input.is(':checked')) {
                    cy.get(`#${attrFor}`).check();
                    cy.get('.edit-post-preferences-modal__custom-fields-confirmation-button').contains('Show & Reload Page').click();
                } else {
                    cy.get('.components-button[aria-label="Close"]').click();
                }
            })

            cy.get('button').contains('Toggle panel: Custom Fields').then($button => {
                if ($button.attr('aria-expanded') === 'false') {
                    cy.get('button').contains('Toggle panel: Custom Fields').click();
                }
            })

            cy.get('input[value="author"]').should('exist').then($input => {
                const id = $input.attr('id');

                cy.get(`#${id.replace('key','value')}`).should('have.value', 'This is a test');
            })

            cy.get('input[value="is_featured"]').should('exist').then($input => {
                const id = $input.attr('id');

                cy.get(`#${id.replace('key','value')}`).should('have.value', '1');
            })

            cy.get('input[value="price"]').should('exist').then($input => {
                const id = $input.attr('id');

                cy.get(`#${id.replace('key','value')}`).should('have.value', '10');
            })
        })
    })
})
