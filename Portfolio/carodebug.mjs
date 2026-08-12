import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
page.on('console', (m) => console.log('[C]', m.text()))
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.evaluate(() => window.scrollTo(0, document.querySelector('#selected-work').offsetTop - 40))
await page.waitForTimeout(1000)

const box = await page.locator('#selected-work').boundingBox()
const cx = box.x + box.width / 2
const cy = box.y + 250
await page.mouse.move(cx, cy)
await page.mouse.down()
for (let i = 0; i < 10; i++) {
  await page.mouse.move(cx - (i+1) * 22, cy, { steps: 1 })
  await page.waitForTimeout(30)
}
await page.mouse.up()
await page.waitForTimeout(1200)

const label = await page.locator('text=/\d\d \/ 05/').textContent()
console.log('label after drag:', label)
await page.screenshot({ path: '/tmp/carousel-debug.png' })
await browser.close()
