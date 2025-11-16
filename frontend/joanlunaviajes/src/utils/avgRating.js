export function avgRating(reviews) {
	const avgRating =
		reviews.length > 0
			? (
					reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
			  ).toFixed(1)
			: null;
	return avgRating;
}
