describe('Render Previews', function () {
  const email = 'email@example.com'
  const password = 'password123'

  beforeEach(function () {
    cy.visit('/login')
    cy.get('[data-test-id="email"]').type(email)
    cy.get('[data-test-id="password"]').type(password)
    cy.get('[data-test-id="submit"]').click()
  })

  it('render previews based on specs', function () {
    cy.get('[data-test-id="9910f47d-0a9d-4ed2-9c46-a509a68695d2"]').should('be.visible')
    cy.get('[data-test-id="f3dd6d7e-640d-4be9-b91c-0a0d7cddcca9"]').should('be.visible')
  })
})
