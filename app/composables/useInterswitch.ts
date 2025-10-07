import 'https://newwebpay.interswitchng.com/inline-checkout.js'

export default function useInterswitch(opts) {
	//@ts-ignore
	return window.webpayCheckout(opts)
}
