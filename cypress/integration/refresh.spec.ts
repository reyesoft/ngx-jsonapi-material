describe('Refresh', () => {
    before(() => {
        cy.disableScreenshot();
    });
    it('I click on the refresh button, the list with the changes should be displayed, if any', () => {
        cy.spyBooks('books.json');
        cy.visit('/#/books');
        cy.get('table tr td').should('not.contain', 'Runte and Sons');

        cy.spyBooks('books-refresh.json')
        cy.get('jam-refresh').click();

        cy.get('table tr td').should('contain', 'Runte and Sons');
    })
});
