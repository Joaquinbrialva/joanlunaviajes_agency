import '../../styles/cards/BenefitCard.css';
export default function BenefitCard({ icon, title, text }) {
	return (
		<div className='benefit-card-container'>
			<div className='benefit-card-content'>
				<div className='benefit-card-icon-container'>
					{icon}
				</div>
				<div className='benefit-card-info-container'>
					<h3 className='benefit-card-title'>{title}</h3>
				</div>
				<div className='benefit-card-text-container'>
					<p className='benefit-card-text'>
						{text}
					</p>
				</div>
			</div>
		</div>
	);
}
