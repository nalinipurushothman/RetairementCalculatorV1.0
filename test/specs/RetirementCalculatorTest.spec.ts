//import { expect } from '@wdio/globals';
const { createDriver } = require('../utils/webdriver');
const testData = require('../data/testData');
const RetirementCalculatorPage = require('../pageobjects/RetirementCalculatorPage');
//const { expect } = require('@wdio/globals');

describe('Retirement Calculator', () => {
  it('should calculate retirement with valid data', async () => {
    // User opens the retirement calculator page
    await RetirementCalculatorPage.open();

    // User fills up the retirement calculator form with valid data
    await RetirementCalculatorPage.fillRetirementForm(testData.retirementForm);

    // User clicks on the calculate button to see the results
    await RetirementCalculatorPage.clickCalculate();

    // User should see the retirement calculator chart displaying the calculated results
    const resultChart = await RetirementCalculatorPage.getResultChart();

    // Check if the result chart is displayed
    if (!resultChart.isDisplayed()) {
      throw new Error('Result chart is not displayed');
    }

    // Check if the calculated values match the expected results
    const calculatedValues = await RetirementCalculatorPage.getCalculatedValues();
    if (calculatedValues.totalSavingsAtRetirement !== testData.expectedValues.totalSavingsAtRetirement) {
      throw new Error('Total savings at retirement don\'t match expected value');
    }
    if (calculatedValues.annualIncomePostRetirement !== testData.expectedValues.annualIncomePostRetirement) {
      throw new Error('Annual income post retirement don\'t match expected value');
    }
  });

  it('should show validation errors with invalid data', async () => {
    // User opens the retirement calculator page
    await RetirementCalculatorPage.open();

    // User fills up the retirement calculator form with invalid data (e.g., negative age)
    const invalidData = { ...testData.retirementForm, currentAge: -1 };
    await RetirementCalculatorPage.fillRetirementForm(invalidData);

    // User clicks on the calculate button
    await RetirementCalculatorPage.clickCalculate();

    // User should see validation error messages
    const validationErrors = await RetirementCalculatorPage.getValidationErrors();

    // Check if validation errors include the expected message
    if (!validationErrors.includes('Current age must be a positive number')) {
      throw new Error('Expected validation error for negative age not found');
    }
  });

  it('should adjust default values and calculate', async () => {
    // User opens the retirement calculator page
    await RetirementCalculatorPage.open();

    // User clicks on the adjust default values button
    await RetirementCalculatorPage.clickAdjustDefaultValues();

    const defaultValues = await RetirementCalculatorPage.getDefaultValues();
    if (defaultValues.inflationRate !== testData.defaultValues.inflationRate) {
      throw new Error('Default inflation rate doesn\'t match expected value');
    }
    if (defaultValues.investmentReturn !== testData.defaultValues.investmentReturn) {
      throw new Error('Default investment return doesn\'t match expected value');
    }
    if (defaultValues.retirementYears !== testData.defaultValues.retirementYears) {
      throw new Error('Default retirement years don\'t match expected value');
    }

    await RetirementCalculatorPage.fillRetirementForm(testData.retirementForm);

    // User clicks on the calculate button
    await RetirementCalculatorPage.clickCalculate();

    // User should see the updated results
    const resultChart = await RetirementCalculatorPage.getResultChart();

    // Check if the result chart is displayed
    if (!resultChart.isDisplayed()) {
      throw new Error('Result chart is not displayed');
    }

    // Check if the calculated values match the expected results after adjusting default values
    const calculatedValues = await RetirementCalculatorPage.getCalculatedValues();
    if (calculatedValues.totalSavingsAtRetirement !== testData.expectedDefaultValues.totalSavingsAtRetirement) {
      throw new Error('Total savings at retirement don\'t match expected value after adjusting defaults');
    }
    if (calculatedValues.annualIncomePostRetirement !== testData.expectedDefaultValues.annualIncomePostRetirement) {
      throw new Error('Annual income post retirement don\'t match expected value after adjusting defaults');
    }
  });
});
