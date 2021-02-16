describe('Logging In', function () {
  // we can use these values to log in
  const email = 'email@example.com'
  const password = 'password123'

  context('HTML form submission', function () {
    beforeEach(function () {
      cy.visit('/login')
    })

    it('redirects to /home on success', function () {
      cy.get('[data-test-id="email"]').type(email)
      cy.get('[data-test-id="password"]').type(password)
      cy.get('[data-test-id="submit"]').click()

      // we should be redirected to /dashboard
      cy.url().should('include', '/home')
    })
  })
})