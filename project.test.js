/// <reference types="cypress" />

const { describe } = require("mocha");

describe('Express project tests', () => {
  it('Should visit website', () => {
    cy.visit('http://localhost:3000')
  })

  it('displays 3 todo items by default', () => {
    cy.get('.table-body tr').should('have.length', 3)
  })

  it('first item index should be 1', () => {
    cy.get('.table-body tr td').first().should('have.text', 1)
  })

  it('can add new todo items', () => {
    const newItem = 'Feed the cat'

    cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)

    cy.get(`[data-task="${newItem}"]`)
      .should('have.length', 1)
      .last()
      .should('have.text', newItem)
  })

  it('can delete all tasks', () => {
    cy.contains('Clear list').click()
    
    cy.get('.table-body tr')
      .should('have.length', 0)
  })
});