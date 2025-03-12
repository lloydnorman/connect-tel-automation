class LoginPage {

    constructor() {
      this.email = '#email';
      this.password = '#password';
      this.loginButton = '.inline-flex';
      this.errorMsgInvalidCreds = '.text-red-600';
      this.errorMsgEmailReq = '.text-sm.text-red-600.mt-2';
      this.errorMsgPassReq = '.text-sm.text-red-600.mt-2';
      this.errorMsgEmailNPassReq1 = ':nth-child(1) > .text-red-600';
      this.errorMsgEmailNPassReq2 = ':nth-child(2) > .text-red-600';
      this.errorMsgMoreThan5Try = '.text-red-600';
    }

    goToLoginURL(){
        cy.visit('https://fmp.telecomonline.com.au/login')
    }

    inputEmail(email){
        cy.get(this.email).type(email)
    }

    inputPassword(password){
        cy.get(this.password).type(password)
    }

    clearEmailNPass(){
        cy.get(this.email).clear()
        cy.get(this.password).clear()
    }

    clickLoginButton(){
        cy.get(this.loginButton).click()
    }

    verifySuccessLogin(){
        cy.url().should('include', '/dashboard')
    }

    verifyErrorMsgInvalidCreds(){
        cy.get(this.errorMsgInvalidCreds).should('contain', 'These credentials do not match our records.')
    }
    
    verifyErrorMsgPassReq(){
        cy.get(this.errorMsgPassReq).should('contain', 'The password field is required.')
    }

    verifyErrorMsgEmailReq(){
        cy.get(this.errorMsgPassReq).should('contain', 'The email field is required.')
    }

    verifyErrorMsgEmailNPassReq(){
        cy.get(this.errorMsgEmailNPassReq1).should('contain', 'The email field is required.')
        cy.get(this.errorMsgEmailNPassReq2).should('contain', 'The password field is required.')
    }

    verifyErrorMsgMoreThan5Try(){
        cy.get(this.errorMsgMoreThan5Try).should('contain', 'Too many login attempts.')
    }

    verifyPassword(){
        cy.get(this.password).should('have.attr', 'type', 'password');
    }

    verifyEmail(){
        cy.get(this.email).should('have.attr', 'type', 'email');
    }
}
export default LoginPage;

