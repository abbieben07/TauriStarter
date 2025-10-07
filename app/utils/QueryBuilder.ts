import { label } from '@/ts/app'

export class QueryInput {
	static date(rule, name) {
		return `<input name="${name}" type="date" class="form-control" placeholder="Select Date" />`
	}

	static select(options) {
		let html = ''
		for (let i of options) {
			html += `<option value="${i}">${label(i)}</option>`
		}

		return (rule, name) => {
			return `<select name="${name}" type="date" class="form-select" placeholder="Select Date">${html}</select>`
		}
	}
}

export const operators = [
	{
		type: 'is Before',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['date', 'datetime'],
	},
	{
		type: 'is After',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['date', 'datetime'],
	},
	{
		type: 'is On or Before',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['date', 'datetime'],
	},
	{
		type: 'is On or After',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['date', 'datetime'],
	},
	{
		type: 'is Between',
		nb_inputs: 2,
		multiple: true,
		apply_to: ['date', 'datetime'],
	},
	{
		type: 'is',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['date', 'datetime', 'integer', 'double', 'string', 'boolean'],
	},
	{
		type: 'is Not',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['date', 'datetime', 'integer', 'double', 'string', 'boolean'],
	},
	{
		type: 'is Less Than',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['integer', 'double'],
	},
	{
		type: 'is Greater Than',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['integer', 'double'],
	},
	{
		type: 'is Less than or Equal',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['integer', 'double'],
	},
	{
		type: 'is Greater than or Equal',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['integer', 'double'],
	},
	{
		type: 'Contains',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['string'],
	},
	{
		type: 'Begins With',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['string'],
	},
	{
		type: 'Ends with',
		nb_inputs: 1,
		multiple: false,
		apply_to: ['string'],
	},
]
