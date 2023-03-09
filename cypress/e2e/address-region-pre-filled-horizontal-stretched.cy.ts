/// <reference types="cypress" />
import { AddressRegionNoValidationHorizontal, AddressRegionPrefilledHorizontalStretched } from "../support/page-object/page-objects";

describe("Address Region, pre-filled, horizontal stretched", () => {
  const addressRegion = new AddressRegionPrefilledHorizontalStretched()
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });
  // Test case "Address Region, pre-filled, horizontal stretched"
  it("Validate that coutry field has value province does not", () => {

    addressRegion.country().should("have.value", "Canada");
    addressRegion.region().should('be.empty')
  })

  it("validate entering value to the country and province fields ", () => {
    addressRegion.country().clear();
    addressRegion.region().clear();
    addressRegion.country().type("Canada")
    cy.contains("Canada")
    addressRegion.region().type("Ontario");
    cy.contains("Ontario").click();

  });
  it("Validate country field value when province field value is modified", () => {

    addressRegion.country().clear();
    addressRegion.region().clear();
    addressRegion.region().type("Ontario");
    cy.contains("Ontario").click();
    addressRegion.country().should('have.value','Canada')


  })

});


