Cypress.Commands.add('getToken', (user, passwd) =>{
  cy.request({
    method: 'POST',
    url: 'https://barrigarest.wcaquino.me/signin',
    body: {
      email: user,
      senha: passwd
    }
  }).its('body.token').should('not.be.empty')
  .then(token => {
    return token
  })
})