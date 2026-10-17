import {test,expect} from '@playwright/test';
test('coordinator journey: SMS, deduplication, dispatch, offline evidence and persistence',async({page,context})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/');await expect(page.getByRole('heading',{name:'A clearer picture. Healthier communities.'})).toBeVisible();
 await page.screenshot({path:'test-results/overview-desktop.png',fullPage:true});
 await page.getByRole('button',{name:'Report a fault',exact:true}).click();
 await page.getByLabel('Reporting channel').selectOption('SMS');await page.getByLabel('SMS message').fill('TS4 2');await page.getByRole('button',{name:'Record report'}).click();
 await page.locator('nav').getByRole('button',{name:'Fault reports'}).click();
 let row=page.locator('tr').filter({hasText:'T-1092'});await expect(row).toHaveCount(1);
 await page.getByRole('button',{name:'Report a fault',exact:true}).click();await page.getByLabel('Reporting channel').selectOption('SMS');await page.getByLabel('SMS message').fill('4 2');await page.getByRole('button',{name:'Record report'}).click();
 await expect(page.locator('tr').filter({hasText:'T-1093'})).toHaveCount(0);
 await row.getByRole('button',{name:'Triage & dispatch'}).click();await page.getByRole('button',{name:'Create work order'}).click();
 await page.getByRole('button',{name:'Demo messages'}).click();const message=await page.locator('.message.out').filter({hasText:'give this code:'}).first().textContent();const confirmation=message!.match(/code: (\d{4})/)![1];
 await page.getByRole('button',{name:'Close dialog'}).click();await page.locator('nav').getByRole('button',{name:'Work orders'}).click();
 await page.getByRole('button',{name:'Open field checklist'}).click();await expect(page.getByLabel('Post-repair flow')).toHaveCount(0);
 await page.getByLabel('I have isolated').check();await page.getByRole('checkbox').nth(1).check();await page.getByRole('checkbox').nth(2).check();await page.getByRole('checkbox').nth(3).check();
 await page.getByLabel('Post-repair flow').fill('18');
 const buffers=await page.evaluate(()=>['#a45e3f','#357650'].map(color=>{const c=document.createElement('canvas');c.width=24;c.height=24;c.getContext('2d')!.fillStyle=color;c.getContext('2d')!.fillRect(0,0,24,24);return c.toDataURL('image/png').split(',')[1]}));
 await page.getByLabel('Before photo').setInputFiles({name:'before.png',mimeType:'image/png',buffer:Buffer.from(buffers[0],'base64')});await page.getByLabel('After photo').setInputFiles({name:'after.png',mimeType:'image/png',buffer:Buffer.from(buffers[1],'base64')});await expect(page.locator('.photo-preview')).toHaveCount(2);
 await page.getByRole('button',{name:'Use sample-site location'}).click();await page.getByLabel('Part used').selectOption('SP-01');await page.getByLabel('Caretaker confirmation code').fill(confirmation);
 await page.evaluate(()=>navigator.serviceWorker.ready);await context.setOffline(true);await page.getByRole('button',{name:'Confirm flowing water & close'}).click();await expect(page.getByText('Verified repair · 18 L/min')).toBeVisible();
 await page.waitForFunction(async()=>{const db=await new Promise<IDBDatabase>(resolve=>{const r=indexedDB.open('tsime-pilot');r.onsuccess=()=>resolve(r.result)});return new Promise(resolve=>{const r=db.transaction('workspace').objectStore('workspace').get('state');r.onsuccess=()=>resolve(r.result.jobs.some((j:{status:string})=>j.status==='completed'))})});
 await page.reload();await expect(page.getByRole('heading',{name:'A clearer picture. Healthier communities.'})).toBeVisible();await page.locator('nav').getByRole('button',{name:'Work orders'}).click();await expect(page.getByText('Verified repair · 18 L/min')).toBeVisible();
 await context.setOffline(false);await page.locator('nav').getByRole('button',{name:'Spare parts'}).click();await expect(page.locator('tr').filter({hasText:'Bush Pump seal kit'}).locator('td').nth(3)).toHaveText('11');
 expect(errors).toEqual([]);
});
test('garden statement, water safety and read-only partner view',async({page})=>{
 await page.goto('/');await page.locator('nav').getByRole('button',{name:'Gardens',exact:true}).click();await page.getByRole('button',{name:'View monthly statement'}).click();await expect(page.getByRole('dialog').getByText('$90.00',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Post statement & simulate summary SMS'}).click();
 await page.locator('nav').getByRole('button',{name:'Water quality'}).click();await page.getByRole('button',{name:'Record test',exact:true}).click();await page.getByLabel('Faecal contamination result').selectOption('positive');await page.getByLabel('pH',{exact:true}).fill('7');await page.getByRole('button',{name:'Save test result'}).click();await expect(page.getByText('Alert recorded · retest required')).toBeVisible();
 await page.getByRole('button',{name:'Coordinator',exact:true}).click();await page.getByRole('button',{name:'Partner viewer Read-only service results and reports'}).click();await expect(page.getByRole('heading',{name:'Reports',exact:true})).toBeVisible();await expect(page.getByRole('button',{name:'Report a fault',exact:true})).toHaveCount(0);
 await page.screenshot({path:'test-results/partner-reports.png',fullPage:true});
});
test('mobile navigation, search and registration',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.getByRole('heading',{name:'A clearer picture. Healthier communities.'})).toBeVisible();await page.screenshot({path:'test-results/overview-mobile.png',fullPage:true});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 await page.getByRole('button',{name:'Open navigation'}).click();await page.locator('nav').getByRole('button',{name:'Water points'}).click();await page.getByRole('button',{name:'Add water point'}).click();await page.getByLabel('Water point name').fill('Test village borehole');await page.getByLabel('Village',{exact:true}).fill('Test village');await page.getByLabel('Households served').fill('80');await page.getByLabel('Service and village access agreements').check();await page.getByRole('button',{name:'Register water point',exact:true}).click();await page.getByPlaceholder('Search water points, codes or wards…').fill('Test village');await expect(page.locator('tbody tr')).toHaveCount(1);await expect(page.getByText('TS-UMG-0036 · Ward 4')).toBeVisible();
});
