Cypress._.times(3, function () {
    it('Valida a pagina de privacidade', function () {
        cy.visit('src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})