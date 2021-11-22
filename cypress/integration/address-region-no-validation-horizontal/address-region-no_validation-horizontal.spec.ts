/// <reference types="cypress" />
import { AddressRegionNoValidationHorizontal } from "../../support/page-object/page-objects";

describe("Address Region, no validation, horizontal", () => {
  const addressRegion = new AddressRegionNoValidationHorizontal()
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });

  it("validate address region should does not have values ", () => {
    addressRegion.country().should('be.empty')
    addressRegion.region().should('be.empty')

  })

  it("validate address", () => {
    addressRegion.country().type("Canada");
    cy.contains("Canada").click();
    addressRegion.region().type("Ontario");
    cy.contains("Ontario").click();
  })

  it("Validate province field when country field is cleared ", () => {
    addressRegion.country().clear();
    addressRegion.region().clear();
    addressRegion.region().type("Ontario");
    cy.contains("Ontario").click();
    addressRegion.country().should("have.value", "Canada");
  })
});
