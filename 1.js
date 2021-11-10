// node 1.js --url="https://web.whatsapp.com/" --config=config.json

let minimist = require('minimist');
let fs = require('fs');
let puppeteer = require('puppeteer')

let args = minimist(process.argv);
//console.log(args.url);
//console.log(args.config);
let configJSON = fs.readFileSync(args.config, "utf-8");
let config = JSON.parse(configJSON);

async function run(){
    let browser = await puppeteer.launch({headless: false});
    let pages = await browser.pages();
    let page = pages[0];
    await page.goto(args.url);
    //await page.screenshot({path: 'screenshot.png'});

    await page.waitForSelector("div[data-tab='3']");
    await page.type("div[data-tab='3']", config.contacts, {delay: 500});
    await page.keyboard.press('Enter');

    await page.waitForSelector("#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text");
    for(let i=0; i<50; i++){
    await page.type("#main > footer > div._2BU3P.tm2tP.copyable-area > div > div > div._2lMWa > div.p3_M1 > div > div._13NKt.copyable-text.selectable-text", config.message);
    await page.keyboard.press('Enter');
    }
    
    browser.close();
}
run();