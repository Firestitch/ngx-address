import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C4. Address Form (#addressForm0) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyAddressFormZero('Address Form')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyAddressFormZero(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check row titles to be visible, have valid class and text. Check row inputs to be visible, not disabled, have valid class and text. For some rows added check of clear button and autocomplete function', () => {
        addressPickerPage.clearAllBodyInputsAddressFormZero(8)
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(0, 'ng-tns-c145-12 ng-star-inserted', 'Location name')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(1, 'ng-tns-c145-13 ng-star-inserted', 'Street')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(2, 'ng-tns-c145-14 ng-star-inserted', 'Address 2')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(3, 'ng-tns-c145-15 ng-star-inserted', 'Address 3')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(4, 'ng-tns-c145-16 ng-star-inserted', 'City')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(5, 'ng-tns-c145-17 ng-star-inserted', 'Province/State')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(6, 'ng-tns-c145-18 ng-star-inserted', 'Country')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(7, 'ng-tns-c145-19 ng-star-inserted', 'ZIP/Postal Code')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(0, 'Ottawa')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(0, 'mat-input-element mat-form-field-autofill-control ng-tns-c145-12 ng-valid cdk-text-field-autofill-monitored ng-dirty ng-touched', 'Ottawa')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(0, 'ng-tns-c145-12 ng-star-inserted', 'Location name')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(1, '240 McLeod St')
        addressPickerPage.bodyRowSelectFromAutocompleteVerifyAddressFormZero('240 McLeod St')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(1, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-valid cdk-text-field-autofill-monitored ng-dirty ng-touched', 0)
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(1, 'ng-tns-c145-13 ng-star-inserted', 'Street')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(2, 'This is test')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(2, 'mat-input-element mat-form-field-autofill-control ng-tns-c145-14 ng-valid cdk-text-field-autofill-monitored ng-touched ng-dirty', 'This is test')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(2, 'ng-tns-c145-14 ng-star-inserted', 'Address 2')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(3, 'This is test')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(3, 'mat-input-element mat-form-field-autofill-control ng-tns-c145-15 ng-valid cdk-text-field-autofill-monitored ng-touched ng-dirty', 'This is test')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(3, 'ng-tns-c145-15 ng-star-inserted', 'Address 3')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(4, 'This is test')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(4, 'mat-input-element mat-form-field-autofill-control ng-tns-c145-16 ng-valid cdk-text-field-autofill-monitored ng-dirty ng-touched', 'This is test')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(4, 'ng-tns-c145-16 ng-star-inserted', 'City')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(6, 'Canada')
        addressPickerPage.bodyRowSelectFromAutocompleteVerifyAddressFormZero('Canada')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(6, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-18 ng-valid cdk-text-field-autofill-monitored ng-dirty ng-touched', 0)
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(6, 'ng-tns-c145-18 ng-star-inserted', 'Country')
        addressPickerPage.bodyRowClearButtonVerifyAddressFormZero(6, 'mat-icon notranslate clear material-icons mat-icon-no-color ng-star-inserted')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(5, 'Ontario')
        addressPickerPage.bodyRowSelectFromAutocompleteVerifyAddressFormZero('Ontario')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(5, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-17 ng-valid cdk-text-field-autofill-monitored ng-dirty ng-touched', 0)
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(5, 'ng-tns-c145-17 ng-star-inserted', 'Province')
        addressPickerPage.bodyRowClearButtonVerifyAddressFormZero(5, 'mat-icon notranslate clear material-icons mat-icon-no-color ng-star-inserted')

        addressPickerPage.bodyRowInsertTextVerifyAddressFormZero(7, 'L5P 1B2')
        addressPickerPage.bodyRowInputFieldVerifyAddressFormZero(7, 'mat-input-element mat-form-field-autofill-control ng-tns-c145-19 ng-valid cdk-text-field-autofill-monitored ng-dirty ng-touched', 'L5P 1B2')
        addressPickerPage.bodyRowTitleVerifyAddressFormZero(7, 'ng-tns-c145-19 ng-star-inserted', 'Postal Code')
    })
})