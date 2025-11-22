// ===============================
// Fecha
// ===============================

function dateFormatter(startDate, endDate) {
	if (!startDate) return '';

	const sd = new Date(startDate);
	const ed = endDate ? new Date(endDate) : null;

	const opts = { day: '2-digit', month: 'short', year: 'numeric' };

	const start = sd.toLocaleDateString('es-AR', opts);
	const end = ed ? ed.toLocaleDateString('es-AR', opts) : null;

	return end ? `${start} - ${end}` : start;
}

// ===============================
// Moneda
// ===============================

function priceFormatter(price, currency = 'USD', locale = 'es-AR') {
	if (price == null || isNaN(price)) return '';

	try {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			maximumFractionDigits: 0,
		}).format(price);
	} catch {
		// fallback defensivo
		return `${currency} ${Number(price).toLocaleString(locale)}`;
	}
}

// ===============================
// Imagen / Fallback
// ===============================

function getImageSrc(images) {
	const PLACEHOLDER =
		'https://placehold.co/400x250/374151/FFFFFF?text=No+Image';

	if (!images || !images.length) return PLACEHOLDER;

	const src = images[0];

	// no aceptes URLS que no terminen en archivo de imagen
	if (!src.match(/\.(jpg|jpeg|png|webp|avif)$/i)) return PLACEHOLDER;

	return src;
}

// ===============================
// Rating promedio
// ===============================

function avgRating(reviews = []) {
	if (!Array.isArray(reviews) || reviews.length === 0) return null;

	const sum = reviews.reduce((acc, r) => acc + (r.rating || 0), 0);
	const avg = sum / reviews.length;

	return Number(avg.toFixed(1));
}

// ===============================
// Tipo de viaje
// ===============================

function getTripTypeLabel(isRoundTrip) {
	return isRoundTrip ? 'Ida y vuelta' : 'Solo ida';
}

// ===============================
// Sanitización defensiva general
// ===============================

function safeText(text, fallback = '') {
	return text ? String(text) : fallback;
}

export {
	dateFormatter,
	priceFormatter,
	getImageSrc,
	avgRating,
	getTripTypeLabel,
	safeText,
};
