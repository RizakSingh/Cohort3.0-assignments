import { chromium } from 'playwright'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
await page.evaluate(() => window.scrollTo(0, document.querySelector('#selected-work').offsetTop - 40))
await page.waitForTimeout(1200)
const rect = await page.evaluate(() => {
  const els = [...document.querySelectorAll('[data-cursor="project"]')]
  const front = els.reduce((best, el) => { const o = parseFloat(getComputedStyle(el).opacity); return (!best || o > best.o) ? { el, o } : best }, null)
  const r = front.el.getBoundingClientRect()
  return { x: r.x + r.width/2, y: r.y + r.height/2 }
})
await page.mouse.click(rect.x, rect.y)
await page.waitForTimeout(1200)
console.log('URL:', page.url())
await browser.close()
