describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/')
    cy.get(':nth-child(1) > .card > .card-body > .btn')
    .click()
    cy.url().should('include', '/pageBlog')
  })
  })