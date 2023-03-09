/// <reference types="cypress" />
import { AddressRegionRequired } from "../support/page-object/page-objects";

describe("Address Region, required", () => {
  const addressRegion = new AddressRegionRequired()
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });


  // Test case "Address Region, required"
  it.only("Validate that country and province field values are empty", () => {
    addressRegion.country().should('be.empty')
    addressRegion.region().should('be.empty')
  })

  it.only("validate entering country and province field values ", () => {
    addressRegion.country().type("Canada")
    cy.contains("Canada").click()
    addressRegion.region().type("Ontario")
    cy.contains("Ontario").click()
  })
  it.only("Validate province field when country field value is cleared ", () => {



   addressRegion.region().clear();
   addressRegion.country().clear()
   addressRegion.country().type("Canada")
   cy.contains("Canada").click()
  addressRegion.region().type("Ontario")
  cy.contains("Ontario").click()
  addressRegion.country().clear()
  addressRegion.region().should('be.empty')
  //   addressRegion.region().type("Ontario");
  //   cy.contains("Ontario").click();
  //   addressRegion.country().should(
  //     "have.value",
  //     "Canada"
  //   );
  //   cy.contains("CA, ON");
  });
});
