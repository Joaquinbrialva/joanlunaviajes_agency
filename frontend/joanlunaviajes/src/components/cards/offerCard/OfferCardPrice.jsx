import styles from '../../../styles/cards/offerCard/offerCardPrice.module.css';

export function OfferCardPrice({ priceFormatted }) {
	return <p className={styles.price}>{priceFormatted}</p>;
}
