import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push('[pageerror] ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('[console] ' + m.text()) })

await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)
await page.screenshot({ path: '/tmp/final-home.png' })
const heroStyle = await page.evaluate(() => {
  const h1 = document.querySelector('h1')
  const span = h1?.querySelector('span > span')
  return span ? getComputedStyle(span).transform : 'not found'
})
console.log('hero line transform (should be matrix(1,0,0,1,0,0) or none):', heroStyle)

const t0 = Date.now()
await page.click('a:has-text("PLAYGROUND")')
await page.waitForTimeout(1800)
console.log('nav to playground took (incl transition):', Date.now() - t0, 'ms')
await page.screenshot({ path: '/tmp/final-playground.png' })
const text1 = await page.evaluate(() => document.body.innerText.slice(0, 100))
console.log('playground body text:', JSON.stringify(text1))

await page.click('a:has-text("CONTACT")')
await page.waitForTimeout(1800)
await page.screenshot({ path: '/tmp/final-contact.png' })
const text2 = await page.evaluate(() => document.body.innerText.slice(0, 100))
console.log('contact body text:', JSON.stringify(text2))

console.log('errors total:', errors.length, errors)
await browser.close()
