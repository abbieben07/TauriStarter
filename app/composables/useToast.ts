// composables/useToast.ts
import { Toast as BToast } from 'bootstrap'
import moment from 'moment'

type ToastOptions = {
	title?: string
	message: string
	icon?: string
	animation?: boolean
	autohide?: boolean
	delay?: number
	type?: 'success' | 'error' | 'info' | 'warning' | ''
	header?: boolean
}

export function useToast() {
	const showToast = ({ title = '', message, icon = 'bi-exclamation', animation = true, autohide = true, delay = 5000, type = '', header = false }: ToastOptions) => {
		// Create toast container if it doesn't exist
		let container = document.getElementById('toast-container')
		if (!container) {
			container = document.createElement('div')
			container.id = 'toast-container'
			container.style.position = 'fixed'
			container.style.top = '1rem'
			container.style.right = '1rem'
			container.style.zIndex = '9999'
			container.style.display = 'flex'
			container.style.flexDirection = 'column'
			container.style.gap = '1rem'
			document.body.appendChild(container)
		}

		// Create toast element
		const toastEl = document.createElement('div')
		toastEl.className = 'toast'
		toastEl.setAttribute('role', 'alert')
		toastEl.setAttribute('aria-live', 'assertive')
		toastEl.setAttribute('aria-atomic', 'true')

		let toastClass = 'text-bg-info'
		switch (type) {
			case 'success':
				toastClass = 'text-bg-success'
				break
			case 'error':
				toastClass = 'text-bg-danger'
				break
			case 'warning':
				toastClass = 'text-bg-warning'
				break
			case 'info':
				toastClass = 'text-bg-info'
				break
			default:
				toastClass = ''
				break
		}
		toastEl.classList.add(toastClass)

		// Toast inner HTML

		toastEl.innerHTML = header
			? `
			<div class="toast-header">
				<strong class="me-auto">${title || 'Notification'}</strong>
				<small>${moment().format('HH:mm:ss')}</small>
				${icon ? `<i class="bi ${icon} ms-2"></i>` : ''}
				<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
			</div>
		`
			: ''

		toastEl.innerHTML += `
            <div class="toast-body">
                ${message}
            </div>
        `

		container.appendChild(toastEl)

		// Initialize Bootstrap toast
		const toast = new BToast(toastEl, {
			animation,
			autohide,
			delay,
		})

		toast.show()

		// Auto remove the element from DOM after it hides
		toastEl.addEventListener('hidden.bs.toast', () => {
			toastEl.remove()
		})
	}

	return {
		showToast,
	}
}
