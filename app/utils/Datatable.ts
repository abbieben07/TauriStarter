/* eslint-disable no-undef */
//import Gate from '@/ts/policies/Gate'
import { Status as ApprovalStatus } from '@/models/Approval'
import { MoneyData } from '@/models/Money'
import { Status as TransactionStatus } from '@/models/Transaction'
import { error, label, Renderer } from '@/ts/app'
import Gate from '@/ts/gate'
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber'
import { isNull } from 'lodash'
import moment from 'moment'

// @ts-nocheck
export class CellRender {
	static approval() {
		return (data) => {
			switch (data) {
				case ApprovalStatus.PENDING:
					return '<span class="text-warning">PENDING</span>'
				case ApprovalStatus.APPROVED:
					return '<span class="text-success">APPROVED</span>'
				case ApprovalStatus.DECLINED:
					return '<span class="text-danger">DECLINED</span>'
				default:
					return '<span class="text-warning">PENDING</span>'
			}
		}
	}

	static status() {
		return (data) => {
			switch (data) {
				case TransactionStatus.PENDING:
					return '<span class="text-warning">PENDING</span>'
				case TransactionStatus.SUCCESSFUL:
					return '<span class="text-success">SUCCESSFUL</span>'
				case TransactionStatus.FAILED:
					return '<span class="text-danger">FAILED</span>'
				default:
					return '<i>N/A</i>'
			}
		}
	}

	static boolean() {
		return (data) => {
			switch (data) {
				case true:
					return '<span class="text-success">TRUE</span>'
				case false:
					return '<span class="text-danger">FALSE</span>'
				default:
					return '<i>N/A</i>'
			}
		}
	}

	static date(format = 'MMM DD, YYYY HH:mm') {
		//format = 'MMM DD, YYYY hh:mm A'
		return (data) => {
			if (isNull(data)) return ''
			let date = moment(data)
			// if (date.isBetween(moment().subtract(5, 'day'), moment())) {
			// 	return date.fromNow()
			// } else if (date.isBetween(moment(), moment().add(5, 'day'))) {
			// 	return date.toNow()
			// } else {
			return date.format(format)
			//}
		}
	}

	static actions(gate?: Gate, { view = true, update = true, trash = true, forceDelete = true } = {}) {
		return (data, _type, row): string => {
			let canView = gate?.allow('view', row)
			let canUpdate = gate?.allow('update', row)
			let canDelete = gate?.allow('delete', row)
			let canForceDelete = gate?.allow('forceDelete', row)

			let actions = '<div class="btn-group btn-group-lg" role="group">'
			if (canView) {
				actions += view ? `<a class="btn btn-primary" title="View Record" data-route="${data.single}"><i class="fa fa-eye"></i></a>` : ''
			}
			if (canUpdate) actions += update ? `<a class="btn btn-secondary" title="Update Record" data-route="${data.update}"><i class="fas fa-pencil-alt"></i></a>` : ''

			if (canDelete) {
				if (row.trashed_) {
					actions += trash ? `<a class="btn btn-warning restore" data-id="${row.id}" title="Restore Record"><i class="fa fa-trash-restore"></i></a>` : ''
				} else {
					actions += trash ? `<a class="btn btn-danger delete"  data-id="${row.id}" title="Delete record"><i class="fa fa-trash" style="color:white;"></i></a>` : ''
				}
			}

			if (canForceDelete) {
				actions += forceDelete ? `<a class="btn btn-danger clear text-white" data-id="${row.id}" title="Clear Record"><i class="fa fa-ban"></i></a>` : ''
			}
			actions += '</div>'
			return actions
		}
	}

	static title() {
		return (data, _type, row: any): string => {
			let title = ''
			let link = ''
			if (typeof data === 'object') {
				title = data?.title
				link = data?.url?.single
			} else if (typeof data === 'string') {
				title = data
				link = row?.url?.single
			}

			let html = `<a href="${link}" data-route="${link}"><span class="d-flex align-self-center">${title}</span></a>`

			return html
		}
	}

	static link() {
		return (data, _type, row) => `<a href="${row.url.single}" data-route="${row.url.single}">${data}</a>`
	}

	static money(currency: string = 'NGN') {
		return (data: MoneyData | number) => Renderer.money(data, currency)
	}

	static avatar() {
		return (data): string => `<img src="${data}" class="img-fluid img-thumbnail rounded-circle avatar"/>`
	}

	static enums(action) {
		return (data): string => action(data)
	}

	static phone() {
		return (data: string) => ValidatePhone(data)
	}

	static admin() {
		return (data) => `<a class="btn btn-danger clear text-white" data-id="${data}" title="Clear Record"><i class="fa fa-ban"></i></a>`
	}

	static label() {
		return (data) => `<span class="text-secondary">${label(data)}</span>`
	}
}

export const Column = {
	actions(gate: any, ability?: any) {
		return {
			title: 'Actions',
			data: 'url',
			class: 'text-center w-auto',
			render: CellRender.actions(gate, ability),
		}
	},
}

export const SearchBuilder = {
	liveSearch: false,
	enterSearch: true,
	conditions: {
		num: {
			// '!=': null,
			// '<>': {
			// 	conditionName: 'Not',
			// 	init: (that, fn, preDefined) =>
			// 		$('<input/>')
			// 			.addClass(that.classes.value)
			// 			.addClass(that.classes.input)
			// 			.on('input', () => fn(that, this)),
			// 	inputValue: (el: JQuery<HTMLInputElement>, that) => [$(el[0]).val()],
			// 	isInputValid: (el: Array<JQuery<HTMLInputElement>>, that) => $(el[0]).val().length > 0,
			// 	search: (value, comparison) => value != comparison,
			// },
		},
		string: {
			starts: null,
			ends: null,
			'!starts': null,
			'!ends': null,
			like: null,
		},
	},
}

export const SearchPanes = {
	cascadePanes: true,
	layout: 'columns-4',
}

const ValidatePhone = (value?: string) => {
	if (isNull(value)) return '<i>N/A</i>'

	try {
		let phone = PhoneNumberUtil.getInstance()
		return phone.format(phone.parse(value), PhoneNumberFormat.INTERNATIONAL)
	} catch (e: any) {
		error(e)
		return value
	}
}
