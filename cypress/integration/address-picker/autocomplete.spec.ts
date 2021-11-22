import  { AddressConfirmation, AddressPicker } from "../../support/page-object/page-objects";

describe("Address Picker", () => {
  const addresspicker = new AddressPicker();
  before(function () {
    //cy.visit(Cypress.env("localHost"));
    cy.visit("/");
  });

  it("Validate invalid user address.", () => {
    addresspicker.locationInput().type("Automation Testing Automation Testing Automation Testing");
    cy.contains("Automation Testing Automation Testing Automation Testing").click();
    addresspicker.editableAddressTwoLine().click();
    cy.contains("Please populate the address above to locate it on the map")
    addresspicker.invalidAddressDialogBoxApplyButton().should('be.disabled')
    cy.contains("Cancel").click()
    addresspicker.clearAddress().click()
  })


  it("Validate address location field.", () => {
    addresspicker.locationInput().should("be.empty").and("have.prop", "required");
    addresspicker.locationInput().type("Toronto, ON");
    addresspicker.autocompleteDropDownList().should('be.visible')
    cy.contains("Toronto, ON, Canada").click();

    //iterating over the autocomplete list
    // cy.get(".mat-autocomplete-panel").each(($el, index, $list) => {
    //   const location = $el.text();
    //   const LocationToSelect = "TorontoONCA";
    //   if (location === LocationToSelect) {
    //     cy.location.dblclick();
    //   }
    // });
  });

  it("Validate Save button actions.", () => {

    addresspicker.clearAddress().click()
    addresspicker.saveButton().should('be.enabled')
    addresspicker.locationInput().type("Toronto, ON");
    cy.contains("Toronto, ON, Canada").click();
    addresspicker.saveButton().click()
    addresspicker.saveButton().should('be.disabled')
    addresspicker.SaveButtonPopUPMassage().then(function (text) {
      cy.log(text.text());
      });
  })


  it("Validate two-line Address", () => {
    // addresspicker.clearAddress().click()
    // addresspicker.locationInput().click().type("Toronto, ON");
    // cy.contains("Toronto, ON, Canada").click();
    addresspicker.editableAddressLineOne().then(function (text) {
      const locationCity = text.text();
      cy.log(locationCity);

      if (locationCity === "Toronto") {
        cy.log("Test Passed:");
      } else {
        cy.contains("Test Failed:location_city does not match");
      }
    });

    addresspicker.editableAddressLineTwo().then(function (text) {
      const locationRegionProvince = text.text();
      cy.log(locationRegionProvince);
      if (locationRegionProvince === "ONCA") {
        cy.log("Test Passed:");
      } else {
        cy.contains("Test Failed:location_region_province does not match:");
      }
    });

    addresspicker.editableAddressTwoLine().then(function (text) {
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
  it("Validate one-line Address", () => {
    addresspicker.selectOneLineAddress().then(function (text) {
      const oneLineAddress = text.text();
      cy.log(oneLineAddress);
      if (oneLineAddress === "TorontoONCA") {
        cy.log("Test Passed:");
      } else {
        cy.contains("Test Failed:one_Line_address does not match:");
      }
    });
  });

  it("validate cancel button action when a user cancels address updating", () => {

    addresspicker.editableAddressTwoLine().click()
    addresspicker.street().clear()
    addresspicker.street().type("1000 Markham Road")
    addresspicker.cancelButton().click()

    addresspicker.editableAddressTwoLine().then(function (text) {
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

  it("validate hint text.", () => {

    addresspicker.hint().then(function (text) {
      const hintText=text.text();
      cy.log(hintText)
      const matchHintText= "Hint Hint Hint Hint Hint..."
      if (hintText === matchHintText) {
        cy.log("Test Passed:");
      } else {
        cy.contains("Hint text does not match:");
      }

    });
  });

  it("Validate when clients enter valid and filling all address fields", () => {
    addresspicker.editableAddressTwoLine().click();
    addresspicker.street().dblclick().type("215 Markham Road");
    addresspicker.address2().dblclick().type("2550 Lawrence");
    addresspicker.address3().dblclick().type("1470 Midland");
    addresspicker.zip().dblclick().type("M1J 3C4");
    cy.log("Checking required fields input fo city, province, country ");
    addresspicker.city().should("have.prop", "required");
    addresspicker.region().should("have.prop", "required");
    addresspicker.country().should("have.prop", "required");
    cy.log("validating input values of, city, province, country ");
    addresspicker.city().should("have.value", "Toronto");
    addresspicker.region().should("have.value", "Ontario");
    addresspicker.country().should("have.value", "Canada");
    addresspicker.applyButton().click()
    cy.wait(3000)
   addresspicker.editableAddressTwoLine().then(function (text) {
   const locationCityRegionProvinceTwoLineFormate = text.text();
   cy.log(locationCityRegionProvinceTwoLineFormate);
      if (locationCityRegionProvinceTwoLineFormate === "215 Markham Road2550 Lawrence1470 MidlandTorontoONM1J 3C4CA") {
        cy.log("Test Passed:");
      } else {
        cy.contains(
          "Test Failed:location_city_region_province_two_line_formate does not match:"
        );
      }
     });

   });

  it("Validate Google Map.", () => {
    addresspicker.editableAddressTwoLine().click()
    cy.contains("Google").scrollIntoView();
    addresspicker.zoomIn().click();
    addresspicker.zoomOut().click();
    addresspicker.street().scrollIntoView();
    addresspicker.centerAddressButton().click();
    addresspicker.cancelButton();
    cy.contains("Google").scrollIntoView();
    addresspicker.cancelButton().click()

    //addresspicker.applyButton().dblclick();
  })
  //   // getting the address text
  //   it("Autocomplete:Test 9.", () => {
  //     const addPicker = new AddressPicker();
  //     cy.wait(3000);
  //     addPicker.editableAddressTwoLine().then(function (text) {
  //       const address = text.text();
  //       const addressMatch =
  //         "215 Markham Road2550 Lawrence1470 MidlandTorontoONM1J 3C4CA";
  //       cy.log(address);

  //       if (address === addressMatch) {
  //         cy.log("Test Passed:");
  //       } else {
  //         cy.contains("address does not match:");
  //       }
  //     });
  //     addPicker.editableAddressTwoLine().click();
  //     addPicker.cancelButton().click();
  //     cy.wait(3000);

  // });
  it("Validate address form dialog box", () => {
    // negative tests
    addresspicker.editableAddressTwoLine().click();
    addresspicker.city().clear();
    addresspicker.country().clear();
    addresspicker.applyButton().dblclick();
    cy.contains(
      "Changes not saved. Please review errors highlighted in red"
    ).should("be.visible");
    addresspicker.cancelButton().click();
  });

  it("Validate country field value when province field value is changed or cleared.", () => {
    addresspicker.editableAddressTwoLine().click();
    addresspicker.city().clear();
    addresspicker.region().clear();
    addresspicker.country().clear();
    addresspicker.region().type("Ontario");
    cy.contains("Ontario, Canada").click();
    addresspicker.country().should("have.value", "Canada");
    addresspicker.cancelButton().click();
  });

  it("Validate Dialog box2 title, content and buttons.", () => {
    //fs-modal-confirm pop up window massage "You Have Unsaved Changes"
    addresspicker.editableAddressTwoLine().click();
    addresspicker.street().dblclick().clear();
    addresspicker.street().dblclick().type("210 Markham Road");
    addresspicker.overlayBackdrop().click({ force: true });

    addresspicker
      .titleText()
      .should("have.text", "You Have Unsaved Changes");
    addresspicker
      .contentText()
      .should("have.text", "What would you like to do with your changes?");

    addresspicker
      .saveChangeButton()
      .should("have.text", "Save & Continue")
      .click();
      addresspicker.discardChangesContinueButton()
      .should("have.text", "Discard Changes & Continue")

      addresspicker
      .reviewChangesButton()
      .should("have.text", "Review Changes")

  });

  // it("Autocomplete:Test case 13.", () => {
  //   cy.wait(2000);
  //   addresspicker.editableAddressTwoLine().should("be.visible");
  //   addresspicker.editableAddressTwoLine().then(function (text) {
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


  //fs-modal-confirm button "Discard Changes & Continue "
  it("Validate when address is modified or edited", () => {
   // cy.pause()

    addresspicker.editableAddressTwoLine().click();
    addresspicker.street().dblclick().clear();
    addresspicker.street().dblclick().type("220 Markham Road");
    addresspicker.overlayBackdrop().click({ force: true });
    addresspicker.saveChangeButton().click()
    cy.wait(2000);
      addresspicker.editableAddressTwoLine().should("be.visible");
      addresspicker.editableAddressTwoLine().then(function (text) {
        const addressEdited = text.text();
        cy.log(addressEdited);
        const addressMatchWith =
          "220 Markham Road2550 Lawrence1470 MidlandTorontoONM1J 3C4CA";
        if (addressEdited === addressMatchWith) {
          cy.log("Test Passed:");
        } else {
          cy.log("Test Failed:", "does not match the address)");
          cy.contains("does not match the address");
        }
      });


  });


  it("Validate Discard Changes & Continue button actions after editing the address", () => {
    // cy.pause()
     addresspicker.editableAddressTwoLine().click();
     addresspicker.street().dblclick().clear();
     addresspicker.street().dblclick().type("200 Markham Road");
     addresspicker.overlayBackdrop().click({ force: true });
     addresspicker
       .discardChangesContinueButton()
       .should("have.text", "Discard Changes & Continue")
       .click();
     addresspicker.container().should("be.visible");
   });

  //fs-modal-confirm button "Review Changes"
  it("Validate Discard Review Changes button actions after editing the address", () => {
    addresspicker.street().clear();
    cy.wait(2000)
    addresspicker.street().dblclick().type("1000 Markham Road");
    addresspicker.overlayBackdrop().click({ force: true });
    cy.wait(2000);
    addresspicker
      .reviewChangesButton()
      .should("have.text", "Review Changes")
      .click();
    addresspicker.container().should("be.visible");
  });
});
