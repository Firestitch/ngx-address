describe("Address Picker", () => {

  before(function () {
    cy.visit("/");
  });

  it("Validate address location field", () => {
    cy
      .visit("/")
      .get('address-picker')
      .find('fs-address-autocomplete input')
      .should("be.empty")
      .type("Toronto, ON");

    cy
      .get('.mat-autocomplete-panel')
      .should('be.visible')
      .contains("Toronto, ON, Canada")
      .click();
  });

  it("Validate Save button actions.", () => {
    cy
      .visit("/")
      .get('address-picker')
      .find('button[type="submit"]')
      .should("be.disabled");

    cy
      .get('address-picker')
      .find('fs-address-autocomplete input')
      .type("Toronto, ON");

    cy
      .wait(1000)
      .get('.mat-autocomplete-panel')
      .contains("Toronto, ON, Canada")
      .click();
      
    cy
      .get('address-picker')
      .find('button[type="submit"]')
      .click()
      .should("be.disabled"); 

    cy
      .get('.ngx-toastr.toast-success')
      .then(function (text) {
        cy.log(text.text());
      });
  })


});
