import 'https://login.remita.net/payment/v1/remita-pay-inline.bundle.js'

export function useRemitta() {
	const pay = (options = {}) =>
		new Promise((resolve, reject) => {
			const opts = {
				key: import.meta.env.VITE_REMITTA_KEY,
				onSuccess: (response: any) => resolve(response),
				onError: (response: any) => reject(response),
				onClose: () => reject({ message: 'Payment cancelled' }),
			}

			// @ts-ignore
			RmPaymentEngine.init({ ...opts, ...options }).openIframe()
		})

	return { pay }
}
