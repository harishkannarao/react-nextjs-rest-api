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

    it('Deletes customer', () => {
        var listCustomersCount = 0;
        cy.intercept('GET', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers', (req) => {
            req.alias = 'listCustomers-' + listCustomersCount;
            listCustomersCount = listCustomersCount + 1;
            req.reply(
                {
                    statusCode: 200,
                    delay: 500,
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
            );
        });

        cy.intercept('DELETE', Cypress.env('CUSTOMER_API_BASE_URL') + '/customers', (req) => {
            req.alias = 'deleteCustomer';
            req.reply(
                {
                    statusCode: 200,
                    delay: 500,
                    body: null
                }
            );
        });

        cy.visit("/customers/list/");

        cy.wait('@listCustomers-0');

        cy.get('[data-testid="delete-button"]').eq(1).click();

        cy.get('[data-testid="processing-content"]').should('exist');

        cy.get('[data-testid="processing-content"]').should('not.exist');

        cy.wait('@listCustomers-1');

        cy.wait('@deleteCustomer').then((interception) => {
            var reqJson = interception.request.body;
            expect(reqJson.id).to.equal(2);
        });
    });
});