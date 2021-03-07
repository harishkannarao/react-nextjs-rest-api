describe('Test Customer List Page', () => {
    it('Displays data from api', () => {
        cy.intercept(Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 200,
                delay: 0,
                body: [
                    {
                        id: 1,
                        firstName: 'test-first-name-1',
                        lastName: 'test-last-name-1'
                    },
                    {
                        id: 2,
                        firstName: 'test-first-name-2',
                        lastName: 'test-last-name-2'
                    }
                ]
            }
        )

        cy.visit("/customers/list/");

        cy.get('[data-testid="id"]').eq(0).should('have.text', '1');
        cy.get('[data-testid="firstName"]').eq(0).should('have.text', 'test-first-name-1');
        cy.get('[data-testid="lastName"]').eq(0).should('have.text', 'test-last-name-1');

        cy.get('[data-testid="id"]').eq(1).should('have.text', '2');
        cy.get('[data-testid="firstName"]').eq(1).should('have.text', 'test-first-name-2');
        cy.get('[data-testid="lastName"]').eq(1).should('have.text', 'test-last-name-2');
    });

    it('Displays title', () => {
        cy.intercept(Cypress.env('CUSTOMER_API_BASE_URL') + '/customers',
            {
                statusCode: 200,
                delay: 0,
                body: []
            }
        )

        cy.visit("/customers/list/");

        cy.title().should('eq', 'List - Customers');
    });
});