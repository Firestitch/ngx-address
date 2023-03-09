/// <reference types="cypress" />
import { FormateExamples } from "../support/page-object/page-objects";

describe("Format Examples", () => {
  const format_examples = new FormateExamples()
   before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
   });

  it.only("Validate one-line Address", () => {
   format_examples.oneLineAddressFormate().then(function (text) {
      const format_address_text = text.text();
      cy.log(format_address_text);
      const format_address = "CN Tower301 Front St WTorontoONM5V 2T6";
      if (format_address_text === format_address) {
        cy.log("Test Passed:");
      } else {
        cy.log("Test faild:");
        cy.contains("Address does not matched");
      }
    });
  })
  it.only("Validate two-line Address", () => {
    format_examples.twoLineFormateFirstLine().then(
      function (text) {
        const format_address_oneline_text = text.text();
        cy.log(format_address_oneline_text);
        const format_address_oneline = "CN Tower";
        if (format_address_oneline_text === format_address_oneline) {
          cy.log("Test Passed:");
        } else {
          cy.log("Test faild:");
          cy.contains("Address does not matched");
        }
      }
    );

    format_examples.twoLineFormateSecondLine().then(
      function (text) {
        const format_address_second_line_text = text.text();
        cy.log(format_address_second_line_text);
        const format_address_second_line = "301 Front St WTorontoONM5V 2T6";
        if (format_address_second_line_text === format_address_second_line) {
          cy.log("Test Passed:");
        } else {
          cy.log("Test faild:");
          cy.contains("Address does not matched");
        }
      }
    );

    format_examples.twoLineAddressFormate().then(function (text) {
      const format_address_twoline_text = text.text();
      cy.log(format_address_twoline_text);
      const format_addresstwoline = "CN Tower301 Front St WTorontoONM5V 2T6";
      if (format_address_twoline_text === format_addresstwoline) {
        cy.log("Test Passed:");
      } else {
        cy.log("Test faild:");
        cy.contains("Address does not matched");
      }
    });
  });

  it.only("validate summary formate", () => {
    format_examples.summaryFormate().then(function (text) {
       const summary_formate = text.text();
       cy.log(summary_formate);
       const summary_format_address = "CN Tower";
       if (summary_formate === summary_format_address) {
         cy.log("Test Passed:");
       } else {
         cy.log("Test faild:");
         cy.contains("Address does not matched");
       }
     });
   })
})
