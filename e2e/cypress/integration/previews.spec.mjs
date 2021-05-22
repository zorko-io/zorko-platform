describe('Render Previews', function () {
  const email = 'email@example.com'
  const password = 'password123'

  beforeEach(function () {
    cy.visit('/login')
    cy.get('[data-test-id="email"]').type(email)
    cy.get('[data-test-id="password"]').type(password)
    cy.get('[data-test-id="submit"]').click()
  })

  it('render previews on homepage', function () {
    // TODO: implement e2e integration test for specs rendering
    cy.get('[data-test-id="preview"]').should('have.length', 2)
  })

  it('render full preview of first element on a separate page', function () {
    cy.get('[data-test-id="preview"]')
      .first()
      .then(($link) => {
        cy.wrap($link).click()
        cy.url().should('include', '/viewer/')
        cy.get('[data-test-id="full-preview"]').should('be.visible')
      })
  })
})
