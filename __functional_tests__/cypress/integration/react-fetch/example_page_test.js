describe('Test React Fetch Example Page', () => {
    it('Displays data from api', () => {
        cy.intercept(Cypress.env('API_BASE_URL') + '/repos/tannerlinsley/react-query',
            {
                statusCode: 200,
                delay: 0,
                body: {
                    'name': 'functional-test-name',
                    'description': 'functional-test-description',
                    'subscribers_count': '201',
                    'stargazers_count': '301',
                    'forks_count': '151'
                }
            }
        )

        cy.visit("/react-fetch/example");

        cy.get('[data-testid="name"]').should('have.text', 'functional-test-name');
        cy.get('[data-testid="description"]').should('have.text', 'functional-test-description');
        cy.get('[data-testid="subscribers_count"]').should('have.text', '201');
        cy.get('[data-testid="stargazers_count"]').should('have.text', '301');
        cy.get('[data-testid="forks_count"]').should('have.text', '151');
    });
});