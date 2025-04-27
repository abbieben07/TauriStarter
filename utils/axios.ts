import axios from 'axios'
import Cookie from 'js-cookie'

export default axios

axios.defaults.baseURL = import.meta.env.VITE_APP_URL
if (import.meta.env.DEV) {
	Cookie.set('XDEBUG_SESSION', 'start')
	axios.defaults.headers.common['XDEBUG_SESSION'] = 'vsc'
}
