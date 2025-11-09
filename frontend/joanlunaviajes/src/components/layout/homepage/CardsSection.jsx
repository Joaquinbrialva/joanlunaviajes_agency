import SectionHeader from './SectionHeader';
import '../../../styles/layout/CardsSection.css';
import { Skeleton, Box } from '@mui/material';

export default function CardsSection({
	title,
	showArrow = false,
	cards = [],
	CardComponent,
	arrowText = '',
	loading = false,
	rows,
}) {
	const Component = CardComponent;

	const cardsPerRow = 3;
	const visibleCards = rows ? cards.slice(0, rows * cardsPerRow) : cards;

	return (
		<section className='cards-section-container'>
			<SectionHeader
				title={title}
				showArrow={showArrow}
				arrowText={arrowText}
			/>

			<div className={`cards-section-grid ${loading ? 'loading' : 'loaded'}`}>
				{loading
					? Array.from({ length: (rows || 1) * cardsPerRow }).map((_, i) => (
							<Box key={i} sx={{ width: '300px', borderRadius: 2 }}>
								<Skeleton
									variant='rectangular'
									height={220}
									sx={{
										borderRadius: 3,
										animation: 'pulse 1.5s ease-in-out infinite',
									}}
								/>
								<Box sx={{ pt: 1 }}>
									<Skeleton width='60%' />
									<Skeleton width='40%' />
								</Box>
							</Box>
					  ))
					: visibleCards.map(
							({
								id,
								title,
								description,
								imageUrl,
								alt_text,
								origin,
								destination,
								price,
							}) => (
								<Component
									key={id}
									id={id}
									title={title}
									description={description}
									imageUrl={imageUrl}
									alt_text={alt_text}
									origin={origin}
									destination={destination}
									price={price}
								/>
							)
					  )}
			</div>
		</section>
	);
}
