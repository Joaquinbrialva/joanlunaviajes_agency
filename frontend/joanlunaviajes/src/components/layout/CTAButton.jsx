import '../../styles/layout/CTAButton.css';

export default function CTAButton({
	text,
	onClick,
	type = 'button',
	disabled = false,
	className = '',
	icon,
	iconPosition = 'right',
}) {
	return (
		<button
			type={type}
			className={`cta-button ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{icon && iconPosition === 'left' && (
				<span className='action-btn__icon'>{icon}</span>
			)}
			{text}
			{icon && iconPosition === 'right' && (
				<span className='action-btn__icon'>{icon}</span>
			)}
		</button>
	);
}
