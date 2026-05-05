/// <reference types="cypress" />

context('ColorSettings', () => {

	beforeEach(() => {
		cy.loginToWordPress();
        cy.createPost({title: 'Color Settings Component Example'});
        cy.insertBlock('Color Settings Component Example');
	});

	it('Allows the user to pick the block and displays it', () => {
        cy.get('.wp-block-example-color-settings-example').should('be.visible');

        cy.savePost();
	})

    it('Allows the user to use a custom color and displays it', () => {
        cy.get('.components-color-palette__custom-color-button').first().click();
        cy.get('[data-wp-component="ColorPicker"] .components-input-control__input').focus().clear().type('ff9400');
        cy.get('.components-color-palette__custom-color-name').first().should('have.text', 'Custom');
        cy.get('.components-color-palette__custom-color-value').first().should('have.text', '#ff9400');
    })

    it('Allows the user to clear the color', () => {
        cy.get('.components-color-palette__custom-color-button').first().click();
        cy.get('[data-wp-component="ColorPicker"] .components-input-control__input').focus().clear().type('ff9400');
        cy.get('.components-color-palette__custom-color-name').first().should('have.text', 'Custom');
        cy.get('.components-color-palette__custom-color-value').first().should('have.text', '#ff9400');

        cy.get('.components-circular-option-picker__clear').first().click();
        cy.get('.components-color-palette__custom-color-name').first().should('have.text', 'No color selected');
        cy.get('.components-color-palette__custom-color-value').first().should('have.text', '');
    })

    it('Allows the user to add custom label and help text', () => {
        cy.get('.wp-block-example-color-settings-example').should('be.visible');

        cy.get('.wp-block-example-color-settings-example .components-base-control__label').first().should('have.text', 'Color Setting - Label');
        cy.get('.wp-block-example-color-settings-example .components-base-control__help').first().should('have.text', 'Color Setting - Help Text');
    })

    it('Allows the user to pick from predefined colors', () => {
        cy.get('.components-circular-option-picker__option').first().click();
        cy.get('.components-color-palette__custom-color-name').first().should('have.text', 'red');
        cy.get('.components-color-palette__custom-color-value').first().should('have.text', '#f00');

        cy.get('.components-circular-option-picker__option').eq(1).click();
        cy.get('.components-color-palette__custom-color-name').first().should('have.text', 'white');
        cy.get('.components-color-palette__custom-color-value').first().should('have.text', '#fff');

        cy.get('.components-circular-option-picker__option').eq(2).click();
        cy.get('.components-color-palette__custom-color-name').first().should('have.text', 'blue');
        cy.get('.components-color-palette__custom-color-value').first().should('have.text', '#00f');
    });
})
