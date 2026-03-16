import puppeteer from 'puppeteer';

const projects = [
	{ name: 'restaurante', url: 'https://restaurante-eventos.vercel.app/' },
	{ name: 'inmobiliaria', url: 'https://desarrolladora-inmobiliaria.vercel.app/' },
	{ name: 'metalmecanica', url: 'https://hh-metalmecanica.vercel.app/' },
	{ name: 'io_group', url: 'https://portafolio-aplicacion-web.vercel.app/' },
	{ name: 'gasfitero', url: 'https://gasfitero-en-juliaca.vercel.app/' }
];

async function run() {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();
	await page.setViewport({ width: 1280, height: 900 });

	for (const p of projects) {
		console.log(`[PUPPETEER] Navigating to ${p.url}`);
		await page.goto(p.url, { waitUntil: 'networkidle0', timeout: 60000 });
		
        // Wait 4s for loaders to fade out
		await new Promise(r => setTimeout(r, 4000));
		
        // Hide loader if still somehow there (specific to La Bohemia or others)
        await page.evaluate(() => {
            const loaders = document.querySelectorAll('.fixed.inset-0, #loader, .z-50');
            loaders.forEach(l => {
                if (window.getComputedStyle(l).backgroundColor === 'rgb(0, 0, 0)' || l.textContent.includes('LOADING')) {
                    l.style.display = 'none';
                }
            });
        });
        
        await new Promise(r => setTimeout(r, 2000));

        // Capture static thumbnail
		await page.screenshot({ path: `public/img/portafolio/${p.name}.png` });
		
        // Scroll incrementally to trigger all lazy loaded images and wait
        console.log(`[PUPPETEER] Scrolling ${p.name}`);
        for(let i=0; i<5; i++) {
            await page.evaluate(() => window.scrollBy(0, window.innerHeight));
            await new Promise(r => setTimeout(r, 1000));
        }
		
        // Scroll back to top
        await page.evaluate(() => window.scrollTo(0, 0));
        await new Promise(r => setTimeout(r, 1000));
		
		// Capture full page
		await page.screenshot({ path: `public/img/portafolio/${p.name}_full.png`, fullPage: true });
		console.log(`[PUPPETEER] Saved ${p.name} screenshots`);
	}

	await browser.close();
}

run().catch(console.error);
