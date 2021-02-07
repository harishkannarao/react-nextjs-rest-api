describe('Test Index Page', () => {
    it('Displays message', () => {
        cy.visit('http://localhost:3001');

        cy.get('[data-testid="message"]')
            .should(($div) => {
                expect($div).to.have.length(1)
                expect($div[0]).to.have.text('Welcome to Next.js!!!')
            });
    });
});