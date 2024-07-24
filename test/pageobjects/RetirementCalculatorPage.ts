import { ChainablePromiseElement } from 'webdriverio';
import { RetirementForm, testData } from 'test/data/TestData'; // corrected path
import { BrowserActions } from 'test/utils/browserActions'; 
const { expect } = require('@wdio/globals');

class RetirementCalculatorPage {
    public get currentAgeInput(): ChainablePromiseElement<WebdriverIO.Element> { 
        return $('#current-age'); }
    public get retirementAgeInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#retirement-age'); }
    public get currentIncomeInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#current-annual-income'); }
    public get spouseIncomeInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#spouse-income'); }
    public get currentSavingsInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#current-savings'); }
    public get currentContributionInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#current-contribution'); }
    public get annualContributionIncreaseInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#annual-contribution-increase'); }
    public get socialSecurityYesInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#social-security-yes'); }
    public get socialSecurityNoInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#social-security-no'); }
    public get socialSecurityOverrideInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#social-security-override'); }
    public get additionalIncomeInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#additional-income'); }
    public get retirementYearsInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#retirement-years'); }
    public get postRetirementIncomeIncreaseInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#post-retirement-income-increase'); }
    public get desiredIncomeInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#desired-income'); }
    public get preRetirementReturnInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#pre-retirement-return'); }
    public get postRetirementReturnInput(): ChainablePromiseElement<WebdriverIO.Element> { return $('#post-retirement-return'); }
    public get adjustDefaultValuesButton(): ChainablePromiseElement<WebdriverIO.Element> { return $('#adjust-default-values'); }
    public get calculateButton(): ChainablePromiseElement<WebdriverIO.Element> { return $('#calculate'); }
    public get resultChart(): ChainablePromiseElement<WebdriverIO.Element> { return $('#result-chart'); }
    public get validationErrors(): ChainablePromiseElement<WebdriverIO.Element> { return $('#validation-errors'); }

    public async open(): Promise<void> {
        try {
            await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
            console.log('Opened retirement calculator page.');
        } catch (error) {
            console.error('Error opening retirement calculator page:', error);
            throw new Error('Failed to open retirement calculator page.');
        }
    }

    public async fillRetirementForm(form: RetirementForm): Promise<void> {
        try {
            await BrowserActions.setFieldValue(this.currentAgeInput, form.currentAge);
            await BrowserActions.setFieldValue(this.retirementAgeInput, form.retirementAge);
            await BrowserActions.setFieldValue(this.currentIncomeInput, form.currentIncome);
            await BrowserActions.setFieldValue(this.spouseIncomeInput, form.spouseIncome);
            await BrowserActions.setFieldValue(this.currentSavingsInput, form.currentSavings);
            await BrowserActions.setFieldValue(this.currentContributionInput, form.currentContribution);
            await BrowserActions.setFieldValue(this.annualContributionIncreaseInput, form.annualContributionIncrease);
            if (form.socialSecurity) {
                await BrowserActions.clickElement(this.socialSecurityYesInput);
                await BrowserActions.setFieldValue(this.socialSecurityOverrideInput, form.socialSecurityOverride);
            } else {
                await BrowserActions.clickElement(this.socialSecurityNoInput);
            }
            await BrowserActions.setFieldValue(this.additionalIncomeInput, form.additionalIncome);
            await BrowserActions.setFieldValue(this.retirementYearsInput, form.retirementYears);
            await BrowserActions.clickElement(this.postRetirementIncomeIncreaseInput);
            await BrowserActions.setFieldValue(this.desiredIncomeInput, form.desiredIncome);
            await BrowserActions.setFieldValue(this.preRetirementReturnInput, form.preRetirementReturn);
            await BrowserActions.setFieldValue(this.postRetirementReturnInput, form.postRetirementReturn);
            console.log('Filled retirement form with provided data.');
        } catch (error) {
            console.error('Error filling retirement form:', error);
            throw new Error('Failed to fill retirement form.');
        }
    }

    public async clickAdjustDefaultValues(): Promise<void> {
        try {
            await BrowserActions.clickElement(this.adjustDefaultValuesButton);
            console.log('Clicked on adjust default values button.');
        } catch (error) {
            console.error('Error clicking on adjust default values button:', error);
            throw new Error('Failed to click on adjust default values button.');
        }
    }

    public async clickCalculate(): Promise<void> {
        try {
            await BrowserActions.clickElement(this.calculateButton);
            console.log('Clicked on calculate button.');
        } catch (error) {
            console.error('Error clicking on calculate button:', error);
            throw new Error('Failed to click on calculate button.');
        }
    }

    public async getResultChart(): Promise<ChainablePromiseElement<WebdriverIO.Element>> {
        return this.resultChart;
    }

    public async getCalculatedValues(): Promise<any> {
        return await this.resultChart.getText();
    }

    public async getValidationErrors(): Promise<string[]> {
        const errorsText = await this.validationErrors.getText();
        return errorsText.split('\n');
    }
    
}

export default new RetirementCalculatorPage();
