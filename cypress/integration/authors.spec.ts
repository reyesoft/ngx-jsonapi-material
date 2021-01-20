describe('ListBase', () => {
    before(() => {
        cy.disableScreenshot();
    });
    it('ListBase integrity test', () => {
        cy.spyAuthors();
        cy.visit('/#/authors?pageSize=10');

        cy.get('jam-list-base-common').should('be.visible')
            .within(() => {
                cy.get('mat-header-cell').eq(0).should('have.text', ' ID ');
                cy.get('mat-header-cell').eq(1).should('have.text', ' Name ');
                cy.get('mat-header-cell').eq(2).should('have.text', ' Date of birth ');
                cy.get('mat-header-cell').eq(3).should('have.text', ' Date of death ');
            });
        cy.get('jam-list-base-common mat-row').first().should('be.visible')
            .within(() => {
                cy.get('mat-cell').eq(0).should('have.text', '14');
                cy.get('mat-cell').eq(1).should('have.text', ' Anais Carroll ');
                cy.get('mat-cell').eq(2).should('have.text', ' 12/08/1986 ');
                cy.get('mat-cell').eq(3).should('have.text', ' 05/10/2000 ');
            });
    })
});
