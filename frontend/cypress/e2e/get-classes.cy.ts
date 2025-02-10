describe("Get classes API Test", () => {
    it("Should display classes on selects", () => {
        cy.intercept("GET", "**/classes", { fixture: "classnames.json" }).as("getClasses");

        cy.visit("/compare");

        cy.wait("@getClasses");

        cy.get("#class1")
            .contains("Warrior")
            .should("be.visible");

        cy.get("#class2")
            .contains("Mage")
            .should("be.visible");

        cy.get("#class1")
            .contains("Rogue")
            .should("not.exist");

        cy.get("#class2")
            .contains("Rogue")
            .should("not.exist");
    });
});
