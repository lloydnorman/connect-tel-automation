class DashboardPage {

    constructor(){
        this.dashboardContent = '.p-6.text-gray-900';
    }

    verifyDashContent(){
        cy.get(this.dashboardContent).should('contain', 'Dashboard Content')
    }
}

export default DashboardPage;