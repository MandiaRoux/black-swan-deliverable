describe('Test Search Bar Functionality', () => {

  before(function () {
    // runs once before the first test in this block.
    cy.visit("localhost:3000")
  })
  /* The Tests */
  it('Should show helper before searching', () => {
    cy.get('img').should('be.visible')
    cy.get('input[type=text]').type("styled-components")
    cy.get('img').should('not.be.visible')
  })
  it('Should search successfully', () => {
    cy.get('input[type=text]')
        .clear()
        .type("styled-components")
        .should('have.value', "styled-components")
    cy.xpath('//*[@id="root"]/div/div[2]/div[1]').should('be.visible')
  })
  it('Should open modal when card is clicked', () => {
    cy.xpath('//*[@id="root"]/div/div[2]/div[1]').click()
    cy.get('.ReactModal__Content--after-open').should('be.visible')
  })
})
