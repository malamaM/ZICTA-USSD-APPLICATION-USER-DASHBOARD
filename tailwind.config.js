/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'hero-pattern': "url('/assets/login-section-bg.png')",
				'hero-pattern-blue': "url('/assets/hero-bg.svg')",
			},
			content: {
				logo: 'url("/assets/logo.png")',
				hero: 'url("/assets/hero.png")',
			},
		},
	},
	plugins: [],
}
