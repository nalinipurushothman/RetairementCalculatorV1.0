import { ChainablePromiseElement } from 'webdriverio';

export class BrowserActions {
    public static async clickElement(element: ChainablePromiseElement<WebdriverIO.Element>): Promise<void> {
        try {
            await element.waitForDisplayed();
            await element.click();
            console.log(`Clicked on element: ${element.selector}`);
        } catch (error) {
            console.error(`Error clicking on element: ${element.selector}`, error);
            throw new Error(`Failed to click on element: ${element.selector}`);
        }
    }

    public static async setFieldValue(element: ChainablePromiseElement<WebdriverIO.Element>, value: string | number): Promise<void> {
        try {
            await element.waitForDisplayed();
            await element.setValue(value);
            console.log(`Set value '${value}' on element: ${element.selector}`);
        } catch (error) {
            console.error(`Error setting value '${value}' on element: ${element.selector}`, error);
            throw new Error(`Failed to set value '${value}' on element: ${element.selector}`);
        }
    }

    public static async getFieldValue(element: ChainablePromiseElement<WebdriverIO.Element>): Promise<string> {
        try {
            await element.waitForDisplayed();
            const value = await element.getValue();
            console.log(`Retrieved value '${value}' from element: ${element.selector}`);
            return value;
        } catch (error) {
            console.error(`Error retrieving value from element: ${element.selector}`, error);
            throw new Error(`Failed to get value from element: ${element.selector}`);
        }
    }
}
