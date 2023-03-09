/// <reference types="cypress" />
import { AddressRegionDisabled } from "../support/page-object/page-objects";

describe("Address Region, disabled", () => {
  const addressRegionDisabled = new AddressRegionDisabled()
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });

  it("validate the address field value is disabled ", () => {
    addressRegionDisabled.country().should("be.disabled")
      .and("have.value", "Canada");
      addressRegionDisabled.region()
      .should("be.disabled")
      .and("have.value", "Ontario");
  });
});
