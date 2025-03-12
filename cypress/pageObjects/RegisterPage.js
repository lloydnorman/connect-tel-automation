class RegisterPage {

    constructor() {

        const errorSelector = ':nth-child(3) > .text-red-600';

        this.name = '#name';
        this.email = '#email';
        this.password = '#password';
        this.passwordConfirm = '#password_confirmation';
        this.registerButton = '.inline-flex';
        this.erroMsgDuplicateEmail = '.text-red-600';
        this.errorMsgMinPassLenght = errorSelector;
        this.errorMsgReqChar = errorSelector;
        this.errorMsgPassNotMatch = errorSelector;
    }

    goToRegisterURL() {
        cy.visit('https://fmp.telecomonline.com.au/register')
    }

    inputName(name) {
        cy.get(this.name).type(name)
    }

    inputEmail(email) {
        cy.get(this.email).type(email)
    }

    inputPassword(password) {
        cy.get(this.password).type(password)
    }

    inputPasswordConfirm(passwordConfirm) {
        cy.get(this.passwordConfirm).type(passwordConfirm)
    }

    clickRegisterButton() {
        cy.get(this.registerButton).click()
    }

    verifySuccessRegistration() {
        cy.url().should('include', '/dashboard')
    }

    verifyErrorMsgDuplicateEmail() {
        cy.get(this.erroMsgDuplicateEmail).should('contain', 'The email has already been taken.')
    }

    verifyErrorMsgMinPassLength(){
        cy.get(this.errorMsgMinPassLenght).should('contain', 'The password field must be at least 8 characters.')
    }

    verifyErrorMsgReqChar(){
        cy.get(this.errorMsgReqChar).should('contain', 'The password field must contain at least one uppercase and one lowercase letter.')
    }

    verifyErrorMsgPassNotMatch(){
        cy.get(this.errorMsgPassNotMatch).should('contain', 'The password field confirmation does not match.')
    }

    validateNameReqField(){
        cy.get(this.name).then(($input) => {
            expect($input[0].validationMessage).to.not.be.empty;
          })
    }

    validateEmailReqField(){
        cy.get(this.email).then(($input) => {
            expect($input[0].validationMessage).to.not.be.empty;
          })
    }

    validatePassReqField(){
        cy.get(this.password).then(($input) => {
            expect($input[0].validationMessage).to.not.be.empty;
          })
    }

    validateConfirmPassReqField(){
        cy.get(this.passwordConfirm).then(($input) => {
            expect($input[0].validationMessage).to.not.be.empty;
          })
    }
}

export default RegisterPage;