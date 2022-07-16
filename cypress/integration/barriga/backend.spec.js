/// <reference types="cypress" />

describe('Rest test', () => {
  let token

  before( () => {
    cy.getToken('testefelipe@a', 'senhacypress')
      .then(tkn =>{
        token = tkn
      })
  })

  beforeEach( () => {
    cy.resetRest(token)
  })

  it.only('Should create an account', () => {
    cy.request({
      url: '/contas',
      method: 'POST',
      headers: { Authorization: `JWT ${token}`},
      body: {
        nome: 'Conta via rest'
      }
    }).as('response')
        
    cy.get('@response').then(res =>{
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  })

})