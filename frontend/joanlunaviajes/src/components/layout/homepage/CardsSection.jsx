import SectionHeader from './SectionHeader';
import '../../../styles/layout/CardsSection.css';
import { Box, Skeleton } from '@mui/material';

export default function CardsSection({
	title,
	showArrow = false,
	cards = [],
	CardComponent,
	arrowText = '',
	loading = false,
	rows,
	variant = 'default', // 👈 "offers", "destinations", etc.
}) {
	const Component = CardComponent;
	const cardsPerRow = 3;
	const visibleCards = rows ? cards.slice(0, rows * cardsPerRow) : cards;
	return (
		<section className={`cards-section-container cards-${variant}`}>
			<SectionHeader
				title={title}
				showArrow={showArrow}
				arrowText={arrowText}
			/>

			<div
				className={`cards-section-grid ${variant} ${
					loading ? 'loading' : 'loaded'
				}`}
			>
				{loading ? (
					Array.from({ length: (rows || 1) * cardsPerRow }).map((_, i) => (
						<Box key={i} sx={{ width: '100%', borderRadius: 2 }}>
							<Skeleton
								variant='rectangular'
								height={220}
								sx={{ borderRadius: 2 }}
							/>
							<Box sx={{ pt: 1 }}>
								<Skeleton width='100%' />
								<Skeleton width='80%' />
							</Box>
						</Box>
					))
				) : visibleCards.length === 0 ? (
					<div className='no-data-container'>
						<span>No hay datos</span>
					</div>
				) : (
					visibleCards.map((card) => <Component key={card.id} props={card} />)
				)}
			</div>
		</section>
	);
}
