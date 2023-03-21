import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C12. Geo Coder (#addressRegion3) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyGeoCoderZero('Geo Coder')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyGeoCoderZero(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check field with code to not exist before clicking "Lookup" button. Check "Lookup" button to be visible, not disabled, have valid class and text. Click on button. Check field with code to be visible, have valid title, and not be empty', () => {
        addressPickerPage.codeFieldVerifyGeoCoderZero(0)
        addressPickerPage.lookUpButtonVerifyGeoCoderZero('mat-focus-indicator mat-raised-button mat-button-base mat-primary', 'Lookup')
        addressPickerPage.lookUpButton.click()
        addressPickerPage.codeFieldVerifyGeoCoderZero(1, 'Results', '[')
    })
})