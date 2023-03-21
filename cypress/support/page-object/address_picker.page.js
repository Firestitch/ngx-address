/// <reference types="Cypress" />

class addressPickerPage {
//============================================================Locators===========================================================
//------------------------------------------------------------Common-------------------------------------------------------------
    get informationPopupAddressPickerPage(){
        return cy.get('#toast-container')
    }
    get rowsManualAddrInputAddressPickerPage(){
        return cy.get('#mat-dialog-0 .mat-form-field-infix')
    }    
    get manualAddrInputWindowAddressPickerPage(){
        return cy.get('#mat-dialog-0')
    }
    get autocompliteDropdownVariantsAddressPickerPage(){
        return cy.get('.cdk-overlay-pane mat-option')
    }
    get mapPanelAddressPickerPage(){
        return cy.get('#mat-dialog-0 google-map')
    }
    get mapPanelBlockedAddressPickerPage(){
        return cy.get('#mat-dialog-0 .address-incomplete')
    }
    get footerButtonsAddressPickerPage(){
        return cy.get('#mat-dialog-0 .mat-dialog-actions>button')
    }
    get leavingChangesNotificationWindowAddressPickerPage(){
        return cy.get('#cdk-overlay-2')
    }
    get leavingChangesNotificationWindowOneAddressPickerPage(){
        return cy.get('#cdk-overlay-3')
    }
    get leavingChangesNotificationWindowTwoAddressPickerPage(){
        return cy.get('#cdk-overlay-4')
    }
    get leavingChangesNotificationTitleAddressPickerPage(){
        return cy.get('h2.mat-dialog-title')
    }
    get leavingChangesNotificationContentAddressPickerPage(){
        return cy.get('mat-dialog-content.mat-dialog-content')
    }
//------------------------------------------------------------C2-----------------------------------------------------------------
    get addressPickerZero(){
        return cy.get('#addressPicker0')
    }
    get saveButtonAddressPickerZero(){
        return cy.get('#saveBtn0')
    }
    get inputTitleAddressPickerZero(){
        return cy.get('#mat-form-field-label-1')
    }
    get hintAddressPickerZero(){
        return cy.get('#mat-hint-0')
    }
    get inputFieldAddressPickerZero(){
        return cy.get('#addressPicker0 #mat-input-0')
    }
    get autocompliteVariantsDropdownAddressPickerZero(){
        return cy.get('#mat-autocomplete-0')
    }
    get addressPreviewAddressPickerZero(){
        return cy.get('#addressPicker0 .part.ng-star-inserted')
    }
    get selectedAddrFieldAddressPickerZero(){
        return cy.get('#selectedAddrField0')
    }
    get clearAddrAddressPickerZero(){
        return cy.get('#addressPicker0 .mat-form-field-suffix')
    }
//------------------------------------------------------------C3-----------------------------------------------------------------
    get conformationAddressPickerZero(){
        return cy.get('#confirmationAddressPicker0')
    }
    get saveButtonConformationAddressPickerZero(){
        return cy.get('#saveBtn1')
    }
    get inputTitleConformationAddressPickerZero(){
        return cy.get('#mat-form-field-label-3')
    }
    get hintConformationAddressPickerZero(){
        return cy.get('#mat-hint-1')
    }
    get selectedAddrFieldConformationAddressPickerZero(){
        return cy.get('#selectedAddrField1')
    }
    get addressPreviewConformationAddressPickerZero(){
        return cy.get('#confirmationAddressPicker0 .part.ng-star-inserted')
    }
    get inputFieldConformationAddressPickerZero(){
        return cy.get('#mat-input-1')
    }
    get autocompliteVariantsDropdownConformationAddressPickerZero(){
        return cy.get('#mat-autocomplete-1')
    }
    get clearAddrConformationAddressPickerZero(){
        return cy.get('#confirmationAddressPicker0 .mat-form-field-suffix')
    }
//------------------------------------------------------------C4-----------------------------------------------------------------
    get addressFormZero(){
        return cy.get('#addressForm0')
    }
    get bodyRowAddressFormZero(){
        return cy.get('#addressForm0 mat-form-field')
    }
//------------------------------------------------------------C5-----------------------------------------------------------------
    get twoLinePreFilledZero(){
        return cy.get('#twoLinePreFilled0')
    }
    get addressPreviewTwoLinePreFilledZero(){
        return cy.get('#twoLinePreFilled0 .part.ng-star-inserted')
    }
    get selectedAddressPanelTwoLinePreFilledZero(){
        return cy.get('#twoLinePreFilled0 fieldset')
    }
    get inputFieldTitleTwoLinePreFilledZero(){
        return cy.get('#twoLinePreFilled0 #mat-form-field-label-5')
    }
    get inputFieldTwoLinePreFilledZero(){
        return cy.get('#twoLinePreFilled0 #mat-input-2')
    }
    get autocompleteVariansTwoLinePreFilledZero(){
        return cy.get('#mat-autocomplete-2 mat-option')
    }
//------------------------------------------------------------C6-----------------------------------------------------------------
    get formatExamples0(){
        return cy.get('#formatExamples0')
    }
    get bodyPanelsFormatExamples0(){
        return cy.get('#formatExamples0 .formatExamplePanels')
    }
//------------------------------------------------------------C7-----------------------------------------------------------------
    get disabledAndReadonlyZero(){
        return cy.get('#disabledAndReadonly0')
    }
    get bodyTitlesDisabledAndReadonlyZero(){
        return cy.get('#disabledAndReadonly0Body form>label')
    }
    get bodyPanelDisabledAndReadonlyZero(){
        return cy.get('#bodyPanelDisabledAndReadonly0')
    }
    get innerTitleDisabledAndReadonlyZero(){
        return cy.get('#mat-form-field-label-7>span')
    }
    get innerTitleOneDisabledAndReadonlyZero(){
        return cy.get('#mat-form-field-label-9>span')
    }
    get datePreviewOneDisabledAndReadonlyZero(){
        return cy.get('#bodyRowOneDisabledAndReadonly0 .twoline')
    }
    get datePreviewTwoDisabledAndReadonlyZero(){
        return cy.get('#bodyRowTwoDisabledAndReadonly0 .twoline')
    }
//------------------------------------------------------------C8-----------------------------------------------------------------
    get addressRegionZero(){
        return cy.get('#addressRegion0')
    }
    get bodyDivAddressRegionZero(){
        return cy.get('#bodyAddressRegion0 .mat-form-field-infix')
    }
    get bodyDivClearButtonAddressRegionZero(){
        return cy.get('#bodyAddressRegion0 .mat-form-field-suffix')
    }
    get selectedPanelAddressRegionZero(){
        return cy.get('#addressRegion0 fieldset')
    }
//------------------------------------------------------------C9-----------------------------------------------------------------
    get addressRegionOne(){
        return cy.get('#addressRegion1')
    }
    get bodyDivAddressRegionOne(){
        return cy.get('#bodyAddressRegion1 .mat-form-field-infix')
    }
    get bodyDivClearButtonAddressRegionOne(){
        return cy.get('#bodyAddressRegion1 .mat-form-field-suffix')
    }
    get selectedPanelAddressRegionOne(){
        return cy.get('#addressRegion1 fieldset')
    }
//------------------------------------------------------------C10-----------------------------------------------------------------
    get addressRegionTwo(){
        return cy.get('#addressRegion2')
    }
    get bodyDivAddressRegionTwo(){
        return cy.get('#bodyAddressRegion2 .mat-form-field-infix')
    }
    get bodyDivClearButtonAddressRegionTwo(){
        return cy.get('#bodyAddressRegion2 .mat-form-field-suffix')
    }
    get selectedPanelAddressRegionTwo(){
        return cy.get('#addressRegion2 fieldset')
    }
//------------------------------------------------------------C11-----------------------------------------------------------------
    get addressRegionThree(){
        return cy.get('#addressRegion3')
    }
    get bodyDivAddressRegionThree(){
        return cy.get('#bodyAddressRegion3 .mat-form-field-infix')
    }
    get bodyDivClearButtonAddressRegionThree(){
        return cy.get('#bodyAddressRegion3 .mat-form-field-suffix')
    }
    get selectedPanelAddressRegionThree(){
        return cy.get('#addressRegion3 fieldset')
    }
//------------------------------------------------------------C12-----------------------------------------------------------------
    get geoCoderZero(){
        return cy.get('#geoCoder0')
    }
    get lookUpButton(){
        return cy.get('#geoCoder0Button')
    }
    get codeFieldgeoCoderZero(){
        return cy.get('#geoCoder0 fieldset')
    }
//============================================================Functions:=========================================================
//------------------------------------------------------------Common-------------------------------------------------------------
    informationPopupVerifyAddressPickerPage(infoText){
        this.informationPopupAddressPickerPage
            .should('be.visible')
            .and('not.be.disabled')
            .and('contain.text', infoText)
    }
    manualAddrWindowInputAndTitleAddressPickerPage(rowIndex, attr0, attr1, attr2){
        if(rowIndex<3){
            if(attr1===0){
            }   else{
                    this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                        .should('have.attr', 'ng-reflect-model', attr1)
                }
            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .clear()
                .type(attr2)
                .and('have.attr', 'ng-reflect-model', attr2)
            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>span')
                .should('be.visible')
                .and('have.text', attr0)
        }   if(rowIndex===3){
                if(attr1===0){
                }   else{
                        this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                            .should('have.attr', 'ng-reflect-model', attr1)
                    }
                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                    .should('be.visible')
                    .and('not.be.disabled')
                    .clear({force:true})
                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                    .type(attr2)
                    .and('have.attr', 'ng-reflect-model', attr2)
                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>mat-label')
                    .should('be.visible')
                    .and('have.attr', 'data-after-content', attr0)
            }   if(rowIndex===4 || rowIndex===5){
                        if(attr1===0){
                        }   else{
                                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                                    .should('have.attr', 'ng-reflect-model', attr1)
                            }
                        this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                            .should('be.visible')
                            .and('not.be.disabled')
                            .clear()
                            .type(attr2)
                            .and('have.attr', 'ng-reflect-model', attr2)
                        this.autocompliteDropdownVariantsAddressPickerPage.contains(attr2).click()
                        this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>mat-label')
                            .should('be.visible')
                            .and('have.text', attr0)
                    }   if(rowIndex===6){
                            if(attr1===0){
                            }   else{
                                    this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                                        .should('have.attr', 'ng-reflect-model', attr1)
                                }
                            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                                .should('be.visible')
                                .and('not.be.disabled')
                                .clear()
                                .type(attr2)
                                .and('have.attr', 'ng-reflect-model', attr2)
                            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>mat-label')
                                .should('be.visible')
                                .and('have.text', attr0)
                        }   else{}
    }
    mapBlockVerifyAddrAddressPickerPage(statusIndex, attr0){
        if(statusIndex===0){
            this.mapPanelAddressPickerPage.should('not.be.visible')
            this.mapPanelBlockedAddressPickerPage
                .should('be.visible')
                .and('have.text', attr0)
        }   if(statusIndex===1){
                this.mapPanelAddressPickerPage
                    .should('be.visible')
                    .and('not.be.disabled')
            }
    }
    footerButtonVerifyAddrAddressPickerPage(buttonIndex, existIndex, attr0, attr1){
        if(existIndex===0){
            this.footerButtonsAddressPickerPage.eq(buttonIndex)
                .should('not.exist')
        }   if(existIndex===1){
                this.footerButtonsAddressPickerPage.eq(buttonIndex)
                    .should('be.visible')
                    .and('not.disabled')
                    .and('have.class', attr0)
                    .and('have.text', attr1)
            }   else{}
    }
    escapeButtonClickModalWindowAddressPickerPage(){
        cy.get('#mat-dialog-0').type('{esc}')
    }
    leavingNotificationWindowVerifyAddressPickerPage(attr0, attr1){
        this.leavingChangesNotificationWindowAddressPickerPage
            .should('be.visible')
        this.leavingChangesNotificationTitleAddressPickerPage
            .should('be.visible')
            .and('have.text', attr0)
        this.leavingChangesNotificationContentAddressPickerPage
            .should('be.visible')
            .and('have.text', attr1)
    }
    leavingNotificationWindowButtonVerifyAddressPickerPage(elementIndex, attr0, attr1){
        this.leavingChangesNotificationWindowAddressPickerPage.find('button').eq(elementIndex)
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    leavingNotificationWindowButtonClickVerifyAddressPickerPage(amountOfDropdownsInWindow, elementIndex){
        if(amountOfDropdownsInWindow===0){
            this.leavingChangesNotificationWindowAddressPickerPage.find('button').contains(elementIndex).click()
        }   if(amountOfDropdownsInWindow===1){
                this.leavingChangesNotificationWindowOneAddressPickerPage.find('button').contains(elementIndex).click()
            }   if(amountOfDropdownsInWindow===2){
                    this.leavingChangesNotificationWindowTwoAddressPickerPage.find('button').contains(elementIndex).click()
                }    else{}
    }
    manualAddrWindowInputAndTitleOneAddressPickerPage(rowIndex, attr0, attr1, attr2){
        if(rowIndex<2){
            if(attr1===0){
            }   else{
                    this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                        .should('have.attr', 'ng-reflect-model', attr1)
                }
            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .clear()
                .type(attr2)
                .and('have.attr', 'ng-reflect-model', attr2)
            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>span')
                .should('be.visible')
                .and('have.text', attr0)
        }   if(rowIndex===2){
                if(attr1===0){
                }   else{
                        this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                            .should('have.attr', 'ng-reflect-model', attr1)
                    }
                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                    .should('be.visible')
                    .and('not.be.disabled')
                    .clear({force:true})
                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                    .type(attr2)
                    .and('have.attr', 'ng-reflect-model', attr2)
                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>mat-label')
                    .should('be.visible')
                    .and('have.attr', 'data-after-content', attr0)
            }   if(rowIndex===3 || rowIndex===4){
                        if(attr1===0){
                        }   else{
                                this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                                    .should('have.attr', 'ng-reflect-model', attr1)
                            }
                        this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                            .should('be.visible')
                            .and('not.be.disabled')
                            .clear()
                            .type(attr2)
                            .and('have.attr', 'ng-reflect-model', attr2)
                        this.autocompliteDropdownVariantsAddressPickerPage.contains(attr2).click()
                        this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>mat-label')
                            .should('be.visible')
                            .and('have.text', attr0)
                    }   if(rowIndex===5){
                            if(attr1===0){
                            }   else{
                                    this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                                        .should('have.attr', 'ng-reflect-model', attr1)
                                }
                            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('input')
                                .should('be.visible')
                                .and('not.be.disabled')
                                .clear()
                                .type(attr2)
                                .and('have.attr', 'ng-reflect-model', attr2)
                            this.rowsManualAddrInputAddressPickerPage.eq(rowIndex).find('label>mat-label')
                                .should('be.visible')
                                .and('have.text', attr0)
                        }   else{}
    }
//------------------------------------------------------------C2-----------------------------------------------------------------
    headerTitleVerifyAddressPickerZero(titleText){
        this.addressPickerZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyAddressPickerZero(buttonIndex, attr0) {
        this.addressPickerZero.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    saveButtonVerifyAddressPickerZero(statusIndex, attr0, attr1) {
        if(statusIndex === 0){
            this.saveButtonAddressPickerZero
              .should('be.visible')
              .and('be.disabled')
              .and('have.class', attr0)
              .and('have.text', attr1)
          }  if(statusIndex === 1){
            this.saveButtonAddressPickerZero
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
                .and('have.text', attr1)
            } else{}
    }
    inputTitleVerifyAddressPickerZero(titleClass, titleText){
        this.inputTitleAddressPickerZero
            .should('be.visible')
            .and('have.class', titleClass)
            .and('have.text', titleText)
    }
    hintTitleVerifyAddressPickerZero(titleClass, titleText){
        this.hintAddressPickerZero
            .should('be.visible')
            .and('have.class', titleClass)
            .and('have.text', titleText)
    }
    selectedAddrVerifyAddressPickerZero(statusIndex, attr0, attr1, attr2, attr3, attr4, attr5, attr6, attr7){
        if(statusIndex===0){
            this.selectedAddrFieldAddressPickerZero.should('not.exist')
            this.addressPreviewAddressPickerZero.should('not.exist')
        }   if(statusIndex===1){
                this.selectedAddrFieldAddressPickerZero.should('be.visible')
                this.selectedAddrFieldAddressPickerZero.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
                this.addressPreviewAddressPickerZero.eq(0)
                    .should('be.visible')
                    .and('have.text', attr1)
                this.addressPreviewAddressPickerZero.eq(1)
                    .should('be.visible')
                    .and('have.text', attr2)
                this.addressPreviewAddressPickerZero.eq(2)
                    .should('be.visible')
                    .and('have.text', attr3)
                this.addressPreviewAddressPickerZero.eq(3)
                    .should('be.visible')
                    .and('have.text', attr1)
                this.addressPreviewAddressPickerZero.eq(4)
                    .should('be.visible')
                    .and('have.text', attr2)
                this.addressPreviewAddressPickerZero.eq(5)
                    .should('be.visible')
                    .and('have.text', attr3)
            }   if(statusIndex===2){
                    this.selectedAddrFieldAddressPickerZero.should('be.visible')
                    this.selectedAddrFieldAddressPickerZero.find('legend')
                        .should('be.visible')
                        .and('have.text', attr0)
                    this.addressPreviewAddressPickerZero.eq(0)
                        .should('be.visible')
                        .and('have.text', attr1)
                    this.addressPreviewAddressPickerZero.eq(1)
                        .should('be.visible')
                        .and('have.text', attr2)
                    this.addressPreviewAddressPickerZero.eq(2)
                        .should('be.visible')
                        .and('have.text', attr3)
                    this.addressPreviewAddressPickerZero.eq(3)
                        .should('be.visible')
                        .and('have.text', attr4)
                    this.addressPreviewAddressPickerZero.eq(4)
                        .should('be.visible')
                        .and('have.text', attr5)
                    this.addressPreviewAddressPickerZero.eq(5)
                        .should('be.visible')
                        .and('have.text', attr6)
                    this.addressPreviewAddressPickerZero.eq(6)
                        .should('be.visible')
                        .and('have.text', attr7)
                }   else{}
    }
    autocompliteAdressVerifyAddressPickerZero(inputText, attr0){
        this.inputFieldAddressPickerZero
            .should('be.visible')
            .and('not.be.disabled')
            .clear()
            .type(inputText)
        this.autocompliteVariantsDropdownAddressPickerZero.contains(attr0).scrollIntoView().click()
    }
    clearAddrAdressVerifyAddressPickerZero(){
        this.clearAddrAddressPickerZero
            .should('be.visible')
            .and('not.be.disabled')
            .click()
    }
    manualInputAddrAddressPickerZero(attr0){
        this.inputFieldAddressPickerZero.click()
        this.autocompliteVariantsDropdownAddressPickerZero.contains(attr0).click()
    }
//------------------------------------------------------------C3-----------------------------------------------------------------
    headerTitleVerifyConformationAddressPickerZero(titleText){
        this.conformationAddressPickerZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyConformationAddressPickerZero(buttonIndex, attr0) {
        this.conformationAddressPickerZero.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    saveButtonVerifyConformationAddressPickerZero(attr0, attr1) {
            this.saveButtonConformationAddressPickerZero
              .should('be.visible')
              .and('not.be.disabled')
              .and('have.class', attr0)
              .and('have.text', attr1)
              .click()
    }
    inputTitleVerifyConformationAddressPickerZero(titleClass, titleText){
        this.inputTitleConformationAddressPickerZero
            .should('be.visible')
            .and('have.class', titleClass)
            .and('have.text', titleText)
    }
    hintTitleVerifyConformationAddressPickerZero(statusIndex, titleClass, titleText){
        if(statusIndex===0){
            this.hintConformationAddressPickerZero
                .should('be.visible')
                .and('have.class', titleClass)
                .and('have.text', titleText)
        }   if(statusIndex===1){
            this.hintConformationAddressPickerZero.parent().parent().find('div').contains(titleText)
                .should('be.visible')
                .and('have.class', titleClass)
                .and('have.text', titleText)
            }
    }
    selectedAddrVerifyConformationAddressPickerZero(statusIndex, attr0, attr1, attr2, attr3, attr4, attr5, attr6, attr7){
        if(statusIndex===0){
            this.selectedAddrFieldConformationAddressPickerZero.should('not.exist')
            this.addressPreviewConformationAddressPickerZero.should('not.exist')
        }   if(statusIndex===1){
                this.selectedAddrFieldConformationAddressPickerZero.should('be.visible')
                this.selectedAddrFieldConformationAddressPickerZero.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
                this.addressPreviewConformationAddressPickerZero.eq(0)
                    .should('be.visible')
                    .and('have.text', attr1)
                this.addressPreviewConformationAddressPickerZero.eq(1)
                    .should('be.visible')
                    .and('have.text', attr2)
                this.addressPreviewConformationAddressPickerZero.eq(2)
                    .should('be.visible')
                    .and('have.text', attr3)
                this.addressPreviewConformationAddressPickerZero.eq(3)
                    .should('be.visible')
                    .and('have.text', attr1)
                this.addressPreviewConformationAddressPickerZero.eq(4)
                    .should('be.visible')
                    .and('have.text', attr2)
                this.addressPreviewConformationAddressPickerZero.eq(5)
                    .should('be.visible')
                    .and('have.text', attr3)
            }   if(statusIndex===2){
                    this.selectedAddrFieldConformationAddressPickerZero.should('be.visible')
                    this.selectedAddrFieldConformationAddressPickerZero.find('legend')
                        .should('be.visible')
                        .and('have.text', attr0)
                    this.addressPreviewConformationAddressPickerZero.eq(0)
                        .should('be.visible')
                        .and('have.text', attr1)
                    this.addressPreviewConformationAddressPickerZero.eq(1)
                        .should('be.visible')
                        .and('have.text', attr2)
                    this.addressPreviewConformationAddressPickerZero.eq(2)
                        .should('be.visible')
                        .and('have.text', attr3)
                    this.addressPreviewConformationAddressPickerZero.eq(3)
                        .should('be.visible')
                        .and('have.text', attr4)
                    this.addressPreviewConformationAddressPickerZero.eq(4)
                        .should('be.visible')
                        .and('have.text', attr5)
                    this.addressPreviewConformationAddressPickerZero.eq(5)
                        .should('be.visible')
                        .and('have.text', attr6)
                    this.addressPreviewConformationAddressPickerZero.eq(6)
                        .should('be.visible')
                        .and('have.text', attr7)
                }   else{}
    }
    autocompliteAdressVerifyConformationAddressPickerZero(inputText, attr0){
        this.inputFieldConformationAddressPickerZero
            .should('be.visible')
            .and('not.be.disabled')
            .clear()
            .type(inputText)
        cy.wait(1000)
        this.autocompliteVariantsDropdownConformationAddressPickerZero.contains(attr0).parent().scrollIntoView().click()
    }
    clearAddrAdressVerifyConformationAddressPickerZero(){
        this.clearAddrConformationAddressPickerZero
            .should('be.visible')
            .and('not.be.disabled')
            .click()
    }
    manualInputAddrConformationAddressPickerZero(attr0){
        this.inputFieldConformationAddressPickerZero.click()
        this.autocompliteVariantsDropdownConformationAddressPickerZero.contains(attr0).click()
    }
//------------------------------------------------------------C4-----------------------------------------------------------------
    headerTitleVerifyAddressFormZero(titleText){
        this.addressFormZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyAddressFormZero(buttonIndex, attr0) {
        this.conformationAddressPickerZero.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    clearAllBodyInputsAddressFormZero(inputAmount){
        var a;
        for (a=0; a<inputAmount; a++){
            this.bodyRowAddressFormZero.eq(a).find('input')
                .click()
                .clear()
        }
    }
    bodyRowTitleVerifyAddressFormZero(rowIndex, attr0, attr1){
        if(rowIndex<4){
            this.bodyRowAddressFormZero.eq(rowIndex).find('label>span')
                .should('be.visible')
                .and('have.class', attr0)
                .and('have.text', attr1)
        }   if(rowIndex===4){
            this.bodyRowAddressFormZero.eq(rowIndex).find('label>mat-label')
            .should('be.visible')
            .and('have.class', attr0)
            .and('have.attr', 'data-after-content', attr1)
            }   if(rowIndex>4){
                this.bodyRowAddressFormZero.eq(rowIndex).find('label>mat-label')
                .should('be.visible')
                .and('have.class', attr0)
                .and('have.text', attr1)
                }   else{}
    }
    bodyRowInputFieldVerifyAddressFormZero(rowIndex, attr0, attr1){
        this.bodyRowAddressFormZero.eq(rowIndex).find('input')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
        if(attr1===0){
            this.bodyRowAddressFormZero.eq(rowIndex).find('input')
            .should('have.attr', 'ng-reflect-model', '[object Object]')
        }   else{
                this.bodyRowAddressFormZero.eq(rowIndex).find('input')
                    .should('have.attr', 'ng-reflect-model', attr1)
            }
    }
    bodyRowInsertTextVerifyAddressFormZero(rowIndex, attr0){
        this.bodyRowAddressFormZero.eq(rowIndex).find('input')
            .click()
            .clear()
            .type(attr0)
    }
    bodyRowSelectFromAutocompleteVerifyAddressFormZero(attr0){
        this.autocompliteDropdownVariantsAddressPickerPage.contains(attr0).click()
    }
    bodyRowClearButtonVerifyAddressFormZero(rowIndex, attr0){
        this.bodyRowAddressFormZero.eq(rowIndex).find('mat-icon')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
    }
//------------------------------------------------------------C5-----------------------------------------------------------------
    headerTitleVerifyTwoLinePreFilledZero(titleText){
        this.twoLinePreFilledZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyTwoLinePreFilledZero(buttonIndex, attr0) {
        this.twoLinePreFilledZero.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    inputTitleVerifyTwoLinePreFilledZero(attr0, attr1){
        this.inputFieldTitleTwoLinePreFilledZero
            .should('be.visible')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    inputFieldVerifyTwoLinePreFilledZero(actionIndex, attr0){
        if(actionIndex===0){
            this.inputFieldTwoLinePreFilledZero
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
        }   if(actionIndex===1){
                this.inputFieldTwoLinePreFilledZero
                    .clear()
                    .type(attr0)
        }
    }
    addressPreviewClearButtonVerifyTwoLinePreFilledZero(attr0, attr1){
        if(attr0===0){
            this.twoLinePreFilledZero.find('mat-form-field mat-icon')
                .should('be.visible')
                .and('not.disabled')
                .and('have.class', attr1)
        }   if(attr0===1){
                this.twoLinePreFilledZero.find('mat-form-field mat-icon')
                    .click()
            }   else{}
    }
    selectedAddrVerifyTwoLinePreFilledZero(statusIndex, attr0, attr1, attr2){
        if(statusIndex===0){
            this.selectedAddressPanelTwoLinePreFilledZero.should('not.be.visible')
            this.addressPreviewTwoLinePreFilledZero.should('not.exist')
        }   if(statusIndex===1){
                this.selectedAddressPanelTwoLinePreFilledZero.should('be.visible')
                this.selectedAddressPanelTwoLinePreFilledZero.find('legend').should('have.text', attr1)
                var a;
                for (a=0; a<attr0; a++){
                    this.addressPreviewTwoLinePreFilledZero.eq(a)
                        .should('be.visible')
                        .and('have.text', attr2[a])
                }
            }   else{}
    }
    selectAutocompleteVariantTwoLinePreFilledZero(attr0){
        this.autocompleteVariansTwoLinePreFilledZero.parent()
            .should('be.visible')
            .and('not.be.disabled')
        this.autocompleteVariansTwoLinePreFilledZero.contains(attr0).click()
    }
//------------------------------------------------------------C6-----------------------------------------------------------------
    headerTitleVerifyFormatExamplesZero(titleText){
        this.formatExamples0.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyFormatExamplesZero(buttonIndex, attr0) {
        this.formatExamples0.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    bodyPanelsTitleAndContentVerifyFormatExamplesZero(panelIndex, attr0, attr1, attr2){
        this.bodyPanelsFormatExamples0.eq(panelIndex).find('legend')
            .should('be.visible')
            .and('have.text', attr0)
        this.bodyPanelsFormatExamples0.eq(panelIndex).find('.'+attr1.replace(/ /g, '.')).each(($span, i) =>{
            cy.wrap($span)
                .should('be.visible')
                .and('have.text', attr2[i])
        })
    }
//------------------------------------------------------------C7-----------------------------------------------------------------
    headerTitleVerifyDisabledAndReadonlyZero(titleText){
        this.disabledAndReadonlyZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyDisabledAndReadonlyZero(buttonIndex, attr0) {
        this.disabledAndReadonlyZero.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    bodyTitleVerifyDisabledAndReadonlyZero(divIndex, attr0){
        this.bodyTitlesDisabledAndReadonlyZero.eq(divIndex)
            .should('be.visible')
            .and('have.text', attr0)
    }
    bodyTitleInPanelVerifyDisabledAndReadonlyZero(attr0){
        this.bodyPanelDisabledAndReadonlyZero.find('legend')
            .should('be.visible')
            .and('have.text', attr0)
    }
    innerTitleVerifyDisabledAndReadonlyZero(attr0, attr1){
        this.innerTitleDisabledAndReadonlyZero
            .should('be.visible')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    innerTitleOneVerifyDisabledAndReadonlyZero(attr0, attr1){
        this.innerTitleOneDisabledAndReadonlyZero
            .should('be.visible')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    datePreviewOneVerifyDisabledAndReadonlyZero(attr0, attr1){
        this.datePreviewOneDisabledAndReadonlyZero.find('.'+attr0.replace(/ /g, '.')).each(($span, i) =>{
            cy.wrap($span)
                .should('be.visible')
                .and('have.text', attr1[i])
        })
    }
    datePreviewTwoVerifyDisabledAndReadonlyZero(attr0, attr1){
        this.datePreviewTwoDisabledAndReadonlyZero.find('.'+attr0.replace(/ /g, '.')).each(($span, i) =>{
            cy.wrap($span)
                .should('be.visible')
                .and('have.text', attr1[i])
        })
    }
    datePreviewPanelVerifyDisabledAndReadonlyZero(attr0, attr1){
        this.bodyPanelDisabledAndReadonlyZero.find('.twoline .'+attr0.replace(/ /g, '.')).each(($span, i) =>{
            cy.wrap($span)
                .should('be.visible')
                .and('have.text', attr1[i])
        })
    }
//------------------------------------------------------------C8-----------------------------------------------------------------
    headerTitleVerifyAddressRegionZero(titleText){
        this.addressRegionZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyAddressRegionZero(buttonIndex, attr0) {
        this.addressRegionZero.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    bodyTitleVerifyAddressRegionZero(buttonIndex, attr0, attr1) {
        this.bodyDivAddressRegionZero.eq(buttonIndex).find('mat-label')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    bodyInputVerifyAddressRegionZero(buttonIndex, statusIndex, attr0, attr1) {
        if(statusIndex===0){
            this.bodyDivAddressRegionZero.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
        }   if(statusIndex===1){
            this.bodyDivAddressRegionZero.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
                .and('have.attr', 'ng-reflect-model', attr1)
            }   else{}   
    }
    inputTextVerifyAddressRegionZero(buttonIndex, attr0) {
        this.bodyDivAddressRegionZero.eq(buttonIndex).find('input')
            .clear()
            .type(attr0)
        this.autocompliteDropdownVariantsAddressPickerPage.contains(attr0).click()
    }
    clearButtonsVerifyAddressRegionZero(divIndex, statusIndex){
        if(statusIndex===0){
            this.bodyDivClearButtonAddressRegionZero.eq(divIndex)
                .should('not.exist')
        }   if(statusIndex===1){
                this.bodyDivClearButtonAddressRegionZero.eq(divIndex).find('mat-icon')
                    .should('be.visible')
                    .and('not.disabled')
            }   if(statusIndex===2){
                    this.bodyDivClearButtonAddressRegionZero.eq(divIndex).find('mat-icon')
                        .should('be.visible')
                        .and('not.disabled')
                        .click()
                }
    }
    selectedAddressPanelVerifyAddressRegionZero(displayIndex, attr0, attr1){
        if(displayIndex===0){
            this.selectedPanelAddressRegionZero
                .should('not.exist')
        }   if(displayIndex===1){
                this.selectedPanelAddressRegionZero.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
                this.selectedPanelAddressRegionZero
                    .should('contain.text', attr1)
            }
    }
//------------------------------------------------------------C9-----------------------------------------------------------------
    headerTitleVerifyAddressRegionOne(titleText){
        this.addressRegionOne.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyAddressRegionOne(buttonIndex, attr0) {
        this.addressRegionOne.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    selectedAddressPanelVerifyAddressRegionOne(displayIndex, attr0, attr1){
        if(displayIndex===0){
            this.selectedPanelAddressRegionOne
                .should('not.exist')
        }   if(displayIndex===1){
                this.selectedPanelAddressRegionOne.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
                this.selectedPanelAddressRegionOne
                    .should('contain.text', attr1)
            }
    }
    bodyTitleVerifyAddressRegionOne(buttonIndex, attr0, attr1) {
        this.bodyDivAddressRegionOne.eq(buttonIndex).find('mat-label')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    bodyInputVerifyAddressRegionOne(buttonIndex, statusIndex, attr0, attr1) {
        if(statusIndex===0){
            this.bodyDivAddressRegionOne.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
        }   if(statusIndex===1){
            this.bodyDivAddressRegionOne.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
                .and('have.attr', 'ng-reflect-model', attr1)
            }   else{}   
    }
    inputTextVerifyAddressRegionOne(buttonIndex, attr0) {
        this.bodyDivAddressRegionOne.eq(buttonIndex).find('input')
            .clear()
            .type(attr0)
        this.autocompliteDropdownVariantsAddressPickerPage.contains(attr0).click()
    }
    clearButtonsVerifyAddressRegionOne(divIndex, statusIndex){
        if(statusIndex===0){
            this.bodyDivClearButtonAddressRegionOne.eq(divIndex)
                .should('not.exist')
        }   if(statusIndex===1){
                this.bodyDivClearButtonAddressRegionOne.eq(divIndex).find('mat-icon')
                    .should('be.visible')
                    .and('not.disabled')
            }   if(statusIndex===2){
                    this.bodyDivClearButtonAddressRegionOne.eq(divIndex).find('mat-icon')
                        .should('be.visible')
                        .and('not.disabled')
                        .click()
                }
    }
//------------------------------------------------------------C10-----------------------------------------------------------------
    headerTitleVerifyAddressRegionTwo(titleText){
        this.addressRegionTwo.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyAddressRegionTwo(buttonIndex, attr0) {
        this.addressRegionTwo.find('mat-toolbar button').eq(buttonIndex)
        .should('be.visible')
        .and('not.be.disabled')
        .and('have.class', attr0)
        .click()
    }
    selectedAddressPanelVerifyAddressRegionTwo(displayIndex, attr0, attr1){
        if(displayIndex===0){
            this.selectedPanelAddressRegionTwo
                .should('not.exist')
        }   if(displayIndex===1){
                this.selectedPanelAddressRegionTwo.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
                this.selectedPanelAddressRegionTwo
                    .should('contain.text', attr1)
            }
    }
    bodyTitleVerifyAddressRegionTwo(buttonIndex, attr0, attr1) {
        this.bodyDivAddressRegionTwo.eq(buttonIndex).find('mat-label')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    bodyInputVerifyAddressRegionTwo(buttonIndex, statusIndex, attr0, attr1) {
        if(statusIndex===0){
            this.bodyDivAddressRegionTwo.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
        }   if(statusIndex===1){
            this.bodyDivAddressRegionTwo.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('not.be.disabled')
                .and('have.class', attr0)
                .and('have.attr', 'ng-reflect-model', attr1)
            }   else{}   
    }
    inputTextVerifyAddressRegionTwo(buttonIndex, attr0) {
        this.bodyDivAddressRegionTwo.eq(buttonIndex).find('input')
            .clear()
            .type(attr0)
        this.autocompliteDropdownVariantsAddressPickerPage.contains(attr0).click()
    }
    clearButtonsVerifyAddressRegionTwo(divIndex, statusIndex){
        if(statusIndex===0){
            this.bodyDivClearButtonAddressRegionTwo.eq(divIndex)
                .should('not.exist')
        }   if(statusIndex===1){
                this.bodyDivClearButtonAddressRegionTwo.eq(divIndex).find('mat-icon')
                    .should('be.visible')
                    .and('not.disabled')
            }   if(statusIndex===2){
                    this.bodyDivClearButtonAddressRegionTwo.eq(divIndex).find('mat-icon')
                        .should('be.visible')
                        .and('not.disabled')
                        .click()
                }
    }
    //------------------------------------------------------------C11-----------------------------------------------------------------
    headerTitleVerifyAddressRegionThree(titleText){
        this.addressRegionThree.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyAddressRegionThree(buttonIndex, attr0) {
        this.addressRegionThree.find('mat-toolbar button').eq(buttonIndex)
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .click()
    }
    selectedAddressPanelVerifyAddressRegionThree(displayIndex, attr0, attr1){
        if(displayIndex===0){
            this.selectedPanelAddressRegionThree
                .should('not.exist')
        }   if(displayIndex===1){
                this.selectedPanelAddressRegionThree.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
                this.selectedPanelAddressRegionThree
                    .should('contain.text', attr1)
            }
    }
    bodyTitleVerifyAddressRegionThree(buttonIndex, attr0, attr1) {
        this.bodyDivAddressRegionThree.eq(buttonIndex).find('mat-label')
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .and('have.text', attr1)
    }
    bodyInputVerifyAddressRegionThree(buttonIndex, statusIndex, attr0, attr1) {
        if(statusIndex===0){
            this.bodyDivAddressRegionThree.eq(buttonIndex).find('input')
                .should('be.visible')
                .and('be.disabled')
                .and('have.class', attr0)
        }   if(statusIndex===1){
                this.bodyDivAddressRegionThree.eq(buttonIndex).find('input')
                    .should('be.visible')
                    .and('be.disabled')
                    .and('have.class', attr0)
                    .and('have.attr', 'ng-reflect-model', attr1)
            }   else{}   
    }
//------------------------------------------------------------C12-----------------------------------------------------------------
    headerTitleVerifyGeoCoderZero(titleText){
        this.geoCoderZero.find('mat-toolbar>span')
            .should('be.visible')
            .and('have.text', titleText)
    }
    headerButtonVerifyGeoCoderZero(buttonIndex, attr0) {
        this.geoCoderZero.find('mat-toolbar button').eq(buttonIndex)
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .click()
    }
   lookUpButtonVerifyGeoCoderZero(attr0, attr1) {
        this.lookUpButton
            .should('be.visible')
            .and('not.be.disabled')
            .and('have.class', attr0)
            .and('have.text', attr1)
            .click()
    }
    codeFieldVerifyGeoCoderZero(existingStatus, attr0, attr1){
        if(existingStatus===0){
            this.codeFieldgeoCoderZero.should('not.exist')
        }   if(existingStatus===1){
                this.codeFieldgeoCoderZero
                    .should('be.visible')
                    .and('contain.text', attr1)
                this.codeFieldgeoCoderZero.find('legend')
                    .should('be.visible')
                    .and('have.text', attr0)
            } else{}
    } 
}
export default new addressPickerPage ();
