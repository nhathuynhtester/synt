import {test,expect,request} from '@playwright/test'

test.describe('RegisterUser',{tag:['@registeruser']},()=>{
    test('RegisterUserTest',async({page})=>{

        await test.step('Navigate to main page',async()=>{
            await page.goto('https://automationexercise.com/');
            await expect(page).toHaveURL('https://automationexercise.com/');
        })

        await test.step('Click on Signup / Login button',async()=>{
            await page.getByRole('link',{name:' Signup / Login'}).click();
            await expect(page.getByRole('heading',{name:'New User Signup!'})).toBeVisible();
        })

        await test.step('Enter name and email address',async()=>{
            await page.getByPlaceholder('Name').fill('nhathuynh');
            await page.locator('[data-qa="signup-email"]').fill('nhathuynh@gmail.com');
        })

        await test.step('Click Signup button',async()=>{
            await page.getByRole('button',{name:'Signup'}).click();
            await expect(page.getByRole('heading',{name:'ENTER ACCOUNT INFORMATION'})).toHaveText('Enter Account Information');
        })

        await test.step('Fill details: Title, Name, Email, Password, Date of birth',async()=>{
            await page.getByLabel('Mr.').click();
            await page.locator('#password').fill('GoMobile!123');
            await page.locator('#days').selectOption({value:'29'});
            await page.locator('#months').selectOption({value:'4'});
            await page.locator('#years').selectOption({value:'2001'});
        })

        await test.step('Select checkbox Sign up for our newsletter! and Select checkbox Receive special offers from our partners!',async()=>{
            await page.getByLabel('Sign up for our newsletter!').click();
            await page.getByLabel('Receive special offers from our partners!').click();
        })

        await test.step('Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number',async()=>{
            await page.locator('#first_name').fill('Nhat');
            await page.locator('#last_name').fill('Huynh');
            await page.locator('#company').fill('KMS');
            await page.locator('#address1').fill('221 TQK');
            await page.locator('#address2').fill('Q1');
            await page.locator('#country').selectOption({value:'Canada'});
            await page.locator('#state').fill('Toronto');
            await page.locator('#city').fill('Toronto');
            await page.locator('#zipcode').fill('00700');
            await page.locator('#mobile_number').fill('0916854821');
            await page.getByRole('button',{name:'Create Account'}).click();
            await expect(page.getByRole('heading',{name:'ACCOUNT CREATED!'})).toBeVisible();
            await page.getByRole('link', { name: 'Continue' }).click();
            await expect(page.locator('div.shop-menu ul li a b')).toHaveText('nhathuynh');
            await page.getByRole('link',{name:' Delete Account'}).click()
            await expect(page.getByRole('heading',{name: 'ACCOUNT DELETED!'})).toBeVisible();
        })

      
    })
})