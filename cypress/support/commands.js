Cypress.Commands.add('getToken', (user, passwd) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: {
      email: user,
      senha: passwd
    }
  }).its('body.token').should('not.be.empty')
  .then(token => {
    return token
  })
})

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
      method: 'GET',
      url: '/reset',
      headers: { Authorization: `JWT ${token}`}
    }).its('status').should('be.equal', 200)
})