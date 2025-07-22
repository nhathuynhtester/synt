import {test,expect,request} from '@playwright/test'

test.describe('Authentication validation',{tag:['@authentication']},()=>{

    test('Login with valid account',async({page})=>{
        await test.step('Navigate to page',async()=>{
            await page.goto('https://www.automationexercise.com/');
            await expect(page).toHaveURL('https://www.automationexercise.com/');
        })

        await test.step('Click on Signup / Login button',async()=>{
            await page.getByRole('link',{name:' Signup / Login'}).click();
            await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible();
        })

        await test.step('Enter correct email address and password',async()=>{
            await page.locator('input[data-qa="login-email"]').fill('nhathuynh@gmail.com');
            await page.locator('input[data-qa="login-password"]').fill('GoMobile!123');
            await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible();
        })

        await test.step('Click login button',async()=>{
            await page.getByRole('button',{name:'Login'}).click();
            await expect(page.locator('ul.nav li a b')).toHaveText('nhathuynh');
        })
    })

    test('Login with invalid account',async({page})=>{
        await test.step('Navigate to page',async()=>{
         await page.goto('https://www.automationexercise.com/');
            await expect(page).toHaveURL('https://www.automationexercise.com/');
        })

        await test.step('Click on Signup / Login button',async()=>{
            await page.getByRole('link',{name:' Signup / Login'}).click();
            await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible();
        })

        await test.step('Enter incorrect email address and password',async()=>{
            await page.locator('input[data-qa="login-email"]').fill('nhathuynh2@gmail.com');
            await page.locator('input[data-qa="login-password"]').fill('GoMobile!123');
        })

        await test.step('Click login button',async()=>{
            await page.getByRole('button',{name:'Login'}).click();
            await expect(page.locator('div.login-form form p')).toHaveText('Your email or password is incorrect!');
        })
    })


     test('Logout',async({page})=>{
        await test.step('Navigate to page',async()=>{
            await page.goto('https://www.automationexercise.com/');
            await expect(page).toHaveURL('https://www.automationexercise.com/');
        })

        await test.step('Click on Signup / Login button',async()=>{
            await page.getByRole('link',{name:' Signup / Login'}).click();
            await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible();
        })

        await test.step('Enter correct email address and password',async()=>{
            await page.locator('input[data-qa="login-email"]').fill('nhathuynh@gmail.com');
            await page.locator('input[data-qa="login-password"]').fill('GoMobile!123');
            await expect(page.getByRole('heading',{name:'Login to your account'})).toBeVisible();
        })

        await test.step('Click login button',async()=>{
            await page.getByRole('button',{name:'Login'}).click();
            await expect(page.locator('ul.nav li a b')).toHaveText('nhathuynh');
        })

        await test.step('Click logout button',async()=>{
            await page.getByRole('link',{name:'Logout'}).click();
            await expect(page).toHaveURL('https://www.automationexercise.com/login');
        })
    })
})