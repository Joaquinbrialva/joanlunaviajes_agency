import SectionHeader from './SectionHeader';
import '../../../styles/layout/CardsSection.css';

export default function CardsSection({
	title,
	showArrow = false,
	cards = [],
	CardComponent,
	arrowText = '',
}) {
	const Component = CardComponent;

	return (
		<section className='cards-section-container'>
			<SectionHeader
				title={title}
				showArrow={showArrow}
				arrowText={arrowText}
			/>

			<div className='cards-section-grid'>
				{cards.map(({ id, title, description, imageUrl, alt_text }) => (
					<Component
						key={id}
						id={id}
						title={title}
						description={description}
						imageUrl={imageUrl}
						alt_text={alt_text}
					/>
				))}
			</div>
		</section>
	);
}
