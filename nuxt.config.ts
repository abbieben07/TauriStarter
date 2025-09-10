// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: 'latest',
	devtools: { enabled: true },
	vite: {
		esbuild: {
			tsconfigRaw: {},
		},
		plugins: [],
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

	ignore: ['**/src-tauri/**'],
	modules: ['@nuxt/image', '@vee-validate/nuxt'],
})
