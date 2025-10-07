import Monnify from 'monnify-ts'

export default function useMonnify() {
	return new Monnify(import.meta.env.VITE_MONNIFY_PUBLIC_KEY, import.meta.env.VITE_MONNIFY_CONTRACT_CODE)
}
