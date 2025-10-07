export function createAvatar(initials: string, options: { size?: number; bgColor?: string; textColor?: string; font?: string } = {}) {
	const { size = 100, bgColor = '#3498db', textColor = '#ffffff', font = 'bold 40px Arial' } = options

	// Create canvas
	const canvas = document.createElement('canvas')
	canvas.width = canvas.height = size!
	const context = canvas.getContext('2d')!

	if (!context) {
		throw new Error('Could not get 2D rendering context for canvas')
	}

	// Draw background
	context.fillStyle = bgColor
	context.fillRect(0, 0, size, size)

	// Draw text
	context.fillStyle = textColor
	context.font = font
	context.textAlign = 'center'
	context.textBaseline = 'middle'
	context.fillText(initials, size / 2, size / 2)

	// Export as data URL
	return canvas.toDataURL('image/png')
}
