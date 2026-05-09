import puppeteer from "puppeteer";
import fs from "fs";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 30000 });
await new Promise(r => setTimeout(r, 800));
// Scroll through entire page to trigger all reveals
const h = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 300) {
  await page.evaluate(s => window.scrollTo(0, s), y);
  await new Promise(r => setTimeout(r, 80));
}
await new Promise(r => setTimeout(r, 1200));
// Scroll to resource cards grid
const top = await page.evaluate(() => {
  const el = document.querySelector(".download-grid");
  return el ? el.getBoundingClientRect().top + window.scrollY - 20 : 0;
});
await page.evaluate(y => window.scrollTo(0, y), top);
await new Promise(r => setTimeout(r, 700));
await page.screenshot({ path: "temporary screenshots/screenshot-18-cards.png", fullPage: false });
await browser.close();
console.log("done");