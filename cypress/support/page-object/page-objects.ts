//Address-Picker
export class AddressPicker {
  locationInput() {
    return cy.get("[name='Address Picker'] fs-address-autocomplete input");
  }
  clearAddress() {
    return cy.get("[name='Address Picker'] .control");
  }
  autocompleteDropDownList() {
    return cy.get(".mat-autocomplete-panel");
  }
  editableAddressLineOne() {
    return cy.get("[name='Address Picker']  .editable .line-1");
  }

  editableAddressLineTwo() {
    return cy.get("[name='Address Picker']  .editable .line-2");
  }

  editableAddressTwoLine() {
    return cy.get("[name='Address Picker']  .editable ");
  }

  selectOneLineAddress() {
    return cy.get("[name='Address Picker'] .oneline");
  }

  saveButton() {
    return cy.get("[name='Address Picker'] mat-card  button");
  }

  invalidAddressDialogBoxApplyButton() {
    return cy.get("[type='submit']:disabled");
  }
  SaveButtonPopUPMassage() {
    return cy.get(".toast-bottom-left");
  }
  hint() {
    return cy.get("[name='Address Picker'] mat-form-field .mat-hint");
  }

  street() {
    return cy.get(".mat-dialog-container .street input");
  }

  address2() {
    return cy.get("mat-dialog-container .address2");
  }
  address3() {
    return cy.get("mat-dialog-container .address3");
  }
  zip() {
    return cy.get("mat-dialog-container  .zip");
  }

  city() {
    return cy.get("mat-dialog-container  .city input");
  }

  region() {
    return cy.get("mat-dialog-container [name='region'] input");
  }

  country() {
    return cy.get("mat-dialog-container  .country input");
  }

  zoomIn() {
    return cy.get("[title='Zoom in']");
  }
  zoomOut() {
    return cy.get("[title='Zoom out']");
  }

  centerAddressButton() {
    return cy.get(".mat-dialog-actions button:nth-child(2)");
  }
  cancelButton() {
    return cy.get(".mat-dialog-actions button:nth-child(3)");
  }

  applyButton() {
    return cy.get("mat-dialog-container [type='submit']");
  }

  overlayBackdrop() {
    return cy.get(".cdk-overlay-backdrop");
  }

  titleText() {
    return cy.get(".fs-modal-confirm .mat-dialog-title");
  }
  contentText() {
    return cy.get(".fs-modal-confirm .mat-dialog-content");
  }

  saveChangeButton() {
    return cy.get(".fs-modal-confirm .mat-primary");
  }
  discardChangesContinueButton() {
    return cy.get(".fs-modal-confirm [type='button']:nth-child(2)");
  }

  container() {
    return cy.get("mat-dialog-container");
  }
  reviewChangesButton() {
    return cy.get(".fs-modal-confirm [type='button']:nth-child(3)");
  }
}

//Address-Confirmation;
export class AddressConfirmation extends AddressPicker {
  locationInput() {
    return cy.get(
      "[name='Confirmation Address Picker'] fs-address-autocomplete input"
    );
  }
  clearAddress() {
    return cy.get("[name='Confirmation Address Picker'] .control");
  }
  editableAddressLineOne() {
    return cy.get("[name='Confirmation Address Picker']  .editable .line-1");
  }

  invalidAddressDialogBoxApplyButton() {
    return cy.get("[type='submit']:disabled");
  }

  editableAddressLineTwo() {
    return cy.get("[name='Confirmation Address Picker']  .editable .line-2");
  }

  editableAddressTwoLine() {
    return cy.get("[name='Confirmation Address Picker']  .editable ");
  }

  selectOneLineAddress() {
    return cy.get("[name='Confirmation Address Picker'] .oneline");
  }

  saveButton() {
    return cy.get("[name='Confirmation Address Picker'] mat-card  button");
  }
  hint() {
    return cy.get(
      "[name='Confirmation Address Picker'] mat-form-field .mat-hint"
    );
  }

  street() {
    return cy.get("mat-dialog-container .street");
  }

  address2() {
    return cy.get("mat-dialog-container .address2");
  }
  address3() {
    return cy.get("mat-dialog-container .address3");
  }
  zip() {
    return cy.get("mat-dialog-container  .zip");
  }

  city() {
    return cy.get("mat-dialog-container  .city input");
  }

  region() {
    return cy.get("mat-dialog-container [name='region'] input");
  }

  country() {
    return cy.get("mat-dialog-container  .country input");
  }

  zoomIn() {
    return cy.get("[title='Zoom in']");
  }
  zoomOut() {
    return cy.get("[title='Zoom out']");
  }

  centerAddressButton() {
    return cy.get(".mat-dialog-actions button:nth-child(2)");
  }
  cancelButton() {
    return cy.get(".mat-dialog-actions button:nth-child(3)");
  }

  applyButton() {
    return cy.get("mat-dialog-container [type='submit']");
  }

  overlayBackdrop() {
    return cy.get(".cdk-overlay-backdrop");
  }

  titleText() {
    return cy.get(".fs-modal-confirm .mat-dialog-title");
  }
  contentText() {
    return cy.get(".fs-modal-confirm .mat-dialog-content");
  }

  saveChangeButton() {
    return cy.get(".fs-modal-confirm .mat-primary");
  }
  discardChangesContinueButton() {
    return cy.get(".fs-modal-confirm [type='button']:nth-child(2)");
  }

  container() {
    return cy.get("mat-dialog-container");
  }
  ReviewChangesButton() {
    return cy.get(".fs-modal-confirm [type='button']:nth-child(3)");
  }
}

//address-form
export class AddressForm extends AddressConfirmation {
  name() {
    return cy.get("[name='Address Form'] .name");
  }

  street() {
    return cy.get("[name='Address Form'] .street");
  }

  address2() {
    return cy.get("[name='Address Form'] .address2");
  }

  address3() {
    return cy.get("[name='Address Form'] .address3");
  }

  city() {
    return cy.get("[name='Address Form'] .city input ");
  }

  region() {
    return cy.get("[name='Address Form'] .region input");
  }

  country() {
    return cy.get("[name='Address Form'] .country input");
  }

  zip() {
    return cy.get("[name='Address Form'] .zip input");
  }
}

//Two-Line-Formate-Pre-filled
export class TwoLineFormatePrefilled {
  editableFiled() {
    return cy.get("[name='Two-line format,  pre-filled'] .editable");
  }
  locationInput() {
    return cy.get("mat-dialog-container .name input");
  }
  clearAddress() {
    return cy.get("[name='Two-line format,  pre-filled'] .control");
  }

  street() {
    return cy.get(".mat-dialog-container .street input");
  }
  city() {
    return cy.get(".mat-dialog-container .city input");
  }

  region() {
    return cy.get(".mat-dialog-container .region input");
  }

  country() {
    return cy.get(".mat-dialog-container .country input");
  }
  zip() {
    return cy.get(".mat-dialog-container .zip input");
  }
  backDropOverlay() {
    return cy.get(".cdk-overlay-backdrop");
  }

  dialogBox2Title() {
    return cy.get(".mat-dialog-title");
  }
  dialogBox2Content() {
    return cy.get(".fs-modal-confirm .mat-dialog-content");
  }
  saveContinueButton() {
    return cy.get(".fs-modal-confirm  [type='button']:nth-child(1)");
  }
  applyButton() {
    return cy.get("mat-dialog-container [type='submit']");
  }
  location() {
    return cy.get("[name='Two-line format,  pre-filled'] .mat-input-element");
  }
  cancelButton() {
    return cy.get("[type='button']");
  }
  discardChangesContinueButton() {
    return cy.get(".fs-modal-confirm  [type='button']:nth-child(2)").click();
  }
  reviewChangesButton() {
    return cy.get(".fs-modal-confirm  [type='button']:nth-child(3)").click();
  }
  dialogBOx1() {
    return cy.get(".mat-dialog-container");
  }
}

//Formate-Examples
export class FormateExamples {
  oneLineAddressFormate() {
    return cy.get("[name='Format Examples'] .oneline");
  }

  twoLineFormateFirstLine() {
    return cy.get("[name='Format Examples'] [format='twoline'] .line-1");
  }

  twoLineFormateSecondLine() {
    return cy.get("[name='Format Examples'] [format='twoline'] .line-2");
  }
  twoLineAddressFormate() {
    return cy.get("[name='Format Examples'] [format='twoline']");
  }
  summaryFormate() {
    return cy.get("[format='summary']");
  }
}

//Disabled-Readonly-Addresses
export class DisabledReadonlyAddresses {
  //
  twoLineAddressDisabled() {
    return cy.get(
      "[name='Disabled and Readonly addresses'] .mat-form-field-disabled"
    );
  }
}

//Address-Region-N-oValidation-Horizontal
export class AddressRegionNoValidationHorizontal {
  country() {
    return cy.get(
      "[name='Address Region, no validation, horizontal'] .country input"
    );
  }
  region() {
    return cy.get(
      "[name='Address Region, no validation, horizontal'] .region input"
    );
  }
}

//Address-Region-Pre-filled-Horizontal-Stretched
export class AddressRegionPrefilledHorizontalStretched {
  country() {
    return cy.get(
      "[name='Address Region, pre-filled, horizontal stretched'] .country input"
    );
  }
  region() {
    return cy.get(
      "[name='Address Region, pre-filled, horizontal stretched'] .region input"
    );
  }
}

//Address_Region_Required
export class AddressRegionRequired {
  country() {
    return cy.get("[name='Address Region, required'] .country input");
  }

  region() {
    return cy.get("[name='Address Region, required'] .region input");
  }
}

//address_region_disabled
export class AddressRegionDisabled {
  country() {
    return cy.get("[name='Address Region, disabled'] .country  input:disabled");
  }

  region() {
    return cy.get("[name='Address Region, disabled'] .region  input:disabled");
  }
}
