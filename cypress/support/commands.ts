Cypress.Commands.add('disableScreenshot', () => {
    Cypress.Screenshot.defaults({
        screenshotOnRunFailure: false
    });
});

Cypress.Commands.add('spyAuthors', () => {
    cy.server();
    cy.route({
        method: 'GET',
        url: '/v2/authors?page[size]=10&sort=name',
        response: 'fixture:authors.json',
        status: 200
    }).as('authors');
});
