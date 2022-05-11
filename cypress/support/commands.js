import "cypress-localstorage-commands";


Cypress.Commands.add('loginToWordPress', () => {
	cy.visit('/wp-admin');

	cy.url().then((url) => {
		if (url.includes('wp-login.php')) {
			cy.wait(400);

			const userName = Cypress.env('username');
			const password = Cypress.env('password');

			cy.get('#user_login').type(userName, { delay: 50 });
			cy.get('#user_pass').type(password, { delay: 50 });
			cy.get('[type="submit"]').click();
		}
	});

	cy.url().should('include', 'wp-admin');
});

Cypress.Commands.add('createPost', (options = {}) => {
	const { postType = 'page', title = '' } = options;
	const userId = "1";

	cy.setLocalStorage(
		`WP_DATA_USER_${userId}`,
		JSON.stringify({
			'core/edit-post': {
				preferences: {
					panels: {
						'post-status': {
							opened: true,
						},
					},
					features: {
						fixedToolbar: false,
						welcomeGuide: false,
						fullscreenMode: true,
						showIconLabels: false,
						themeStyles: true,
						showBlockBreadcrumbs: true,
						welcomeGuideTemplate: false,
					},
					editorMode: 'visual',
					hiddenBlockTypes: [],
					preferredStyleVariations: {},
					localAutosaveInterval: 15,
				},
			},
			'core/editor': {
				preferences: {
					isPublishSidebarEnabled: false,
				},
			},
		}),
	);

	cy.get('#wp-admin-bar-new-content-default')
		.contains(postType, { matchCase: false })
		.click({ force: true });

	cy.wait(100);

	if (title !== '') {
		cy.get('.editor-post-title__input').type(
			`Cypress - ${title} - ${new Date(Date.now()).toLocaleDateString()}`,
		);
	}
});

Cypress.Commands.add('savePost', () => {
	cy.get('[type="button"]').contains('Publish').click();
});

Cypress.Commands.add('insertBlock', (blockName) => {
	cy.get('button[aria-label="Add block"]').first().click();
	cy.focused().type(blockName);
	cy.get('button').contains(blockName).click();
});

Cypress.Commands.add('openSettingsSidebar', () => {
    cy.get('button[aria-label="Settings"]').click();
})

Cypress.Commands.add('deletePost', () => {
	cy.get('button[aria-label="Settings"][aria-expanded="false"]').click();
	cy.get('button[aria-label="Page"].edit-post-sidebar__panel-tab').click();
	cy.get('button').contains('Move to trash').click();
});

Cypress.Commands.add('goToAdmin', () => {
	cy.get('#wp-admin-bar-site-name #wp-admin-bar-dashboard > a').click({ force: true });
});

Cypress.Commands.add('updatePost', () => {
	cy.get('[type="button"]').contains('Update').click();
});