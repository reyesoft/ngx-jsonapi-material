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

Cypress.Commands.add('spyBooks', (fixture: string) => {
    cy.server();
    cy.route({
        method: 'GET',
        url: /\/v2\/books*/,
        response: 'fixture:' + fixture,
        status: 200
    }).as('books');
});
