import Form from './Form.vue'

export interface StepData {
	step: number
	done: boolean
	form: typeof Form
}
