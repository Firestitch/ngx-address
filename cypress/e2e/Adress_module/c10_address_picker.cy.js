import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C10. Address Region, required (#addressRegion2) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyAddressRegionTwo('Address Region, required')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyAddressRegionTwo(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check panel with selected address to not exist before we fill inputs. Check titles to be visible, have valid class and text. Check input fields to be visible, not disabled have valid class. Input text and select item from dropdown options. Check panel with selected address to be visible after we fill inputs. Check clear buttons in inputs to work correctly', () => {
        addressPickerPage.selectedAddressPanelVerifyAddressRegionTwo(0)
        addressPickerPage.bodyTitleVerifyAddressRegionTwo(0, 'ng-tns-c145-22 ng-star-inserted', 'Country')
        addressPickerPage.bodyTitleVerifyAddressRegionTwo(1, 'ng-tns-c145-7 ng-star-inserted', 'Province/State')
        addressPickerPage.bodyInputVerifyAddressRegionTwo(0, 0, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-22 ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored', '[object Object]')
        addressPickerPage.inputTextVerifyAddressRegionTwo(0, 'Canada')
        addressPickerPage.bodyInputVerifyAddressRegionTwo(1, 0, 'mat-input-element mat-form-field-autofill-control mat-autocomplete-trigger ng-tns-c145-7 ng-untouched ng-pristine ng-valid cdk-text-field-autofill-monitored')
        addressPickerPage.inputTextVerifyAddressRegionTwo(1, 'Ontario')
        addressPickerPage.selectedAddressPanelVerifyAddressRegionTwo(1, 'Selected', ' CA, ON')

        addressPickerPage.clearButtonsVerifyAddressRegionTwo(1, 2)
        addressPickerPage.clearButtonsVerifyAddressRegionTwo(0, 2)
        addressPickerPage.selectedAddressPanelVerifyAddressRegionTwo(0)
        addressPickerPage.bodyTitleVerifyAddressRegionTwo(0, 'ng-tns-c145-22 ng-star-inserted', 'Country')
        addressPickerPage.bodyTitleVerifyAddressRegionTwo(1, 'ng-tns-c145-7 ng-star-inserted', 'Province/State')
    })
})