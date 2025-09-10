import { type RouteParams } from 'ziggy-js'

export interface MenuItem {
	heading?: boolean
	name?: string
	icon?: string
	label: string
	query?: RouteParams<string> | string
	url?: string
	submenu?: MenuItem[]
	external?: boolean
	to?: string | object
}
