import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C9. Address Region, pre-filled, horizontal stretched (#addressRegion1) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyAddressRegionOne('Address Region, pre-filled, horizontal stretched')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyAddressRegionOne(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it.only('3. Check panel with selected address to be visible, have valid title and text. Check titles to be visible, have valid class and text. Check input fields to be visible, not disabled have valid class and value. Input text and select item from dropdown options. Check panel with selected address to be visible after we fill inputs. Check clear buttons in inputs to work correctly', () => {
        addressPickerPage.selectedAddressPanelVerifyAddressRegionOne(1, 'Selected', ' CA')
        addressPickerPage.bodyTitleVerifyAddressRegionOne(0, 'ng-tns-c145-21 ng-star-inserted', 'Country')
        addressPickerPage.bodyTitleVerifyAddressRegionOne(1, 'ng-tns-c145-6 ng-star-inserted', 'Province')
        addressPickerPage.bodyInputVerifyAddressRegionOne(0, 1, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-21 ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored', '[object Object]')
        addressPickerPage.inputTextVerifyAddressRegionOne(0, 'Canada')
        addressPickerPage.bodyInputVerifyAddressRegionOne(1, 0, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-6 ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored')
        addressPickerPage.inputTextVerifyAddressRegionOne(1, 'Ontario')
        addressPickerPage.selectedAddressPanelVerifyAddressRegionOne(1, 'Selected', ' CA, ON')

        addressPickerPage.clearButtonsVerifyAddressRegionOne(1, 2)
        addressPickerPage.clearButtonsVerifyAddressRegionOne(0, 2)
        addressPickerPage.selectedAddressPanelVerifyAddressRegionOne(0)
        addressPickerPage.bodyTitleVerifyAddressRegionOne(0, 'ng-tns-c145-21 ng-star-inserted', 'Country')
        addressPickerPage.bodyTitleVerifyAddressRegionOne(1, 'ng-tns-c145-6 ng-star-inserted', 'Province/State')
    })
})