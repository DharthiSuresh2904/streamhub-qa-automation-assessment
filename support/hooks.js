const {Before,After,AfterStep,Status}=require('@cucumber/cucumber');
const {chromium}=require('playwright');
require('dotenv').config();
Before({tags:'@ui'},async function(){this.browser=await chromium.launch({headless:process.env.HEADLESS!=='false'});this.page=await this.browser.newPage();});
AfterStep({tags:'@ui'},async function({result}){if(result?.status===Status.FAILED&&this.page){const shot=await this.page.screenshot({fullPage:true});await this.attach(shot,'image/png');}});
After(async function(){if(this.browser)await this.browser.close();});
