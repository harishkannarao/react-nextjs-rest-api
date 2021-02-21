describe('Test Sample Page', () => {
    it('Displays message', () => {
        cy.visit("/sample/sample_page");
        
        cy.title().should('eq', 'Sample')

        cy.get('[data-testid="message"]')
            .should(($div) => {
                expect($div).to.have.length(1)
                expect($div[0]).to.have.text('This is a sample page')
            });
    });
});