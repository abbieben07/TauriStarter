import { createApp, h } from 'vue'
import ConfirmDialogComponent from '../components/ConfirmDialog.vue'

interface ConfirmOptions {
	title: string
	message: string
	okText?: string
	cancelText?: string
}

export function useConfirm() {
	const confirm = (options: ConfirmOptions): Promise<boolean> => {
		return new Promise((resolve) => {
			const container = document.createElement('div')
			document.body.appendChild(container)

			const onConfirm = () => {
				resolve(true)
				app.unmount()
				document.body.removeChild(container)
			}

			const onCancel = () => {
				resolve(false)
				app.unmount()
				document.body.removeChild(container)
			}

			const app = createApp({
				render: () => h(ConfirmDialogComponent, { ...options, onConfirm, onCancel }),
			})

			app.mount(container)
		})
	}

	return { confirm }
}
