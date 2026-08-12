import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const errors = []
page.on('pageerror', (e) => errors.push('[pageerror] ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('[console] ' + m.text()) })

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.evaluate(() => window.scrollTo(0, document.querySelector('#selected-work').offsetTop - 40))
await page.waitForTimeout(1200)
await page.screenshot({ path: '/tmp/caro2-1.png' })

// click the front card image directly
await page.locator('[data-cursor="project"]').first().click()
await page.waitForTimeout(1500)
console.log('url after click:', page.url())
console.log('errors:', errors)
await page.screenshot({ path: '/tmp/caro2-2-afterclick.png' })
await browser.close()
