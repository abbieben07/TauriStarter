import Parallax from '@/directives/Parallax'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('parallax', Parallax)
})
