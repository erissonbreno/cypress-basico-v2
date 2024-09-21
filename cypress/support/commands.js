Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Erisson')
    cy.get('#lastName').type('Batista')
    cy.get('#email').type('a@a.com')
    cy.get('#open-text-area').type('Nada não')
    cy.get('button[type="submit"]').click()
})