import {test,expect, Locator} from '@playwright/test'

test('slider',async ({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    
    const sliderBtn = await page.locator('#slider-range .ui-slider-handle').all();
    const leftBtn  = sliderBtn[0];
    const rightBtn = sliderBtn[1];

    

    // Get bounding box
    const sliderBoungdingBox = await page.locator('#slider-range').boundingBox();
    if(!sliderBoungdingBox){
        throw new Error('Bouding box is null');
    }

    let targetLeftX = sliderBoungdingBox.x;
    let targetY = sliderBoungdingBox.y + sliderBoungdingBox.height/2;

    // Move left btn to beginning
    await leftBtn.hover();
    await page.mouse.down();
    await page.mouse.move(targetLeftX,targetY);
    await page.mouse.up();

    // Get amount
    let amount = await page.$eval('#amount',(input)=>{
        const inputText = input as HTMLInputElement;
        return inputText.value;
    })

    // Move left btn to target amount
    if(!amount){
        throw new Error('Amount is null');
    }

    while(amount!=='$75 - $300'){
         targetLeftX = targetLeftX + 1;
        await leftBtn.hover();
        await page.mouse.down();
        await page.mouse.move(targetLeftX,targetY);
        await page.mouse.up();
        

        amount = await page.$eval('#amount',(input)=>{
        const inputText = input as HTMLInputElement;
        return inputText.value;
    })
    }

    await page.waitForTimeout(10000);
})