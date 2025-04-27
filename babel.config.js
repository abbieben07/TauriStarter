/** @type import('@babel/core') */
module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset',
		[
			'@babel/preset-env',
			{
				targets: {
					node: '20',
				},
			},
		],
	],
}
