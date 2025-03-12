class CompanyQuotePage {

    constructor(){
        this.companyQuotePage = '(//a[normalize-space()="Company Quote"])[1]';
        this.symbolField = '.flex > .border';
        this.getProfileButton = '.bg-indigo-500';
        this.errorMsgField = '.p-6 > :nth-child(1) > .text-sm';
        this.companyProfile = '.text-2xl'
        this.tableColumn1 = '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4.p-4 > .mb-4:nth-child(3n + 1)';
        this.tableColumn2 = '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4.p-4 > .mb-4:nth-child(3n + 2)';
        this.tableColumn3 = '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3.gap-4.p-4 > .mb-4:nth-child(3n + 3)';
    }

    goToCompanyQuotePage(){
        cy.xpath(this.companyQuotePage).click()
    }

    inputSymbol(symbol){
        cy.get(this.symbolField).type(symbol)
    }

    clickGetProfileButton(){
        cy.get(this.getProfileButton).click()
    }

    verifyErrorMsgReqField(){
        cy.get(this.errorMsgField).should('contain', 'The symbol field is required.')
    }

    verifyErrorMsgMinField(){
        cy.get(this.errorMsgField).should('contain', 'The symbol field must be at least 3 characters.')
    }

    verifyCompanyProfile(){
        cy.get(this.companyProfile).should('be.visible')
    }

    verifySymbolField(symbol){
        cy.get(this.symbolField).should('contain', symbol)
    }

    verifyColumnsLargeLayout(){
        cy.get(this.tableColumn1).should('be.visible')
        cy.get(this.tableColumn2).should('be.visible')
        cy.get(this.tableColumn3).should('be.visible')
        cy.get(this.tableColumn1).children().should('have.length.greaterThan', 0)
        cy.get(this.tableColumn2).children().should('have.length.greaterThan', 0)
        cy.get(this.tableColumn3).children().should('have.length.greaterThan', 0)
    }

    verifyColumnsMediumLayout(){
        cy.get(this.tableColumn1).should('be.visible')
        cy.get(this.tableColumn2).should('be.visible')
        cy.get(this.tableColumn1).children().should('have.length.greaterThan', 0)
        cy.get(this.tableColumn2).children().should('have.length.greaterThan', 0)
    }

    verifyColumnsSmallLayout(){
        cy.get(this.tableColumn1).should('be.visible')
        cy.get(this.tableColumn1).children().should('have.length.greaterThan', 0)
    }
}

export default CompanyQuotePage;