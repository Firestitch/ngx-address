import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C8. Address Region, no validation, horizontal (#addressRegion0) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyAddressRegionZero('Address Region, no validation, horizontal')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyAddressRegionZero(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check panel with selected address to not exist before adress selected. Check titles to be visible, have valid class and text. Check input fields to be visible, not disabled have valid class and value. Input text and select item from dropdown options. Check panel with selected address to be visible after we fill inputs. Check clear buttons in inputs to work correctly', () => {
        addressPickerPage.selectedAddressPanelVerifyAddressRegionZero(0)
        addressPickerPage.bodyTitleVerifyAddressRegionZero(0, 'ng-tns-c145-20 ng-star-inserted', 'Custom Country')
        addressPickerPage.bodyTitleVerifyAddressRegionZero(1, 'ng-tns-c145-5 ng-star-inserted', 'Province/State')
        addressPickerPage.bodyInputVerifyAddressRegionZero(0, 0, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-20 ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored')
        addressPickerPage.inputTextVerifyAddressRegionZero(0, 'Canada')
        addressPickerPage.bodyTitleVerifyAddressRegionZero(1, 'ng-tns-c145-5 ng-star-inserted', 'Province')
        addressPickerPage.bodyInputVerifyAddressRegionZero(1, 0, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-5 ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored')
        addressPickerPage.inputTextVerifyAddressRegionZero(1, 'Ontario')
        addressPickerPage.selectedAddressPanelVerifyAddressRegionZero(1, 'Selected', ' CA, ON')

        addressPickerPage.clearButtonsVerifyAddressRegionZero(1, 2)
        addressPickerPage.clearButtonsVerifyAddressRegionZero(0, 2)
        addressPickerPage.selectedAddressPanelVerifyAddressRegionZero(0)
        addressPickerPage.bodyTitleVerifyAddressRegionZero(0, 'ng-tns-c145-20 ng-star-inserted', 'Custom Country')
        addressPickerPage.bodyTitleVerifyAddressRegionZero(1, 'ng-tns-c145-5 ng-star-inserted', 'Province/State')
    })
})