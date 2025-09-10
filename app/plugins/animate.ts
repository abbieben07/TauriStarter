import animateOnScroll from '@/directives/animateOnScroll'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate-on-scroll', animateOnScroll)
})
