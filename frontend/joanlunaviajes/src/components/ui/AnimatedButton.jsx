// AnimatedButton.jsx
import { useEffect, useState } from 'react';
import '../../styles/ui/AnimatedButton.css';

export default function AnimatedButton({
	text = 'Guardar',
	success = false,
	isSubmitting,
	onClick, // ← solo llama al submit (no activa loader)
	onSuccessEnd,
	disabled = false,
}) {
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		if (success) {
			setShowSuccess(true);
			const timer = setTimeout(() => {
				setShowSuccess(false);
				if (onSuccessEnd) onSuccessEnd();
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [success, onSuccessEnd]);

	return (
		<button
			className={`animated-button ${isSubmitting ? 'loading' : ''} ${
				showSuccess ? 'success' : ''
			}`}
			onClick={onClick}
			disabled={disabled || isSubmitting}
		>
			{!isSubmitting && !showSuccess && (
				<span className='button-text'>{text}</span>
			)}
			{isSubmitting && (
				<span className='spinner'>
					<span></span>
				</span>
			)}
			{showSuccess && (
				<span className='checkmark'>
					<svg
						viewBox='0 0 24 24'
						className='checkmark-svg'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M4 12.5L9.5 18L20 7'
							fill='none'
							stroke='currentColor'
							strokeWidth='3'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='checkmark-path'
						/>
					</svg>
				</span>
			)}
		</button>
	);
}
