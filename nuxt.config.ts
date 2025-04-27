import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },
	vite: {
		esbuild: {
			tsconfigRaw: {},
		},
		plugins: [
			viteStaticCopy({
				targets: [
					{
						src: 'node_modules/intl-tel-input/build/js/utils.js',
						dest: 'vendor/phone',
					},
				],
			}),
		],
		optimizeDeps: {
			include: ['lodash', 'pdfjs-dist/build/pdf.worker.min.mjs'],
		},
		css: {
			preprocessorOptions: {
				scss: {
					// Suppress deprecated warnings
					quietDeps: true,
					silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'color-4-api', 'color-functions'],
					api: 'modern-compiler',
				},
			},
		},
	},

	ssr: false,

	alias: {
		'@/*': './*',
	},
	router: {
		options: {
			scrollBehaviorType: 'smooth',
		},
	},
	pwa: {
		registerType: 'autoUpdate',
	},
	vuefire: {
		config: {
			apiKey: 'AIzaSyBIx4kS-Fb_YHf1TJ7gCLkgejIBaMr_5sE',
			authDomain: 'crop-watch-ng.firebaseapp.com',
			projectId: 'crop-watch-ng',
			storageBucket: 'crop-watch-ng.firebasestorage.app',
			messagingSenderId: '451098738227',
			appId: '1:451098738227:web:c79570c854ecd5a173ed46',
			measurementId: 'G-6QSCD1RK1S',
		},
		services: {
			analytics: true,
		},
		analytics: {
			collectionEnabled: true, // default
		},
	},
	io: {
		// module options
		sockets: [
			{
				name: 'main',
				url: 'http://localhost:3000',
			},
		],
	},
	modules: ['@nuxt/image', '@vee-validate/nuxt', '@nuxt/content', '@vite-pwa/nuxt', 'nuxt-vuefire', 'nuxt-socket-io'],
})
