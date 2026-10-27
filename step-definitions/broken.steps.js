const {Then}=require('@cucumber/cucumber');
const {expect}=require('playwright/test');
Then('the deliberately outdated submit selector should fail',async function(){await expect(this.page.locator('#submitEMI_legacy')).toBeVisible({timeout:1000});});
Then('the deliberately outdated result selector should fail',async function(){await expect(this.page.getByTestId('emi-output-old')).toBeVisible({timeout:1000});});
Then('the deliberately outdated chart selector should fail',async function(){await expect(this.page.locator('.pie-chart-deprecated')).toBeVisible({timeout:1000});});
