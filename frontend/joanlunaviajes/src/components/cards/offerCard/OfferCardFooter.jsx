import styles from '../../../styles/cards/offerCard/offerCardFooter.module.css';

export function OfferCardFooter({ availability }) {
	return (
		<div className={styles.footer}>
			<span className={styles.availability}>{availability} lugares</span>
			<button className={styles.button}>Ver detalles</button>
		</div>
	);
}
