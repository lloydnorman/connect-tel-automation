import LoginPage from "../pageObjects/LoginPage"
import RegisterPage from "../pageObjects/RegisterPage";
import DashboardPage from "../pageObjects/DashboardPage";
import CompanyInfoPage from "../pageObjects/CompanyInfoPage";
import CompanyQuotePage from "../pageObjects/CompanyQuotePage";

describe('End-to-end testing for the Connect Tel Website', () => {
  const login = new LoginPage();
  const register = new RegisterPage();
  const dashboard = new DashboardPage();
  const companyInfo = new CompanyInfoPage();
  const companyQuote = new CompanyQuotePage();
  const regEmail = 'johndoe993@gmail.com';

  //run this script in 1nd batch due to login attempt validation
  describe('Login Page', () => {
    beforeEach(() => {
      login.goToLoginURL()
    });

    it('Success Login Functionality', () => {
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      login.verifySuccessLogin()
    })

    it('Login using Invalid Email Address', () => {
      login.inputEmail('invalid_email@gmail.com')
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      login.verifyErrorMsgInvalidCreds()
    })

    it('Login using Invalid Password', () => {
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('Password')
      login.clickLoginButton()
      login.verifyErrorMsgInvalidCreds()
    })

    it('Login using empty email', () => {
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      login.verifyErrorMsgEmailReq()
    })

    it('Login using empty password', () => {
      login.inputEmail('testuser@gmail.com')
      login.clickLoginButton()
      login.verifyErrorMsgPassReq()
    })

    it('Login using empty email and password', () => {
      login.clickLoginButton()
      login.verifyErrorMsgEmailReq()
      login.verifyErrorMsgEmailNPassReq()
    })

    it('Login using invalid cred more than 3 times and 1 valid creds', () => {
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('Password')
      for (let i = 0; i < 3; i++) {
        login.clickLoginButton()
      }
      login.clearEmailNPass()
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      login.verifySuccessLogin()
    })

    it('Login using invalid cred more than 5 times', () => {
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('Password')
      for (let i = 0; i < 6; i++) {
        login.clickLoginButton()
      }
      login.verifyErrorMsgMoreThan5Try()
    })

    it('Security - Verify Password Masking', () => {
      login.inputPassword('N%CA#ofR81V6$W')
      login.verifyPassword()
    })

    it('Security - Verify Email Format', () => {
      login.inputEmail('testuser@gmail.com')
      login.verifyEmail()
    })
  })

  describe('Register Page', () => {
    beforeEach(() => {
      register.goToRegisterURL()
      register.inputName('John Doe')
      register.inputEmail(regEmail)
    })

    it('Success Registration Functionality', () => {
      register.inputPassword('Pass@123!')
      register.inputPasswordConfirm('Pass@123!')
      register.clickRegisterButton()
      register.verifySuccessRegistration()
    })

    it('Registration using duplicate email', () => {
      register.inputPassword('Pass@123!')
      register.inputPasswordConfirm('Pass@123!')
      register.clickRegisterButton()
      register.verifyErrorMsgDuplicateEmail()
    })

    it('Registration using below min length', () => {
      register.inputPassword('Pass123')
      register.inputPasswordConfirm('Pass123')
      register.clickRegisterButton()
      register.verifyErrorMsgMinPassLength()
    })

    it('Registration using without required character', () => {
      register.inputPassword('pass12345')
      register.inputPasswordConfirm('pass12345')
      register.clickRegisterButton()
      register.verifyErrorMsgReqChar()
    })

    it('Registration using password and confirm password not match', () => {
      register.inputPassword('Pass12345')
      register.inputPasswordConfirm('Pass1234')
      register.clickRegisterButton()
      register.verifyErrorMsgPassNotMatch()
    })
  })

  describe('Register Page - Required field validations', () => {
    beforeEach(() => {
      register.goToRegisterURL()
    })

    it('Registration - Name field required validation', () => {
      register.validateNameReqField()
    })

    it('Registration - Email field required validation', () => {
      register.validateEmailReqField()
    })

    it('Registration - Password field required validation', () => {
      register.validatePassReqField()
    })

    it('Registration - Confirm Password field required validation', () => {
      register.validateConfirmPassReqField()
    })
  })


  //run this script in 2nd batch due to login attempt validation
  /* describe('Dashboard Page', () => {
    it('Verify if the dashboard is visible after login', () => {
      login.goToLoginURL()
      login.goToLoginURL()
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      dashboard.verifyDashContent()
    })
  })

  describe('Company Information Page', () => {
    const validSymbol = 'AAP'
    const invalidSymbol = 'AB'

    beforeEach(() => {
      login.goToLoginURL()
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      cy.wait(1000)
      companyInfo.goToCompanyInfoPage()
    })

    it('Verify empty Company symbol', () => {
      companyInfo.clickGetProfileButton()
      companyInfo.verifyErrorMsgReqField()
    })

    it('Verify Company Symbol Below Minimum Length', () => {
      companyInfo.inputSymbol(invalidSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyErrorMsgMinField()
    })

    it('Verify Valid Company Symbol', () => {
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyCompanyProfile()
    })

    it('Verify Search Box Prepopulation After Search', () => {
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifySymbolField(validSymbol)
    })

    it('Verify Large Screen Layout', () => {
      cy.viewport(1920, 1080)
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyColumnsLargeLayout()
    })

    it('Verify Medium Screen Layout', () => {
      cy.viewport(768, 1024)
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyColumnsMediumLayout()
    })

    it('Verify Small Screen Layout', () => {
      cy.viewport(375, 667)
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyColumnsSmallLayout()
    })
  })

  describe('Company Quote Page', () => {
    const validSymbol = 'AAP'
    const invalidSymbol = 'AB'

    beforeEach(() => {
      login.goToLoginURL()
      login.inputEmail('testuser@gmail.com')
      login.inputPassword('N%CA#ofR81V6$W')
      login.clickLoginButton()
      cy.wait(1000)
      companyQuote.goToCompanyQuotePage()
    })

    it('Verify empty Company symbol', () => {
      companyInfo.clickGetProfileButton()
      companyInfo.verifyErrorMsgReqField()
    })

    it('Verify Company Symbol Below Minimum Length', () => {
      companyInfo.inputSymbol(invalidSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyErrorMsgMinField()
    })

    it('Verify Valid Company Symbol', () => {
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyCompanyProfile()
    })

    it('Verify Search Box Prepopulation After Search', () => {
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifySymbolField(validSymbol)
    })

    it('Verify Large Screen Layout', () => {
      cy.viewport(1920, 1080)
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyColumnsLargeLayout()
    })

    it('Verify Medium Screen Layout', () => {
      cy.viewport(768, 1024)
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyColumnsMediumLayout()
    })

    it('Verify Small Screen Layout', () => {
      cy.viewport(375, 667)
      companyInfo.inputSymbol(validSymbol)
      companyInfo.clickGetProfileButton()
      companyInfo.verifyColumnsSmallLayout()
    })
  }) */
})