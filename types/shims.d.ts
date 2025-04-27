/* eslint-disable no-unused-vars */
import { AxiosInstance } from 'axios'
import $ from 'jquery'
declare module 'vue' {
	interface State {}
	interface ComponentCustomProperties {
		$http: AxiosInstance
	}
}

declare global {
	interface Window {
		$: typeof $
		jQuery: typeof $
		grecaptcha: {
			ready: () => {}
			execute: () => {}
		}
	}
}
