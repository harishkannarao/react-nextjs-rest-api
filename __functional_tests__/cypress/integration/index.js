describe('Test Index Page', () => {
    it('Displays message', () => {
        const baseUrl = Cypress.env('BASE_URL')
        cy.visit(baseUrl);

        cy.get('[data-testid="message"]')
            .should(($div) => {
                expect($div).to.have.length(1)
                expect($div[0]).to.have.text('Welcome to Next.js!!!')
            });
    });
});