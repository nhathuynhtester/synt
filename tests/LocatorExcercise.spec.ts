import {test,expect,Page} from '@playwright/test'

test.describe('GetByText',{tag:['@GetByTextTest','@GetByLabel','@UploadFile']},()=>{

    test.beforeEach(async ({page})=>{
       await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html')
       await page.waitForLoadState('domcontentloaded');
    })

    test('GetByText',async ({page})=>{
        await test.step('GetByTextLocator',async ()=>{
            await page.getByText('Submit Form').click();
            await page.getByText('link');
            const a = await page.locator('acdv').all()
        })
    })

    test('GetByLabel',async ({page})=>{
        await test.step('GetByTextLocator',async ()=>{
            await page.getByLabel('Email Address:').fill('Nhat Huynh');
            await page.getByLabel(/Password:/g).fill('abcdef');
            await page.getByLabel('Standard').click();
             
        })
    })

     test('UploadFile',async ({page})=>{
        await test.step('GetByTextLocator',async ()=>{
            const filePath = "C:\\Users\\Admin\\Desktop\\hqdefault.jpg"
            await page.locator('#singleFileInput').setInputFiles(filePath);
            await page.waitForTimeout(10000);
             
        })
    })

    test('Table',async ({page})=>{
        await test.step('GetByTextLocator',async ()=>{
            const tr = page.locator('')
             
        })
    })
})
