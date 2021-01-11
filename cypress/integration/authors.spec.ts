describe('ListBase', () => {
    before(() => {
        cy.disableScreenshot();
    });
    it('ListBase integrity test', () => {
        cy.spyAuthors();
        cy.visit('/#/authors?pageSize=10');

        cy.get('jam-list-base-common').should('be.visible')
            .within(() => {
                cy.get('mat-header-cell').eq(0).should('contain', 'id');
            });
    })
});
