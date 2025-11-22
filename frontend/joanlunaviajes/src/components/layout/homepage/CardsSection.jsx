import SectionHeader from './SectionHeader';
import styles from '../../../styles/layout/CardsSection.module.css';
import { Box, Skeleton } from '@mui/material';

export default function CardsSection({
	title,
	showArrow = false,
	cards = [],
	CardComponent,
	cardProps = {},
	arrowText = '',
	loading = false,
	rows,
}) {
	const Component = CardComponent;
	const cardsPerRow = 3;
	const visibleCards = rows ? cards.slice(0, rows * cardsPerRow) : cards;
	return (
		<section className={styles.container}>
			<div className={styles.header}>
				<SectionHeader
					title={title}
					showArrow={showArrow}
					arrowText={arrowText}
				/>
			</div>

			<div className={loading ? styles.loading : styles.cards}>
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
					<div className={styles.noData}>
						<span>No hay datos</span>
					</div>
				) : (
					visibleCards.map((card) => (
						<Component key={card.id} {...card} {...cardProps} />
					))
				)}
			</div>
		</section>
	);
}
