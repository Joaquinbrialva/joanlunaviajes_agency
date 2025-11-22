import styles from '../../../styles/cards/offerCard/offerCardDetails.module.css';

export function OfferCardDetails({
	dateFormatted,
	nights,
	avgRatingValue,
	reviews,
	included,
}) {
	return (
		<div className={styles.detailsWrapper}>
			<p className={styles.dates}>
				{dateFormatted} • {nights} noches
			</p>

			{avgRatingValue && (
				<div className={styles.rating}>
					⭐ <span>{avgRatingValue}</span>
					<small>({reviews.length} opiniones)</small>
				</div>
			)}

			<ul className={styles.included}>
				{included.slice(0, 3).map((item, i) => (
					<li key={i}>{item}</li>
				))}
				{included.length > 3 && <li className={styles.more}>+ más</li>}
			</ul>
		</div>
	);
}
