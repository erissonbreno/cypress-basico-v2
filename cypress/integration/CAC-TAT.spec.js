/// <reference types="Cypress" />

describe('Central de Atendimento CAC TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach('Verifica o titulo da aplicação', function () {
        cy.visit('src/index.html')
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia formulário', function () {
        cy.clock()

        cy.get('#firstName').type('Erisson')
        cy.get('#lastName').type('Batista')
        cy.get('#email').type('a@a.com')
        cy.get('#open-text-area').type('Nada não')
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')

        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('Exibe mensagem de erro para email inválido', function () {
        cy.get('#firstName').type('Erisson')
        cy.get('#lastName').type('Batista')
        cy.get('#email').type('a@a,com')
        cy.get('#open-text-area').type('Nada não')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Valida que o campo de telefone só aceita números', function () {
        cy.get('#phone').type('abc').should('be.empty')
    })

    it('Valida que o campo de telefone vira obrigatório quando o checkbox Telefone é selecionado', function () {
        cy.get('#firstName').type('Erisson')
        cy.get('#lastName').type('Batista')
        cy.get('#email').type('a@a.com')
        cy.get('#open-text-area').type('Nada não')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa o campo de nome', function () {
        cy.get('#firstName')
            .type('Erisson')
            .should('have.value', 'Erisson')
            .clear()
            .should('be.empty')

    })

    it('Valida mensagem de erro ao não preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulario com sucesso usando um comando customizado', function () {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function () {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) pelo seu valor', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) pelo seu índice', function () {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento Feedback', function () {
        cy.get('input[type="radio"][ value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxes e desmarca o ultimo', function () {
        cy.get('input[type="checkbox"]')
            .should('have.length', 2)
            .each(function($checkbox) {
                cy.wrap($checkbox).check().should('be.checked')
            })
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo simulando drag and drop', function () {
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando um arquivo com alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]#file-upload')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a politica de privacidade abre em outra aba', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Remove o target da pagina politica de privacidade e acessa', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })
})