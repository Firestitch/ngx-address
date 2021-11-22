/// <reference types="cypress" />
import { should } from "chai";
import { DisabledReadonlyAddresses } from "../../support/page-object/page-objects";

describe.skip("Disabled and Readonly addresses", () => {
  const disabledReadOnlyAddresses= new DisabledReadonlyAddresses()
   before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });
  // Test case "Disabled and Readonly addresses"
  it.only("Disabled and Readonly addresses!", () => {
    disabledReadOnlyAddresses.twoLineAddressDisabled().then(function (text) {
    //disabledReadOnlyAddresses.twoLineAddressDisabled().should('be.disables')
      const first_line_address_text = text.text();
     cy.log(first_line_address_text);
      // const first_line_address = "CNTower";
      // if (first_line_address_text === first_line_address) {
      //   cy.log("Test Passed:");
      // } else {
      //   cy.log("Test faild:");
      //   cy.contains("not match addres");
      // }
    });
  })

  it("Disabled and Readonly addresses!", () => {

    cy.get(
      "[name='Disabled and Readonly addresses'] .line-1:nth-child(1)"
    ).then(function (text) {
      const first_line_address_text = text.text();
      cy.log(first_line_address_text);
      const first_line_address = "CNTower";
      if (first_line_address_text === first_line_address) {
        cy.log("Test Passed:");
      } else {
        cy.log("Test faild:");
        cy.contains("not match addres");
      }
    });

    //   cy.get(".mat-toolbar").eq("6").should("be.visible");
    cy.log("disabled");
  })
});
