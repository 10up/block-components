/// <reference types="cypress" />

context('PostFeaturedImage', () => {

    beforeEach(() => {
		cy.loginToWordPress();
        cy.createPost({title: 'Custom Post Featured Image'});
        cy.insertBlock('Custom Post Featured Image');
	});

	it('Allows the user to pick the block and displays it', () => {
        cy.get('.wp-block-example-custom-post-featured-image').should('exist');
        cy.get('.wp-block-example-custom-post-featured-image').should('be.visible');

        cy.savePost();
	})

    it('Allows the user to pick an image from the media library and displays it inline', () => {
        cy.get('.wp-block-example-custom-post-featured-image button').contains('Media Library').click();
        cy.get('#menu-item-browse').click();
        cy.get('.attachment-preview').first().click();
        cy.get('#attachment-details-alt-text').type('Test Alt Text');
        cy.get('.media-button-select').contains('Select').click();
        
        cy.get('.wp-block-example-custom-post-featured-image img').scrollIntoView({offset: -50})
		cy.get('.wp-block-example-custom-post-featured-image img').should('be.visible');

        cy.get('.wp-block-example-custom-post-featured-image img')
            .should('have.attr', 'alt');

        cy.get('.wp-block-example-custom-post-featured-image img')
            .should('have.attr', 'src');
    })

    it('Syncs with the post featured image', () => {
        cy.get('.wp-block-example-custom-post-featured-image button').contains('Media Library').click();
        cy.get('#menu-item-browse').click();
        cy.get('.attachment-preview').first().click();
        cy.get('#attachment-details-alt-text').type('Test Alt Text');
        cy.get('.media-button-select').contains('Select').click();
        
        cy.get('.wp-block-example-custom-post-featured-image img').scrollIntoView({offset: -50})
		cy.get('.wp-block-example-custom-post-featured-image img').should('be.visible');

        cy.get('[data-tab-id="edit-post/document"]').click();


        cy.get('.editor-post-featured-image__preview-image').should('exist').then(($a) => {
            const src1 = $a.attr('src');
            const cleanedSrc1 = src1.replace(/-\d+x\d+(?=\.\w+$)/, '');

            cy.get('.wp-block-example-custom-post-featured-image__image').should('exist');
            cy.get('.wp-block-example-custom-post-featured-image__image').should('have.attr', 'src');
            cy.get('.wp-block-example-custom-post-featured-image__image').then(($b) => {
                console.log($b);
                const src2 = $b.attr('src');
                const cleanedSrc2 = src2.replace(/-\d+x\d+(?=\.\w+$)/, '');
                
                expect(cleanedSrc1).to.equal(cleanedSrc2);
            });
        });

        cy.get('.editor-post-featured-image__action').contains('Remove').click({force: true});
        cy.get('.wp-block-example-custom-post-featured-image__image').should('not.exist');
    })
})
