describe('SearchInput', () => {
    before(() => {
        cy.disableScreenshot();
    });
    it('The books must be filtered according to what was entered in the search engine', () => {
        cy.spyBooks('books-refresh.json')
        cy.visit('/#/books');
        cy.get('jam-search-input').click();

        cy.get('jam-search-input input').type('Pa');

        cy.get('table tr td').should('not.contain', 'Runte and Sons');
        cy.get('table tr td').should('contain', 'Pacocha-Hammes');
    })
});
