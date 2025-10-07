import Paystack from '@paystack/inline-js'

export default function usePaystack(amount, onSuccess: () => void, onCna) {
	return new Paystack()
}
