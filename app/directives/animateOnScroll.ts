export default {
	mounted: (el) => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					el.classList.add('animate__animated', 'animate__fadeInUp')
					observer.unobserve(el)
				}
			})
		})
		observer.observe(el)
	},
}
