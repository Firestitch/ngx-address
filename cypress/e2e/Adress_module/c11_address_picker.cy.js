import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C11. Address Region, disabled (#addressRegion3) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyAddressRegionThree('Address Region, disabled')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyAddressRegionThree(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check body titles to be visible, have valid class and text. Check input fields to be visible, disabled, have valid class and value. Check panel with selected address to be visible, have valid title and inner text', () => {
        addressPickerPage.bodyTitleVerifyAddressRegionThree(0, 'ng-tns-c145-23 ng-star-inserted', 'Country')
        addressPickerPage.bodyTitleVerifyAddressRegionThree(1, 'ng-tns-c145-8 ng-star-inserted', 'Province')
        addressPickerPage.bodyInputVerifyAddressRegionThree(0, 1, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-23 ng-untouched ng-pristine cdk-text-field-autofill-monitored', '[object Object]')
        addressPickerPage.bodyInputVerifyAddressRegionThree(1, 1, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-8 ng-untouched ng-pristine cdk-text-field-autofill-monitored', '[object Object]')
        addressPickerPage.selectedAddressPanelVerifyAddressRegionThree(1, 'Selected', ' CA, ON')
    })
})