import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C6. Format Examples (#formatExamples0) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyFormatExamplesZero('Format Examples')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyFormatExamplesZero(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check address panels to be visible, have valid titles. Check inner content to be visible, have valid class and text', () => {
        addressPickerPage.bodyPanelsTitleAndContentVerifyFormatExamplesZero(0, 'One Line Format', 'part ng-star-inserted', ['CN Tower','301 Front St W','Toronto','ON','M5V 2T6'])
        addressPickerPage.bodyPanelsTitleAndContentVerifyFormatExamplesZero(1, 'Two Line Format', 'part ng-star-inserted', ['CN Tower','301 Front St W','Toronto','ON','M5V 2T6'])
        addressPickerPage.bodyPanelsTitleAndContentVerifyFormatExamplesZero(2, 'Summary Format', 'part ng-star-inserted', ['CN Tower'])
    })
})