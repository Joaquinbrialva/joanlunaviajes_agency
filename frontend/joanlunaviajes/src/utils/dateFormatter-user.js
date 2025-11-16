export function dateFormatter(startDate, endDate) {
	const formattedStart = new Date(startDate).toLocaleDateString('es-AR', {
		day: 'numeric',
		month: 'long',
	});

	const formattedEnd = new Date(endDate).toLocaleDateString('es-AR', {
		day: 'numeric',
		month: 'long',
	});

	return `${formattedStart} - ${formattedEnd}`;
}
