describe('Logging In', function () {
  const email = 'email@example.com'
  const password = 'password123'

  beforeEach(function () {
    cy.visit('/login')
  })

  it('redirects to /home on success', function () {
    cy.get('[data-test-id="email"]').type(email)
    cy.get('[data-test-id="password"]').type(password)
    cy.get('[data-test-id="submit"]').click()

    cy.url().should('include', '/home')
  })

  it('stay logged on browser refresh', function () {
    cy.get('[data-test-id="email"]').type(email)
    cy.get('[data-test-id="password"]').type(password)
    cy.get('[data-test-id="submit"]').click()

    cy.url().should('include', '/home')
    cy.reload()
    cy.url().should('include', '/home')
  })

  it('navigate to last location on browser refresh', function () {
    cy.get('[data-test-id="email"]').type(email)
    cy.get('[data-test-id="password"]').type(password)
    cy.get('[data-test-id="submit"]').click()
    cy.get('[data-test-id="example"]').click()

    cy.url().should('include', '/example')
    cy.reload()
    cy.url().should('include', '/example')
  })
})