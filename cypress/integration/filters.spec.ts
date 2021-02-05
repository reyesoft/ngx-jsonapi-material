describe('Refresh', () => {
    before(() => {
        cy.disableScreenshot();
    });
    it('I click on the refresh button, the list with the changes should be displayed, if any', () => {
        cy.spyBooks('books-refresh.json');
        cy.visit('/#/books');
        cy.get('mat-expansion-panel-header').click();
        cy.get('demo-jsonapi-filter-categories').click();

        cy.spyBooks('books.json');
        cy.get('mat-option').eq(1).click();

        cy.get('table tr td').should('contain', 'Pacocha-Hammes');
        cy.get('table tr td').should('not.contain', 'Runte and Sons');
    })
});
