import addressPickerPage from '../../support/page-object/address_picker.page.js'
/// <reference types="Cypress" />
describe("C7. Disabled and Readonly addresses (#disabledAndReadonly0) block testing", () => {
    beforeEach(() => {
      cy.visit('/');
    });
    it('1. Check block title to be visible and have valid text', () => {
        addressPickerPage.headerTitleVerifyDisabledAndReadonlyZero('Disabled and Readonly addresses')
    })
    xit('2. Check "View code" button to be visible, not disabled. Check that clicking on button shows code in tabs and hide code after one more click on it. (pending while in local)', () => {
        addressPickerPage.headerButtonVerifyDisabledAndReadonlyZero(0, 'mat-focus-indicator mat-tooltip-trigger mat-icon-button mat-button-base')
    })
    it('3. Check division titles to be visible and have valid text. Check inner titles to be visible, have valid class and text.Check date preview fields to be visible, have valid class and text. Check panel with selected address to be visible, title to have valid text, inner content to have valid class and text.', () => {
        addressPickerPage.bodyTitleVerifyDisabledAndReadonlyZero(0, ' Disabled Address ')
        addressPickerPage.innerTitleVerifyDisabledAndReadonlyZero('ng-tns-c145-3 ng-star-inserted', 'Location')
        addressPickerPage.datePreviewOneVerifyDisabledAndReadonlyZero('part ng-star-inserted', ['CN Tower','301 Front Street West','Toronto','ON','M5V 2T6','CA'])
        
        addressPickerPage.bodyTitleVerifyDisabledAndReadonlyZero(1, ' Readonly Address ')
        addressPickerPage.innerTitleOneVerifyDisabledAndReadonlyZero('ng-tns-c145-4 ng-star-inserted', 'Location')
        addressPickerPage.datePreviewTwoVerifyDisabledAndReadonlyZero('part ng-star-inserted', ['CN Tower','301 Front Street West','Toronto','ON','M5V 2T6','CA'])
        
        addressPickerPage.bodyTitleInPanelVerifyDisabledAndReadonlyZero('Selected Address Disabled Style')
        addressPickerPage.datePreviewPanelVerifyDisabledAndReadonlyZero('part ng-star-inserted', ['CN Tower','301 Front Street West','Toronto','ON','M5V 2T6','CA'])
    })
})