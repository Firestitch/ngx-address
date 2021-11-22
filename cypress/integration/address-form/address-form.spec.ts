/// <reference types="cypress" />
import { AddressForm } from "../../support/page-object/page-objects";
describe("Address Form", () => {
  const addressForm = new AddressForm()
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });
  it("Validate entering invalid address", () => {

    addressForm.locationInput().type("Automation Testing Automation Testing Automation Testing")
    addressForm.street().type("Automation Testing Automation Testing Automation Testing")
    addressForm.address2().type("Automation Testing Automation Testing Automation Testing")
    addressForm.address3().type("Automation Testing Automation Testing Automation Testing")
    addressForm.city().should("be.empty");
    addressForm.region().should("be.empty");
    addressForm.country().should("be.empty");
    addressForm.zip().should("be.empty");

  });
  it("Validate entering valid address", () => {
    addressForm.name().type("Toronto").click();
    addressForm.street().type("215 Markham Road");
    cy.contains("215 Markham Road").click();
    addressForm.address2().type("1470 Midland");
    addressForm.address3().type("1470 Midland");
    addressForm.city().should(
      "have.value",
      "Toronto"
    );
    addressForm.region().should(
      "have.value",
      "Ontario"
    );
    // cy.contains("Ontario").click();
     addressForm.country().should(
      "have.value",
      "Canada"
    );
    addressForm.zip().should("have.value", "M1J 3C3");
  });


  it("Validate country field when address field is modified!", () => {
    addressForm.region().clear();
    addressForm.country().clear();
    addressForm.region().type("Alberta");
    cy.contains("Alberta").click();
    addressForm.country().should(
      "have.value",
      "Canada"
    );
  });
  it("Validate province field value is cleared after clearing country field value ", () => {
    addressForm.country().clear();
    addressForm.region().should("be.empty");
  });
});
