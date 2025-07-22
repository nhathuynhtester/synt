import {test,expect,request} from '@playwright/test'

test('Table',async ({page})=>{
       await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html')
       const checkBox = page.locator('tr').filter({hasText:'Smartphone'}).locator('input');
       await checkBox.click();
})