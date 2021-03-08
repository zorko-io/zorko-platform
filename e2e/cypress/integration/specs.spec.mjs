describe('Render Vega-Lite Specs', function () {
  const email = 'email@example.com'
  const password = 'password123'

  beforeEach(function () {
    cy.visit('/login')
  })

  it('render vega-lite examples based on specs', function () {
    cy.viewport(1024, 768)
    cy.get('[data-test-id="email"]').type(email)
    cy.get('[data-test-id="password"]').type(password)
    cy.get('[data-test-id="submit"]').click()
    cy.get('[data-test-id="example"]').click()
    cy.get('[data-test-id="vegaLiteExampleBtn"]').click()

    cy.get('[data-test-id="vegaLiteItem"]').should('have.length', 3)
  })
})