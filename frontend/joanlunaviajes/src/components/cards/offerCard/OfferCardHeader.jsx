import styles from '../../../styles/cards/offerCard/OfferCardHeader.module.css';

export function OfferCardHeader({ title, destination }) {
	return (
		<>
			<h3 className={styles.title}>{title}</h3>

			<p className={styles.destination}>
				{destination?.name}, {destination?.country}
			</p>
		</>
	);
}
