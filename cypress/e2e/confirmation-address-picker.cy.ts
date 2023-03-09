import  { AddressConfirmation} from "../support/page-object/page-objects";
/// <reference types="cypress" />

describe("Confirmation Address Picker", () => {
  const addressConfirmation = new AddressConfirmation();
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });

  it(" Validate invalid user address", () => {
    //const addConfirmation = new AddressConfirmation();
    addressConfirmation.locationInput().type("Automation Testing Automation Testing Automation Testing");
    cy.contains("Automation Testing Automation Testing Automation Testing").click();
    cy.contains("Please populate the address above to locate it on the map")
   // addressConfirmation.invalidAddressDialogBoxApplyButton().should('be.disabled')
    cy.contains("Cancel").click()
    addressConfirmation.locationInput().should('be.empty')


  });

  it("Validate address location field input", () => {

    addressConfirmation.locationInput().should("be.empty").and("have.prop", "required");
    addressConfirmation.locationInput().type("Toronto, ON");
    addressConfirmation.autocompleteDropDownList().should('be.visible')
    cy.contains("Toronto, ON, Canada").click();
    addressConfirmation.applyButton().click()
    cy.wait(3000)
    addressConfirmation.editableAddressTwoLine().then(function (text) {
      const location_city = text.text();
      cy.log(location_city);
    })

    // addressConfirmation.editableAddressLineOne().then(function (text) {
    //   const location_city = text.text();
    //   cy.log(location_city);

    //   if (location_city === "215 Markham Road") {
    //     cy.log("Test Passed:");
    //   } else {
    //     cy.contains("Test Failed:location_city does not match");
    //   }
    // });

    // addressConfirmation.editableAddressLineTwo().then(function (text) {
    //   const location_region_province = text.text();
    //   cy.log(location_region_province);
    //   if (location_region_province === "TorontoONCA") {
    //     cy.log("Test Passed:");
    //   } else {
    //     cy.contains("Test Failed:location_region_province does not match:");
    //   }
    // });

    // addressConfirmation.editableAddressTwoLineAddress().then(function (text) {
    //   const location_city_region_province_two_line_formate = text.text();
    //   cy.log(location_city_region_province_two_line_formate);
    //   if (
    //     location_city_region_province_two_line_formate ===
    //     "215 Markham RoadTorontoONCA"
    //   ) {
    //     cy.log("Test Passed:");
    //   } else {
    //     cy.contains(
    //       "Test Failed:location_city_region_province_two_line_formate does not match:"
    //     );
    //   }
    // });

    // addressConfirmation.selectOneLineAddress().then(function (text) {
    //   const one_Line_address = text.text();
    //   cy.log(one_Line_address);
    //   if (one_Line_address === "215 Markham RoadTorontoONCA") {
    //     cy.log("Test Passed:");
    //   } else {
    //     cy.contains("Test Failed:one_Line_address does not match:");
    //   }
    // });
  });
  it("Validate Save button actions.", () => {
    addressConfirmation.clearAddress().click()
    addressConfirmation.saveButton().should('be.enabled')
    addressConfirmation.locationInput().type("Toronto, ON");
    cy.contains("Toronto, ON, Canada").click();
    addressConfirmation.applyButton().click()
    addressConfirmation.saveButton().click()
    addressConfirmation.saveButton().should('be.disabled')
    addressConfirmation.SaveButtonPopUPMassage().then(function (text) {
      cy.log(text.text());
      });
  });

  it("Validate two-line Address", () => {

    addressConfirmation.editableAddressLineOne().then(function (text) {
      const location_city = text.text();
      cy.log(location_city);

      if (location_city === "Toronto") {
        cy.log("Test Passed:");
      } else {
        cy.contains("Test Failed:location_city does not match");
      }
    });

    addressConfirmation.editableAddressLineTwo().then(function (text) {
      const location_region_province = text.text();
      cy.log(location_region_province);
      if (location_region_province === "ONCA") {
        cy.log("Test Passed:");
      } else {
        cy.contains("Test Failed:location_region_province does not match:");
      }
    });

    addressConfirmation.editableAddressTwoLine().then(function (text) {
      const location_city_region_province_two_line_formate = text.text();
      cy.log(location_city_region_province_two_line_formate);
      if (location_city_region_province_two_line_formate === "TorontoONCA") {
        cy.log("Test Passed:");
      } else {
        cy.contains(
          "Test Failed:location_city_region_province_two_line_formate does not match:"
        );
      }
    });
  //   addressConfirmation.editableAddressTwoLineAddress().click();
  //   addressConfirmation.street().clear();
  //   addressConfirmation.street().dblclick().type("215 Markham Road");
  //   addressConfirmation.address2().dblclick().type("2550 Lawrence");
  //   addressConfirmation.address3().dblclick().type("1470 Midland");
  //   addressConfirmation.zip().dblclick().type("M1J 3C4");
  // });
   });

  it("Validate one-line Address", () => {
    addressConfirmation.selectOneLineAddress().then(function (text) {
      const one_Line_address = text.text();
      cy.log(one_Line_address);
      if (one_Line_address === "TorontoONCA") {
        cy.log("Test Passed:");
      } else {
        cy.contains("Test Failed:one_Line_address does not match:");
      }
    });
  })

  it("validate cancel button action when a user cancels address updating", () => {

    addressConfirmation.editableAddressTwoLine().click()
    addressConfirmation.street().clear()
    addressConfirmation.street().type("1000 Markham Road")
    addressConfirmation.cancelButton().click()

    addressConfirmation.editableAddressTwoLine().then(function (text) {
      const locationCityRegionProvinceTwoLineFormate = text.text();
      cy.log(locationCityRegionProvinceTwoLineFormate);
      if (locationCityRegionProvinceTwoLineFormate === "TorontoONCA") {
        cy.log("Test Passed:");
      } else {
        cy.contains(
          "Test Failed:location_city_region_province_two_line_formate does not match:"
        );
      }
    });

  })

    // getting the address text
    it("validate hint text", () => {
      addressConfirmation.hint().then(function (text) {
        const hintText=text.text();
        cy.log(hintText)
        const matchHintText= "Hint Hint Hint Hint Hint..."
        if (hintText === matchHintText) {
          cy.log("Test Passed:");
        } else {
          cy.contains("Hint text does not match:");
        }

      });
    })

    it("Validate when clients enter valid and filling all address fields", () => {
      addressConfirmation.editableAddressTwoLine().click();
      addressConfirmation.street().dblclick().type("215 Markham Road");
      addressConfirmation.address2().dblclick().type("2550 Lawrence");
      addressConfirmation.address3().dblclick().type("1470 Midland");
      addressConfirmation.zip().dblclick().type("M1J 3C4");
      cy.log("Checking required fields input fo city, province, country ");
      addressConfirmation.city().should("have.prop", "required");
      addressConfirmation.region().should("have.prop", "required");
      addressConfirmation.country().should("have.prop", "required");
      cy.log("validating input values of, city, province, country ");
      addressConfirmation.city().should("have.value", "Toronto");
      addressConfirmation.region().should("have.value", "Ontario");
      addressConfirmation.country().should("have.value", "Canada");
      addressConfirmation.applyButton().click()
      cy.wait(3000)
      addressConfirmation.editableAddressTwoLine().then(function (text) {
     const location_city_region_province_two_line_formate = text.text();
     cy.log(location_city_region_province_two_line_formate);
        if (location_city_region_province_two_line_formate === "215 Markham Road2550 Lawrence1470 MidlandTorontoONM1J 3C4CA") {
          cy.log("Test Passed:");
        } else {
          cy.contains(
            "Test Failed:location_city_region_province_two_line_formate does not match:"
          );
        }
       });

     });

     it("Validate Google Map", () => {
      addressConfirmation.editableAddressTwoLine().click()
      cy.contains("Google").scrollIntoView();
      addressConfirmation.zoomIn().click();
      addressConfirmation.zoomOut().click();
      addressConfirmation.street().scrollIntoView();
      addressConfirmation.centerAddressButton().click();
      addressConfirmation.cancelButton();
      cy.contains("Google").scrollIntoView();
      addressConfirmation.cancelButton().click()

      //addresspicker.applyButton().dblclick();
    })
    it("Validate address form dialog box", () => {
      // negative tests
      addressConfirmation.editableAddressTwoLine().click();
      addressConfirmation.city().clear();
      addressConfirmation.country().clear();
      addressConfirmation.applyButton().dblclick();
      cy.contains(
        "Changes not saved. Please review errors highlighted in red"
      ).should("be.visible");
      addressConfirmation.cancelButton().click();
    });

    it("Validate country field value when province field value is changed or cleared", () => {
      addressConfirmation.editableAddressTwoLine().click();
      addressConfirmation.city().clear();
      addressConfirmation.region().clear();
      addressConfirmation.country().clear();
      addressConfirmation.region().type("Ontario");
      cy.contains("Ontario, Canada").click();
      addressConfirmation.country().should("have.value", "Canada");
      addressConfirmation.cancelButton().click();
    });

    it("Validate Dialog box2 title, content and buttons.", () => {
      //fs-modal-confirm pop up window massage "You Have Unsaved Changes"
      addressConfirmation.editableAddressTwoLine().click();
      addressConfirmation.street().dblclick().clear();
      addressConfirmation.street().dblclick().type("210 Markham Road");
      addressConfirmation.overlayBackdrop().click({ force: true });

      addressConfirmation
        .titleText()
        .should("have.text", "You Have Unsaved Changes");
        addressConfirmation
        .contentText()
        .should("have.text", "What would you like to do with your changes?");

        addressConfirmation
        .saveChangeButton()
        .should("have.text", "Save & Continue")
        .click();
        addressConfirmation.discardChangesContinueButton()
        .should("have.text", "Discard Changes & Continue")

        addressConfirmation
        .reviewChangesButton()
        .should("have.text", "Review Changes")

    });
    it("Validate address when address is modified or edited", () => {
      // cy.pause()

       addressConfirmation.editableAddressTwoLine().click();
       addressConfirmation.street().dblclick().clear();
       addressConfirmation.street().dblclick().type("220 Markham Road");
       addressConfirmation.overlayBackdrop().click({ force: true });
       addressConfirmation.saveChangeButton().click()
       cy.wait(2000);
       addressConfirmation.editableAddressTwoLine().should("be.visible");
       addressConfirmation.editableAddressTwoLine().then(function (text) {
           const address_edited = text.text();
           cy.log(address_edited);
           const address_match_with =
             "220 Markham Road2550 Lawrence1470 MidlandTorontoONM1J 3C4CA";
           if (address_edited === address_match_with) {
             cy.log("Test Passed:");
           } else {
             cy.log("Test Failed:", "does not match the address)");
             cy.contains("does not match the address");
           }
         });


     });


     it("Validate Discard Changes & Continue button actions after editing the address", () => {
       // cy.pause()
       addressConfirmation.editableAddressTwoLine().click();
       addressConfirmation.street().dblclick().clear();
       addressConfirmation.street().dblclick().type("200 Markham Road");
       addressConfirmation.overlayBackdrop().click({ force: true });
       addressConfirmation
          .discardChangesContinueButton()
          .should("have.text", "Discard Changes & Continue")
          .click();
          addressConfirmation.container().should("be.visible");
      });

     //fs-modal-confirm button "Review Changes"
     it("Validate Discard Review Changes button after editing the address", () => {
      addressConfirmation.street().clear();
       cy.wait(2000)
       addressConfirmation.street().dblclick().type("1000 Markham Road");
       addressConfirmation.overlayBackdrop().click({ force: true });
       cy.wait(2000);
       addressConfirmation
         .reviewChangesButton()
         .should("have.text", "Review Changes")
         .click();
         addressConfirmation.container().should("be.visible");
     });
  // it("Confirmation Address Picker:Test case 12.", () => {
  //   //fs-modal-confirm pop up window massage "You Have Unsaved Changes"
  //   addressConfirmation.editableAddressTwoLine().click();
  //   addressConfirmation.street().dblclick().clear();
  //   addressConfirmation.street().dblclick().type("210 Markham Road");
  //   addressConfirmation.overlayBackdrop().click({ force: true });

  //   addressConfirmation
  //     .titleText()
  //     .should("have.text", "You Have Unsaved Changes");
  //   addressConfirmation
  //     .contentText()
  //     .should("have.text", "What would you like to do with your changes?");

  //   addressConfirmation
  //     .saveChangeButton()
  //     .should("have.text", "Save & Continue")
  //     .click();
  // });

  // it("Confirmation Address Picker:Test case 13.", () => {
  //   //fs-modal-confirm button "Save & Continue"
  //   cy.wait(2000);
  //   addressConfirmation.editableAddressTwoLine().should("be.visible");
  //   addressConfirmation.editableAddressTwoLine().then(function (text) {
  //     const address_edited = text.text();
  //     cy.log(address_edited);
  //     const address_match_with =
  //       "210 Markham Road2550 Lawrence1470 MidlandTorontoONM1J 3C4CA";
  //     if (address_edited === address_match_with) {
  //       cy.log("Test Passed:");
  //     } else {
  //       cy.log("Test Failed:", "does not match the address)");
  //       cy.contains("does not match the address");
  //     }
  //   });
  // });

  // //fs-modal-confirm button "Discard Changes & Continue "
  // it("Confirmation Address Picker:Test case 14.", () => {
  //   addressConfirmation.editableAddressTwoLine().click();
  //   addressConfirmation.street().dblclick().clear();
  //   addressConfirmation.street().dblclick().type("220 Markham Road");
  //   addressConfirmation.overlayBackdrop().click({ force: true });
  //   addressConfirmation
  //     .discardChangesContinueButton()
  //     .should("have.text", "Discard Changes & Continue")
  //     .click();
  //   addressConfirmation.container().should("be.visible");
  // });

  // //fs-modal-confirm button "Review Changes"
  // it("Confirmation Address Picker:Test case 15.", () => {
  //   addressConfirmation.street().clear();
  //   addressConfirmation.street().type("2100 Markham Road");
  //   addressConfirmation.overlayBackdrop().click({ force: true });
  //   cy.wait(2000);
  //   addressConfirmation
  //     .reviewChangesButton()
  //     .should("have.text", "Review Changes")
  //     .click();
  //   addressConfirmation.container().should("be.visible");
  // });
  // it("Confirmation Address Picker:Test case 5.", () => {
  //   addressConfirmation.city().should("have.prop", "required");
  //   addressConfirmation.region().should("have.prop", "required");
  //   addressConfirmation.country().should("have.prop", "required");

  //   //validating the input values
  //   it("Confirmation Address Picker:Test case 6.", () => {
  //     cy.log("checking input values");
  //     addressConfirmation.city().should("have.value", "Toronto");
  //     addressConfirmation.region().should("have.value", "Ontario");
  //     addressConfirmation.country().should("have.value", "Canada");
  //   });
  // });

  // it("Confirmation Address Picker:Test case 7.", () => {
  //   cy.contains("Google").scrollIntoView();
  //   addressConfirmation.zoomIn().click();
  //   addressConfirmation.zoomOut().click();
  //   addressConfirmation.street().scrollIntoView();

});
