export function Logo({ className = '' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='80 0 400 80'
			role='img'
			aria-label='Joanluna Viajes'
			className={className}
		>
			<line
				x1='95'
				y1='20'
				x2='95'
				y2='65'
				stroke='currentColor'
				strokeWidth='2'
				opacity='0.5'
			/>

			<text
				x='110'
				y='48'
				fontSize='36'
				fontWeight='600'
				fontFamily='Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
				fill='currentColor'
			>
				Joanluna
			</text>

			<text
				x='110'
				y='68'
				fontSize='14'
				letterSpacing='3'
				fontFamily='Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
				fill='currentColor'
				opacity='0.75'
			>
				VIAJES
			</text>
		</svg>
	);
}
