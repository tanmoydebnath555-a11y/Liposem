import puppeteer from "puppeteer";
const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
const font = await page.evaluate(() => {
  const el = document.querySelector("body");
  return window.getComputedStyle(el).fontFamily;
});
console.log("Computed font:", font);
await browser.close();