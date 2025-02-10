/// <reference types="cypress" />
describe("Character API Test", () => {
    it("Should display equipment after clicking Show equipment", () => {
        cy.intercept("GET", "**/characters/random", { fixture: "character.json" }).as("getCharacter");

        cy.visit("/");

        cy.wait("@getCharacter");

        cy.contains("Show equipment").click();

        cy.contains("Sword (x1)").should("be.visible");
        cy.contains("Shield (x1)").should("be.visible");
        cy.contains("Potion (x3)").should("be.visible");
    });
});

