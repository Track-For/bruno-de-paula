const {chromium}=require('@playwright/test');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage(); const errors=[];page.on('pageerror',e=>errors.push(e.message));
 const measurements=[];
 for(const width of [1440,768,390,360]){
  await page.setViewportSize({width,height:1000});
  await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
  await page.screenshot({path:`docs/screenshots/revision-hero-${width}.png`});
  const before=await page.locator('.site-header').boundingBox();
  await page.locator('.practice-readable').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const after=await page.locator('.site-header').boundingBox();
  measurements.push({width,headerBefore:before,headerAfter:after,overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
  await page.screenshot({path:`docs/screenshots/revision-areas-${width}.png`});
 }
 const {default:AxeBuilder}=require('@axe-core/playwright');
 await page.setViewportSize({width:1440,height:1000});await page.goto('http://127.0.0.1:4173',{waitUntil:'networkidle'});
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 console.log(JSON.stringify({measurements,errors,violations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))},null,2));
 fs.writeFileSync('docs/revision-qa.json',JSON.stringify({measurements,errors,violations:result.violations},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
