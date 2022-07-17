import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
  cy.get(locator).click()
  cy.on('window:alert', msg => {
    expect(msg).to.be.equal(message)
  })
})

Cypress.Commands.add('login',(user, passwd) => {
  cy.visit('https://barrigareact.wcaquino.me')
  cy.get(loc.LOGIN.USER).type(user)
  cy.get(loc.LOGIN.PASSWORD).type(passwd)
  cy.get(loc.LOGIN.BTN_LOGIN).click()
  cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () =>{
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.MENU.RESET).click()
})

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
    Cypress.env('token', token)
    return token
  })
})

Cypress.Commands.add('resetRest', (token) => {
    cy.request({
      method: 'GET',
      url: '/reset',
      // headers: { Authorization: `JWT ${token}`}
    }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('getContaByName', name =>{
  cy.getToken('testefelipe@a', 'senhacypress').then(token  => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: { Authorization: `JWT ${token}`},
      qs: {
        nome: name
      }
    }).then(res =>{
      return res.body[0].id
    })
  })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) =>{
  if(options.length === 1){
    if (Cypress.env('token')) {
      options[0].headers = {
        Authorization: `JWT ${Cypress.env('token')}`
      }
    }
  }

  return originalFn(...options)
})