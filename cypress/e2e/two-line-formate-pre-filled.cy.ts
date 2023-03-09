/// <reference types="cypress" />
import { TwoLineFormatePrefilled } from "../support/page-object/page-objects";

describe("Two-line formate, pre-filled", () => {
  const twoLineFormatePrefilled = new TwoLineFormatePrefilled
   before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
   });

  it.only("validate pre-filled address", () => {
   twoLineFormatePrefilled.editableFiled().then(function (
      text
    ) {
      const address = text.text();
      cy.log(address);
      const address_two_line_format =
        "CN Tower301 Front Street WestTorontoONM5V 2T6CA";
      if (address === address_two_line_format) {
        cy.log("Test passed:");
      } else {
        cy.log("Test fialed:");
        cy.contains("address does not match");
      }
    });

    twoLineFormatePrefilled.editableFiled().dblclick();
    twoLineFormatePrefilled.locationInput().should("have.value", "CN Tower");
    twoLineFormatePrefilled.street().should(
      "have.value",
      "301 Front Street West"
    );

    twoLineFormatePrefilled.city().should("have.value", "Toronto");
    twoLineFormatePrefilled.region().should(
      "have.value",
      "Ontario"
    );
    twoLineFormatePrefilled.country().should(
      "have.value",
      "Canada"
    );
    // .invoke("prop", "required", true);
    //.invoke("prop", "disabled", true);
    //.and("have.prop", "required");

    twoLineFormatePrefilled.zip().should("have.value", "M5V 2T6");
    twoLineFormatePrefilled.applyButton().should( "be.disabled");
    twoLineFormatePrefilled.cancelButton().click({ force: true });
    cy.wait(2000)
    twoLineFormatePrefilled.editableFiled().then(function (
      text
    ) {
      cy.log(text.text());
    });

  });


  it.only("validate clearing the address", () => {

    twoLineFormatePrefilled.editableFiled().click()
    twoLineFormatePrefilled.locationInput().clear()
    twoLineFormatePrefilled.street().clear()
    twoLineFormatePrefilled.city().clear()
    twoLineFormatePrefilled.region().clear()
    twoLineFormatePrefilled.country().clear()
    twoLineFormatePrefilled.zip().clear()
    twoLineFormatePrefilled.applyButton().click()

  })

  it.only("validate entering address", () => {

   // twoLineFormatePrefilled.clearAddress().click()
    twoLineFormatePrefilled.location().click().type("Toronto")
    cy.contains("Toronto, ON, Canada").click();
    cy.wait(3000)
    twoLineFormatePrefilled.editableFiled().should('be.not.empty')

  })


  it.only("validate modifed address", () => {
    cy.wait(3000)
    // twoLineFormatePrefilled.clearAddress().click()
     twoLineFormatePrefilled.editableFiled().click()
     twoLineFormatePrefilled.street().type("215")
     twoLineFormatePrefilled.backDropOverlay().click({force: true})
     twoLineFormatePrefilled.saveContinueButton().dblclick({force: true})
     cy.wait(2000)
   })

   it.only("validate title and content of dialog box", () => {

    twoLineFormatePrefilled.editableFiled().click({force: true})
    twoLineFormatePrefilled.city().clear()
    twoLineFormatePrefilled.street().type("300")
    twoLineFormatePrefilled.backDropOverlay().dblclick({force: true})
    twoLineFormatePrefilled.dialogBox2Title().then(function (
      text
    ) {
      cy.log(text.text());
    });

  twoLineFormatePrefilled.dialogBox2Content().then(function (
    text
  ) {
    cy.log(text.text());
  });

  twoLineFormatePrefilled.saveContinueButton().dblclick({force: true})
  cy.wait(2000)

   // cy.contains("Save & Continue").click()
   })

   it.only("validate Cancel changes to the address ", () => {

    twoLineFormatePrefilled.editableFiled().click({force: true})
    twoLineFormatePrefilled.street().click().clear()
    twoLineFormatePrefilled.street().type("1000")
    twoLineFormatePrefilled.cancelButton().dblclick()
    cy.wait(200)

   })

   it.only("Validate Discard Changes & Continue button actions ", () => {

    twoLineFormatePrefilled.editableFiled().click({force: true})
    twoLineFormatePrefilled.street().click().clear()
    twoLineFormatePrefilled.street().type("1200")
    twoLineFormatePrefilled.backDropOverlay().click({force: true})
    twoLineFormatePrefilled.dialogBox2Content().then(function (
      text
    ) {
      cy.log(text.text());
    });
    twoLineFormatePrefilled.discardChangesContinueButton().dblclick({force: true})
    twoLineFormatePrefilled.cancelButton().click()
    cy.wait(2000)
   })

   it.only("validate Review Changes button action ", () => {

    twoLineFormatePrefilled.editableFiled().click({force: true})
    twoLineFormatePrefilled.street().click().clear()
    twoLineFormatePrefilled.street().type("1700")
    twoLineFormatePrefilled.backDropOverlay().click({force: true})
    twoLineFormatePrefilled.reviewChangesButton().click({force: true})
    twoLineFormatePrefilled.dialogBOx1().should('be.visible')

   })

});
