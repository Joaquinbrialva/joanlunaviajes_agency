import styles from '../../../styles/cards/offerCard/offerCardImage.module.css';

export function OfferCardImage({ image, title, category, highlighted }) {
	return (
		<div className={styles.imageWrapper}>
			<img src={image} alt={title} className={styles.image} />

			{category?.name && (
				<span className={styles.badgeCategory}>{category.name}</span>
			)}

			{highlighted && (
				<span className={styles.badgeHighlighted}>Destacado</span>
			)}
		</div>
	);
}
